#!/usr/bin/env python3
import os
import re
from collections import defaultdict

routes = [
    '/',
    '/about',
    '/cargo-services',
    '/services',
    '/destinations',
    '/locations',
    '/guides',
    '/quote',
    '/track',
    '/services/commercial-cargo',
    '/services/excess-baggage',
    '/destinations/uk',
    '/destinations/uae',
    '/destinations/usa',
    '/destinations/canada',
    '/destinations/ksa',
    '/destinations/uk/london',
    '/destinations/uk/manchester',
    '/destinations/uk/birmingham',
    '/destinations/uae/dubai',
    '/destinations/uae/abu-dhabi',
    '/destinations/ksa/riyadh',
    '/destinations/ksa/jeddah',
    '/destinations/canada/toronto',
    '/destinations/canada/vancouver',
    '/destinations/usa/new-york',
    '/destinations/usa/chicago',
    '/destinations/usa/houston',
    '/locations/international-cargo-services-in-lahore',
    '/locations/international-cargo-services-in-karachi',
    '/locations/international-cargo-services-in-islamabad',
    '/locations/international-cargo-services-in-rawalpindi',
    '/locations/international-cargo-services-in-faisalabad',
    '/locations/international-cargo-services-in-sialkot',
    '/locations/international-cargo-services-in-multan',
    '/locations/international-cargo-services-in-peshawar',
    '/guides/export-customs-documentation-guide',
    '/guides/packing-cargo-guide',
]

scan_dirs = ['app', 'components', 'config']
extensions = ('.tsx', '.ts', '.jsx', '.js', '.json')

raw_a_tags = []
workers_dev_links = []
redirected_links = []
inbound_links = defaultdict(list)
nav_links = set()
footer_links = set()
home_links = set()

# Known redirect sources
redirects = {
    '/locations/lahore': '/locations/international-cargo-services-in-lahore',
    '/locations/karachi': '/locations/international-cargo-services-in-karachi',
    '/locations/islamabad': '/locations/international-cargo-services-in-islamabad',
    '/locations/rawalpindi': '/locations/international-cargo-services-in-rawalpindi',
    '/locations/multan': '/locations/international-cargo-services-in-multan',
    '/locations/faisalabad': '/locations/international-cargo-services-in-faisalabad',
    '/locations/peshawar': '/locations/international-cargo-services-in-peshawar',
    '/locations/sialkot': '/locations/international-cargo-services-in-sialkot',
    '/services/air-freight': '/cargo-services',
    '/services/sea-cargo': '/cargo-services',
    '/about-us': '/about',
    '/guides/air-vs-sea-cargo': '/cargo-services#quick-comparison',
}

home_sections = [
    'HeroSection', 'QuickQuoteTeaser', 'UseCasesSection', 'ServicesOverview',
    'RegistrationsSection', 'TrustedMarketSection', 'PakistanReachSection',
    'DestinationShowcase', 'ProcessSection', 'TrustSection', 'TestimonialsSection',
    'FaqSection', 'FinalCtaSection', 'InternalLinkGrid',
]

for d in scan_dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(extensions):
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()

                # 1. Check workers.dev
                if 'workers.dev' in content:
                    for line_no, line in enumerate(content.splitlines(), 1):
                        stripped = line.strip()
                        if 'workers.dev' in line and not stripped.startswith('//') and 'host ===' not in line and '!rawSiteUrl.includes' not in line:
                            workers_dev_links.append((filepath, line_no, stripped))

                # 2. Check raw <a> tags with internal links
                # Look for <a followed by href="/..."
                raw_matches = re.findall(r'<a\s+[^>]*href=["\'](?:/|https?://(?:www\.)?raahiinternational\.com)[^"\']*["\']', content)
                for rm in raw_matches:
                    raw_a_tags.append((filepath, rm))

                # 3. Check redirected link usage
                for red_src in redirects:
                    if f'"{red_src}"' in content or f"'{red_src}'" in content:
                        if not filepath.endswith('redirects.json') and not filepath.endswith('next.config.ts') and not filepath.endswith('middleware.ts'):
                            redirected_links.append((filepath, red_src, redirects[red_src]))

                # 4. Check inbound links to canonical routes
                for r in routes:
                    pattern = rf'["\']{re.escape(r)}(?:[?#][^"\']*)?["\']'
                    if re.search(pattern, content):
                        inbound_links[r].append(filepath)
                        if 'nav.config.ts' in filepath or 'Header.tsx' in filepath or 'Navbar.tsx' in filepath:
                            nav_links.add(r)
                        if 'Footer.tsx' in filepath:
                            footer_links.add(r)
                        if 'page.tsx' in filepath and root == 'app/(public)':
                            home_links.add(r)
                        for hs in home_sections:
                            if hs in filepath:
                                home_links.add(r)

print('================================================================================')
print('LINK GRAPH AUDIT REPORT: RAAHI INTERNATIONAL')
print('================================================================================\n')

print(f'Total Canonical Pages Audited: {len(routes)}')

print(f'\n--- 1. Raw <a> Internal Links: {len(raw_a_tags)} ---')
for f, tag in raw_a_tags:
    print(f'  [!] {f}: {tag}')
if not raw_a_tags:
    print('  [✓] Zero raw <a> internal links found. All internal links correctly utilize Next.js <Link> or config objects.')

print(f'\n--- 2. workers.dev Hardcoded Links: {len(workers_dev_links)} ---')
for f, l, line in workers_dev_links:
    print(f'  [!] {f}:{l}: {line}')
if not workers_dev_links:
    print('  [✓] Zero workers.dev hardcoded links found across scanned components and pages.')

print(f'\n--- 3. Redirected / Non-Canonical Internal Links: {len(redirected_links)} ---')
for f, src, tgt in set(redirected_links):
    print(f'  [!] {f}: links to deprecated "{src}" (redirects to "{tgt}")')
if not redirected_links:
    print('  [✓] Zero links to redirected/deprecated endpoints.')

print('\n--- 4. Comprehensive Link Graph Matrix ---')
print(f'{"Status":<12} | {"Page Route":<52} | {"In Nav":<6} | {"In Footer":<9} | {"In Home":<7} | {"Ref Count"}')
print('-' * 105)

orphans = []
underlinked = []

for r in routes:
    in_nav = r in nav_links
    in_footer = r in footer_links
    in_home = r in home_links
    refs = sorted(list(set(inbound_links[r])))
    total_refs = len(refs)

    # In our project, footer links are defined in config/nav.config.ts and rendered in Footer.tsx
    # Let's verify if r is in nav.config.ts under footerNavigation or keyDestinationCities
    is_in_footer_config = False
    with open('config/nav.config.ts', 'r') as fp:
        nav_text = fp.read()
        if f"'{r}'" in nav_text or f'"{r}"' in nav_text:
            if 'footerNavigation' in nav_text or 'keyDestinationCities' in nav_text:
                is_in_footer_config = True

    in_footer_effective = in_footer or is_in_footer_config

    if not (in_nav or in_footer_effective or in_home):
        status = 'ORPHAN'
        orphans.append(r)
    elif total_refs <= 2:
        status = 'UNDERLINKED'
        underlinked.append(r)
    else:
        status = 'HEALTHY'

    print(f'{status:<12} | {r:<52} | {str(in_nav):<6} | {str(in_footer_effective):<9} | {str(in_home):<7} | {total_refs} files')

print('\n================================================================================')
print(f'SUMMARY: Total Pages: {len(routes)} | Orphans: {len(orphans)} | Underlinked: {len(underlinked)}')
print('================================================================================')
