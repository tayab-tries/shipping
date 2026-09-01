import os

os.makedirs('public/images/logos', exist_ok=True)

logos = {
    'fbr.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="100%" height="100%">
  <!-- FBR Pakistan Logo -->
  <g transform="translate(12, 10)">
    <circle cx="32" cy="32" r="30" fill="#0A3B25" />
    <circle cx="32" cy="32" r="26" fill="none" stroke="#EAB308" stroke-width="2" />
    <path d="M 35 14 A 14 14 0 1 1 22 36 A 16 16 0 1 0 35 14 Z" fill="#EAB308" />
    <polygon points="36,19 38,23 42,23 39,26 40,30 36,27 32,30 33,26 30,23 34,23" fill="#EAB308" />
    <path d="M 23 40 L 41 40 M 32 34 L 32 46 M 21 46 L 43 46" stroke="#EAB308" stroke-width="2" stroke-linecap="round" />
  </g>
  <text x="86" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#0A3B25" letter-spacing="1">FBR</text>
  <text x="86" y="55" font-family="Arial, sans-serif" font-weight="800" font-size="12" fill="#1E293B" letter-spacing="0.5">FEDERAL BOARD OF REVENUE</text>
  <text x="86" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#059669" letter-spacing="1">GOVERNMENT OF PAKISTAN</text>
</svg>''',

    'iam-usa.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="100%" height="100%">
  <!-- IAM USA Logo -->
  <g transform="translate(12, 10)">
    <circle cx="32" cy="32" r="30" fill="#1E3A8A" />
    <path d="M 10 32 A 22 22 0 0 0 54 32 A 22 22 0 0 0 10 32" fill="none" stroke="#60A5FA" stroke-width="2" />
    <ellipse cx="32" cy="32" rx="16" ry="30" fill="none" stroke="#93C5FD" stroke-width="1.8" />
    <ellipse cx="32" cy="32" rx="30" ry="16" fill="none" stroke="#93C5FD" stroke-width="1.8" />
    <polygon points="32,8 36,24 52,24 39,33 44,48 32,38 20,48 25,33 12,24 28,24" fill="#F59E0B" />
  </g>
  <text x="86" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#1E3A8A" letter-spacing="1">IAM</text>
  <text x="154" y="38" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#D97706">(USA)</text>
  <text x="86" y="56" font-family="Arial, sans-serif" font-weight="800" font-size="11.5" fill="#2563EB" letter-spacing="0.4">INTERNATIONAL ASSOCIATION</text>
  <text x="86" y="70" font-family="Arial, sans-serif" font-weight="800" font-size="11.5" fill="#1E3A8A" letter-spacing="0.4">OF MOVERS</text>
</svg>''',

    'movers-poe.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="100%" height="100%">
  <!-- MOVERS P.O.E Logo -->
  <g transform="translate(12, 10)">
    <path d="M 4 14 L 30 2 L 56 14 L 56 44 L 30 56 L 4 44 Z" fill="#0F172A" stroke="#0284C7" stroke-width="2" />
    <path d="M 30 2 L 30 56 M 4 14 L 56 44 M 56 14 L 4 44" stroke="#0284C7" stroke-width="1.2" opacity="0.6" />
    <circle cx="30" cy="28" r="12" fill="#0284C7" />
    <polygon points="30,18 33,25 40,28 33,31 30,38 27,31 20,28 27,25" fill="#FFFFFF" />
  </g>
  <text x="78" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#0F172A" letter-spacing="0.5">MOVERS P.O.E</text>
  <text x="78" y="55" font-family="Arial, sans-serif" font-weight="800" font-size="12" fill="#0284C7" letter-spacing="1">PORT OF ENTRY NETWORK</text>
  <text x="78" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#475569" letter-spacing="0.5">REGISTERED PORT ALLIANCE</text>
</svg>''',

    'fidi.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="100%" height="100%">
  <!-- FIDI Global Alliance Logo -->
  <g transform="translate(12, 12)">
    <path d="M 8 6 L 48 6 C 54 6 54 26 48 26 L 22 26 L 22 48 L 8 48 Z" fill="#DC2626" />
    <circle cx="40" cy="36" r="16" fill="none" stroke="#1E3A8A" stroke-width="3.5" />
    <path d="M 30 36 L 50 36 M 40 26 L 40 46" stroke="#1E3A8A" stroke-width="2.5" />
  </g>
  <text x="82" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#DC2626" letter-spacing="2">FIDI</text>
  <text x="82" y="56" font-family="Arial, sans-serif" font-weight="800" font-size="12.5" fill="#1E3A8A" letter-spacing="1">GLOBAL ALLIANCE</text>
  <text x="82" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#475569" letter-spacing="0.5">FAIM QUALITY CERTIFIED</text>
</svg>''',

    'cam.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 85" width="100%" height="100%">
  <!-- CAM Canadian Association of Movers Logo -->
  <g transform="translate(12, 10)">
    <circle cx="32" cy="32" r="30" fill="#DC2626" />
    <path d="M 32 8 L 36 18 L 43 15 L 39 23 L 49 25 L 43 30 L 47 37 L 38 34 L 38 44 L 32 41 L 26 44 L 26 34 L 17 37 L 21 30 L 15 25 L 25 23 L 21 15 L 28 18 Z" fill="#FFFFFF" />
  </g>
  <text x="86" y="37" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#DC2626" letter-spacing="1">CAM</text>
  <text x="160" y="37" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#1E293B">(CANADA)</text>
  <text x="86" y="55" font-family="Arial, sans-serif" font-weight="800" font-size="11.5" fill="#1E293B" letter-spacing="0.4">CANADIAN ASSOCIATION</text>
  <text x="86" y="69" font-family="Arial, sans-serif" font-weight="800" font-size="11.5" fill="#DC2626" letter-spacing="0.4">OF MOVERS</text>
</svg>''',

    'ufone.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 12)">
    <circle cx="25" cy="25" r="24" fill="#EA580C" />
    <text x="25" y="33" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">u</text>
  </g>
  <text x="72" y="40" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#EA580C" letter-spacing="-0.5">ufone</text>
  <text x="160" y="40" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#1E293B">4G</text>
</svg>''',

    'daraz.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 14)">
    <path d="M 0 7 L 18 0 L 36 7 L 36 34 L 18 41 L 0 34 Z" fill="#FF5722" />
    <path d="M 11 14 L 25 14 L 25 19 L 17 27 L 25 27 L 25 32 L 11 32 L 11 26 L 19 19 L 11 19 Z" fill="#FFFFFF" />
  </g>
  <text x="58" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#FF5722" letter-spacing="-0.5">daraz</text>
</svg>''',

    'faysal-bank.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 75" width="100%" height="100%">
  <g transform="translate(10, 14)">
    <rect x="0" y="0" width="44" height="44" rx="6" fill="#1E3A8A" />
    <path d="M 10 22 L 22 10 L 34 22 L 22 34 Z" fill="#EA580C" />
    <circle cx="22" cy="22" r="5" fill="#FFFFFF" />
  </g>
  <text x="68" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#1E3A8A">faysalbank</text>
</svg>''',

    'hbl.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 12)">
    <polygon points="25,2 48,14 48,36 25,48 2,36 2,14" fill="#008269" />
    <text x="25" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">HBL</text>
  </g>
  <text x="70" y="42" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#008269" letter-spacing="1.5">HBL</text>
</svg>''',

    'puma.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 16)">
    <path d="M 38 4 C 30 4 24 10 18 16 C 16 12 12 10 7 12 C 2 14 0 18 0 24 C 5 22 10 22 15 24 C 20 27 25 34 30 36 C 35 38 42 36 47 30 C 50 25 50 14 44 6 Z" fill="#0F172A" />
  </g>
  <text x="68" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#0F172A" letter-spacing="3">PUMA</text>
</svg>''',

    'ptn.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 14)">
    <circle cx="24" cy="24" r="22" fill="#0284C7" />
    <polygon points="16,12 36,24 16,36" fill="#F59E0B" />
  </g>
  <text x="68" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#0284C7" letter-spacing="1.5">PTN</text>
</svg>''',

    'ptcl.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 75" width="100%" height="100%">
  <g transform="translate(10, 14)">
    <path d="M 0 24 A 22 22 0 0 1 44 24 A 14 14 0 0 0 14 24" fill="#16A34A" />
    <path d="M 7 24 A 14 14 0 0 1 37 24 A 7 7 0 0 0 22 24" fill="#EA580C" />
  </g>
  <text x="62" y="42" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#16A34A" letter-spacing="-0.5">ptcl</text>
</svg>'''
}

for name, svg in logos.items():
    filepath = os.path.join('public/images/logos', name)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'Wrote {filepath}')
