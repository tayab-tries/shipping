/**
 * Authoritative City-Level Logistics & Diaspora Cargo Profiles
 * Provides deep, localized operational data for 12 key global destination hubs
 * from Pakistan (UK, UAE, KSA, Canada, USA).
 */

export interface PortGateway {
  name: string;
  code?: string;
  type: 'air' | 'ocean' | 'inland';
  role: string;
  customsTerminal: string;
}

export interface DeliveryZone {
  zoneName: string;
  coverageAreas: string;
  postalOrZipCodes: string;
  dispatchSchedule: string;
}

export interface CommodityHandling {
  category: string;
  typicalItems: string;
  complianceRequirement: string;
}

export interface CityTransitTimeline {
  airExpress: string;
  airStandard: string;
  seaLcl: string;
  seaFcl: string;
  lastMileNotes: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityLogisticsProfile {
  countrySlug: string;
  citySlug: string;
  cityName: string;
  countryName: string;
  metroAreaName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  editorialOverview: string;
  gateways: PortGateway[];
  deliveryZones: DeliveryZone[];
  cargoTypes: CommodityHandling[];
  transitTimelines: CityTransitTimeline;
  faqs: CityFaq[];
  customsProcedures: {
    authority: string;
    clearanceDepot: string;
    dutyVatSummary: string;
  };
}

export const cityLogisticsProfiles: Record<string, CityLogisticsProfile> = {
  // =========================================================================
  // UNITED KINGDOM
  // =========================================================================
  'uk/london': {
    countrySlug: 'uk',
    citySlug: 'london',
    cityName: 'London',
    countryName: 'United Kingdom',
    metroAreaName: 'Greater London & Home Counties',
    h1: 'Cargo Shipping to London from Pakistan (Air & Sea Door Delivery)',
    metaTitle: 'Cargo to London from Pakistan | Air & Sea Freight Delivery | Raahi International',
    metaDescription: 'Reliable air and sea cargo from Pakistan to London. Doorstep delivery across all 32 London boroughs, LHR/LGW customs clearance, Heathrow cargo linehaul, and Tilbury sea freight.',
    editorialOverview:
      'Shipping commercial goods and personal diaspora consignments to London requires navigating one of the most sophisticated logistics corridors in Western Europe. Raahi International coordinates air shipments originating in Lahore, Karachi, Islamabad, and Sialkot through direct and connecting freighters landing at London Heathrow (LHR) and London Gatwick (LGW). For ocean consignments, containers dock at the deep-water London Gateway (DP World) on the Thames Estuary or the Port of Tilbury, transitioning through bonded customs warehouses before scheduled final-mile delivery across Greater London within the M25 ring and surrounding Home Counties.',
    gateways: [
      {
        name: 'London Heathrow Airport (LHR)',
        code: 'LHR',
        type: 'air',
        role: 'Primary commercial and express air freight gateway with daily passenger and dedicated cargo arrivals from Pakistan.',
        customsTerminal: 'HMRC Bonded Cargo Sheds at Dnata City and Worldwide Flight Services (WFS) Heathrow South.',
      },
      {
        name: 'London Gatwick Airport (LGW)',
        code: 'LGW',
        type: 'air',
        role: 'Secondary air freight entry point handling scheduled overflow and South London express cargo.',
        customsTerminal: 'Gatwick Cargo Centre customs examination facility.',
      },
      {
        name: 'London Gateway & Port of Tilbury',
        code: 'GBTHP / GBTIL',
        type: 'ocean',
        role: 'Deep-water container terminals handling full container loads (FCL) and consolidated less-than-container (LCL) shipments via direct Red Sea / European shipping rotations.',
        customsTerminal: 'DP World London Gateway Logistics Park and Tilbury Inland Container Depot (ICD).',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Central & Inner London',
        coverageAreas: 'City of London, Westminster, Camden, Islington, Southwark, Tower Hamlets, Hackney',
        postalOrZipCodes: 'EC1–EC4, WC1–WC2, E1–E3, N1, SE1, SW1, W1',
        dispatchSchedule: 'Daily weekday distribution with dedicated ULEZ/Congestion-compliant fleet',
      },
      {
        zoneName: 'West London Diaspora Belt',
        coverageAreas: 'Southall, Hounslow, Hayes, Uxbridge, Wembley, Ealing, Slough',
        postalOrZipCodes: 'UB1–UB10, TW3–TW5, HA0, HA9, SL1–SL3',
        dispatchSchedule: 'Twice-daily linehaul dispatches directly from LHR Bonded Depot',
      },
      {
        zoneName: 'East & North-East London Hubs',
        coverageAreas: 'Ilford, Barking, Romford, Walthamstow, Stratford, East Ham',
        postalOrZipCodes: 'IG1–IG6, RM1, E6, E7, E15, E17',
        dispatchSchedule: 'Daily scheduled afternoon drop-offs for retail boutiques and residences',
      },
      {
        zoneName: 'South & South-West London Suburbs',
        coverageAreas: 'Croydon, Mitcham, Tooting, Wimbledon, Kingston, Richmond',
        postalOrZipCodes: 'CR0, CR4, SW17, SW19, KT1, TW9',
        dispatchSchedule: 'Daily scheduled morning dispatches via South Circular route',
      },
    ],
    cargoTypes: [
      {
        category: 'Textiles, Lawn & Ethnic Boutiques',
        typicalItems: 'Stitched lawn suits, bridal wear, designer fabrics, bed linen, and leather outerwear',
        complianceRequirement: 'Requires commercial invoice, EORI registration, and UK commodity code classification for preferential tariff treatment.',
      },
      {
        category: 'Medical, Surgical & Dental Instruments',
        typicalItems: 'Precision stainless steel forceps, scissors, scalpels, and dental tools originating from Sialkot manufacturing hubs',
        complianceRequirement: 'MHRA regulatory documentation, CE/UKCA marking declarations, and packing list verification.',
      },
      {
        category: 'Diaspora Family Effects & Relocation Luggage',
        typicalItems: 'Excess baggage, traditional kitchenware, dry spices, cultural books, and personal household items',
        complianceRequirement: 'HMRC Transfer of Residence (ToR01) relief documentation or standard declaration with proof of purchase.',
      },
      {
        category: 'Commercial Sports Gear & Hardware',
        typicalItems: 'Cricket bats, footballs, boxing equipment, and gym wear for sporting goods importers',
        complianceRequirement: 'Standard commercial entry with certificate of origin from Sialkot Chamber of Commerce.',
      },
    ],
    transitTimelines: {
      airExpress: '3 to 5 business days airport-to-door from Lahore (LHE), Karachi (KHI), or Islamabad (ISB)',
      airStandard: '5 to 7 business days door-to-door including bonded customs clearance at Heathrow',
      seaLcl: '22 to 26 days ocean transit + 3 business days deconsolidation at Tilbury/London Gateway',
      seaFcl: '20 to 24 days direct sailing Karachi to London Gateway + 2 days customs release',
      lastMileNotes: 'All London urban deliveries are handled by tail-lift vehicles capable of accessing residential streets within the M25 without congestion delays.',
    },
    faqs: [
      {
        question: 'How quickly does air cargo from Pakistan clear customs at London Heathrow (LHR)?',
        answer: 'Pre-lodged commercial and personal consignments clearing through HMRC’s Customs Declaration Service (CDS) typically receive customs release within 12 to 24 hours of flight landing at Heathrow. Once discharged from the airline bonded sheds (Dnata City or WFS), our linehaul vehicles transfer the goods for same-day or next-morning doorstep delivery across London.',
      },
      {
        question: 'Do you deliver directly to commercial garment boutiques in Southall and Ilford?',
        answer: 'Yes. Southall (The Broadway) and Ilford (Cranbrook Road) are core daily distribution routes for Raahi International. We frequently transport commercial fabric rolls, seasonal designer lawn shipments, and bridal collections directly to boutique storefronts and local storage facilities, with full unloading support.',
      },
      {
        question: 'How do you handle London Ultra Low Emission Zone (ULEZ) and Congestion Charge logistics?',
        answer: 'Our final-mile logistics fleet operates Euro 6 compliant and electric delivery vans registered for continuous central London access. Surcharges for Congestion Charge or ULEZ zones are absorbed directly into our transparent door-to-door shipping quotations so recipients never face surprise charges upon delivery.',
      },
    ],
    customsProcedures: {
      authority: 'HM Revenue & Customs (HMRC)',
      clearanceDepot: 'Heathrow International Cargo Centre (HICC) & Barking Inland Rail Depot',
      dutyVatSummary: 'Commercial goods incur standard UK VAT (20%) plus applicable UK Global Tariff duty unless covered by origin tariff reductions. Personal relocations qualify for zero VAT under ToR01 relief.',
    },
  },

  'uk/manchester': {
    countrySlug: 'uk',
    citySlug: 'manchester',
    cityName: 'Manchester',
    countryName: 'United Kingdom',
    metroAreaName: 'Greater Manchester & Lancashire',
    h1: 'Cargo Shipping to Manchester from Pakistan (Air Freight & Sea Cargo)',
    metaTitle: 'Cargo to Manchester from Pakistan | Air & Ocean Doorstep Delivery | Raahi International',
    metaDescription: 'Fast, secure cargo from Pakistan to Greater Manchester. Serving Cheetham Hill, Rusholme, Oldham, Rochdale, and Bolton via Manchester Airport (MAN) and Liverpool port container lines.',
    editorialOverview:
      'Manchester is the industrial and wholesale commercial engine of northern England, serving as the primary distribution hub for the extensive Pakistani diaspora in Lancashire and Yorkshire. Raahi International routes air freight directly into Manchester Airport World Freight Terminal (MAN) or through bonded M6 road feeder links from London airports. For ocean cargo originating at Karachi port, containers discharge at the nearby Port of Liverpool (Seaforth Container Terminal) or transfer via dedicated rail freight lines directly into the Trafford Park Euroterminal for rapid regional de-stuffing and pallet delivery.',
    gateways: [
      {
        name: 'Manchester Airport World Freight Terminal (MAN)',
        code: 'MAN',
        type: 'air',
        role: 'Northern England’s premier air logistics center with direct Middle Eastern carrier connections from Pakistan (Emirates, Qatar Airways, Saudia).',
        customsTerminal: 'Swissport Cargo Centre and AviaPartner Bonded Facilities, Ringway.',
      },
      {
        name: 'Port of Liverpool (Seaforth Container Terminal)',
        code: 'GBLIV',
        type: 'ocean',
        role: 'Deep-sea Liverpool2 terminal providing direct northern ocean access without long southern road haulage.',
        customsTerminal: 'Peel Ports Seaforth Container Terminal Customs Examination Facility.',
      },
      {
        name: 'Trafford Park Euroterminal Freight Depot',
        code: 'GBTRP',
        type: 'inland',
        role: 'Major intermodal rail container depot connecting southern UK ports directly to central Manchester.',
        customsTerminal: 'Freightliner Trafford Park Bonded Logistics Terminal.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Central Manchester & Curry Mile',
        coverageAreas: 'Manchester City Centre, Rusholme, Longsight, Levenshulme, Fallowfield, Moss Side',
        postalOrZipCodes: 'M1–M4, M13, M14, M19',
        dispatchSchedule: 'Twice-daily dispatches Monday through Saturday',
      },
      {
        zoneName: 'Cheetham Hill Wholesale District',
        coverageAreas: 'Cheetham Hill, Strangeways, Broughton, Collyhurst',
        postalOrZipCodes: 'M8, M7, M4',
        dispatchSchedule: 'Priority morning delivery scheduled for textile and fashion wholesale trade',
      },
      {
        zoneName: 'Greater Manchester North & East',
        coverageAreas: 'Oldham, Rochdale, Bury, Ashton-under-Lyne, Chadderton',
        postalOrZipCodes: 'OL1–OL9, OL11–OL16, BL9, OL6',
        dispatchSchedule: 'Daily morning and afternoon linehaul delivery runs',
      },
      {
        zoneName: 'Greater Manchester West & South',
        coverageAreas: 'Bolton, Stockport, Salford, Trafford, Altrincham, Cheadle',
        postalOrZipCodes: 'BL1–BL3, SK1–SK8, M5, M17, WA14',
        dispatchSchedule: 'Daily commercial route servicing Trafford Park and residential suburbs',
      },
    ],
    cargoTypes: [
      {
        category: 'Textile Wholesale & Raw Bedding',
        typicalItems: 'Woven cotton fabrics, bed sets, towels, curtains, and denim bolts destined for Cheetham Hill traders',
        complianceRequirement: 'Commercial invoice detailing fabric composition, GSM weight, and importer EORI number.',
      },
      {
        category: 'Sporting Goods & Fitness Gear',
        typicalItems: 'Boxing gloves, martial arts uniforms, footballs, and tracksuits from Sialkot factories',
        complianceRequirement: 'Clear product labeling, packing slips, and customs duty commodity code classification.',
      },
      {
        category: 'Handmade Furniture & Artisanal Decor',
        typicalItems: 'Sheesham wood dining sets, carved mirror frames, and brass handicrafts from Chiniot and Gujrat',
        complianceRequirement: 'ISPM 15 certified timber fumigation stamp and phytosanitary clearance verification.',
      },
      {
        category: 'Diaspora Luggage & Student Baggage',
        typicalItems: 'Personal clothing, books, academic materials, and non-perishable regional food products',
        complianceRequirement: 'Itemized packing list with passport copy and UK student/residence visa validation.',
      },
    ],
    transitTimelines: {
      airExpress: '3 to 5 business days door-to-door directly into Manchester Airport',
      airStandard: '5 to 7 business days door-to-door via bonded Manchester cargo handling',
      seaLcl: '24 to 28 days ocean transit + 2 days deconsolidation at Liverpool Seaforth or Trafford Park',
      seaFcl: '22 to 26 days direct Karachi to Liverpool ocean sailing + 2 days gate release',
      lastMileNotes: 'All Northern England deliveries benefit from our local Manchester staging depot, avoiding delays caused by southern motorway congestion.',
    },
    faqs: [
      {
        question: 'Do you deliver bulk commercial consignments directly to Cheetham Hill, Manchester?',
        answer: 'Yes. Cheetham Hill is northern England’s largest wholesale fashion and textile cluster. We operate dedicated commercial morning deliveries directly to trade warehouses, lockups, and wholesale showrooms along Cheetham Hill Road, Derby Street, and Broughton Street.',
      },
      {
        question: 'Can cargo arriving at Manchester Airport World Freight Terminal be collected in person?',
        answer: 'Yes. If you prefer to handle your own transport, we can clear customs on your behalf and authorize direct collection from our bonded handling agent at Manchester Airport World Freight Terminal (Building 305). However, our standard door-to-door service includes local delivery without extra collection fees.',
      },
      {
        question: 'How do you handle sea cargo deliveries to Oldham, Rochdale, and Bolton?',
        answer: 'Ocean containers arriving via the Port of Liverpool or rail freight into Trafford Park are destuffed and sorted at our Greater Manchester consolidation facility. Individual commercial pallets and residential crates are then dispatched using tail-lift trucks equipped for residential access in hilly Pennine towns.',
      },
    ],
    customsProcedures: {
      authority: 'HM Revenue & Customs (HMRC)',
      clearanceDepot: 'Manchester Airport International Cargo Transit Shed & Trafford Park ICD',
      dutyVatSummary: 'Standard commercial imports require an active UK EORI number. HMRC declarations are processed electronically before vehicle release from airport or port bounds.',
    },
  },

  'uk/birmingham': {
    countrySlug: 'uk',
    citySlug: 'birmingham',
    cityName: 'Birmingham',
    countryName: 'United Kingdom',
    metroAreaName: 'West Midlands Conurbation',
    h1: 'Cargo Shipping to Birmingham from Pakistan (Air Freight & Doorstep Delivery)',
    metaTitle: 'Cargo to Birmingham from Pakistan | West Midlands Air & Sea Delivery | Raahi International',
    metaDescription: 'Direct cargo services from Pakistan to Birmingham and the Black Country. Serving Sparkbrook, Alum Rock, Handsworth, Dudley, and Walsall via BHX and regional freight depots.',
    editorialOverview:
      'As the UK’s second-largest city and the beating heart of the West Midlands, Birmingham hosts one of Europe’s most vibrant and deep-rooted Pakistani communities. Raahi International operates high-frequency air cargo routes into Birmingham Airport (BHX) Elmdon Terminal, backed by bonded feeder trucks running hourly up the M40 corridor from London Heathrow. For sea freight, shipping containers arriving from Karachi at southern ocean ports are routed through inland container rail hubs at Landor Street and Hams Hall, ensuring prompt commercial container unloading and residential doorstep distribution across Birmingham and the wider Black Country.',
    gateways: [
      {
        name: 'Birmingham Airport Cargo Terminal (BHX)',
        code: 'BHX',
        type: 'air',
        role: 'West Midlands regional air cargo center handling scheduled freighters and passenger carrier belly cargo.',
        customsTerminal: 'BHX Elmdon Freight Terminal and Dnata West Midlands Cargo Facility.',
      },
      {
        name: 'Hams Hall Rail Freight Terminal',
        code: 'GBHHL',
        type: 'inland',
        role: 'Key rail container exchange hub connecting deep-sea container lines from Southampton and Felixstowe directly into Birmingham.',
        customsTerminal: 'Hams Hall Inland Customs Clearance Depot (Coleshill).',
      },
      {
        name: 'Birmingham Landor Street Rail Terminal',
        code: 'GBLND',
        type: 'inland',
        role: 'Central Birmingham freight rail depot servicing downtown commercial stockists and industrial consignees.',
        customsTerminal: 'Freightliner Birmingham Landor Street Bonded Container Depot.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Birmingham Inner City Diaspora Corridors',
        coverageAreas: 'Sparkbrook, Sparkhill, Small Heath, Alum Rock, Saltley, Balsall Heath',
        postalOrZipCodes: 'B11, B12, B10, B8, B9',
        dispatchSchedule: 'Twice-daily dispatches Monday through Saturday',
      },
      {
        zoneName: 'North & West Birmingham Residential',
        coverageAreas: 'Handsworth, Aston, Lozells, Perry Barr, Erdington, Sutton Coldfield',
        postalOrZipCodes: 'B21, B6, B19, B20, B23, B72–B76',
        dispatchSchedule: 'Daily morning and afternoon scheduled delivery routes',
      },
      {
        zoneName: 'The Black Country Industrial & Commercial',
        coverageAreas: 'Dudley, Wolverhampton, Walsall, West Bromwich, Smethwick, Stourbridge',
        postalOrZipCodes: 'DY1–DY5, WV1–WV10, WS1–WS5, B70, B66',
        dispatchSchedule: 'Daily commercial pallet and parcel linehaul runs',
      },
      {
        zoneName: 'South Midlands & Solihull',
        coverageAreas: 'Solihull, Hall Green, Kings Heath, Shirley, Coventry',
        postalOrZipCodes: 'B90–B93, B28, B14, CV1–CV6',
        dispatchSchedule: 'Daily scheduled afternoon dispatches',
      },
    ],
    cargoTypes: [
      {
        category: 'Bridal, Festive & Haute Couture Wear',
        typicalItems: 'Hand-embroidered bridal lehengas, sherwanis, party wear, and formal jewelry boxes destined for Ladypool Road boutiques',
        complianceRequirement: 'Requires detailed commercial packing list, accurate tariff valuation, and textile fiber disclosures.',
      },
      {
        category: 'Engineering Components & Brass Hardware',
        typicalItems: 'Industrial brass valves, plumbing fittings, auto spares, and cast metal parts from Gujranwala',
        complianceRequirement: 'Commercial invoice, certificate of origin, and compliance with UK REACH regulations where applicable.',
      },
      {
        category: 'Traditional Sweets, Dry Provisions & Spices',
        typicalItems: 'Sealed dry fruits, basmati rice, herbal items, tea, and packaged confectionery',
        complianceRequirement: 'HMRC & UK Port Health compliance; products must be shelf-stable, commercially labeled, and contain no prohibited dairy/meat elements.',
      },
      {
        category: 'Household Relocations & Student Personal Items',
        typicalItems: 'Bedding, study materials, winter clothing, religious literature, and kitchen utensils',
        complianceRequirement: 'Personal declaration form and copy of recipient photo ID/passport.',
      },
    ],
    transitTimelines: {
      airExpress: '3 to 5 business days airport-to-door via BHX or bonded Heathrow linehaul',
      airStandard: '5 to 7 business days door-to-door with complete customs clearance',
      seaLcl: '24 to 28 days ocean transit + 3 business days deconsolidation at Hams Hall',
      seaFcl: '22 to 26 days ocean voyage + 2 days customs clearance and side-loader container drop',
      lastMileNotes: 'Residential streets in Sparkbrook and Alum Rock often have tight parking; our drivers utilize specialized narrow-access tail-lift vehicles.',
    },
    faqs: [
      {
        question: 'Do you deliver directly to shops along Ladypool Road and Stratford Road in Birmingham?',
        answer: 'Yes. The Balti Triangle and Stratford Road commercial shopping areas are daily scheduled delivery routes for Raahi International. We deliver high-value formal wear, retail cartons, and promotional materials straight into retail backrooms with zero curbside abandonment.',
      },
      {
        question: 'Are customs clearances processed in Birmingham or at the port of arrival?',
        answer: 'Air cargo is electronically cleared either at London Heathrow prior to transit on bonded trucks or directly at Birmingham Airport’s Elmdon cargo terminal. Sea freight is cleared through HMRC customs declarations at the marine port of entry before moving by rail into Hams Hall or Landor Street.',
      },
      {
        question: 'Can commercial factories in Dudley and Wolverhampton receive full container loads (FCL)?',
        answer: 'Yes. For industrial importers in the Black Country, we provide direct container haulage using skeletal trailers or side-loaders directly from UK container ports to your factory dock, including chassis stay-time for unhurried de-stuffing.',
      },
    ],
    customsProcedures: {
      authority: 'HM Revenue & Customs (HMRC)',
      clearanceDepot: 'BHX Cargo Terminal & Hams Hall Inland Customs Depot',
      dutyVatSummary: 'Commercial shipments require UK VAT payment and import tariffs per the UK Integrated Online Tariff database. Duty and VAT charges can be prepaid by sender or invoiced to consignee.',
    },
  },

  // =========================================================================
  // UNITED ARAB EMIRATES
  // =========================================================================
  'uae/dubai': {
    countrySlug: 'uae',
    citySlug: 'dubai',
    cityName: 'Dubai',
    countryName: 'United Arab Emirates',
    metroAreaName: 'Emirate of Dubai',
    h1: 'Cargo Shipping to Dubai from Pakistan (Air Express & Jebel Ali Sea Cargo)',
    metaTitle: 'Cargo to Dubai from Pakistan | Express Air & Ocean Doorstep Delivery | Raahi International',
    metaDescription: 'Ultra-fast cargo from Pakistan to Dubai. Direct daily air cargo via DXB/DWC and ocean container services via Jebel Ali Port. Doorstep delivery across Deira, Bur Dubai, and JLT.',
    editorialOverview:
      'With over 1.5 million Pakistani residents across the UAE and a thriving bilateral trade corridor, Dubai represents Raahi International’s highest-frequency logistics network. Air consignments departing Karachi, Lahore, Islamabad, Multan, and Faisalabad land in Dubai in just under two hours aboard direct commercial and dedicated freighter aircraft at Dubai International (DXB) Cargo Mega Terminal or Al Maktoum International (DWC). For ocean shipments, Jebel Ali Port—the largest marine terminal between Rotterdam and Singapore—provides direct roll-on maritime connections with regular weekly sailings from Karachi Port and Port Qasim, facilitating 4-day ocean transits and next-day local door distribution.',
    gateways: [
      {
        name: 'Dubai International Airport (DXB)',
        code: 'DXB',
        type: 'air',
        role: 'High-speed passenger bellyhold and express freighter hub operating 24/7 with direct connections from all major Pakistani airports.',
        customsTerminal: 'Dubai Customs Cargo Mega Terminal and Dnata Cargo Village.',
      },
      {
        name: 'Al Maktoum International Airport (DWC)',
        code: 'DWC',
        type: 'air',
        role: 'Dedicated heavy freighter airport and logistics hub situated adjacent to Jebel Ali Free Zone.',
        customsTerminal: 'Dubai Logistics City (DLC) Customs Examination Centre.',
      },
      {
        name: 'Jebel Ali Port (DP World)',
        code: 'AEJEA',
        type: 'ocean',
        role: 'World-class deep-sea container port handling weekly direct feeder services from Karachi and Port Qasim.',
        customsTerminal: 'DP World Container Terminals 1, 2 & 3 Customs Inspection Stations.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Deira & Historic Commercial Souks',
        coverageAreas: 'Deira, Naif, Al Sabkha, Al Ras wholesale market, Al Murar, Al Garhoud',
        postalOrZipCodes: 'Deira Central / Business Corridors',
        dispatchSchedule: 'Continuous daily dispatches throughout commercial trading hours',
      },
      {
        zoneName: 'Bur Dubai & Karama Communities',
        coverageAreas: 'Bur Dubai, Al Karama, Al Mankhool, Meena Bazaar, Oud Metha',
        postalOrZipCodes: 'Bur Dubai Sector',
        dispatchSchedule: 'Morning and evening delivery runs matching retail business timings',
      },
      {
        zoneName: 'New Dubai & High-Rise Residential',
        coverageAreas: 'Downtown Dubai, Business Bay, Dubai Marina, Jumeirah Lake Towers (JLT), Palm Jumeirah',
        postalOrZipCodes: 'Dubai South & Marina Zones',
        dispatchSchedule: 'Daily concierge and residential doorstep drop-offs',
      },
      {
        zoneName: 'Industrial & Free Zone Hubs',
        coverageAreas: 'Al Quoz Industrial Areas 1–4, Dubai Investments Park (DIP), JAFZA, Ras Al Khor',
        postalOrZipCodes: 'Industrial Districts',
        dispatchSchedule: 'Heavy truck and flatbed commercial linehaul runs every weekday morning',
      },
    ],
    cargoTypes: [
      {
        category: 'Perishable Produce & Seasonal Mangoes',
        typicalItems: 'Fresh Sindhri, Chaunsa, and Anwar Ratol mangoes, guavas, and seasonal herbs',
        complianceRequirement: 'Requires Phytosanitary Certificate issued by the Department of Plant Protection Pakistan and Dubai Municipality food import clearance.',
      },
      {
        category: 'Textiles, Lawn & Boutique Apparel',
        typicalItems: 'Stitched shalwar kameez, designer lawn collections, kurtis, and bed sheets for Meena Bazaar retailers',
        complianceRequirement: 'Commercial invoice, certificate of origin, packing list, and UAE customs registration.',
      },
      {
        category: 'Industrial Hardware, Leather & Safety Gear',
        typicalItems: 'Welding gloves, protective leather footwear, auto spares, and fabrication fittings',
        complianceRequirement: 'Standard customs documentation with country-of-origin markings and HS code declarations.',
      },
      {
        category: 'Personal Effects & Family Gifts',
        typicalItems: 'Household luggage, books, unperishable dry sweets, traditional footwear, and wedding wear',
        complianceRequirement: 'Copy of Emirates ID of recipient and packing declaration.',
      },
    ],
    transitTimelines: {
      airExpress: '24 to 48 hours airport-to-door from Karachi, Lahore, or Islamabad',
      airStandard: '2 to 3 business days door-to-door including full customs clearance and last-mile van drop',
      seaLcl: '4 to 6 days ocean voyage Karachi to Jebel Ali + 2 days deconsolidation and doorstep delivery',
      seaFcl: '4 to 5 days ocean transit + 1 to 2 days container gate-out and warehouse offloading',
      lastMileNotes: 'Our fleet in Dubai includes air-conditioned temperature-controlled delivery vans ensuring perishable mango shipments arrive in pristine market condition.',
    },
    faqs: [
      {
        question: 'How fast can perishable cargo or mango boxes from Pakistan be delivered to Dubai homes?',
        answer: 'Fresh mangoes and perishable agricultural items dispatched on morning flights from Lahore, Multan, or Karachi arrive at DXB by midday. Following immediate Dubai Municipality and customs health inspection, our refrigerated vans deliver boxes directly to residential and commercial addresses by the same evening or early next morning.',
      },
      {
        question: 'What documentation is required by Dubai Customs for commercial goods from Pakistan?',
        answer: 'Commercial importers must provide a verified commercial invoice, itemized packing list, Certificate of Origin (COO) attested by the local chamber of commerce, and a valid UAE customs code linked to their trade license. Our brokerage team manages the electronic Mirsal 2 filing to expedite immediate clearance.',
      },
      {
        question: 'Can you deliver cargo inside Dubai Free Zones like JAFZA and DAFZA?',
        answer: 'Yes. We frequently deliver both air and ocean shipments directly into free zone facilities, including Jebel Ali Free Zone (JAFZA), Dubai Airport Freezone (DAFZA), and Dubai Silicon Oasis, managing the required free zone gate passes and internal transit customs declarations.',
      },
    ],
    customsProcedures: {
      authority: 'Dubai Customs',
      clearanceDepot: 'Cargo Village Customs Centre (DXB) & Jebel Ali Customs Centre',
      dutyVatSummary: 'Standard commercial imports incur 5% UAE customs duty and 5% VAT calculated on CIF value. Personal used household effects are exempt from duty under standard diaspora relocation allowances.',
    },
  },

  'uae/abu-dhabi': {
    countrySlug: 'uae',
    citySlug: 'abu-dhabi',
    cityName: 'Abu Dhabi',
    countryName: 'United Arab Emirates',
    metroAreaName: 'Emirate of Abu Dhabi & Al Ain',
    h1: 'Cargo Shipping to Abu Dhabi from Pakistan (Air & Sea Freight Doorstep Service)',
    metaTitle: 'Cargo to Abu Dhabi from Pakistan | Air & Ocean Door Delivery | Raahi International',
    metaDescription: 'Door-to-door cargo shipping from Pakistan to Abu Dhabi, Mussafah, and Al Ain. Air cargo via Zayed Airport (AUH) and ocean freight via Khalifa Port. Customs cleared delivery.',
    editorialOverview:
      'As the capital and government center of the United Arab Emirates, Abu Dhabi represents a vital destination for heavy industrial machinery, corporate relocations, and Pakistani diaspora family shipments. Raahi International serves the entire emirate via direct air services into Zayed International Airport (AUH), supported by ocean container services docking at Khalifa Port—the region’s state-of-the-art semi-automated container gateway. We maintain dedicated scheduled linehaul trucks connecting central Abu Dhabi, the extensive Mussafah industrial district, and the inland oasis city of Al Ain.',
    gateways: [
      {
        name: 'Zayed International Airport (AUH)',
        code: 'AUH',
        type: 'air',
        role: 'Capital air logistics hub handling direct passenger and freighter flights from Pakistan with dedicated cold-chain and express handling.',
        customsTerminal: 'Etihad Cargo Terminals and Abu Dhabi Customs Airfreight Centre.',
      },
      {
        name: 'Khalifa Port (AD Ports Group)',
        code: 'AEKHL',
        type: 'ocean',
        role: 'Deep-water container terminal providing direct container feeder calls from Karachi Port and Port Qasim.',
        customsTerminal: 'Khalifa Port Container Terminal Customs Inspection Yard.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Abu Dhabi Island & Downtown',
        coverageAreas: 'Al Danah, Al Khalidiyah, Al Zahiyah (Tourist Club Area), Al Bateen, Al Reem Island',
        postalOrZipCodes: 'Central Abu Dhabi Sector',
        dispatchSchedule: 'Daily morning and afternoon timed residential deliveries',
      },
      {
        zoneName: 'Suburban Communities',
        coverageAreas: 'Mohammed Bin Zayed City (MBZ), Khalifa City, Shakhbout City, Al Shamkha',
        postalOrZipCodes: 'Abu Dhabi Mainland Suburbs',
        dispatchSchedule: 'Daily scheduled afternoon dispatches',
      },
      {
        zoneName: 'Mussafah Industrial District',
        coverageAreas: 'Mussafah Industrial Areas M1–M44, ICAD I, ICAD II, ICAD III',
        postalOrZipCodes: 'Mussafah Industrial Complex',
        dispatchSchedule: 'Daily commercial pallet and flatbed machinery linehaul dispatches',
      },
      {
        zoneName: 'Al Ain Inland Region',
        coverageAreas: 'Al Ain City, Sanaiya, Al Jimi, Al Hili, Al Foah',
        postalOrZipCodes: 'Eastern Region / Al Ain Sector',
        dispatchSchedule: 'Scheduled linehaul truck runs three times weekly',
      },
    ],
    cargoTypes: [
      {
        category: 'Oilfield, Marine & Heavy Industrial Supplies',
        typicalItems: 'Machinery replacement parts, steel flanges, valves, electrical equipment, and engineering tools',
        complianceRequirement: 'Requires commercial invoice, detailed packing list, manufacturer certificate of origin, and UAE customs registration.',
      },
      {
        category: 'Household Relocations & Expatriate Baggage',
        typicalItems: 'Personal furniture, household goods, wardrobe shipments, kitchen appliances, and children’s books',
        complianceRequirement: 'Emirates ID copy and itemized personal baggage declaration form.',
      },
      {
        category: 'Traditional Attire, Carpets & Bedding',
        typicalItems: 'Formal Pakistani dresses, handmade wool rugs, quilted bedding sets, and shawls',
        complianceRequirement: 'Invoice stating piece count, material composition, and recipient contact details.',
      },
    ],
    transitTimelines: {
      airExpress: '24 to 48 hours airport-to-door from Karachi, Lahore, or Islamabad',
      airStandard: '2 to 4 business days door-to-door including customs inspection and home delivery',
      seaLcl: '5 to 8 days ocean transit Karachi to Khalifa Port + 2 days customs deconsolidation',
      seaFcl: '4 to 6 days direct ocean sailing + 2 days container gate-out to Mussafah or ICAD',
      lastMileNotes: 'Deliveries to Al Ain are coordinated seamlessly through our Abu Dhabi mainland sorting hub without intermediate third-party handling.',
    },
    faqs: [
      {
        question: 'Do you provide direct deliveries to factories and workshops in the Mussafah Industrial Area?',
        answer: 'Yes. Mussafah (all sectors M1 through M44 and ICAD zones) is serviced daily by our heavy commercial delivery fleet. We handle palletized industrial spares, fabrication components, and workshop supplies with forklift offloading assistance where required.',
      },
      {
        question: 'Are customs duties charged on personal household effects sent to Abu Dhabi?',
        answer: 'Used personal clothing and household goods sent by Pakistani expatriates to their residences in Abu Dhabi typically clear duty-free under standard personal effects allowances, provided items are non-commercial and match standard household quantities.',
      },
      {
        question: 'How do you coordinate deliveries to Al Ain from Pakistan?',
        answer: 'Consignments arrive by air into AUH or sea through Khalifa Port and clear Abu Dhabi Customs. Our inter-emirate linehaul vehicles then transport the goods directly to residential and commercial addresses across Al Ain and Sanaiya on scheduled alternate-day routes.',
      },
    ],
    customsProcedures: {
      authority: 'General Administration of Customs (Abu Dhabi Customs)',
      clearanceDepot: 'Zayed International Airport Air Cargo Centre & Khalifa Port Customs Station',
      dutyVatSummary: 'Commercial goods clear through the Advanced Trade & Logistics Platform (ATLP) with 5% customs duty and 5% VAT applied on CIF value.',
    },
  },

  // =========================================================================
  // SAUDI ARABIA
  // =========================================================================
  'ksa/riyadh': {
    countrySlug: 'ksa',
    citySlug: 'riyadh',
    cityName: 'Riyadh',
    countryName: 'Saudi Arabia',
    metroAreaName: 'Riyadh Metropolitan Province',
    h1: 'Cargo Shipping to Riyadh from Pakistan (Air Freight & Dry Port Sea Cargo)',
    metaTitle: 'Cargo to Riyadh from Pakistan | Air Freight & Sea Delivery | Raahi International',
    metaDescription: 'Direct cargo shipping from Pakistan to Riyadh. Air cargo via King Khalid Airport (RUH) and ocean container clearance via Riyadh Dry Port. Serving Al Batha, Olaya, and Modon.',
    editorialOverview:
      'Riyadh, the political and economic capital of the Kingdom of Saudi Arabia, is experiencing massive infrastructure expansion under Vision 2030, fueling substantial demand for commercial goods, construction supplies, and personal diaspora cargo from Pakistan. Raahi International manages scheduled air cargo flights into King Khalid International Airport (RUH) Cargo Village. For ocean freight from Karachi Port, maritime containers dock at King Abdulaziz Port in Dammam before transiting via bonded intermodal rail directly into the Riyadh Dry Port (Riyadh Container Terminal - RCT) for centralized customs clearance and doorstep delivery.',
    gateways: [
      {
        name: 'King Khalid International Airport (RUH)',
        code: 'RUH',
        type: 'air',
        role: 'Central air freight hub with daily scheduled cargo and passenger services from Lahore, Karachi, Islamabad, and Peshawar.',
        customsTerminal: 'Saudia Cargo Terminal and SATS Bonded Cargo Warehouse at RUH Cargo Village.',
      },
      {
        name: 'Riyadh Dry Port (Riyadh Container Terminal - RCT)',
        code: 'SARUH',
        type: 'inland',
        role: 'Inland multimodal rail terminal receiving bonded sea containers transferred directly from Dammam marine port.',
        customsTerminal: 'ZATCA Riyadh Dry Port Customs Examination Yard.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Central Commercial & Diaspora Quarter',
        coverageAreas: 'Al Batha, Al Murabba, Al Malaz, Manfuha, Al Wazarat (Hara), Al Aziziyah',
        postalOrZipCodes: 'Central Riyadh 12611–12836',
        dispatchSchedule: 'Twice-daily dispatches including evening commercial drop-offs',
      },
      {
        zoneName: 'North Riyadh Business & Diplomatic',
        coverageAreas: 'Al Olaya, King Abdullah Financial District (KAFD), Al Sulaimaniyah, Diplomatic Quarter, Al Nakheel',
        postalOrZipCodes: 'North Riyadh 11564–12333',
        dispatchSchedule: 'Daily morning scheduled business and residential delivery runs',
      },
      {
        zoneName: 'Industrial & Manufacturing Zones',
        coverageAreas: 'Riyadh First Industrial City, Second Industrial City (Modon), Al Kharj Road industrial belt',
        postalOrZipCodes: 'Modon Industrial Districts',
        dispatchSchedule: 'Daily commercial truck delivery for manufacturing supplies and heavy cargo',
      },
    ],
    cargoTypes: [
      {
        category: 'Uniforms, Workwear & Safety Apparel',
        typicalItems: 'Industrial coveralls, high-visibility jackets, leather work gloves, and construction boots',
        complianceRequirement: 'Requires commercial invoice, packing list, certificate of origin, and SABER platform registration for regulated safety equipment.',
      },
      {
        category: 'Surgical & Medical Equipment',
        typicalItems: 'Precision hospital instruments, dental tools, and laboratory tweezers from Sialkot',
        complianceRequirement: 'Saudi Food & Drug Authority (SFDA) medical device registration and technical specification documentation.',
      },
      {
        category: 'Diaspora Provisions & Household Relocations',
        typicalItems: 'Packaged basmati rice, dry spices, tea, traditional dresses, religious texts, and personal wardrobe containers',
        complianceRequirement: 'Recipient Saudi National ID or Iqama copy, itemized packing list, and ZATCA personal declaration.',
      },
    ],
    transitTimelines: {
      airExpress: '3 to 5 business days door-to-door directly into Riyadh',
      airStandard: '5 to 7 business days door-to-door with complete FASAH customs electronic clearance',
      seaLcl: '14 to 18 days ocean voyage Karachi to Dammam + rail transfer to Riyadh Dry Port + door drop',
      seaFcl: '12 to 16 days ocean and rail transit + 2 days customs gate-out and flatbed container placement',
      lastMileNotes: 'All deliveries are tracked in real-time through the National Address system (Wasel) ensuring precise doorstep navigation across sprawling Riyadh suburbs.',
    },
    faqs: [
      {
        question: 'What are the FASAH and ZATCA requirements for shipping cargo from Pakistan to Riyadh?',
        answer: 'All commercial imports into Riyadh must be processed through the FASAH electronic window by a licensed Saudi customs broker. Importers must hold an active commercial registration (CR) and register regulated products on the SABER portal. Personal shipments require the recipient’s valid Iqama number and matching National Address.',
      },
      {
        question: 'Do you deliver directly to residential families in Al Batha and Al Wazarat (Hara)?',
        answer: 'Yes. Al Batha and Al Wazarat are high-frequency delivery zones for Raahi International. Our local drivers are familiar with local landmarks, delivering household luggage, festive garments, and specialty foodstuffs directly to family apartments with pre-scheduled phone coordination.',
      },
      {
        question: 'How do you handle food items regulated by the Saudi Food and Drug Authority (SFDA)?',
        answer: 'Commercially shipped food products must comply with SFDA labeling standards (Arabic ingredient labels, clear production and expiry dates) and hold an SFDA import permit. Personal quantities of non-perishable sealed dry provisions clear under standard personal baggage allowances.',
      },
    ],
    customsProcedures: {
      authority: 'Zakat, Tax and Customs Authority (ZATCA)',
      clearanceDepot: 'King Khalid Airport Cargo Customs & Riyadh Dry Port Customs Yard',
      dutyVatSummary: 'Commercial goods incur standard Saudi customs duty (typically 5%–15% depending on HS code) and 15% VAT. Personal used effects are exempt when accompanied by a valid relocation declaration.',
    },
  },

  'ksa/jeddah': {
    countrySlug: 'ksa',
    citySlug: 'jeddah',
    cityName: 'Jeddah',
    countryName: 'Saudi Arabia',
    metroAreaName: 'Makkah Province / Western Region',
    h1: 'Cargo Shipping to Jeddah from Pakistan (Air Freight & Jeddah Islamic Port Sea Cargo)',
    metaTitle: 'Cargo to Jeddah from Pakistan | Red Sea Air & Ocean Delivery | Raahi International',
    metaDescription: 'Direct cargo shipping from Pakistan to Jeddah, Makkah, and the Western Province. Air cargo via King Abdulaziz Airport (JED) and ocean shipping via Jeddah Islamic Port.',
    editorialOverview:
      'Jeddah is Saudi Arabia’s commercial gateway on the Red Sea and the principal logistics conduit for the holy cities of Makkah and Madinah. Raahi International operates high-frequency air routes into King Abdulaziz International Airport (JED), alongside direct maritime shipping connections from Karachi into Jeddah Islamic Port (RSGT and DP World terminals). Our logistics framework provides specialized handling for retail textile distributors in historic Al Balad, hospitality suppliers, and Pakistani diaspora expatriates across the Western Province.',
    gateways: [
      {
        name: 'King Abdulaziz International Airport (JED)',
        code: 'JED',
        type: 'air',
        role: 'Major international air gateway with direct passenger flights and dedicated freighters arriving daily from Karachi, Lahore, Islamabad, and Multan.',
        customsTerminal: 'Saudia Cargo Terminal and JED Cargo Village bonded customs facilities.',
      },
      {
        name: 'Jeddah Islamic Port',
        code: 'SAJED',
        type: 'ocean',
        role: 'Saudi Arabia’s largest marine container gateway, handling direct feeder and mainline vessels across the Arabian Sea and Red Sea.',
        customsTerminal: 'Red Sea Gateway Terminal (RSGT) and DP World Middle East Container Terminal.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Historic & Commercial Wholesale District',
        coverageAreas: 'Al Balad wholesale souks, Al Baghdadiyah, Al Kandarah, Al Ruwais, Al Sharafeyah',
        postalOrZipCodes: 'Central Jeddah 22231–23214',
        dispatchSchedule: 'Twice-daily commercial morning and evening delivery routes',
      },
      {
        zoneName: 'North Jeddah Residential & Business',
        coverageAreas: 'Al Naeem, Al Bawadi, Al Zahra, Al Rawdah, Al Salamah, Obhur Al Shamaliyah',
        postalOrZipCodes: 'North Jeddah 23521–23815',
        dispatchSchedule: 'Daily scheduled afternoon residential delivery service',
      },
      {
        zoneName: 'Makkah Al-Mukarramah Linehaul Corridor',
        coverageAreas: 'Holy City of Makkah, Al Aziziyah, Al Kakiyyah, Al Shawqiyyah, Mina distribution hubs',
        postalOrZipCodes: 'Makkah Metropolitan Sector',
        dispatchSchedule: 'Daily dedicated forwarding truck runs from Jeddah hub into Makkah',
      },
    ],
    cargoTypes: [
      {
        category: 'Pilgrim Hospitality & Religious Textiles',
        typicalItems: 'Ihram towels, prayer carpets, abayas, tasbeeh sets, religious books, and Zamzam container packaging',
        complianceRequirement: 'Requires commercial invoice, certificate of origin, and compliance with Saudi Ministry of Commerce labeling rules.',
      },
      {
        category: 'Commercial Textiles & Ethnic Fashion',
        typicalItems: 'Embroidered fabrics, formal kurtas, children’s festive clothing, and bedding sets for Al Balad retail markets',
        complianceRequirement: 'SABER registration, commercial invoice, and SASO-compliant textile fiber composition labels.',
      },
      {
        category: 'Expatriate Relocations & Household Luggage',
        typicalItems: 'Personal wardrobe cartons, kitchenware, non-perishable family gifts, and study materials',
        complianceRequirement: 'Copy of valid Iqama and itemized packing declaration.',
      },
    ],
    transitTimelines: {
      airExpress: '3 to 5 business days door-to-door directly into Jeddah addresses',
      airStandard: '5 to 7 business days door-to-door with complete ZATCA customs clearance',
      seaLcl: '10 to 14 days direct ocean sailing Karachi to Jeddah Islamic Port + 2 days customs deconsolidation',
      seaFcl: '9 to 12 days direct container vessel + 2 days customs gate-out and flatbed delivery',
      lastMileNotes: 'Direct scheduled linehaul options connect Jeddah port arrivals straight to commercial hotels and residential properties in Makkah within 24 hours of customs discharge.',
    },
    faqs: [
      {
        question: 'Can cargo arriving in Jeddah be forwarded directly to Makkah or Madinah?',
        answer: 'Yes. Our Western Province distribution network operates daily linehaul transport between our Jeddah logistics warehouse and both Makkah and Madinah. We deliver commercial hotel provisions, pilgrimage supplies, and family parcels directly to doorsteps in both holy cities.',
      },
      {
        question: 'How fast is sea freight from Karachi to Jeddah Islamic Port?',
        answer: 'Because Karachi and Jeddah share direct Arabian Sea and Red Sea maritime shipping lanes, container transit is among the fastest in international ocean shipping, taking just 9 to 14 days port-to-port. Local deconsolidation and customs release take an additional 48 hours.',
      },
      {
        question: 'What documentation is needed for Pakistani families sending household goods to Jeddah?',
        answer: 'Recipients must provide a clear copy of their Saudi Iqama (resident identity card), Saudi National Address confirmation, and an itemized packing list showing box contents and approximate values for ZATCA clearance.',
      },
    ],
    customsProcedures: {
      authority: 'Zakat, Tax and Customs Authority (ZATCA)',
      clearanceDepot: 'Jeddah Islamic Port RSGT Customs Complex & King Abdulaziz Airport Cargo Sheds',
      dutyVatSummary: 'Standard commercial imports incur customs duties based on the Saudi Integrated Customs Tariff plus 15% VAT. Certified personal effects qualify for duty-free entry.',
    },
  },

  // =========================================================================
  // CANADA
  // =========================================================================
  'canada/toronto': {
    countrySlug: 'canada',
    citySlug: 'toronto',
    cityName: 'Toronto',
    countryName: 'Canada',
    metroAreaName: 'Greater Toronto Area (GTA)',
    h1: 'Cargo Shipping to Toronto from Pakistan (Air Freight & Doorstep Delivery)',
    metaTitle: 'Cargo to Toronto from Pakistan | GTA Air & Ocean Door Delivery | Raahi International',
    metaDescription: 'Reliable air and sea cargo from Pakistan to Toronto, Mississauga, Brampton, and the GTA. YYZ Pearson customs clearance and intermodal container rail forwarding.',
    editorialOverview:
      'Home to the largest Pakistani diaspora community in North America, the Greater Toronto Area (GTA) maintains vigorous commercial, family, and student shipping links with Pakistan. Raahi International manages scheduled air cargo arrivals at Toronto Pearson International Airport (YYZ), backed by professional Canada Border Services Agency (CBSA) customs clearance. For ocean shipments originating in Karachi, containers sail into Port of Halifax or Port of Montreal before transferring via CN and CP intermodal rail directly to the Brampton and Vaughan intermodal terminals for final-mile palletized and parcel delivery across Brampton, Mississauga, Scarborough, and Milton.',
    gateways: [
      {
        name: 'Toronto Pearson International Airport (YYZ)',
        code: 'YYZ',
        type: 'air',
        role: 'Canada’s primary international air cargo gateway, handling dedicated freighters and widebody passenger services from Pakistan via transatlantic routes.',
        customsTerminal: 'Vista Cargo Terminals, Air Canada Cargo Complex, and Swissport Cargo YYZ.',
      },
      {
        name: 'CN Brampton Intermodal Terminal (BIT)',
        code: 'CABIT',
        type: 'inland',
        role: 'Massive rail container hub receiving ocean container traffic directly from East Coast deepwater ports.',
        customsTerminal: 'CBSA Intermodal Container Examination Facility, Brampton.',
      },
      {
        name: 'CP Vaughan Intermodal Facility',
        code: 'CAVAU',
        type: 'inland',
        role: 'CP Rail container logistics center handling commercial LCL and FCL ocean freight for the northern GTA.',
        customsTerminal: 'Vaughan Sufferance Warehouse and Inland Customs Office.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Peel Region Diaspora Core',
        coverageAreas: 'Brampton, Mississauga, Milton, Caledon',
        postalOrZipCodes: 'L6P–L6Z, L4T–L5W, L9T',
        dispatchSchedule: 'Twice-daily dispatches Monday through Saturday',
      },
      {
        zoneName: 'City of Toronto & Downtown',
        coverageAreas: 'Scarborough, North York, Etobicoke, East York, Downtown Toronto',
        postalOrZipCodes: 'M1–M9 postal districts',
        dispatchSchedule: 'Daily scheduled morning residential and retail distribution',
      },
      {
        zoneName: 'York & Durham Regions',
        coverageAreas: 'Vaughan, Richmond Hill, Markham, Pickering, Ajax, Oshawa',
        postalOrZipCodes: 'L4A–L4H, L3P–L3T, L1V–L1Z',
        dispatchSchedule: 'Daily afternoon delivery linehaul runs',
      },
    ],
    cargoTypes: [
      {
        category: 'Ethnic Apparel, Lawn Suits & Bridal Couture',
        typicalItems: 'Designer lawn, embroidered formal wear, bridal lehengas, and readymade kurtis for boutiques in Brampton and Mississauga',
        complianceRequirement: 'Commercial invoice, Canadian tariff classification, CARM registration, and textile labeling disclosure.',
      },
      {
        category: 'Surgical & Dental Instruments',
        typicalItems: 'Stainless steel surgical tools, dental forceps, scissors, and diagnostic instruments from Sialkot',
        complianceRequirement: 'Health Canada Medical Device Establishment License (MDEL) compliance and CBSA commercial declaration.',
      },
      {
        category: 'Artisanal Wooden Furniture & Home Decor',
        typicalItems: 'Hand-carved Chinioti sheesham furniture, carved brass mirrors, and oriental rugs',
        complianceRequirement: 'Phytosanitary certificate and ISPM 15 certified treated wood packaging verification.',
      },
      {
        category: 'Personal Effects & Student Relocations',
        typicalItems: 'Excess baggage, academic books, cultural keepsakes, and unperishable traditional dry foodstuffs',
        complianceRequirement: 'CBSA Form BSF186 (Personal Effects Accounting Document) with copy of Canadian PR, Study Permit, or Passport.',
      },
    ],
    transitTimelines: {
      airExpress: '4 to 7 business days airport-to-door from Lahore, Karachi, or Islamabad',
      airStandard: '6 to 9 business days door-to-door including CBSA customs release',
      seaLcl: '30 to 36 days ocean transit via Halifax/Montreal + CN rail to Brampton + door drop',
      seaFcl: '28 to 34 days ocean and intermodal transit + 2 business days container destuffing',
      lastMileNotes: 'All suburban residential deliveries in Brampton and Mississauga are scheduled with pre-call notifications and liftgate-equipped delivery vehicles.',
    },
    faqs: [
      {
        question: 'How does CBSA customs clearance work for personal effects arriving at Toronto Pearson (YYZ)?',
        answer: 'Under CBSA regulations, first-time immigrants and returning Canadian residents shipping personal effects must have their Form BSF186 (Settler’s Effects) stamped by customs. Our customs brokerage guides you through paperless electronic pre-declaration so your goods clear immediately upon YYZ airport arrival.',
      },
      {
        question: 'Do you deliver directly to homes and stores in Brampton and Mississauga?',
        answer: 'Yes. Brampton and Mississauga are our largest Canadian delivery sectors. We provide daily deliveries to retail boutiques along Airport Road, Steeles Avenue, and Queen Street, as well as doorstep deliveries to private residences across all L4, L5, and L6 postal codes.',
      },
      {
        question: 'Can commercial importers in the GTA clear goods using their CARM Client Portal account?',
        answer: 'Yes. All commercial importers into Canada must be registered on the CBSA CARM (Assessment and Revenue Management) Client Portal. We link with your CARM Business Number (BN15) to submit electronic declarations, manage duties and GST accounting, and secure rapid release.',
      },
    ],
    customsProcedures: {
      authority: 'Canada Border Services Agency (CBSA)',
      clearanceDepot: 'YYZ Commercial Operations Office & Brampton Highway Sufferance Warehouse',
      dutyVatSummary: 'Commercial goods incur 5% federal GST plus provincial HST where applicable, along with customs tariffs based on the Canadian Customs Tariff schedule. Personal settler effects are duty/tax exempt.',
    },
  },

  'canada/vancouver': {
    countrySlug: 'canada',
    citySlug: 'vancouver',
    cityName: 'Vancouver',
    countryName: 'Canada',
    metroAreaName: 'Metro Vancouver & Fraser Valley',
    h1: 'Cargo Shipping to Vancouver from Pakistan (Air Freight & Port Sea Cargo)',
    metaTitle: 'Cargo to Vancouver from Pakistan | BC Air & Ocean Door Delivery | Raahi International',
    metaDescription: 'Direct cargo services from Pakistan to Vancouver, Surrey, Richmond, and the Fraser Valley. Air cargo via YVR and container shipping via Port of Vancouver.',
    editorialOverview:
      'Serving the thriving commercial and diaspora centers of British Columbia’s Lower Mainland, Vancouver is Canada’s primary Pacific trade gateway. Raahi International coordinates air cargo flights into Vancouver International Airport (YVR) South Cargo Terminal, complemented by ocean container shipping direct into the Port of Vancouver (Roberts Bank Deltaport and Centerm). Our regional fleet provides seamless door delivery across Vancouver, Richmond, Burnaby, and the extensive Pakistani communities of Surrey and Abbotsford in the Fraser Valley.',
    gateways: [
      {
        name: 'Vancouver International Airport (YVR)',
        code: 'YVR',
        type: 'air',
        role: 'Pacific international air cargo gateway handling scheduled widebody flights with dedicated cold-chain and cargo sufferance facilities.',
        customsTerminal: 'YVR Air Cargo Sufferance Warehouse and Swissport Cargo Centre, Richmond.',
      },
      {
        name: 'Port of Vancouver (Deltaport & Centerm)',
        code: 'CAVAN',
        type: 'ocean',
        role: 'Canada’s largest marine seaport handling trans-Pacific and round-the-world ocean container services.',
        customsTerminal: 'Roberts Bank Deltaport Container Examination Facility & Centerm Terminal.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'City of Vancouver & North Shore',
        coverageAreas: 'Vancouver City, Downtown, Kitsilano, Burnaby, North Vancouver, West Vancouver',
        postalOrZipCodes: 'V5, V6, V7 postal districts',
        dispatchSchedule: 'Daily weekday morning and afternoon timed delivery runs',
      },
      {
        zoneName: 'Surrey & Fraser Valley Diaspora Hubs',
        coverageAreas: 'Surrey, Delta, Langley, Abbotsford, Mission, Chilliwack',
        postalOrZipCodes: 'V3R–V3Z, V4A–V4C, V2S–V2T',
        dispatchSchedule: 'Twice-daily dispatches servicing high-density residential and retail quarters',
      },
      {
        zoneName: 'Richmond Commercial & Logistics Belt',
        coverageAreas: 'Richmond, YVR Airport Corridor, Mitchell Island industrial sector',
        postalOrZipCodes: 'V6V–V6Y, V7B',
        dispatchSchedule: 'Daily commercial dispatches directly from YVR Sufferance Depots',
      },
    ],
    cargoTypes: [
      {
        category: 'Sports Goods, Martial Arts & Fitness Gear',
        typicalItems: 'Cricket gear, boxing gloves, martial arts suits, gym accessories from Sialkot exporters',
        complianceRequirement: 'Commercial invoice, product safety labeling, and CBSA entry classification.',
      },
      {
        category: 'Textiles, Rugs & Traditional Garments',
        typicalItems: 'Fine handmade wool carpets, woven blankets, designer lawn dresses, and shawls',
        complianceRequirement: 'Textile labeling disclosure and commercial packing list.',
      },
      {
        category: 'Student Baggage & Skilled Immigrant Effects',
        typicalItems: 'Personal books, clothing, academic belongings, and household effects for UBC/SFU students and new residents',
        complianceRequirement: 'CBSA BSF186 declaration and copy of valid study permit or permanent residence card.',
      },
    ],
    transitTimelines: {
      airExpress: '5 to 8 business days airport-to-door directly into Lower Mainland addresses',
      airStandard: '7 to 10 business days door-to-door with complete CBSA clearance',
      seaLcl: '32 to 38 days direct ocean transit into Port of Vancouver + 3 days destuffing and door drop',
      seaFcl: '30 to 35 days direct container sailing + 2 days customs gate release',
      lastMileNotes: 'Deliveries to the Fraser Valley (Surrey and Abbotsford) run on dedicated regional routes avoiding Highway 1 bottleneck delays.',
    },
    faqs: [
      {
        question: 'Do you provide direct residential delivery across Surrey and Abbotsford in British Columbia?',
        answer: 'Yes. Surrey and Abbotsford are our primary distribution corridors in British Columbia. We provide regular door-to-door service directly to family residences, farms, and retail shops across all V3 and V4 postal zones, complete with advance delivery notifications.',
      },
      {
        question: 'What regulations apply to shipping wooden furniture or cricket bats to Vancouver?',
        answer: 'The Canadian Food Inspection Agency (CFIA) strictly enforces ISPM 15 standards for wooden items and wood packaging to prevent pest entry. Raw timber must be heat-treated or fumigated with official ISPM 15 stamps. Processed wooden cricket bats and finished indoor furniture clear routinely with standard declarations.',
      },
      {
        question: 'Can commercial importers in Vancouver inspect their containers at Deltaport?',
        answer: 'Containers subject to CBSA random inspection are transferred to the Marine Container Examination Facility (MCEF) in Roberts Bank or Richmond. Our brokerage handles all documentation coordination, drayage transfers, and clearance releases directly on your behalf.',
      },
    ],
    customsProcedures: {
      authority: 'Canada Border Services Agency (CBSA)',
      clearanceDepot: 'YVR International Cargo Office & Richmond Sufferance Warehouse',
      dutyVatSummary: 'Commercial imports into British Columbia incur 5% federal GST plus applicable tariffs. B.C. Provincial Sales Tax (PST) applies to qualifying goods at final point of retail or commercial accounting.',
    },
  },

  // =========================================================================
  // UNITED STATES
  // =========================================================================
  'usa/new-york': {
    countrySlug: 'usa',
    citySlug: 'new-york',
    cityName: 'New York',
    countryName: 'United States',
    metroAreaName: 'New York Tri-State Area',
    h1: 'Cargo Shipping to New York from Pakistan (Air & Ocean Doorstep Delivery)',
    metaTitle: 'Cargo to New York from Pakistan | JFK & Port of NY Door Delivery | Raahi International',
    metaDescription: 'Direct cargo shipping from Pakistan to New York City, Brooklyn, Queens, and Long Island. JFK Airport air cargo and Port of NY/NJ ocean freight with US Customs clearance.',
    editorialOverview:
      'New York City and the surrounding Tri-State Metropolitan Area host one of the most prominent Pakistani-American commercial and cultural communities in the United States. Raahi International provides scheduled transatlantic air cargo connections into John F. Kennedy International Airport (JFK) and Newark Liberty (EWR). For ocean freight, containers discharge at the Port of New York and New Jersey (Maher Terminals and Port Newark Container Terminal - PNCT), moving through bonded container freight stations before final delivery across Brooklyn, Queens, Manhattan, Long Island, and Northern New Jersey.',
    gateways: [
      {
        name: 'John F. Kennedy International Airport (JFK)',
        code: 'JFK',
        type: 'air',
        role: 'America’s premier international air cargo hub with dedicated freighters and daily widebody flights connecting from Pakistan via European and Middle Eastern carrier hubs.',
        customsTerminal: 'JFK Cargo Buildings 9, 15, 23, and Worldwide Flight Services (WFS) Building 75.',
      },
      {
        name: 'Newark Liberty International Airport (EWR)',
        code: 'EWR',
        type: 'air',
        role: 'Secondary Tri-State air logistics center handling regional cargo and New Jersey distribution.',
        customsTerminal: 'EWR Air Cargo Centre and Swissport Cargo Facilities.',
      },
      {
        name: 'Port of New York and New Jersey',
        code: 'USNYC',
        type: 'ocean',
        role: 'The largest container port on the US East Coast, receiving weekly container sailings from Karachi Port.',
        customsTerminal: 'Maher Terminals (Elizabeth, NJ) and Port Newark Container Terminal (PNCT).',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Brooklyn & Queens Diaspora Hubs',
        coverageAreas: 'Midwood / Coney Island Ave, Jackson Heights, Jamaica, Astoria, Flushing, Richmond Hill',
        postalOrZipCodes: '11230, 11372, 11432, 11103, 11419',
        dispatchSchedule: 'Twice-daily dispatches servicing high-density retail and residential quarters',
      },
      {
        zoneName: 'Manhattan & The Bronx',
        coverageAreas: 'Manhattan (Midtown, Financial District, Harlem) and The Bronx',
        postalOrZipCodes: '10001–10282, 10451–10475',
        dispatchSchedule: 'Daily morning timed commercial deliveries with dock access',
      },
      {
        zoneName: 'Long Island Suburbs',
        coverageAreas: 'Nassau County (Hicksville, Valley Stream, Westbury) and Suffolk County',
        postalOrZipCodes: '11801, 11580, 11590, 11701–11798',
        dispatchSchedule: 'Daily scheduled afternoon residential deliveries',
      },
      {
        zoneName: 'Northern New Jersey Tri-State Sector',
        coverageAreas: 'Jersey City, Edison, Paterson, Woodbridge, Newark',
        postalOrZipCodes: '07302, 08817, 07501, 07095',
        dispatchSchedule: 'Daily scheduled linehaul runs from Port Newark CFS',
      },
    ],
    cargoTypes: [
      {
        category: 'Textiles, Lawn Suits & Formal Couture',
        typicalItems: 'Embroidered festive wear, lawn fabrics, pashmina shawls, and readymade apparel for retailers along Coney Island Avenue and Jackson Heights',
        complianceRequirement: 'Commercial invoice, fiber content disclosure, country of origin labeling, and CBP electronic entry.',
      },
      {
        category: 'Surgical, Medical & Dental Instruments',
        typicalItems: 'Precision hospital instruments, dental extraction forceps, and scissors originating from Sialkot factories',
        complianceRequirement: 'US Food & Drug Administration (FDA) device listing, 510(k) or exemption status, and establishment registration.',
      },
      {
        category: 'Personal Effects & Family Resettlement Goods',
        typicalItems: 'Used personal clothing, study materials, cultural artifacts, and traditional home furnishings',
        complianceRequirement: 'CBP Form 3299 (Declaration for Free Entry of Unaccompanied Articles) with copy of US Visa or Green Card.',
      },
    ],
    transitTimelines: {
      airExpress: '4 to 6 business days airport-to-door from Karachi, Lahore, or Islamabad',
      airStandard: '6 to 8 business days door-to-door including CBP customs clearance',
      seaLcl: '26 to 32 days ocean transit Karachi to Port of NY/NJ + 3 days CFS deconsolidation',
      seaFcl: '24 to 30 days direct ocean sailing + 2 days customs release and drayage drop',
      lastMileNotes: 'Our local drivers are experienced in navigating narrow residential streets in Brooklyn and Queens, utilizing liftgate-equipped box trucks.',
    },
    faqs: [
      {
        question: 'What are the FDA requirements for shipping surgical instruments from Sialkot to New York?',
        answer: 'Commercial medical and surgical instruments imported into the US must comply with FDA regulations. Exporters must provide an FDA Device Listing number and foreign manufacturer registration, while the US importer must hold an active FDA establishment registration. Our customs brokers file seamless electronic FDA prior notices alongside standard CBP entry.',
      },
      {
        question: 'Do you deliver directly to retail shops on Coney Island Avenue in Brooklyn and Jackson Heights in Queens?',
        answer: 'Yes. Coney Island Avenue (Little Pakistan) and Jackson Heights are core daily delivery routes for Raahi International. We deliver boutique cartons, textile bolts, and retail merchandise directly into commercial shopfronts with zero curb-drop abandonment.',
      },
      {
        question: 'How does US Customs duty apply to personal clothing and relocation shipments to New York?',
        answer: 'Under US Customs Border Protection (CBP) regulations, personal used clothing, books, and household goods imported by arriving residents or students qualify for duty-free entry under tariff heading 9804. Our team assists recipients in completing CBP Form 3299 to ensure zero import duty assessment.',
      },
    ],
    customsProcedures: {
      authority: 'U.S. Customs and Border Protection (CBP)',
      clearanceDepot: 'JFK Airport Port Code 1001 & Port of New York/Newark Port Code 4601',
      dutyVatSummary: 'Commercial entries are submitted electronically via the Automated Commercial Environment (ACE). Goods valued over $2,500 require a formal entry and continuous or single-entry customs bond.',
    },
  },

  'usa/chicago': {
    countrySlug: 'usa',
    citySlug: 'chicago',
    cityName: 'Chicago',
    countryName: 'United States',
    metroAreaName: 'Greater Chicagoland & Midwest',
    h1: 'Cargo Shipping to Chicago from Pakistan (Air Freight & Rail Intermodal Sea Cargo)',
    metaTitle: 'Cargo to Chicago from Pakistan | Air & Ocean Door Delivery | Raahi International',
    metaDescription: 'Direct cargo shipping from Pakistan to Chicago, Devon Avenue, Schaumburg, and Naperville. O’Hare (ORD) air freight and Midwest intermodal container rail forwarding.',
    editorialOverview:
      'Chicago serves as the industrial heart and transport crossroads of the American Midwest, anchoring an extensive and prosperous Pakistani diaspora. Raahi International routes air freight directly into Chicago O’Hare International Airport (ORD)—one of the busiest air cargo campuses in the Western Hemisphere. For ocean container cargo, shipments arriving from Karachi at US East Coast ports transfer seamlessly via high-speed intermodal rail directly into the BNSF Logistics Park Chicago (Joliet) and Union Pacific Global IV railheads for centralized deconsolidation and doorstep delivery across Cook, DuPage, and Lake counties.',
    gateways: [
      {
        name: 'Chicago O’Hare International Airport (ORD)',
        code: 'ORD',
        type: 'air',
        role: 'Massive international air cargo nexus handling widebody freighters and scheduled transatlantic services with dedicated bonded warehousing.',
        customsTerminal: 'O’Hare South Cargo Campus, Northeast Cargo Facility, and Swissport Cargo ORD.',
      },
      {
        name: 'BNSF Logistics Park Chicago (Joliet)',
        code: 'USLPC',
        type: 'inland',
        role: 'Premier Midwest intermodal rail terminal receiving ocean container trains directly from East Coast marine ports.',
        customsTerminal: 'Joliet Intermodal Customs Examination Station & Container Yard.',
      },
      {
        name: 'Union Pacific Global IV Intermodal Terminal',
        code: 'USGIV',
        type: 'inland',
        role: 'Major railhead facilitating containerized ocean freight deconsolidation for the Greater Midwest industrial market.',
        customsTerminal: 'Global IV Bonded Container Yard, Joliet.',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Devon Avenue Commercial & Cultural District',
        coverageAreas: 'West Ridge / Devon Avenue commercial corridor, Rogers Park, Lincoln Square',
        postalOrZipCodes: '60645, 60659, 60626, 60625',
        dispatchSchedule: 'Daily morning and afternoon dispatches directly to retail storefronts',
      },
      {
        zoneName: 'City of Chicago Residential',
        coverageAreas: 'Downtown Chicago, Loop, Hyde Park, Lincoln Park, Logan Square, Albany Park',
        postalOrZipCodes: '60601–60616, 60637, 60614, 60647',
        dispatchSchedule: 'Daily scheduled residential courier and delivery routes',
      },
      {
        zoneName: 'Northwest Suburbs & Diaspora Corridor',
        coverageAreas: 'Schaumburg, Hoffman Estates, Elk Grove Village, Des Plaines, Arlington Heights',
        postalOrZipCodes: '60173, 60169, 60007, 60016, 60004',
        dispatchSchedule: 'Daily afternoon delivery servicing residential estates and industrial parks',
      },
      {
        zoneName: 'West & South Suburbs',
        coverageAreas: 'Naperville, Aurora, Lombard, Oak Brook, Downers Grove, Bolingbrook',
        postalOrZipCodes: '60540, 60504, 60148, 60523, 60440',
        dispatchSchedule: 'Daily scheduled afternoon residential deliveries',
      },
    ],
    cargoTypes: [
      {
        category: 'Ethnic Fashion, Festive Wear & Jewelry',
        typicalItems: 'Designer lawn suits, bridal lehengas, imitation jewelry, and formal kurtas for Devon Avenue retailers',
        complianceRequirement: 'Itemized commercial invoice, textile fiber content disclosure, and CBP entry summary.',
      },
      {
        category: 'Industrial Hardware, Cutlery & Metalwork',
        typicalItems: 'Stainless steel cutlery, brass industrial fittings, hand tools, and shears from Wazirabad and Gujranwala',
        complianceRequirement: 'Clear country-of-origin marking, commercial invoice, and US Harmonized Tariff Schedule (HTSUS) classification.',
      },
      {
        category: 'Household Relocations & University Baggage',
        typicalItems: 'Personal clothing, books, academic materials, and traditional cultural items for students and professionals',
        complianceRequirement: 'CBP Form 3299 and copy of valid US resident visa or passport.',
      },
    ],
    transitTimelines: {
      airExpress: '4 to 7 business days airport-to-door directly into Chicago addresses',
      airStandard: '6 to 8 business days door-to-door with complete CBP O’Hare customs release',
      seaLcl: '28 to 34 days ocean transit + rail transfer to Chicago railhead + door drop',
      seaFcl: '26 to 32 days ocean and rail transit + 2 business days container destuffing',
      lastMileNotes: 'Deliveries to suburban Chicagoland (Naperville, Schaumburg) are executed using local Midwest depot trucks with advance arrival appointment calls.',
    },
    faqs: [
      {
        question: 'Do you deliver commercial garments and goods directly to shops on Devon Avenue in Chicago?',
        answer: 'Yes. Devon Avenue is northern Illinois’ premier South Asian retail district. We provide scheduled commercial morning and afternoon deliveries directly into shops, boutiques, and storage facilities along West Devon Avenue without third-party handoffs.',
      },
      {
        question: 'How does air cargo customs clearance work at Chicago O’Hare (ORD)?',
        answer: 'Shipments landing at ORD transfer into bonded airline cargo facilities in the South Cargo Area or Northeast Cargo Campus. Our licensed customs brokers file electronic entry through CBP Port 3901, securing prompt customs release before our local fleet performs final-mile delivery.',
      },
      {
        question: 'Can you deliver heavy personal crates or machinery to suburban Naperville and Schaumburg?',
        answer: 'Yes. We service all outer Chicagoland communities, including Naperville, Schaumburg, Aurora, and Oak Brook, utilizing liftgate-equipped delivery trucks capable of safely offloading heavy wooden crates and palletized household shipments into residential driveways.',
      },
    ],
    customsProcedures: {
      authority: 'U.S. Customs and Border Protection (CBP)',
      clearanceDepot: 'O’Hare International Airport Cargo Port Code 3901 & BNSF LPC Joliet CFS',
      dutyVatSummary: 'Commercial imports are processed via the Automated Broker Interface (ABI). Tariffs are determined by the US International Trade Commission HTSUS schedule.',
    },
  },

  'usa/houston': {
    countrySlug: 'usa',
    citySlug: 'houston',
    cityName: 'Houston',
    countryName: 'United States',
    metroAreaName: 'Greater Houston & Texas Gulf Coast',
    h1: 'Cargo Shipping to Houston from Pakistan (Air Freight & Port Houston Sea Cargo)',
    metaTitle: 'Cargo to Houston from Pakistan | Texas Air & Port Houston Sea Delivery | Raahi International',
    metaDescription: 'Direct cargo shipping from Pakistan to Houston, Sugar Land, Katy, and Hillcroft. Air cargo via IAH and direct ocean container services via Port Houston. Door-to-door delivery.',
    editorialOverview:
      'Houston is the energy capital of the world and the commercial powerhouse of the American South, home to one of the fastest-growing and most prosperous Pakistani-American diaspora communities. Raahi International operates scheduled air cargo routes into George Bush Intercontinental Airport (IAH) Air Cargo Center. For sea freight, maritime containers sail directly into Port Houston (Barbours Cut and Bayport container terminals) on the Houston Ship Channel—providing the fastest ocean transit route for heavy industrial machinery, energy sector valves, and full household relocations heading into Texas.',
    gateways: [
      {
        name: 'George Bush Intercontinental Airport (IAH)',
        code: 'IAH',
        type: 'air',
        role: 'Major southern US air logistics gateway handling widebody international freighters and connecting bellyhold cargo.',
        customsTerminal: 'IAH Air Cargo Center, Swissport Cargo, and Dnata Cargo Facility, Houston.',
      },
      {
        name: 'Port Houston (Bayport & Barbours Cut)',
        code: 'USHOU',
        type: 'ocean',
        role: 'Premier Gulf Coast container port handling direct international container vessels without rail intermodal delays.',
        customsTerminal: 'Bayport Container Terminal and Barbours Cut Customs Examination Station (CES).',
      },
    ],
    deliveryZones: [
      {
        zoneName: 'Hillcroft Commercial District (Mahatma Gandhi District)',
        coverageAreas: 'Southwest Houston, Hillcroft Avenue, Harwin Drive wholesale commercial zone, Sharpstown',
        postalOrZipCodes: '77036, 77074, 77081',
        dispatchSchedule: 'Daily morning and afternoon commercial store deliveries',
      },
      {
        zoneName: 'Southwest Suburbs & Diaspora Core',
        coverageAreas: 'Sugar Land, Missouri City, Stafford, Richmond, Rosenberg',
        postalOrZipCodes: '77478, 77479, 77459, 77477, 77406',
        dispatchSchedule: 'Daily scheduled afternoon residential deliveries',
      },
      {
        zoneName: 'West Houston & Energy Corridor',
        coverageAreas: 'Katy, Energy Corridor, Memorial, Spring Branch, Westchase',
        postalOrZipCodes: '77494, 77450, 77079, 77024, 77042',
        dispatchSchedule: 'Daily scheduled morning and afternoon residential deliveries',
      },
      {
        zoneName: 'North & Northwest Houston',
        coverageAreas: 'The Woodlands, Spring, Cypress, Tomball',
        postalOrZipCodes: '77380, 77379, 77429, 77375',
        dispatchSchedule: 'Scheduled linehaul runs three times weekly',
      },
    ],
    cargoTypes: [
      {
        category: 'Oilfield, Marine & Industrial Valves',
        typicalItems: 'High-pressure valves, steel flanges, oilfield pipe fittings, and precision castings manufactured in Gujranwala and Lahore',
        complianceRequirement: 'Requires commercial invoice, mill test certificates, country-of-origin marking, and CBP electronic entry.',
      },
      {
        category: 'Textiles, Lawn Suits & Festive Apparel',
        typicalItems: 'Pakistani lawn collections, wedding formals, and readymade clothing for boutiques along Hillcroft and Harwin Drive',
        complianceRequirement: 'Detailed commercial invoice with fiber content disclosure and commercial packing list.',
      },
      {
        category: 'Household Relocations & Medical Professional Baggage',
        typicalItems: 'Personal furniture, household goods, medical textbooks, and family cultural items',
        complianceRequirement: 'CBP Form 3299 and copy of valid US Visa or Permanent Resident card.',
      },
    ],
    transitTimelines: {
      airExpress: '4 to 7 business days airport-to-door directly into Houston',
      airStandard: '6 to 8 business days door-to-door with complete CBP IAH customs release',
      seaLcl: '26 to 34 days direct ocean transit into Port Houston + 2 business days CFS deconsolidation',
      seaFcl: '24 to 30 days direct container sailing + 2 days customs gate-out and flatbed delivery',
      lastMileNotes: 'All suburban deliveries in Sugar Land and Katy are serviced with liftgate trucks and scheduled appointment windows.',
    },
    faqs: [
      {
        question: 'Do you deliver commercial clothing shipments directly to shops on Hillcroft and Harwin Drive in Houston?',
        answer: 'Yes. Hillcroft Avenue and the Harwin wholesale trade district are daily delivery corridors for Raahi International. We deliver carton consignments directly into store backrooms with commercial invoice verification and full unloading support.',
      },
      {
        question: 'What are the customs procedures for industrial equipment and valves entering Port Houston?',
        answer: 'Industrial consignments entering Port Houston (Bayport or Barbours Cut) clear customs through CBP Port Code 5301. Our licensed customs brokers manage electronic ACE filing, verify steel and aluminum tariff classifications, and coordinate rapid container release.',
      },
      {
        question: 'Can you deliver heavy household crates and furniture to residential homes in Sugar Land and Katy, Texas?',
        answer: 'Yes. We provide comprehensive residential delivery across Sugar Land, Katy, and surrounding Houston suburbs. Our trucks feature hydraulic liftgates and pallet jacks, ensuring heavy wooden crates and household furniture are safely placed inside garages or driveways.',
      },
    ],
    customsProcedures: {
      authority: 'U.S. Customs and Border Protection (CBP)',
      clearanceDepot: 'Port Houston Bayport CES & IAH Air Cargo Inspection Station (Port Code 5301)',
      dutyVatSummary: 'Commercial imports are assessed per the US Harmonized Tariff Schedule (HTSUS). Used personal effects and household relocations qualify for duty-free exemption under CBP Form 3299.',
    },
  },
};

export function getCityLogisticsData(countrySlug: string, citySlug: string): CityLogisticsProfile | undefined {
  const key = `${countrySlug}/${citySlug}`;
  return cityLogisticsProfiles[key];
}
