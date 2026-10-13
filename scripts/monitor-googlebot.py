#!/usr/bin/env python3
"""
Raahi International — Real-Time Googlebot & Search Crawler Tail Monitor
Hooks into `wrangler tail cargo-app` to observe, verify, and log Googlebot
and search crawler requests in real time.
"""

import os
import sys
import json
import socket
import signal
import datetime
import subprocess
import re
from typing import Optional, Tuple, Dict, Any

# ANSI Color Codes
COLOR_RESET = "\033[0m"
COLOR_BOLD = "\033[1m"
COLOR_GREEN = "\033[32m"
COLOR_CYAN = "\033[36m"
COLOR_YELLOW = "\033[33m"
COLOR_MAGENTA = "\033[35m"
COLOR_RED = "\033[31m"
COLOR_BLUE = "\033[34m"
COLOR_GRAY = "\033[90m"

# Crawler User-Agent Patterns
BOT_PATTERNS = [
    (re.compile(r'Google-InspectionTool', re.I), 'Google-InspectionTool (GSC)'),
    (re.compile(r'Googlebot-Image', re.I), 'Googlebot-Image'),
    (re.compile(r'Googlebot-Video', re.I), 'Googlebot-Video'),
    (re.compile(r'Storebot-Google', re.I), 'Storebot-Google'),
    (re.compile(r'GoogleOther', re.I), 'GoogleOther'),
    (re.compile(r'Googlebot.*Mobile|Mobile.*Googlebot', re.I), 'Googlebot (Smartphone)'),
    (re.compile(r'Googlebot', re.I), 'Googlebot (Desktop)'),
    (re.compile(r'bingbot', re.I), 'bingbot (Microsoft)'),
    (re.compile(r'YandexBot', re.I), 'YandexBot'),
    (re.compile(r'Baiduspider', re.I), 'Baiduspider'),
    (re.compile(r'DuckDuckBot', re.I), 'DuckDuckBot'),
    (re.compile(r'facebookexternalhit', re.I), 'FacebookBot'),
    (re.compile(r'Twitterbot', re.I), 'Twitterbot'),
]

ACCOUNT_ID = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "d6e2813967e0193039c0f6df19cebaf4")
WORKER_NAME = os.environ.get("CLOUDFLARE_WORKER_NAME", "cargo-app")
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
LOG_FILE = os.path.join(LOG_DIR, "crawler-hits.jsonl")

# In-memory reverse DNS cache to prevent redundant socket calls
dns_cache: Dict[str, Tuple[str, bool]] = {}


def identify_bot(user_agent: str) -> Optional[str]:
    """Matches a user-agent against known crawler signatures."""
    if not user_agent:
        return None
    for pattern, name in BOT_PATTERNS:
        if pattern.search(user_agent):
            return name
    return None


def verify_crawler_ip(ip: str, bot_type: str) -> Tuple[str, bool]:
    """
    Performs forward-confirmed reverse DNS verification (FCrDNS)
    for Googlebot as recommended by Google.
    """
    if not ip or ip in ("127.0.0.1", "::1", "unknown"):
        return ("Local/Private IP", False)

    if ip in dns_cache:
        return dns_cache[ip]

    hostname = "No PTR Record"
    is_verified = False

    try:
        socket.setdefaulttimeout(2.0)
        host_info = socket.gethostbyaddr(ip)
        hostname = host_info[0].lower()

        is_google = "google" in bot_type.lower()
        is_bing = "bing" in bot_type.lower()

        if is_google and (hostname.endswith(".googlebot.com") or hostname.endswith(".google.com")):
            try:
                # Forward lookup confirmation
                forward_ips = socket.gethostbyname_ex(hostname)[2]
                if ip in forward_ips:
                    is_verified = True
            except Exception:
                is_verified = False
        elif is_bing and hostname.endswith(".search.msn.com"):
            try:
                forward_ips = socket.gethostbyname_ex(hostname)[2]
                if ip in forward_ips:
                    is_verified = True
            except Exception:
                is_verified = False
    except Exception:
        hostname = "Lookup Timeout / No PTR"
        is_verified = False

    result = (hostname, is_verified)
    dns_cache[ip] = result
    return result


def log_to_jsonl(entry: Dict[str, Any]) -> None:
    """Appends structured bot hit to logs/crawler-hits.jsonl."""
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
        f.flush()


def format_status(status: int) -> str:
    """Formats HTTP status code with ANSI colors."""
    if 200 <= status < 300:
        return f"{COLOR_GREEN}{status} OK{COLOR_RESET}"
    elif 300 <= status < 400:
        return f"{COLOR_CYAN}{status} REDIRECT{COLOR_RESET}"
    elif 400 <= status < 500:
        return f"{COLOR_YELLOW}{status} CLIENT ERR{COLOR_RESET}"
    else:
        return f"{COLOR_RED}{status} SERVER ERR{COLOR_RESET}"


def process_event(event_data: Dict[str, Any]) -> None:
    """Parses a single Cloudflare Worker tail event."""
    try:
        event = event_data.get("event") or {}
        req = event.get("request") or {}
        resp = event_data.get("response") or {}

        headers = req.get("headers") or {}
        user_agent = headers.get("user-agent") or headers.get("User-Agent") or ""
        bot_type = identify_bot(user_agent)

        if not bot_type:
            return  # Skip regular user traffic to maintain high signal-to-noise

        # Extract event metadata
        url = req.get("url") or "https://raahiinternational.com/"
        method = req.get("method") or "GET"
        ip = headers.get("cf-connecting-ip") or headers.get("x-real-ip") or "unknown"
        status = resp.get("status") or 200
        cpu_time = event_data.get("cpuTime") or 0
        wall_time = event_data.get("wallTime") or 0
        latency = f"{wall_time}ms" if wall_time else f"{cpu_time}ms"

        # Timestamp
        event_ts = event_data.get("eventTimestamp")
        if event_ts:
            dt = datetime.datetime.fromtimestamp(event_ts / 1000.0, tz=datetime.timezone.utc)
            timestamp_str = dt.strftime("%Y-%m-%d %H:%M:%S UTC")
            iso_timestamp = dt.isoformat()
        else:
            now = datetime.datetime.now(datetime.timezone.utc)
            timestamp_str = now.strftime("%Y-%m-%d %H:%M:%S UTC")
            iso_timestamp = now.isoformat()

        # Reverse DNS verification
        hostname, is_verified = verify_crawler_ip(ip, bot_type)

        if is_verified:
            ver_label = f"{COLOR_GREEN}VERIFIED AUTHENTIC{COLOR_RESET}"
        elif "google" in bot_type.lower() or "bing" in bot_type.lower():
            ver_label = f"{COLOR_YELLOW}UNVERIFIED / SPOOFED{COLOR_RESET}"
        else:
            ver_label = f"{COLOR_GRAY}UNCONFIRMED{COLOR_RESET}"

        # Cache status estimation from Cloudflare
        cf_obj = req.get("cf") or {}
        verified_bot = cf_obj.get("verifiedBotCategory") or "None"

        # Terminal Print
        print(f"\n{COLOR_BOLD}[{timestamp_str}] [{format_status(status)}] [{COLOR_MAGENTA}{bot_type}{COLOR_RESET}{COLOR_BOLD}] [{COLOR_BLUE}{latency}{COLOR_RESET}{COLOR_BOLD}]{COLOR_RESET}")
        print(f"  {COLOR_BOLD}URL:{COLOR_RESET}     {COLOR_CYAN}{method} {url}{COLOR_RESET}")
        print(f"  {COLOR_BOLD}IP:{COLOR_RESET}      {ip} ({hostname} — {ver_label})")
        print(f"  {COLOR_BOLD}UA:{COLOR_RESET}      {COLOR_GRAY}{user_agent}{COLOR_RESET}")
        if verified_bot and verified_bot != "None":
            print(f"  {COLOR_BOLD}CF Bot:{COLOR_RESET}  {verified_bot}")
        sys.stdout.flush()

        # Log entry to JSONL
        log_entry = {
            "timestamp": iso_timestamp,
            "bot_type": bot_type,
            "url": url,
            "method": method,
            "status_code": status,
            "client_ip": ip,
            "reverse_dns": hostname,
            "is_verified": is_verified,
            "latency_ms": wall_time or cpu_time,
            "cf_verified_category": verified_bot,
            "user_agent": user_agent,
        }
        log_to_jsonl(log_entry)

    except Exception as e:
        print(f"{COLOR_RED}[Error processing log event]{COLOR_RESET}: {e}", file=sys.stderr)


def main():
    print(f"{COLOR_BOLD}{COLOR_CYAN}================================================================={COLOR_RESET}")
    print(f"{COLOR_BOLD} Raahi International — Real-Time Googlebot & Crawler Monitor{COLOR_RESET}")
    print(f"{COLOR_GRAY} Worker: {WORKER_NAME} | Account: {ACCOUNT_ID}{COLOR_RESET}")
    print(f"{COLOR_GRAY} Destination Log: {LOG_FILE}{COLOR_RESET}")
    print(f"{COLOR_BOLD}{COLOR_CYAN}================================================================={COLOR_RESET}")
    print(f"Starting Cloudflare Worker tail session (npx wrangler tail)...")
    print(f"Waiting for live search crawler hits. Press {COLOR_YELLOW}Ctrl+C{COLOR_RESET} to exit.\n")
    sys.stdout.flush()

    env = os.environ.copy()
    env["CLOUDFLARE_ACCOUNT_ID"] = ACCOUNT_ID

    cmd = ["npx", "wrangler", "tail", WORKER_NAME, "--format", "json"]

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
        env=env,
    )

    def shutdown(signum, frame):
        print(f"\n\n{COLOR_YELLOW}Shutting down crawler monitor cleanly...{COLOR_RESET}")
        try:
            proc.terminate()
            proc.wait(timeout=2)
        except Exception:
            proc.kill()
        print(f"{COLOR_GREEN}Monitor stopped.{COLOR_RESET}")
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    buffer = ""
    decoder = json.JSONDecoder()

    while True:
        line = proc.stdout.readline()
        if not line:
            if proc.poll() is not None:
                err = proc.stderr.read()
                print(f"{COLOR_RED}wrangler tail exited with code {proc.returncode}:{COLOR_RESET} {err}", file=sys.stderr)
                break
            continue

        buffer += line
        stripped = buffer.strip()
        if not stripped:
            buffer = ""
            continue

        if stripped.startswith("{"):
            try:
                obj, idx = decoder.raw_decode(stripped)
                process_event(obj)
                # Remove parsed object from buffer
                buffer = stripped[idx:].lstrip()
            except json.JSONDecodeError:
                # Incomplete JSON object, keep buffering lines
                pass


if __name__ == "__main__":
    main()
