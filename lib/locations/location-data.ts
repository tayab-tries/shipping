export interface LocationSection {
  title: string;
  content: string;
  list?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface CityLocationRecord {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  introduction: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  sections: LocationSection[];
  faqs: Array<{ question: string; answer: string }>;
}

export const CITY_LOCATIONS_DATA: CityLocationRecord[] = [
  // 1. LAHORE
  {
    id: 'lahore',
    name: 'Lahore',
    slug: 'lahore',
    province: 'Punjab',
    h1: 'International Cargo Services in Lahore (Doorstep Pickup & Air Freight)',
    seoTitle: 'Cargo Services in Lahore – Air Freight & Pickup | Raahi',
    seoDescription: 'Doorstep international cargo pickup across Lahore (DHA, Gulberg, Johar Town, Sundar). Direct air freight via Allama Iqbal Airport (LHE) and container shipping.',
    primaryKeyword: 'Cargo Services in Lahore',
    introduction:
      'Raahi International operates a premier international cargo gateway in Lahore, connecting Pakistan’s second-largest metropolitan center with major commercial and diaspora hubs worldwide. From daily linehaul air cargo departures via Allama Iqbal International Airport (LHE) to consolidated sea freight departing through Karachi Port, our Lahore operations provide seamless door-to-door logistics for commercial exporters, students, overseas families, and industrial manufacturers.',
    localCoverageText:
      'Comprehensive daily pickup across Gulberg (I, II, III), DHA (Phases 1-9 & DHA Rahbar), Johar Town (Phases 1 & 2), Bahria Town, Model Town, Cantt, Wapda Town, Garden Town, Faisal Town, Sundar Industrial Estate, and Quaid-e-Azam Industrial Estate (Kot Lakhpat).',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Allama Iqbal International Airport Air Cargo Complex & Gulberg Logistics Center, Lahore, Punjab 54000',
    sections: [
      {
        title: 'Allama Iqbal International Airport (LHE) Air Freight Hub & Linehaul Routes',
        content:
          'Our Lahore air cargo operations hub coordinates directly with the Allama Iqbal International Airport (LHE) Air Freight Unit (AFU) and bonded cargo terminals. We maintain scheduled allocations with premier international carriers including Emirates SkyCargo, Qatar Airways Cargo, Saudia Cargo, Turkish Cargo, and Pakistan International Airlines. Daily departure cutoffs at 16:00 PKT enable express consignments to clear evening customs inspection and board scheduled overnight linehauls, reaching Middle East gateways in 2–3 business days and UK or North American hubs within 4–6 business days.',
        list: [
          'Direct air cargo booking and space allocation on major international wide-body carriers',
          'Export customs clearance at Allama Iqbal Airport bonded air cargo sheds',
          'Volumetric weight optimization with computerized dimension scanning and repackaging',
          'Cold-chain and temperature-controlled storage options for delicate consignments',
        ],
        links: [
          { label: 'Air Cargo Services', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Calculate Freight Rates', href: '/quote?origin=lahore' },
        ],
      },
      {
        title: 'Comprehensive Doorstep Cargo Collection Across Lahore Metropolitan Zones',
        content:
          'Raahi International provides free doorstep collection across all residential, commercial, and educational districts in Lahore. Our dedicated fleet of secure cargo vehicles operates daily scheduled collection routes across DHA Phases 1 through 9, Gulberg commercial zones, Johar Town, Model Town, Bahria Town, and Cantt. Logistics personnel arrive equipped with certified electronic scales, tamper-evident security tape, heavy-duty 7-ply export cartons, and barcode tracking systems to ensure complete chain of custody.',
        list: [
          'Same-day and next-day scheduled pickup slots throughout Lahore metropolitan districts',
          'On-site weighing, volumetric measurement, and computerized consignment receipting',
          'Heavy-duty export corrugated packing, stretch-film wrapping, and strapping',
          'Fragile item handling for wedding apparel, chinaware, handicrafts, and electronic goods',
        ],
        links: [
          { label: 'Door-to-Door Delivery', href: '/cargo-services#door-to-door' },
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
        ],
      },
      {
        title: 'Industrial & Commercial Export Logistics: Sundar & Kot Lakhpat Estates',
        content:
          'Lahore is a bustling center for garment manufacturing, pharmaceutical production, light engineering, and consumer goods. We provide dedicated B2B logistics for factories and export facilities in Sundar Industrial Estate, Quaid-e-Azam Industrial Estate (Kot Lakhpat), and along Multan Road. Our commercial team assists corporate shippers with formal commercial invoice generation, packing lists, electronic WeBOC export declarations, and certificate of origin attestations from the Lahore Chamber of Commerce and Industry (LCCI).',
        list: [
          'Full-truckload (FTL) and less-than-truckload (LTL) factory floor pickup',
          'Heat-treated wooden palletization (ISPM-15 compliant) for international shipping compliance',
          'WeBOC customs export declaration and electronic Form E filing support',
          'Buyer sample dispatch via priority air express with guaranteed transit tracking',
        ],
        links: [
          { label: 'Commercial Cargo Services', href: '/services/commercial-cargo' },
          { label: 'Customs Documentation Guide', href: '/guides/export-customs-documentation-guide' },
        ],
      },
      {
        title: 'Multimodal Ocean Freight Consolidation via Mughalpura & Prem Nagar Dry Ports',
        content:
          'For heavy commercial consignments, machinery, and large household relocations, air freight can become cost-prohibitive. Raahi International offers consolidated less-than-container load (LCL) and full container load (FCL) sea freight originating from Lahore. Cargo is securely packed, customs-inspected, and loaded at Mughalpura Dry Port or Prem Nagar Dry Port before bonded railway and road transit to Karachi Port Trust (KPT) and Port Qasim for onward ocean vessel loading.',
        list: [
          'Weekly LCL consolidation boxes departing to UK, UAE, KSA, USA, and Canada',
          '20ft and 40ft High Cube (HC) container stuffing and drayage to maritime ports',
          'Bonded dry-port customs clearance eliminating multiple inspection delays',
          'Cost-effective ocean shipping rates for consignments exceeding 100 kg',
        ],
        links: [
          { label: 'Sea Cargo Services', href: '/cargo-services#part-2-sea-cargo' },
          { label: 'Air vs Sea Comparison', href: '/cargo-services#quick-comparison' },
        ],
      },
    ],
    faqs: [
      {
        question: 'How does doorstep cargo pickup work across Lahore neighborhoods like DHA and Gulberg?',
        answer:
          'You can book your pickup online or via WhatsApp. Our logistics driver arrives at your home, office, or warehouse in DHA, Gulberg, Johar Town, Model Town, or Bahria Town with certified electronic scales, packing cartons, and shipping paperwork. Once weighed and labeled, you receive an immediate digital receipt and tracking code.',
      },
      {
        question: 'What are the flight cutoffs and transit timelines for air cargo leaving Allama Iqbal International Airport (LHE)?',
        answer:
          'Standard air cargo handed over by 16:00 PKT at our Lahore hub completes customs clearance the same evening for departure on next-day flights. Express air delivery to UAE and Saudi Arabia takes 2–4 business days, while shipments to the UK, Canada, and USA take 4–7 business days door-to-door.',
      },
      {
        question: 'Can commercial factories in Sundar and Kot Lakhpat ship export pallets and machinery samples?',
        answer:
          'Yes. We provide scheduled factory floor collection, ISPM-15 heat-treated wooden palletization, shrink wrapping, and commercial export customs filing through WeBOC for industrial clients across Sundar, Kot Lakhpat, and Raiwind Road industrial estates.',
      },
      {
        question: 'What documentation is required for personal baggage and household goods departing Lahore?',
        answer:
          'Personal shipments require a clear copy of the sender’s valid CNIC or passport, the recipient’s complete international address and contact phone number, and an itemized packing list declaring carton contents. For UK relocations, we assist you with HMRC ToR1 reference filing.',
      },
    ],
  },

  // 2. KARACHI
  {
    id: 'karachi',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    h1: 'International Cargo Services in Karachi (Air Freight & Sea Port Shipping)',
    seoTitle: 'Cargo Services in Karachi – Air & Sea Freight | Raahi',
    seoDescription: 'Ocean container shipping via Karachi Port Trust (KPT) & Port Qasim, plus air freight via Jinnah International (KHI). Doorstep pickup in DHA, Clifton & SITE.',
    primaryKeyword: 'Cargo Services in Karachi',
    introduction:
      'As Pakistan’s primary maritime trade hub and financial center, Karachi serves as the epicentre of the nation’s international shipping operations. Raahi International coordinates full container load (FCL) and consolidated less-than-container load (LCL) ocean freight departing weekly from Karachi Port Trust (KPT) and Port Muhammad Bin Qasim (QICT), alongside rapid air cargo linehaul via Jinnah International Airport (KHI). Whether you are an industrial exporter in SITE or an overseas Pakistani in Clifton sending household baggage, we provide end-to-end freight handling.',
    localCoverageText:
      'Complete coverage across Clifton (Blocks 1-9), DHA (Phases 1-8), Korangi Industrial Area, SITE (Sindh Industrial Trading Estate), Landhi Industrial Area, Port Qasim Free Zone, Gulshan-e-Iqbal, PECHS, North Nazimabad, Federal B Area, and Malir Cantt.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    sections: [
      {
        title: 'Maritime Ocean Freight Operations via Karachi Port Trust (KPT) & Port Qasim',
        content:
          'Karachi handles the vast majority of Pakistan’s international ocean commerce through Karachi Port Trust (KPT—East and West Wharves) and Port Muhammad Bin Qasim (QICT). Raahi International books direct vessel slots with global container lines including Maersk, MSC, CMA CGM, Hapag-Lloyd, and COSCO. We operate dedicated container freight stations (CFS) for cargo consolidation, providing industrial exporters and individual shippers with weekly vessel sailings to the Middle East, Europe, and North America.',
        list: [
          'Weekly consolidated LCL sea cargo boxes for cost-effective overseas delivery',
          'Full container load (FCL) 20ft, 40ft, and 40ft High Cube positioning and drayage',
          'Direct terminal gate-in at KPT (SAPT, KICT, PICT) and Port Qasim (QICT)',
          'Complete marine transit insurance coverage options for high-value ocean freight',
        ],
        links: [
          { label: 'Sea Cargo Services', href: '/cargo-services#part-2-sea-cargo' },
          { label: 'Commercial Cargo Solutions', href: '/services/commercial-cargo' },
        ],
      },
      {
        title: 'Jinnah International Airport (KHI) Air Freight Terminal & Linehaul Rotations',
        content:
          'For urgent consignments, commercial samples, and high-value diaspora shipments, our air freight operations center at Jinnah International Airport (KHI) Air Freight Unit (AFU) provides rapid transit. Direct flights connect Karachi with Dubai (DXB), Doha (DOH), Riyadh (RUH), Jeddah (JED), London (LHR), and major European transit hubs daily. Our bonded export handling team clears shipments through Pakistan Customs air division with unmatched speed.',
        list: [
          'Daily wide-body freighter space allocations on Emirates, Qatar, Saudia, and Turkish airlines',
          '24/7 customs clearance capability at Jinnah Airport Air Freight Unit (AFU)',
          'Rapid 48-hour to 96-hour transit times for express shipments to Gulf and UK destinations',
          'Secure vault storage and handling for high-value commercial and personal goods',
        ],
        links: [
          { label: 'Air Freight Details', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Track Active Shipment', href: '/track' },
        ],
      },
      {
        title: 'Industrial Export Staging for Korangi, SITE & Landhi Manufacturing Zones',
        content:
          'Karachi’s manufacturing districts—including SITE, Korangi Industrial Area, Landhi, and the Federal B Area—manufacture textiles, leather apparel, chemicals, food commodities, and auto parts for global markets. Raahi International provides scheduled industrial truck dispatch, on-site container stuffing, and export crating tailored to factory premises. Our team handles WeBOC electronic filing, Form E banking approvals, and Karachi Chamber of Commerce and Industry (KCCI) documentation.',
        list: [
          'Factory-floor container stuffing and heavy-duty strapping under export supervision',
          'ISPM-15 certified heat-treated wooden box manufacturing and crating',
          'Full customs documentation handling including commercial invoices and packing lists',
          'Export tariff classification (HS code consultation) to minimize destination customs friction',
        ],
        links: [
          { label: 'Export Documentation Checklist', href: '/guides/export-customs-documentation-guide' },
          { label: 'Get Commercial Quote', href: '/quote?origin=karachi' },
        ],
      },
      {
        title: 'Door-to-Door Household Baggage & Excess Luggage for Karachi Families',
        content:
          'Thousands of families in Clifton, DHA, Gulshan-e-Iqbal, and North Nazimabad relocate or send household gifts, wedding trousseaus, and personal luggage to relatives overseas every month. Raahi International offers dedicated white-glove collection across Karachi, supplying double-walled corrugated export boxes, bubble wrap, and waterproof sealing to protect your belongings across long international journeys.',
        list: [
          'Doorstep pickup across all blocks of Clifton, DHA Phases 1–8, and PECHS',
          'Complimentary packaging kit including 7-ply cartons, bubble wrap, and shrink wrap',
          'Door-to-door delivery with destination customs clearance included in all major countries',
          'Transparent pricing per kilogram with zero hidden terminal handling surcharges',
        ],
        links: [
          { label: 'Excess Baggage Service', href: '/services/excess-baggage' },
          { label: 'Packaging Standards', href: '/guides/packing-cargo-guide' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the sailing frequency and transit difference between KPT and Port Qasim for sea cargo?',
        answer:
          'Vessels depart both Karachi Port Trust (KPT) and Port Qasim multiple times per week. Sea cargo to Dubai (Jebel Ali) takes approximately 4–6 days port-to-port, while shipments to UK ports (Felixstowe/Southampton) take 18–25 days, and North American East Coast ports take 28–35 days.',
      },
      {
        question: 'How do commercial exporters in SITE and Korangi manage bonded warehouse transfers to Jinnah Airport (KHI)?',
        answer:
          'Our bonded logistics vehicles pick up directly from your factory in SITE, Korangi, Landhi, or Port Qasim and transfer the goods straight into the Jinnah Airport AFU bonded shed under Customs seal, ensuring seamless export processing without multi-handling risks.',
      },
      {
        question: 'Do you provide on-site container stuffing and wooden crating for industrial exports in Karachi?',
        answer:
          'Yes. We provide certified ISPM-15 heat-treated wooden crating, palletization, and container stuffing at your factory floor or our Karachi consolidation warehouse, complete with heavy-duty lashing and container seal verification.',
      },
      {
        question: 'Can families in Clifton, DHA, and Gulshan send personal household effects door-to-door overseas?',
        answer:
          'Yes. We offer complete doorstep pickup across Clifton, DHA, Gulshan, and all Karachi neighborhoods. Our team packs your personal effects, clears Pakistan export customs, and delivers directly to the destination doorstep in the UK, USA, Canada, UAE, or Saudi Arabia.',
      },
    ],
  },

  // 3. ISLAMABAD
  {
    id: 'islamabad',
    name: 'Islamabad',
    slug: 'islamabad',
    province: 'Federal Capital',
    h1: 'International Cargo Services in Islamabad (Diplomatic & Air Freight)',
    seoTitle: 'Cargo Services in Islamabad – Air Freight | Raahi',
    seoDescription: 'International cargo from Islamabad: diplomatic shipments, personal effects and air freight via Islamabad Airport (ISB). Doorstep pickup in F & E sectors.',
    primaryKeyword: 'Cargo Services in Islamabad',
    introduction:
      'Serving the federal capital, diplomatic community, and international institutions, Raahi International provides specialized air freight and international logistics services from Islamabad. Operating directly through the modern air cargo terminal at Islamabad International Airport (ISB), we handle sensitive embassy consignments, high-value personal relocations, corporate relocations, and commercial parcels with absolute security, expedited customs clearance, and global door-to-door delivery.',
    localCoverageText:
      'Direct pickup across Diplomatic Enclave, Sectors F-6, F-7, F-8, F-10, F-11, Sectors E-7, E-11, G-Sectors (G-6 through G-14), I-Sectors (I-8, I-9 Industrial), Blue Area, Bahria Enclave, and DHA Islamabad.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Islamabad International Airport Cargo Terminal & Blue Area Operations Hub, Islamabad, 44000',
    sections: [
      {
        title: 'Islamabad International Airport (ISB) Cargo Infrastructure & Global Carrier Network',
        content:
          'Islamabad International Airport (ISB) houses Pakistan’s newest, most modern air cargo complex, equipped with automated high-bay racking, explosive trace detection (ETD) scanners, and dedicated customs inspection bays. Raahi International maintains priority cargo allocations with direct wide-body carriers including British Airways, Qatar Airways, Emirates, Saudia, Etihad, and Turkish Airlines. Shipments dispatched through our Islamabad terminal connect directly to London Heathrow, Manchester, Dubai, Jeddah, Riyadh, and North America without unnecessary domestic layovers.',
        list: [
          'State-of-the-art security screening and bonded warehousing at Islamabad Airport (ISB)',
          'Direct wide-body international flight connectivity to Europe, the Gulf, and North America',
          'Priority express boarding for time-critical documents, diplomatic pouches, and air parcels',
          'Real-time automated milestone tracking from airport scan to destination customs handover',
        ],
        links: [
          { label: 'Air Cargo Overview', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Calculate Instant Rates', href: '/quote?origin=islamabad' },
        ],
      },
      {
        title: 'Diplomatic Mission, Embassy & International Organization Shipment Protocols',
        content:
          'With our operational hub situated in the federal capital, Raahi International has extensive experience managing diplomatic cargo, official mission transfers, and NGO humanitarian shipments. We coordinate with the Ministry of Foreign Affairs (MOFA), foreign embassies in the Diplomatic Enclave, and international aid agencies to facilitate tax-exempt diplomatic clearances, official seal verifications, and secure air transit with complete chain of custody.',
        list: [
          'Diplomatic franchise exemption processing under MOFA protocol guidelines',
          'Tamper-evident sealing and dedicated chain-of-custody escorts for official cargo',
          'White-glove packing and specialized crating for fine art, antique carpets, and heirlooms',
          'International door-to-door relocation services for diplomats and international civil servants',
        ],
        links: [
          { label: 'Commercial Cargo Services', href: '/services/commercial-cargo' },
          { label: 'Customs & Documentation Guide', href: '/guides/export-customs-documentation-guide' },
        ],
      },
      {
        title: 'White-Glove Residential Pickup Across Diplomatic Enclave, F-Sectors & DHA',
        content:
          'Residents across Islamabad’s premier residential sectors demand meticulous care and punctuality. Our specialized logistics staff provides scheduled in-home packing and collection across sectors F-6, F-7, F-8, F-10, E-7, G-sectors, Blue Area, Bahria Enclave, and DHA Islamabad. We arrive with high-density packing supplies, multi-layer bubble wrap, edge protectors, and barcode labeling systems to safeguard your personal consignments.',
        list: [
          'In-home packing and professional itemization for personal and household effects',
          'Export-certified multi-wall cartons and reinforced garment boxes for formal apparel',
          'Scheduled appointment pickups with certified, background-checked logistics officers',
          'Coverage extending across Bahria Enclave, Park View City, and DHA Islamabad phases',
        ],
        links: [
          { label: 'Excess Baggage Shipping', href: '/services/excess-baggage' },
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
        ],
      },
      {
        title: 'Customs Valuation, Personal Effects Relief & Student Baggage Support',
        content:
          'Every year, hundreds of students and emigrants depart Islamabad for higher education and career opportunities in the UK, Canada, Australia, and the United States. Raahi International simplifies the customs clearance process by assisting clients with Transfer of Residence (ToR1 for UK), CBSA BSF186 (Canada), and CBP Form 3299 (USA) paperwork, guaranteeing full duty-free exemption on eligible used personal effects.',
        list: [
          'Student baggage discount tariffs with generous volumetric allowances',
          'HMRC ToR1, CBSA BSF186, and US Customs Form 3299 declaration assistance',
          'Transparent customs documentation verification before physical flight dispatch',
          'Comprehensive doorstep delivery across overseas university towns and cities',
        ],
        links: [
          { label: 'Shipping to UK', href: '/destinations/uk' },
          { label: 'Shipping to Canada', href: '/destinations/canada' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the clearance protocols for diplomatic cargo and embassy consignments in Islamabad?',
        answer:
          'Diplomatic shipments require a formal note verbale from the sending embassy or international organization, alongside an approved MOFA exemption certificate. Raahi International handles bonded transfer to Islamabad Airport (ISB) and secure loading under diplomatic seal without unauthorized inspection.',
      },
      {
        question: 'How are fragile personal effects, antiques, and luxury relocations handled from sectors F-6, F-7, and E-7?',
        answer:
          'We deploy trained packing specialists who use acid-free tissue wrap, multi-layer air bubble cushioning, reinforced edge guards, and custom wooden crating. All items are cataloged in an itemized packing inventory before transit.',
      },
      {
        question: 'What are the cargo processing cutoffs and security screening standards at Islamabad Airport (ISB)?',
        answer:
          'Cargo booked at our Islamabad hub by 15:00 PKT undergoes dual-view X-ray scanning, ETD screening, and customs examination the same evening, allowing departure on morning international wide-body flights.',
      },
      {
        question: 'Can overseas students and professionals ship excess baggage directly from Islamabad to the UK, Canada, or USA?',
        answer:
          'Yes. We offer dedicated student and personal baggage services from Islamabad with doorstep collection, free export cartons, and complete customs documentation for duty-free entry into the UK, Canada, USA, and Europe.',
      },
    ],
  },

  // 4. SIALKOT
  {
    id: 'sialkot',
    name: 'Sialkot',
    slug: 'sialkot',
    province: 'Punjab',
    h1: 'International Cargo Services in Sialkot (Export Freight & Parcel Cargo)',
    seoTitle: 'Cargo Services in Sialkot – Export Freight | Raahi',
    seoDescription: 'Export shipping for Sialkot manufacturers. Surgical instruments, sports goods and leatherware dispatched via Sialkot Airport (SKT) & Dry Port (SDPT).',
    primaryKeyword: 'Cargo Services in Sialkot',
    introduction:
      'Sialkot is Pakistan’s legendary export powerhouse, manufacturing world-class surgical instruments, FIFA-grade footballs, martial arts gear, and motorcycle leather apparel. Raahi International provides specialized export cargo logistics tailored specifically for Sialkot’s manufacturing and trading community. Dispatched directly through Sialkot International Airport (SKT)—the country’s first privately owned commercial airport—and Sialkot Dry Port Trust (SDPT) in Sambrial, we ensure your export goods reach global retail, medical, and wholesale markets on time.',
    localCoverageText:
      'Direct collection across Sialkot Cantt, Model Town, Daska Road, Ugoki, Hunterpura, Pasrur Road, Small Industrial Estates (1 & 2), and Sambrial Export Zone.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Sialkot International Airport Cargo Complex & Sambrial Dry Port Road, Sialkot, Punjab 51310',
    sections: [
      {
        title: 'Sialkot International Airport (SKT) & Sialkot Dry Port Trust (SDPT) Infrastructure',
        content:
          'Built directly by Sialkot’s visionary exporters, Sialkot International Airport (SKT) features a 3,600-meter runway capable of handling Boeing 777 and Airbus A330 freighters. Raahi International maintains direct cargo handling agreements with Gulf and European carriers operating out of SKT, including Qatar Airways Cargo, Emirates, Saudia, and flydubai. For sea freight, we coordinate bonded container stuffing through Sialkot Dry Port Trust (SDPT) at Sambrial for rapid rail and road drayage to Karachi seaports.',
        list: [
          'Direct air cargo linehaul from SKT without transshipping through other domestic airports',
          'Bonded export customs clearance at Sialkot International Airport cargo sheds',
          'Sialkot Dry Port Trust (SDPT) container freight station (CFS) stuffing and lashing',
          'Daily road feeder services connecting Daska, Wazirabad, and Sambrial export hubs',
        ],
        links: [
          { label: 'Air Freight Overview', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Get Export Quote', href: '/quote?origin=sialkot' },
        ],
      },
      {
        title: 'Specialized Export Shipping for Surgical Instruments & Medical Devices',
        content:
          'Sialkot produces over 70% of the world’s handheld surgical instruments. Exporting sensitive stainless steel instruments, dental tools, and electro-medical forceps requires meticulous moisture barrier protection, anti-tarnish packaging, and strict compliance with international medical device standards (FDA, CE mark, ISO 13485). Raahi International provides desiccant-packed, corrosion-resistant export packaging and rapid air express handling for medical buyers in Europe, the USA, and the Middle East.',
        list: [
          'Anti-corrosion vapor-phase inhibitor (VPI) packing and moisture-barrier sealing',
          'Assistance with FDA prior notice, CE compliance, and medical device classification',
          'Expedited air courier and air cargo options for hospital tenders and emergency orders',
          'Tamper-proof carton security sealing with serial-numbered security tape',
        ],
        links: [
          { label: 'Commercial Cargo Logistics', href: '/services/commercial-cargo' },
          { label: 'Export Compliance Guide', href: '/guides/export-customs-documentation-guide' },
        ],
      },
      {
        title: 'High-Volume Logistics for Sports Goods, Martial Arts Gear & Leatherware',
        content:
          'From thermally bonded match footballs to boxing gloves, martial arts uniforms, and motorcycle leather jackets, Sialkot’s sporting goods industry requires high-volume freight capacity with competitive volumetric weight ratios. We provide specialized compression packing and garment-on-hanger (GOH) options, ensuring that bulky leather apparel and sportswear consignments achieve maximum cost efficiency per cubic meter.',
        list: [
          'Volumetric compression packaging for boxing gloves, sportswear, and martial arts apparel',
          'Garment-on-Hanger (GOH) container options for high-value motorcycle leather jackets',
          'Scheduled ocean container consolidation (LCL) departing weekly to UK, EU, and USA ports',
          'Rapid air freight sample delivery for international sports brand buyers and distributors',
        ],
        links: [
          { label: 'Packaging & Crating Standards', href: '/guides/packing-cargo-guide' },
          { label: 'Sea Cargo Consolidation', href: '/cargo-services#part-2-sea-cargo' },
        ],
      },
      {
        title: 'Export Documentation, Chamber Attestation & Bonded Cargo Clearance',
        content:
          'Exporting from Sialkot requires coordination with the Sialkot Chamber of Commerce and Industry (SCCI), Pakistan Customs, and commercial banks for electronic Form E approval. Raahi International provides end-to-end documentation assistance, verifying commercial invoices, packing lists, Generalized System of Preferences (GSP) certificates, and customs HS code classifications to prevent border delays abroad.',
        list: [
          'Sialkot Chamber of Commerce (SCCI) certificate of origin attestation facilitation',
          'Electronic WeBOC export declaration filing and Customs examination supervision',
          'Commercial bank Form E reconciliation and export rebate documentation support',
          'Direct destination customs clearance in the UK, USA, UAE, and European Union',
        ],
        links: [
          { label: 'Customs Documentation Checklist', href: '/guides/export-customs-documentation-guide' },
          { label: 'Track Consignment', href: '/track' },
        ],
      },
    ],
    faqs: [
      {
        question: 'How do Sialkot surgical instrument manufacturers ensure temperature and sanitary compliance during export shipping?',
        answer:
          'We use specialized vapor-corrosion inhibitor (VPI) liners, desiccant pouches, and double-walled sealed cartons to prevent moisture ingress during flight transit. Shipments undergo priority air handling through SKT cargo terminal to ensure clinical cleanliness on arrival.',
      },
      {
        question: 'Can sports goods and leather garment exporters dispatch samples and commercial LCL shipments via Sialkot Dry Port (SDPT)?',
        answer:
          'Yes. We operate scheduled LCL collection across Sialkot factories, consolidating small commercial consignments and bulk containers at Sialkot Dry Port Trust (SDPT) in Sambrial for weekly ocean vessel sailings via Karachi Port.',
      },
      {
        question: 'What international air carriers lift cargo directly from Sialkot International Airport (SKT)?',
        answer:
          'International airlines including Qatar Airways, Emirates, Saudia, flydubai, and Air Arabia operate regular wide-body and narrow-body passenger and freighter flights from SKT, enabling direct transfer to global hubs without road transit to Lahore or Islamabad.',
      },
      {
        question: 'Does Raahi International provide export documentation, Form E assistance, and chamber certification in Sialkot?',
        answer:
          'Yes. Our Sialkot logistics team assists exporters with SCCI certificate of origin attestation, commercial invoice and packing list preparation, and electronic WeBOC export declaration filing.',
      },
    ],
  },

  // 5. RAWALPINDI
  {
    id: 'rawalpindi',
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    province: 'Punjab',
    h1: 'International Cargo Services in Rawalpindi (Air Freight & Family Parcels)',
    seoTitle: 'Cargo Services in Rawalpindi – Doorstep Pickup | Raahi',
    seoDescription: 'Doorstep international cargo pickup across Rawalpindi (Saddar, Raja Bazaar, Bahria Town, Chaklala). Direct air freight linehaul via twin-city airport routing.',
    primaryKeyword: 'Cargo Services in Rawalpindi',
    introduction:
      'Connecting the historic garrison city and major commercial wholesale markets of Rawalpindi with global destinations, Raahi International delivers reliable international air cargo and sea freight solutions. Leveraging our strategic proximity to Islamabad International Airport (ISB) and regional sorting hubs, we serve overseas diaspora families, wholesale traders in Raja Bazaar, and residents across Bahria Town and Satellite Town with convenient door-to-door collection, professional export packaging, and transparent tracking.',
    localCoverageText:
      'Comprehensive pickup across Saddar, Raja Bazaar, Murree Road, Commercial Market (Satellite Town), Chaklala Scheme (I, II, III), Westridge, Bahria Town Rawalpindi (Phases 1-8), DHA Rawalpindi, and Askari housing schemes.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Saddar Commercial Logistics Hub & Airport Road Dispatch Office, Rawalpindi, Punjab 46000',
    sections: [
      {
        title: 'Strategic Twin-Cities Logistics Routing via Islamabad International Airport (ISB)',
        content:
          'Rawalpindi sits at the geographic and logistical crossroads of Northern Pakistan. Our operations center provides direct routing via the high-speed Srinagar Highway and Motorway M-2 to the modern cargo terminal at Islamabad International Airport (ISB). Air cargo collected across Rawalpindi achieves same-day airport handover, boarding scheduled evening flights to London, Manchester, Dubai, Jeddah, Riyadh, and Toronto.',
        list: [
          'Direct airport transfer from Rawalpindi sorting hubs to Islamabad International Airport (ISB)',
          'Daily flight connections on major international passenger and dedicated cargo freighters',
          'Express 3-to-5 day door-to-door delivery timelines to UK and Gulf diaspora communities',
          'Computerized dimension scanning and barcode tracking from doorstep to final delivery',
        ],
        links: [
          { label: 'Air Freight Details', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Rate Calculator', href: '/quote?origin=rawalpindi' },
        ],
      },
      {
        title: 'Commercial Wholesale & Retail Cargo Dispatch from Saddar, Raja Bazaar & IJP Road',
        content:
          'Rawalpindi’s wholesale trading districts—including Raja Bazaar, Saddar, and the IJP Road industrial strip—supply clothing, traditional textiles, brass and copper handicrafts, auto parts, and spices across the globe. Raahi International provides commercial pickup services for wholesale traders and retailers, handling commercial invoice drafting, export customs clearance, and container shipping consolidation.',
        list: [
          'Wholesale cargo collection directly from Raja Bazaar, Saddar, and Murree Road shops',
          'Heavy-duty export boxing and strapping for commercial textiles and brassware',
          'WeBOC export documentation and commercial invoice drafting assistance',
          'Consolidated sea freight options for heavy wholesale goods exceeding 100 kg',
        ],
        links: [
          { label: 'Commercial Cargo Services', href: '/services/commercial-cargo' },
          { label: 'Customs Guide', href: '/guides/export-customs-documentation-guide' },
        ],
      },
      {
        title: 'Doorstep Collection Coverage Across Bahria Town Rawalpindi, Chaklala & Satellite Town',
        content:
          'Our pickup fleet operates scheduled daily rounds through Rawalpindi’s major residential neighborhoods. From the multi-phase developments of Bahria Town Rawalpindi and DHA to the established sectors of Chaklala Scheme, Satellite Town, and Westridge, our drivers bring certified electronic weighing scales, export packing cartons, and digital booking receipts directly to your doorstep.',
        list: [
          'Daily pickup routes covering all phases of Bahria Town Rawalpindi (Phases 1 through 8)',
          'Scheduled residential collection in Satellite Town, Chaklala Scheme, and Westridge',
          'Export-quality 7-ply corrugated boxes, bubble wrap, and waterproof outer film',
          'On-site weight and volume verification with instant digital consignment booking',
        ],
        links: [
          { label: 'Door-to-Door Delivery', href: '/cargo-services#door-to-door' },
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
        ],
      },
      {
        title: 'Diaspora Family Parcel Handling, Excess Baggage & International Customs Support',
        content:
          'A huge portion of Rawalpindi’s population has family residing in the UK (Birmingham, Bradford, Manchester, London), UAE, Saudi Arabia, and Canada. We specialize in shipping family parcels, wedding clothes, traditional homemade dry foods, and excess luggage. Our team ensures that your packages comply with destination customs rules, avoiding unexpected duties or import delays.',
        list: [
          'Economical excess baggage rates significantly cheaper than airline excess fees',
          'Assistance with UK HMRC ToR1 and Canadian CBSA BSF186 personal effects declarations',
          'Secure packaging for traditional embroidered clothing, sweets, and non-perishables',
          'Full destination door delivery with local courier dispatch in overseas cities',
        ],
        links: [
          { label: 'Excess Baggage Service', href: '/services/excess-baggage' },
          { label: 'Track Shipment', href: '/track' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I arrange doorstep pickup for family parcels and dry food gifts in Raja Bazaar and Saddar?',
        answer:
          'Yes. Our logistics vans operate daily throughout Raja Bazaar, Saddar, Murree Road, and Satellite Town. We collect your packages, verify the contents comply with airline and customs rules, and provide heavy-duty export packaging.',
      },
      {
        question: 'How are shipments from Bahria Town Rawalpindi and DHA Phase 1/2 routed to Islamabad Airport?',
        answer:
          'Cargo collected across Bahria Town Rawalpindi and DHA is brought to our regional transit station on Airport Road, processed, and transferred directly to the Islamabad International Airport (ISB) cargo terminal within hours of collection.',
      },
      {
        question: 'What packing standards are mandatory for fragile handicrafts, brass items, and wedding apparel sent overseas?',
        answer:
          'Fragile brassware and handicrafts require multi-layer bubble wrap, foam corner guards, and rigid double-walled cartons or wooden crates. Wedding dresses and delicate garments are packed in moisture-resistant liners with garment protective tissue.',
      },
      {
        question: 'How long does express air cargo take from Rawalpindi to London, Manchester, or Dubai?',
        answer:
          'Express air cargo dispatched from Rawalpindi arrives in Dubai in 2–3 business days, while delivery to London, Manchester, and Birmingham takes 3–5 business days, including destination customs clearance.',
      },
    ],
  },

  // 6. FAISALABAD
  {
    id: 'faisalabad',
    name: 'Faisalabad',
    slug: 'faisalabad',
    province: 'Punjab',
    h1: 'International Cargo Services in Faisalabad (Textile & Commercial Export Freight)',
    seoTitle: 'Cargo Services in Faisalabad – Textile Export | Raahi',
    seoDescription: 'Dedicated commercial cargo for Faisalabad textile mills and exporters. Air cargo via Faisalabad Airport (LYP) & ocean containers via Faisalabad Dry Port (FDPT).',
    primaryKeyword: 'Cargo Services in Faisalabad',
    introduction:
      'As the undisputed textile capital and industrial powerhouse of Pakistan, Faisalabad generates massive volumes of international freight across yarn, fabrics, home textiles, and garments. Raahi International provides specialized commercial freight logistics for textile mills, buying agencies, and export houses throughout Faisalabad. Dispatched via Faisalabad International Airport (LYP) for urgent air shipments and Faisalabad Dry Port Trust (FDPT) at Gatti for ocean container forwarding, we ensure seamless global delivery.',
    localCoverageText:
      'Pickup across D Ground, Peoples Colony (1 & 2), Madina Town, Kohinoor City, Millat Industrial Estate, Small Industrial Estate, Value Addition City (VAC Khurrianwala), Canal Road, and Samundri Road.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Faisalabad Dry Port Road & D Ground Commercial Logistics Center, Faisalabad, Punjab 38000',
    sections: [
      {
        title: 'Faisalabad Dry Port Trust (FDPT) & Faisalabad International Airport (LYP) Routing',
        content:
          'Faisalabad’s export volume moves through two premier trade gateways: Faisalabad International Airport (LYP) for priority air consignments and Faisalabad Dry Port Trust (FDPT) at Gatti for high-volume ocean container logistics. Raahi International coordinates bonded container stuffing and train drayage directly from FDPT to Karachi Port Trust (KPT) and Port Qasim. For air cargo, direct and connecting flights lift export garments and samples from LYP with connections to Dubai, Sharjah, and Gulf hubs.',
        list: [
          'Full container load (FCL) positioning and stuffing at Faisalabad Dry Port Trust (FDPT)',
          'Consolidated less-than-container load (LCL) services for smaller commercial fabric shipments',
          'Air cargo sample and priority freight dispatch via Faisalabad International Airport (LYP)',
          'Dedicated road feeder service to Lahore (LHE) and Islamabad (ISB) for heavy wide-body lifts',
        ],
        links: [
          { label: 'Sea Cargo Logistics', href: '/cargo-services#part-2-sea-cargo' },
          { label: 'Air Freight Overview', href: '/cargo-services#part-1-air-cargo' },
        ],
      },
      {
        title: 'Industrial Textile, Apparel & Home Linen Commercial Export Logistics',
        content:
          'Faisalabad supplies bed sheets, terry towels, denim, greige fabric, and readymade knitwear to global retail brands and institutional buyers across the USA, UK, Europe, and the Middle East. We provide tailored textile logistics, including roll-packing, compression baling, moisture-barrier wrapping, and palletization. Our export team coordinates laboratory testing sample deliveries, buyer swatches, and full commercial production consignments.',
        list: [
          'Specialized roll-packing, baling, and stretch-wrapping for commercial fabrics',
          'Palletization with plastic corner guards and heavy-duty strapping to prevent transit damage',
          'Express sample courier service delivering buyer swatches to UK and US brands in 72 hours',
          'Quality control inspection coordination at factory premises prior to container loading',
        ],
        links: [
          { label: 'Commercial Cargo Services', href: '/services/commercial-cargo' },
          { label: 'Packaging Standards', href: '/guides/packing-cargo-guide' },
        ],
      },
      {
        title: 'Direct Pickup Network Across Millat Estate, Value Addition City & D Ground',
        content:
          'Our industrial pickup teams operate daily across Faisalabad’s primary manufacturing and commercial zones. Whether picking up heavy pallets from Millat Industrial Estate, container loads from Value Addition City (VAC) on Khurrianwala Road, or commercial packages from the buying houses in D Ground and Peoples Colony, Raahi International ensures prompt collection, digital weighing, and secure documentation.',
        list: [
          'Scheduled factory pickups across Millat Industrial Estate and Small Industrial Estate',
          'Full-truckload (FTL) vehicle dispatch to Khurrianwala Road and Value Addition City',
          'Doorstep collection for commercial traders in D Ground, Peoples Colony, and Madina Town',
          'On-site electronic weight certification and shipping label generation',
        ],
        links: [
          { label: 'Commercial Export Solutions', href: '/services/commercial-cargo' },
          { label: 'Instant Quote', href: '/quote?origin=faisalabad' },
        ],
      },
      {
        title: 'Export Compliance, Textile Inspection Certificates & Ocean Freight Booking',
        content:
          'Navigating textile export regulations requires precise customs documentation. Our Faisalabad export team assists manufacturers with electronic WeBOC filing, Form E banking approvals, Faisalabad Chamber of Commerce and Industry (FCCI) certificates of origin, and international textile customs documentation (including US CBP Entry and UK EORI requirements).',
        list: [
          'FCCI certificate of origin attestation and commercial invoice verification',
          'WeBOC customs export declaration filing under bonded dry-port procedures',
          'Ocean bill of lading (BL) generation with direct carrier booking confirmation',
          'Full destination clearance support with leading customs brokers in Liverpool, Houston, and Dubai',
        ],
        links: [
          { label: 'Documentation Checklist', href: '/guides/export-customs-documentation-guide' },
          { label: 'Track Shipment', href: '/track' },
        ],
      },
    ],
    faqs: [
      {
        question: 'How do textile mills and buying houses in Faisalabad arrange commercial fabric roll and garment sample exports?',
        answer:
          'We provide daily pickup from mills across Millat Industrial Estate and Khurrianwala. Fabric rolls are sealed in heavy plastic sleeves and packed into cartons or pallets. Samples fly out via air cargo from LYP or LHE, reaching European and US buyers within 3–5 business days.',
      },
      {
        question: 'What is the operational schedule for container loading at Faisalabad Dry Port Trust (FDPT) connecting to Karachi ports?',
        answer:
          'Containers are stuffed at our FDPT station or your factory premises, cleared by Pakistan Customs at the dry port, and dispatched via dedicated bonded freight trains and trucks to Karachi Port Trust (KPT) and Port Qasim on scheduled weekly rotations.',
      },
      {
        question: 'Can home textile exporters in Khurrianwala schedule regular full-truckload (FTL) pickups for airport dispatch?',
        answer:
          'Yes. We operate dedicated FTL and container drayage trucks connecting Khurrianwala, Millat Estate, and Faisalabad industrial zones directly with airport cargo complexes in Faisalabad, Lahore, and Karachi.',
      },
      {
        question: 'What customs paperwork and WeBOC electronic filing is required for commercial textile exports from Faisalabad?',
        answer:
          'Commercial textile exports require an active WeBOC user ID, electronic Form E from your commercial bank, commercial invoice, itemized packing list, and an FCCI certificate of origin. Our customs team handles the entire electronic filing process.',
      },
    ],
  },

  // 7. MULTAN
  {
    id: 'multan',
    name: 'Multan',
    slug: 'multan',
    province: 'Punjab',
    h1: 'International Cargo Services in Multan (Agro-Export & Handcrafted Freight)',
    seoTitle: 'Cargo Services in Multan – Air & Sea Cargo | Raahi',
    seoDescription: 'International shipping across Multan & South Punjab. Temperature-controlled mango air freight, blue pottery crating, and air cargo via Multan Airport (MUX).',
    primaryKeyword: 'Cargo Services in Multan',
    introduction:
      'Representing the agricultural heartland and cultural heritage of South Punjab, Multan is internationally renowned for its sweet mango varieties, delicate blue pottery (Kashikari), Multani cotton, and hand-embroidered textiles. Raahi International delivers specialized international cargo services operating through Multan International Airport (MUX) cargo terminal and Multan Dry Port. We provide cold-chain solutions for seasonal fruit exporters, custom crating for artisanal pottery, and door-to-door excess baggage collection for overseas residents.',
    localCoverageText:
      'Coverage across Multan Cantt, Bosan Road, Gulgasht Colony, Shah Rukn-e-Alam Colony, Multan Industrial Estate (Phase 1 & 2), MDA Officers Colony, Old Shujabad Road, and Khanewal Road.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Multan International Airport Cargo Terminal & Bosan Road Logistics Center, Multan, Punjab 60000',
    sections: [
      {
        title: 'Multan International Airport (MUX) Cargo Terminal & Regional Gulf Corridors',
        content:
          'Multan International Airport (MUX) features an expanded international passenger and cargo terminal offering direct wide-body and narrow-body flights to the Middle East. Carriers including flydubai, Air Arabia, Saudia, Qatar Airways, and Gulf Air connect Multan directly with Dubai, Sharjah, Jeddah, Riyadh, and Doha. Raahi International coordinates priority air cargo space from MUX, ensuring that both commercial shipments and personal consignments depart South Punjab without domestic delays.',
        list: [
          'Direct international flight connections from Multan (MUX) to UAE, Saudi Arabia, and Qatar',
          'Fast-track export customs clearance at Multan Airport air cargo terminal',
          'Dedicated cold-storage and perishable cargo handling for agricultural exporters',
          'Direct road feeder connections linking Multan with Lahore (LHE) for European wide-body linehauls',
        ],
        links: [
          { label: 'Air Freight Services', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Instant Rate Quote', href: '/quote?origin=multan' },
        ],
      },
      {
        title: 'Temperature-Controlled Cold Chain Shipping for Multan Mangoes & Agro-Exports',
        content:
          'During the summer mango season (June to September), Multan produces the world’s finest Chaunsa, Anwar Ratol, and Sindhri varieties. Shipping perishable fruits to diaspora families and commercial markets in the UK, UAE, and Canada requires strict temperature management, rapid customs clearance, and phytosanitary certification. Raahi International provides pre-cooled packaging, insulated cargo liners, and priority air express bookings to ensure fruit arrives fresh within 48 to 72 hours.',
        list: [
          'Pre-cooled insulated export cartons with ventilation holes for fresh air circulation',
          'Coordination of Department of Plant Protection (DPP) phytosanitary inspection certificates',
          'Priority direct air cargo space on morning flights to Dubai, London, and Toronto',
          'Doorstep collection from mango orchards and packing facilities across Multan and Khanewal',
        ],
        links: [
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
          { label: 'Commercial Cargo', href: '/services/commercial-cargo' },
        ],
      },
      {
        title: 'Specialized Crating & Safe Transit for Multani Blue Pottery & Artisanal Crafts',
        content:
          'Multani blue pottery (Kashikari) is famous for its intricate cobalt blue patterns and delicate ceramic glaze. Shipping fragile vases, dinnerware, and tile murals overseas requires customized packaging to prevent breakage during transit. Raahi International manufactures custom-fitted wooden crates lined with high-density shock-absorbing foam, double-bubble cushioning, and moisture-resistant barrier film.',
        list: [
          'Custom-built ISPM-15 heat-treated wooden crates designed to exact ceramic dimensions',
          'Multi-layer bubble wrap, foam corner protectors, and corrugated interior partition cells',
          'Fragile cargo labeling and top-stow handling instructions throughout transit',
          'Comprehensive all-risk cargo insurance coverage available for high-value artisanal works',
        ],
        links: [
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
          { label: 'Excess Baggage Details', href: '/services/excess-baggage' },
        ],
      },
      {
        title: 'Doorstep Cargo Collection Across Gulgasht, Bosan Road & Multan Industrial Estate',
        content:
          'Our South Punjab logistics fleet provides convenient doorstep pickup across all residential and industrial sectors of Multan. From the commercial factories of Multan Industrial Estate on Vehari Road to residences in Gulgasht Colony, Bosan Road, Cantt, and Shah Rukn-e-Alam, our teams arrive with digital weighing scales and export packing cartons to handle your overseas shipments with care.',
        list: [
          'Daily pickup across Gulgasht Colony, Bosan Road, Multan Cantt, and MDA Officers Colony',
          'Commercial industrial collection in Multan Industrial Estate Phase 1 and Phase 2',
          'Export-quality 7-ply cartons, security strapping, and waterproof outer wrapping',
          'Instant digital receipting and real-time shipment milestone tracking',
        ],
        links: [
          { label: 'Door-to-Door Delivery', href: '/cargo-services#door-to-door' },
          { label: 'Track Consignment', href: '/track' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What temperature-controlled air freight solutions are available for Multani mangoes and perishable agro-exports?',
        answer:
          'During mango season, we provide insulated packaging with gel coolant packs, fast-track DPP phytosanitary inspection, and priority air space bookings out of MUX and LHE. Consignments arrive in the UK and UAE within 48 to 72 hours of harvest.',
      },
      {
        question: 'How is delicate Multani blue pottery packed and crated for overseas ocean and air transit?',
        answer:
          'Each ceramic piece is individually wrapped in multi-layer bubble wrap, placed in partitioned compartments, and enclosed in an ISPM-15 heat-treated wooden crate with shock-absorbing foam lining to eliminate movement and vibration during transit.',
      },
      {
        question: 'What international air cargo connections operate directly from Multan International Airport (MUX) to the Gulf?',
        answer:
          'Airlines including flydubai, Air Arabia, Saudia, and Qatar Airways operate direct flights from Multan to Dubai, Sharjah, Jeddah, and Doha, allowing quick transit to the Middle East and connections to Europe and North America.',
      },
      {
        question: 'Can overseas residents in Gulgasht Colony and Cantt send excess luggage and personal effects door-to-door?',
        answer:
          'Yes. We provide full doorstep collection across Gulgasht Colony, Cantt, Bosan Road, and surrounding Multan areas, supplying export cartons, handling export customs, and delivering to overseas doors in the UK, USA, Canada, UAE, and KSA.',
      },
    ],
  },

  // 8. PESHAWAR
  {
    id: 'peshawar',
    name: 'Peshawar',
    slug: 'peshawar',
    province: 'Khyber Pakhtunkhwa',
    h1: 'International Cargo Services in Peshawar (Air Freight & Regional Trade Gateway)',
    seoTitle: 'Cargo Services in Peshawar – Air Freight | Raahi',
    seoDescription: 'Export cargo and door-to-door shipping from Peshawar across Khyber Pakhtunkhwa. Air cargo via Bacha Khan Airport (PEW). Gemstones, carpets & personal parcels.',
    primaryKeyword: 'Cargo Services in Peshawar',
    introduction:
      'As the historic gateway to Khyber Pakhtunkhwa, Central Asia, and the northern trade corridors, Peshawar is a bustling commercial crossroads known for handwoven carpets, Swat gemstones, dried fruits, and high-volume diaspora connections in the Gulf. Raahi International operates direct international cargo services dispatched through Bacha Khan International Airport (PEW) cargo complex and Peshawar Dry Port. From secure transport of precious gems to doorstep pickup of family luggage in Hayatabad, we deliver dependable worldwide logistics.',
    localCoverageText:
      'Comprehensive pickup across Hayatabad (Phases 1-7), University Town, Peshawar Cantt, Warsak Road, Ring Road, Industrial Estate Hayatabad, Karkhano Market, and Dalazak Road.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Bacha Khan International Airport Cargo Complex & University Road Logistics Office, Peshawar, KP 25000',
    sections: [
      {
        title: 'Bacha Khan International Airport (PEW) Air Freight Gateway & Middle East Corridors',
        content:
          'Bacha Khan International Airport (PEW) serves as the primary aviation gateway for Khyber Pakhtunkhwa. Carriers such as Emirates, Qatar Airways, Saudia, Gulf Air, and Air Arabia operate direct wide-body and narrow-body flights connecting Peshawar with Dubai, Doha, Riyadh, Jeddah, and Sharjah. Raahi International manages scheduled air cargo bookings through the PEW cargo shed, providing fast security screening and customs examination for both commercial trade and personal parcels.',
        list: [
          'Direct international flight departures from Peshawar (PEW) to major Middle East aviation hubs',
          'Streamlined export customs clearance at Bacha Khan Airport air freight terminal',
          'Priority express courier and commercial air cargo services for regional businesses',
          'Overland bonded feeder transport connecting Peshawar with Islamabad Airport (ISB) for transatlantic wide-body flights',
        ],
        links: [
          { label: 'Air Cargo Overview', href: '/cargo-services#part-1-air-cargo' },
          { label: 'Calculate Instant Freight Rates', href: '/quote?origin=peshawar' },
        ],
      },
      {
        title: 'High-Value Gemstones, Handwoven Carpets & Specialty Commodity Logistics',
        content:
          'Peshawar is the premier trade center for precious gemstones (Swat emeralds, Panjshir tourmalines, lapis lazuli) and hand-knotted tribal and Persian-design wool carpets. Transporting high-value gems and delicate handwoven textiles requires specialized secure packaging, commercial valuation certification from the Trade Development Authority of Pakistan (TDAP), and all-risk international transit insurance. Raahi International provides armored courier handoff, tamper-evident security containers, and customs declaration assistance.',
        list: [
          'Secure tamper-evident packaging and armored handoff for certified precious gemstones',
          'Heavy-duty waterproof wrapping and roll crating for hand-knotted wool and silk carpets',
          'Coordination with TDAP and Gemstone Export Association for legal valuation certificates',
          'All-risk international marine and air transit insurance coverage options',
        ],
        links: [
          { label: 'Commercial Cargo Services', href: '/services/commercial-cargo' },
          { label: 'Customs & Documentation Guide', href: '/guides/export-customs-documentation-guide' },
        ],
      },
      {
        title: 'Doorstep Collection Coverage Across Hayatabad, University Town & Karkhano Markets',
        content:
          'Our Peshawar logistics team operates daily scheduled pickup vehicles across the city’s residential, commercial, and wholesale zones. We provide on-site weighing, volumetric measurement, and professional carton sealing across all 7 phases of Hayatabad, University Town, Peshawar Cantt, Warsak Road, and the thriving trade centers of Karkhano Market. Consignments are registered immediately with unique tracking barcodes for end-to-end visibility.',
        list: [
          'Door-to-door collection covering Hayatabad Phases 1 through 7 and University Town',
          'Wholesale cargo collection for merchants in Karkhano Market and Shaheen Bazaar',
          'Supplied with heavy-duty 7-ply export cartons, bubble wrap, and waterproof tape',
          'On-site electronic weighing and instant digital booking receipts',
        ],
        links: [
          { label: 'Door-to-Door Delivery', href: '/cargo-services#door-to-door' },
          { label: 'Packaging Guidelines', href: '/guides/packing-cargo-guide' },
        ],
      },
      {
        title: 'Khyber Pakhtunkhwa Export Clearance, Security Compliance & Customs Support',
        content:
          'Exporting from Khyber Pakhtunkhwa requires careful adherence to Pakistan Customs regulations, Anti-Narcotics Force (ANF) scanning, and aviation security compliance. Raahi International guides shippers through the entire legal export procedure, ensuring all items are properly declared, packed under supervision, and certified with necessary Sarhad Chamber of Commerce and Industry (SCCI) documentation.',
        list: [
          'Supervised ANF scanning and dual-view X-ray security clearance at airport terminal',
          'Sarhad Chamber of Commerce and Industry (SCCI) certificate of origin attestation',
          'WeBOC export filing for commercial goods and student/personal baggage declaration',
          'Direct destination delivery across UK, UAE, Saudi Arabia, USA, and Canada',
        ],
        links: [
          { label: 'Documentation Checklist', href: '/guides/export-customs-documentation-guide' },
          { label: 'Track Shipment', href: '/track' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the security scanning and clearance procedures for international cargo at Bacha Khan International Airport (PEW)?',
        answer:
          'Cargo departing PEW undergoes dual-view X-ray scanning, ANF sniffer dog inspection, and physical customs examination at the airport bonded terminal. Our team oversees the entire process to ensure that goods are cleared cleanly and packed securely.',
      },
      {
        question: 'Can merchants in Hayatabad and Karkhano ship commercial dry fruits, saffron, and traditional handicrafts overseas?',
        answer:
          'Yes. We regularly handle commercial dried fruits (walnuts, pine nuts/chilgoza, almonds), saffron, and handcrafted copperware. Items are packed in sealed food-grade liners and export cartons, complete with commercial invoices and phytosanitary certificates where required.',
      },
      {
        question: 'What is the process for shipping personal luggage and excess baggage from Peshawar to Saudi Arabia or the UAE?',
        answer:
          'We collect luggage directly from your home in Hayatabad, University Town, or Peshawar Cantt, supply protective cartons, weigh the items electronically, and clear Pakistan export customs. Shipments fly directly to Dubai, Jeddah, or Riyadh in 2–4 business days.',
      },
      {
        question: 'Does Raahi International offer doorstep packaging and wooden crating across Peshawar and nearby districts?',
        answer:
          'Yes. Our logistics crew brings export cartons, strapping tools, and bubble wrap directly to your premises. For heavy or fragile items like carpets and stone crafts, we provide custom wooden crating tailored to international shipping standards.',
      },
    ],
  },
];
