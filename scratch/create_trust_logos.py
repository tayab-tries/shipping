import os

os.makedirs('public/images/logos', exist_ok=True)

logos = {
    'fbr.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="100%" height="100%">
  <!-- FBR Pakistan Logo -->
  <g transform="translate(10, 5)">
    <!-- Emblem Circle -->
    <circle cx="30" cy="30" r="28" fill="#0A3B25" />
    <circle cx="30" cy="30" r="24" fill="none" stroke="#D4AF37" stroke-width="1.5" />
    <!-- Crescent & Star -->
    <path d="M 33 14 A 12 12 0 1 1 21 34 A 14 14 0 1 0 33 14 Z" fill="#D4AF37" />
    <polygon points="34,18 36,22 40,22 37,25 38,29 34,26 30,29 31,25 28,22 32,22" fill="#D4AF37" />
    <!-- Balance Scale Base -->
    <path d="M 22 38 L 38 38 M 30 32 L 30 44 M 20 44 L 40 44" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round" />
  </g>
  <!-- Text Block -->
  <text x="75" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#0A3B25" letter-spacing="1">FBR</text>
  <text x="75" y="48" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#111827" letter-spacing="0.5">FEDERAL BOARD OF REVENUE</text>
  <text x="75" y="58" font-family="Arial, sans-serif" font-weight="600" font-size="7.5" fill="#059669" letter-spacing="0.8">GOVERNMENT OF PAKISTAN</text>
</svg>''',

    'iam-usa.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="100%" height="100%">
  <!-- IAM USA Logo -->
  <g transform="translate(10, 5)">
    <!-- Globe Icon -->
    <circle cx="30" cy="30" r="26" fill="#1E3A8A" />
    <path d="M 12 30 A 18 18 0 0 0 48 30 A 18 18 0 0 0 12 30" fill="none" stroke="#60A5FA" stroke-width="1.5" />
    <ellipse cx="30" cy="30" rx="14" ry="26" fill="none" stroke="#93C5FD" stroke-width="1.5" />
    <ellipse cx="30" cy="30" rx="26" ry="14" fill="none" stroke="#93C5FD" stroke-width="1.5" />
    <polygon points="30,8 34,22 48,22 37,30 41,44 30,35 19,44 23,30 12,22 26,22" fill="#F59E0B" opacity="0.85" />
  </g>
  <text x="75" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#1E3A8A" letter-spacing="1">IAM</text>
  <text x="125" y="34" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#D97706">(USA)</text>
  <text x="75" y="49" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#3B82F6" letter-spacing="0.4">INTERNATIONAL ASSOCIATION</text>
  <text x="75" y="59" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#1E3A8A" letter-spacing="0.4">OF MOVERS</text>
</svg>''',

    'movers-poe.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="100%" height="100%">
  <!-- MOVERS P.O.E Logo -->
  <g transform="translate(10, 8)">
    <path d="M 5 12 L 28 2 L 51 12 L 51 38 L 28 48 L 5 38 Z" fill="#0F172A" stroke="#22D3EE" stroke-width="1.5" />
    <path d="M 28 2 L 28 48 M 5 12 L 51 38 M 51 12 L 5 38" stroke="#334155" stroke-width="1" />
    <circle cx="28" cy="24" r="10" fill="#0284C7" />
    <polygon points="28,16 31,22 37,24 31,26 28,32 25,26 19,24 25,22" fill="#FFFFFF" />
  </g>
  <text x="68" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#0F172A" letter-spacing="0.5">MOVERS P.O.E</text>
  <text x="68" y="48" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#0284C7" letter-spacing="1">PORT OF ENTRY NETWORK</text>
  <text x="68" y="58" font-family="Arial, sans-serif" font-weight="600" font-size="7.5" fill="#64748B" letter-spacing="0.5">REGISTERED INTERNATIONAL ALLIANCE</text>
</svg>''',

    'fidi.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="100%" height="100%">
  <!-- FIDI Global Alliance Logo -->
  <g transform="translate(10, 8)">
    <path d="M 8 8 L 44 8 C 48 8 48 24 44 24 L 20 24 L 20 44 L 8 44 Z" fill="#B91C1C" />
    <circle cx="36" cy="32" r="14" fill="none" stroke="#1E3A8A" stroke-width="3" />
    <path d="M 28 32 L 44 32 M 36 24 L 36 40" stroke="#1E3A8A" stroke-width="2" />
  </g>
  <text x="68" y="33" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#B91C1C" letter-spacing="2">FIDI</text>
  <text x="68" y="48" font-family="Arial, sans-serif" font-weight="800" font-size="9.5" fill="#1E3A8A" letter-spacing="1">GLOBAL ALLIANCE</text>
  <text x="68" y="58" font-family="Arial, sans-serif" font-weight="600" font-size="7.5" fill="#475569" letter-spacing="0.5">FAIM QUALITY CERTIFIED</text>
</svg>''',

    'cam.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="100%" height="100%">
  <!-- CAM Canadian Association of Movers Logo -->
  <g transform="translate(10, 6)">
    <circle cx="28" cy="28" r="25" fill="#DC2626" />
    <!-- Maple Leaf -->
    <path d="M 28 8 L 31 16 L 37 14 L 34 20 L 42 22 L 37 26 L 40 32 L 33 30 L 33 38 L 28 36 L 23 38 L 23 30 L 16 32 L 19 26 L 14 22 L 22 20 L 19 14 L 25 16 Z" fill="#FFFFFF" />
  </g>
  <text x="68" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#DC2626" letter-spacing="1">CAM</text>
  <text x="120" y="32" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#1E293B">(CANADA)</text>
  <text x="68" y="47" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#1E293B" letter-spacing="0.3">CANADIAN ASSOCIATION</text>
  <text x="68" y="57" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#DC2626" letter-spacing="0.3">OF MOVERS</text>
</svg>''',

    'ufone.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- Ufone 4G Logo -->
  <g transform="translate(10, 8)">
    <circle cx="22" cy="22" r="20" fill="#F97316" />
    <text x="22" y="29" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF" text-anchor="middle">u</text>
  </g>
  <text x="58" y="33" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#F97316" letter-spacing="-0.5">ufone</text>
  <text x="124" y="33" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#1E293B">4G</text>
</svg>''',

    'daraz.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- Daraz Logo -->
  <g transform="translate(8, 10)">
    <path d="M 0 6 L 16 0 L 32 6 L 32 30 L 16 36 L 0 30 Z" fill="#FF5722" />
    <path d="M 10 12 L 22 12 L 22 17 L 15 24 L 22 24 L 22 28 L 10 28 L 10 23 L 17 16 L 10 16 Z" fill="#FFFFFF" />
  </g>
  <text x="46" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#FF5722" letter-spacing="-0.5">daraz</text>
</svg>''',

    'faysal-bank.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="100%" height="100%">
  <!-- Faysal Bank Logo -->
  <g transform="translate(10, 10)">
    <rect x="0" y="0" width="36" height="36" rx="4" fill="#1E3A8A" />
    <path d="M 8 18 L 18 8 L 28 18 L 18 28 Z" fill="#F97316" />
    <circle cx="18" cy="18" r="4" fill="#FFFFFF" />
  </g>
  <text x="54" y="30" font-family="Arial, sans-serif" font-weight="900" font-size="17" fill="#1E3A8A">faysalbank</text>
</svg>''',

    'hbl.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- HBL Logo -->
  <g transform="translate(10, 8)">
    <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="#008269" />
    <text x="22" y="29" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">HBL</text>
  </g>
  <text x="58" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#008269" letter-spacing="1">HBL</text>
</svg>''',

    'puma.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- Puma Logo -->
  <g transform="translate(10, 12)">
    <path d="M 32 4 C 26 4 20 8 16 12 C 14 10 10 8 6 10 C 2 12 0 16 0 20 C 4 18 8 18 12 20 C 16 22 20 28 24 30 C 28 32 34 30 38 24 C 40 20 40 12 36 6 Z" fill="#0F172A" />
  </g>
  <text x="54" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#0F172A" letter-spacing="2">PUMA</text>
</svg>''',

    'ptn.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- PTN Logo -->
  <g transform="translate(10, 10)">
    <circle cx="20" cy="20" r="18" fill="#0284C7" />
    <polygon points="14,10 30,20 14,30" fill="#F59E0B" />
  </g>
  <text x="56" y="35" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#0284C7" letter-spacing="1">PTN</text>
</svg>''',

    'ptcl.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="100%" height="100%">
  <!-- PTCL Logo -->
  <g transform="translate(8, 10)">
    <path d="M 0 20 A 18 18 0 0 1 36 20 A 12 12 0 0 0 12 20" fill="#16A34A" />
    <path d="M 6 20 A 12 12 0 0 1 30 20 A 6 6 0 0 0 18 20" fill="#EA580C" />
  </g>
  <text x="50" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#16A34A" letter-spacing="-0.5">ptcl</text>
</svg>'''
}

for name, svg in logos.items():
    filepath = os.path.join('public/images/logos', name)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'Wrote {filepath}')
