import { createClient } from '@supabase/supabase-js';

export interface DestinationCityData {
  id: string;
  countryId: string;
  name: string;
  slug: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  overview?: string;
  preparationConsiderations?: string;
  deliveryCoverageNotes?: string;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

export interface DestinationCountryData {
  id: string;
  name: string;
  slug: string;
  region: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  shippingOverview?: string;
  customsGuidance?: string;
  supportedServices: string[];
  supportedOrigins: string[];
  cities: DestinationCityData[];
  faqs: Array<{ question: string; answer: string }>;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

export const staticDestinations: DestinationCountryData[] = [
  // 1. UNITED KINGDOM
  {
    id: 'uk',
    name: 'United Kingdom',
    slug: 'uk',
    region: 'Europe',
    h1: 'Cargo Services to United Kingdom from Pakistan',
    seoTitle: 'Cargo to UK from Pakistan | Air & Sea Freight',
    seoDescription: 'Reliable air and sea cargo services from Pakistan to London, Manchester, Birmingham, and all UK postcodes.',
    introduction: 'Direct air cargo linehaul and ocean container shipping from Pakistan to all United Kingdom destinations with doorstep delivery.',
    shippingOverview: 'Daily air freight departures to London Heathrow (LHR) and Manchester (MAN), plus weekly container ocean freight arriving at Felixstowe, London Gateway, and Southampton.',
    customsGuidance: 'Full customs guidance on UK import VAT (20%), ToR1 personal effects relief, commercial EORI filing, and CDS clearance.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'sialkot', 'faisalabad', 'rawalpindi', 'multan', 'peshawar'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'How long does air cargo take from Pakistan to the United Kingdom?',
        answer: 'Express air cargo to London, Manchester, and Birmingham takes 3–5 business days door-to-door, including export handling in Pakistan and HMRC import customs clearance in the UK.',
      },
      {
        question: 'What is HMRC Transfer of Residence (ToR1) relief for UK personal effects?',
        answer: 'HMRC ToR1 allows individuals moving their primary residence to the UK to import used personal belongings, household goods, and baggage 100% free of import duty and VAT, provided the items have been owned and used abroad for at least 6 months.',
      },
      {
        question: 'Can commercial businesses in the UK import textiles, surgical goods, and leather from Pakistan?',
        answer: 'Yes. Commercial consignments require a valid UK EORI number. Raahi International provides commercial invoice assistance, preferential tariff documentation, and customs clearance through UK bonded freight sheds.',
      },
    ],
    cities: [
      {
        id: 'uk-london',
        countryId: 'uk',
        name: 'London',
        slug: 'london',
        h1: 'Cargo to London from Pakistan (Air & Sea Doorstep Delivery)',
        seoTitle: 'Cargo to London from Pakistan | Air & Sea Freight Delivery | Raahi',
        seoDescription: 'Doorstep air and sea cargo delivery from Pakistan to Greater London. LHR & LGW airport clearance, HMRC VAT/ToR1 relief, and M25 delivery coverage.',
        introduction: 'Ship commercial goods and personal diaspora consignments from Pakistan directly to London. With daily air freight arrivals at London Heathrow (LHR) and London Gatwick (LGW), plus ocean container shipping via London Gateway and Port of Tilbury, Raahi International delivers across all 32 London boroughs.',
        overview: 'London represents one of the largest Pakistani diaspora hubs globally. Our linehaul routes connect Lahore, Karachi, Islamabad, and Sialkot with Heathrow Airport for express air consignments and deep-water ocean terminals for consolidated container freight. Every consignment is handled through HMRC-bonded warehouses with full customs clearance and final-mile van delivery.',
        preparationConsiderations: 'UK import VAT is 20% on commercial goods unless tariff-exempt. For relocating individuals, HMRC Transfer of Residence (ToR1) provides 100% relief from import duty and VAT on personal effects owned for at least 6 months. Commercial shipments require an active UK EORI number.',
        deliveryCoverageNotes: 'Full delivery coverage across North, South, East, and West London postcodes (E, EC, N, NW, SE, SW, W, WC), including Newham, Waltham Forest, Redbridge, Brent, Ealing, and Croydon.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'uk-manchester',
        countryId: 'uk',
        name: 'Manchester',
        slug: 'manchester',
        h1: 'Cargo to Manchester from Pakistan (Air Freight & Sea Cargo)',
        seoTitle: 'Cargo to Manchester from Pakistan | Air & Ocean Doorstep Delivery | Raahi',
        seoDescription: 'Fast door-to-door cargo from Pakistan to Greater Manchester. Serving Rusholme, Cheetham Hill, Oldham, and Rochdale via Manchester Airport (MAN) and Liverpool port.',
        introduction: 'Connecting Pakistan\'s industrial origins with the commercial and cultural center of North West England. Direct cargo routing through Manchester Airport (MAN) World Freight Terminal and container lines via the Port of Liverpool.',
        overview: 'Greater Manchester is home to substantial diaspora communities in Rusholme (Curry Mile), Cheetham Hill, Oldham, Rochdale, and Bolton. Raahi International manages scheduled air cargo arrivals at MAN airport for fast customs clearance and direct door delivery across Lancashire and Greater Manchester.',
        preparationConsiderations: 'HMRC customs clearance is processed electronically via the CDS system. Foodstuffs must adhere to UK DEFRA standards (no commercial meat/dairy without veterinary certification). Commercial traders require a valid UK EORI number.',
        deliveryCoverageNotes: 'Coverage across M-postcodes (M1-M99), Oldham (OL), Bolton (BL), Rochdale (OL), Stockport (SK), and surrounding North West commercial zones.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'uk-birmingham',
        countryId: 'uk',
        name: 'Birmingham',
        slug: 'birmingham',
        h1: 'Cargo to Birmingham from Pakistan (Air Freight & Doorstep Delivery)',
        seoTitle: 'Cargo to Birmingham from Pakistan | West Midlands Air & Sea Delivery | Raahi',
        seoDescription: 'Direct cargo from Pakistan to Birmingham and the West Midlands. Serving Sparkbrook, Alum Rock, Handsworth, and Coventry via BHX airport and regional freight depots.',
        introduction: 'Door-to-door air freight and container shipping from Pakistan to Birmingham and the broader West Midlands region. Fast clearance through Birmingham Airport (BHX) cargo terminal and bonded Midlands distribution hubs.',
        overview: 'Birmingham and the Black Country represent a vital Pakistani diaspora destination with prominent communities in Sparkbrook, Alum Rock, Handsworth, Saltley, and Small Heath. Our service provides complete doorstep delivery from Pakistan origins including Lahore, Islamabad, Mirpur corridor, and Karachi.',
        preparationConsiderations: 'Commercial shipments are assessed under the UK Integrated Online Tariff. Personal household relocations qualify for duty/tax exemption via approved HMRC ToR1 reference numbers.',
        deliveryCoverageNotes: 'Complete delivery across Birmingham postcodes (B1-B98), Dudley (DY), Walsall (WS), Wolverhampton (WV), and Coventry (CV).',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },

  // 2. UNITED ARAB EMIRATES
  {
    id: 'uae',
    name: 'United Arab Emirates',
    slug: 'uae',
    region: 'Middle East',
    h1: 'Cargo Services to United Arab Emirates from Pakistan',
    seoTitle: 'Cargo to UAE from Pakistan | Air & Sea Freight',
    seoDescription: 'Fast door-to-door cargo to Dubai, Abu Dhabi, Sharjah, and all UAE emirates from Pakistan.',
    introduction: 'Express air cargo and consolidated ocean container shipping from Pakistan to the UAE.',
    shippingOverview: 'Frequent daily flights to Dubai (DXB/DWC) and Abu Dhabi (AUH), with rapid 4–6 day ocean transit to Jebel Ali Port.',
    customsGuidance: 'Dubai and Abu Dhabi Customs processing: 5% commercial duty and 5% VAT. Duty-free personal effects clearance with valid Emirates ID.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'sialkot', 'faisalabad', 'rawalpindi', 'multan', 'peshawar'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'How fast is express air cargo from Pakistan to Dubai and Abu Dhabi?',
        answer: 'Air cargo to the UAE takes just 2–4 business days door-to-door. With multiple direct flights daily from Karachi, Lahore, and Islamabad, packages clear customs rapidly upon landing at DXB or AUH.',
      },
      {
        question: 'Can I send personal effects and household luggage duty-free to the UAE?',
        answer: 'Yes. Used personal effects and household items enter the UAE duty-free when accompanied by a copy of the recipient’s valid UAE residence visa, passport, and Emirates ID.',
      },
    ],
    cities: [
      {
        id: 'uae-dubai',
        countryId: 'uae',
        name: 'Dubai',
        slug: 'dubai',
        h1: 'Cargo to Dubai from Pakistan (Express Air & Jebel Ali Sea Cargo)',
        seoTitle: 'Cargo to Dubai from Pakistan | Express Air & Ocean Doorstep Delivery | Raahi',
        seoDescription: 'Ultra-fast cargo from Pakistan to Dubai. Daily flights via DXB & DWC, ocean containers via Jebel Ali Port. Doorstep delivery across Deira, Bur Dubai, and Business Bay.',
        introduction: 'Ultra-fast air cargo and ocean container shipping from Pakistan to Dubai. Dispatched via daily wide-body flights into Dubai International Airport (DXB) and Al Maktoum International (DWC), alongside maritime container services docking at Jebel Ali Port.',
        overview: 'Dubai is Pakistan’s closest international trade and diaspora destination. With flight transit times under 3.5 hours from Karachi and Lahore, our express air cargo delivers to your recipient’s door within 2 to 4 business days. Ocean freight via Jebel Ali handles heavy commercial machinery, building materials, and large household relocations.',
        preparationConsiderations: 'Dubai Customs applies 5% customs duty and 5% VAT on commercial CIF value. Used personal effects and household goods owned for over 6 months enter duty-free with a valid UAE residence visa and Emirates ID copy. GCC trade documents require attested commercial invoices.',
        deliveryCoverageNotes: 'Door-to-door delivery across Deira, Bur Dubai, Jumeirah, Business Bay, Downtown Dubai, Al Barsha, Dubai Marina, JLT, and Dubai Industrial City (DIC).',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'uae-abu-dhabi',
        countryId: 'uae',
        name: 'Abu Dhabi',
        slug: 'abu-dhabi',
        h1: 'Cargo to Abu Dhabi from Pakistan (Air & Sea Freight Doorstep Service)',
        seoTitle: 'Cargo to Abu Dhabi from Pakistan | Air & Ocean Door Delivery | Raahi',
        seoDescription: 'Cargo from Pakistan to Abu Dhabi in 2–4 days by air or 5–8 days by sea. Door-to-door delivery to Mussafah and Al Ain, customs cleared. Get a quote today.',
        introduction: 'Reliable air freight and container sea cargo shipping from Pakistan to the UAE capital. Direct linehaul into Zayed International Airport (AUH) and Khalifa Port (KPT) with comprehensive delivery across Abu Dhabi emirate.',
        overview: 'Serving business enterprises, government contractors, and diaspora families across Abu Dhabi, Mussafah Industrial Area, and Al Ain. Raahi International provides scheduled customs clearance and direct road feeder distribution from airport terminals directly to residential and commercial addresses.',
        preparationConsiderations: 'Abu Dhabi Customs processes imports via the Advanced Trade & Logistics Platform (ATLP). Standard commercial duty is 5% plus 5% VAT. Personal effects clear duty-free upon presentation of recipient’s Emirates ID and passport copies.',
        deliveryCoverageNotes: 'Full coverage across Abu Dhabi Island (Corniche, Al Khalidiyah, Al Reem Island), Mussafah Industrial Zones (M1-M44), Khalifa City, Mohammed Bin Zayed City, and Al Ain.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },

  // 3. SAUDI ARABIA
  {
    id: 'ksa',
    name: 'Saudi Arabia',
    slug: 'ksa',
    region: 'Middle East',
    h1: 'Cargo Services to Saudi Arabia from Pakistan',
    seoTitle: 'Cargo to Saudi Arabia (KSA) from Pakistan | Air & Sea Freight',
    seoDescription: 'Door-to-door cargo shipping from Pakistan to Riyadh, Jeddah, Dammam, and across Saudi Arabia.',
    introduction: 'Fast, secure air cargo and sea freight services from Pakistan to the Kingdom of Saudi Arabia.',
    shippingOverview: 'Direct wide-body linehaul flights to King Khalid International Airport (RUH) in Riyadh and King Abdulaziz International Airport (JED) in Jeddah.',
    customsGuidance: 'Full ZATCA customs clearance, electronic SABER certificate compliance for commercial cargo, and personal effects Iqama processing.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'sialkot', 'faisalabad', 'rawalpindi', 'multan', 'peshawar'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'What documents are required to receive cargo in Saudi Arabia?',
        answer: 'Personal cargo requires a clear copy of the recipient’s Saudi National ID or resident Iqama. Commercial shipments require an active Commercial Registration (CR), VAT registration certificate, and SABER electronic conformity approval.',
      },
      {
        question: 'Can pilgrims send excess luggage or Zamzam water from Jeddah to Pakistan?',
        answer: 'Personal luggage and unaccompanied baggage can be shipped through our Jeddah facility. Commercially certified Zamzam water is subject to airline and civil aviation regulations.',
      },
    ],
    cities: [
      {
        id: 'ksa-riyadh',
        countryId: 'ksa',
        name: 'Riyadh',
        slug: 'riyadh',
        h1: 'Cargo to Riyadh from Pakistan (Air Freight & Dry Port Sea Cargo)',
        seoTitle: 'Cargo to Riyadh from Pakistan | Air Freight & Sea Delivery | Raahi',
        seoDescription: 'Air cargo from Pakistan to Riyadh in 3–5 business days, sea cargo in 14–18 days. Door-to-door delivery with FASAH customs clearance. Request a quote now.',
        introduction: 'Direct international air cargo and sea freight services connecting Pakistan export hubs with Riyadh, the capital of Saudi Arabia. Operating via King Khalid International Airport (RUH) and Riyadh Dry Port with full ZATCA customs facilitation.',
        overview: 'Riyadh hosts a vast community of Pakistani professionals, business owners, and technical personnel. Raahi International coordinates express air cargo shipments from Lahore, Islamabad, Karachi, and Peshawar directly into King Khalid International Airport, with dedicated customs clearing and doorstep van delivery across all Riyadh municipal zones.',
        preparationConsiderations: 'Zakat, Tax and Customs Authority (ZATCA) enforces strict SABER electronic conformity certification for regulated commercial imports. Commercial duty ranges from 5% to 15% plus 15% standard VAT. Used personal effects enter duty-free with an active Saudi Iqama copy.',
        deliveryCoverageNotes: 'Serving central Riyadh (Al Batha, Al Olaya, Al Malaz), northern districts (Al Nakheel, Al Yasmin), and Modon Industrial Cities (1, 2, 3).',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'ksa-jeddah',
        countryId: 'ksa',
        name: 'Jeddah',
        slug: 'jeddah',
        h1: 'Cargo to Jeddah from Pakistan (Air Freight & Jeddah Islamic Port Sea Cargo)',
        seoTitle: 'Cargo to Jeddah from Pakistan | Red Sea Air & Ocean Delivery | Raahi',
        seoDescription: 'Ship cargo from Pakistan to Jeddah and Makkah: air in 3–5 business days, sea in 10–14 days. Door-to-door with ZATCA customs clearance. Get a quote today.',
        introduction: 'Premier air freight and maritime container shipping from Pakistan to Jeddah, Makkah, and the Western Province of Saudi Arabia. Linehaul arrivals via King Abdulaziz International Airport (JED) and Jeddah Islamic Port.',
        overview: 'As the gateway to the Holy Cities and the primary maritime port on the Red Sea, Jeddah is a vital cargo corridor for Pakistani exporters and diaspora families. Raahi International provides rapid air cargo clearance through JED airport bonded terminals and sea container distribution through Jeddah Islamic Port.',
        preparationConsiderations: 'ZATCA clearance requires SASO / SABER compliance certificates for manufactured commercial products. Standard VAT is 15%. Used personal effects and Umrah/Hajj excess baggage clear with valid Iqama or passport copies under personal effects exemption.',
        deliveryCoverageNotes: 'Door-to-door delivery across Jeddah (Al Balad, Al Rawdah, Al Hamra, Al Zahra, Obhur), plus scheduled onward distribution to Makkah and Taif.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },

  // 4. CANADA
  {
    id: 'canada',
    name: 'Canada',
    slug: 'canada',
    region: 'North America',
    h1: 'Cargo Services to Canada from Pakistan',
    seoTitle: 'Cargo to Canada from Pakistan | Air Freight & Container Shipping',
    seoDescription: 'Door-to-door cargo to Toronto, Vancouver, Calgary, and across Canada from Pakistan.',
    introduction: 'Comprehensive air cargo and sea freight services connecting Pakistan to Canada.',
    shippingOverview: 'Direct air freight connections to Toronto Pearson (YYZ) and Vancouver (YVR), complemented by CN/CP rail intermodal container distribution across all Canadian provinces.',
    customsGuidance: 'Canada Border Services Agency (CBSA) guidelines: Form BSF186 tax-free personal effects relief, $60 CAD duty-free gift threshold, and commercial GST/HST filing.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'sialkot', 'faisalabad', 'rawalpindi', 'multan', 'peshawar'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'What is the duty-free gift allowance when sending cargo to Canada from Pakistan?',
        answer: 'Under CBSA regulations, gifts sent from abroad to friends or relatives in Canada are exempt from duty and taxes if the declared value does not exceed $60 CAD per gift. Amounts over $60 CAD are subject to duties and GST/HST on the excess portion.',
      },
      {
        question: 'How do new immigrants and students clear personal effects into Canada?',
        answer: 'New immigrants and returning Canadians clear personal effects duty-free using CBSA Form BSF186 (Personal Effects Accounting Document). Raahi International assists you with pre-arrival documentation so your goods clear without unexpected fees.',
      },
    ],
    cities: [
      {
        id: 'canada-toronto',
        countryId: 'canada',
        name: 'Toronto',
        slug: 'toronto',
        h1: 'Cargo to Toronto from Pakistan (Air Freight & Doorstep Delivery)',
        seoTitle: 'Cargo to Toronto from Pakistan | GTA Air & Ocean Door Delivery | Raahi',
        seoDescription: 'Cargo from Pakistan to Toronto and the GTA: air in 4–7 business days, sea in 30–36 days. Door delivery with CBSA customs release. Request your quote today.',
        introduction: 'Transatlantic air cargo and intermodal sea freight delivery from Pakistan to the Greater Toronto Area (GTA). Dispatched via Toronto Pearson International Airport (YYZ) and CN/CP rail intermodal terminals with full CBSA clearance.',
        overview: 'The Greater Toronto Area is home to the largest Pakistani community in North America, with deep roots in Mississauga, Brampton, Scarborough, Markham, and Milton. Raahi International manages scheduled air cargo arrivals at YYZ Pearson for rapid customs release and door delivery across Ontario.',
        preparationConsiderations: 'Canada Border Services Agency (CBSA) applies 5% federal GST plus 13% provincial HST in Ontario on commercial imports. Bona fide gifts sent by friends or relatives abroad are duty-free if the value does not exceed $60 CAD per gift. Settlers and relocating individuals qualify for tax-free personal effects entry under CBSA Form BSF186 (Personal Effects Accounting Document). Commercial goods over $3,300 CAD require formal electronic entry.',
        deliveryCoverageNotes: 'Complete delivery across Toronto (M-postcodes), Mississauga (L4, L5), Brampton (L6, L7), Oakville (L6), Scarborough (M1), and Vaughan (L4).',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'canada-vancouver',
        countryId: 'canada',
        name: 'Vancouver',
        slug: 'vancouver',
        h1: 'Cargo to Vancouver from Pakistan (Air Freight & Port Sea Cargo)',
        seoTitle: 'Cargo to Vancouver from Pakistan | BC Air & Ocean Door Delivery | Raahi',
        seoDescription: 'Air cargo from Pakistan to Vancouver in 5–8 business days, sea in 32–38 days. Door delivery across Surrey and Richmond, CBSA cleared. Get a quote today.',
        introduction: 'Direct air freight and ocean container shipping connecting Pakistan export hubs with Vancouver and British Columbia. Operating through Vancouver International Airport (YVR) and Port of Vancouver (Deltaport and Centerm) terminals.',
        overview: 'Vancouver and the Lower Mainland host thriving diaspora and commercial communities in Surrey, Richmond, Burnaby, and Abbotsford. Raahi International coordinates air cargo flights into YVR for time-sensitive personal baggage and sample goods, alongside ocean container shipping for large household moves and commercial trade.',
        preparationConsiderations: 'CBSA imports entering British Columbia are subject to 5% federal GST plus applicable duties. Gifts under $60 CAD qualify for duty-free entry. Personal relocations require approved BSF186 accounting forms. Wood packaging must comply strictly with Canadian CFIA ISPM-15 standards.',
        deliveryCoverageNotes: 'Door-to-door distribution throughout Metro Vancouver (V-postcodes), Surrey (V3, V4), Richmond (V6, V7), Burnaby (V5), Coquitlam, and Abbotsford.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },

  // 5. UNITED STATES
  {
    id: 'usa',
    name: 'United States',
    slug: 'usa',
    region: 'North America',
    h1: 'Cargo Services to United States from Pakistan',
    seoTitle: 'Cargo to USA from Pakistan | Air & Sea Freight Shipping',
    seoDescription: 'Door-to-door shipping from Pakistan to New York, Chicago, Houston, and all 50 US states.',
    introduction: 'Transatlantic air cargo and consolidated ocean container shipping from Pakistan to the United States.',
    shippingOverview: 'Linehaul air cargo arrivals at JFK (New York), ORD (Chicago), and IAH (Houston), supported by nationwide bonded intermodal trucking across all 50 states.',
    customsGuidance: 'U.S. Customs and Border Protection (CBP) facilitation: Section 321 duty-free de minimis up to $800 USD, CBP Form 3299 personal effects clearance, and ISF 10+2 ocean filing.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'sialkot', 'faisalabad', 'rawalpindi', 'multan', 'peshawar'],
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: [
      {
        question: 'What is the Section 321 de minimis duty-free limit for shipping to the United States?',
        answer: 'Under Section 321 of the US Tariff Act, commercial or personal shipments valued at $800 USD or less can enter the United States free of duty and taxes, without requiring a formal customs broker entry, provided only one shipment is imported per recipient per day.',
      },
      {
        question: 'How do I send personal household items and furniture to the USA duty-free?',
        answer: 'Personal effects and household items owned and used abroad for at least one year qualify for duty-free entry into the United States under CBP Form 3299 (Declaration for Free Entry of Unaccompanied Articles). Raahi International assists you with this filing.',
      },
    ],
    cities: [
      {
        id: 'usa-new-york',
        countryId: 'usa',
        name: 'New York',
        slug: 'new-york',
        h1: 'Cargo to New York from Pakistan (Air & Ocean Doorstep Delivery)',
        seoTitle: 'Cargo to New York from Pakistan | JFK & Port of NY Door Delivery | Raahi',
        seoDescription: 'Cargo from Pakistan to New York in 4–6 business days by air or 26–32 days by sea. Door delivery to Brooklyn and Queens, CBP cleared. Request a quote today.',
        introduction: 'Fast, dependable door-to-door cargo shipping from Pakistan to New York City, Long Island, and the tri-state area. Operating through John F. Kennedy International Airport (JFK) air cargo facilities and the Port of New York and New Jersey container terminals.',
        overview: 'New York City and the surrounding tri-state region encompass the historic heart of the Pakistani-American diaspora, with bustling hubs in Jackson Heights (Queens), Coney Island Avenue / Little Pakistan (Brooklyn), Staten Island, and Long Island. Raahi International provides scheduled air freight arrivals at JFK and maritime ocean container unloading at Port Newark / Elizabeth.',
        preparationConsiderations: 'U.S. Customs and Border Protection (CBP) enforces the Section 321 de minimis exemption, allowing eligible commercial and gift shipments valued up to $800 USD to enter duty-free without formal entry. Commercial consignments over $2,500 USD require formal customs broker filing via ACE. Personal effects relocations qualify for duty-free entry under CBP Form 3299 (Declaration for Free Entry of Unaccompanied Articles).',
        deliveryCoverageNotes: 'Serving all 5 NYC boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island), Long Island (Nassau and Suffolk counties), and northern New Jersey.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'usa-chicago',
        countryId: 'usa',
        name: 'Chicago',
        slug: 'chicago',
        h1: 'Cargo to Chicago from Pakistan (Air Freight & Rail Intermodal Sea Cargo)',
        seoTitle: 'Cargo to Chicago from Pakistan | Air & Ocean Door Delivery | Raahi',
        seoDescription: 'Air cargo from Pakistan to Chicago in 4–7 business days, sea in 28–34 days. Door delivery to Devon Avenue and the suburbs, CBP cleared. Get a quote today.',
        introduction: 'Door-to-door international air freight and containerized ocean cargo connecting Pakistan with Chicago and the American Midwest. Dispatched directly through Chicago O’Hare International Airport (ORD) and major rail intermodal logistics parks.',
        overview: 'Chicago boasts one of the most vibrant Pakistani communities in North America, anchored around the famed Devon Avenue (Gandhi Marg / Jinnah Way) in West Ridge, alongside extensive suburban communities in Schaumburg, Naperville, Lombard, and Skokie. Raahi International provides direct linehaul air arrivals into O’Hare Airport for express parcels and intermodal rail container forwarding from coastal ports.',
        preparationConsiderations: 'CBP clears air cargo at O’Hare International Airport (ORD) bonded freight facilities. The Section 321 $800 USD threshold applies for duty-free de minimis imports. Household relocations require completed CBP Form 3299 and copy of valid US visa or green card. Agricultural products are subject to USDA APHIS inspection.',
        deliveryCoverageNotes: 'Complete delivery across Chicago city proper (606xx zip codes), West Ridge (Devon Ave), and suburbs: Schaumburg (60173), Naperville (60540), Lombard (60148), and Oak Brook.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'usa-houston',
        countryId: 'usa',
        name: 'Houston',
        slug: 'houston',
        h1: 'Cargo to Houston from Pakistan (Air Freight & Port Houston Sea Cargo)',
        seoTitle: 'Cargo to Houston from Pakistan | Texas Air & Port Houston Sea Delivery | Raahi',
        seoDescription: 'Cargo from Pakistan to Houston: air in 4–7 business days, sea in 26–34 days via Port Houston. Door delivery to Sugar Land and Katy. Request a quote today.',
        introduction: 'Commercial and personal cargo delivery from Pakistan to Houston and the state of Texas. Operating via George Bush Intercontinental Airport (IAH) air freight terminals and Port Houston (Bayport and Barbours Cut) container terminals.',
        overview: 'Houston is home to one of the largest and most prosperous Pakistani-American communities, concentrated around Hillcroft (Mahatma Gandhi District / Little South Asia), Sugar Land, Katy, Pearland, and Spring. Raahi International coordinates direct and connecting air freighter flights into IAH alongside ocean container shipping via the Gulf of Mexico through Port Houston.',
        preparationConsiderations: 'U.S. Customs clearance at IAH and Port Houston is processed via the Automated Broker Interface (ABI). Shipments up to $800 USD enter under Section 321 duty-free de minimis rules. Personal effects, furniture, and family items enter duty-free under CBP Form 3299. Commercial energy and manufacturing goods require standard HTSUS tariff classification.',
        deliveryCoverageNotes: 'Full coverage across Houston metro area (770xx zip codes), Southwest Houston (Hillcroft), Sugar Land (77478, 77479), Katy (77449, 77450), The Woodlands, and Pearland.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
  },
];

export async function getPublishedDestinations(): Promise<DestinationCountryData[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('destination_countries')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          region: d.region || 'Global',
          h1: d.h1 || `Cargo Services to ${d.name}`,
          seoTitle: d.meta_title || `Cargo to ${d.name}`,
          seoDescription: d.meta_description || `Cargo shipping to ${d.name}`,
          introduction: d.meta_description || `Cargo shipping to ${d.name}`,
          customsGuidance: d.customs_summary || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedOrigins: [],
          cities: [],
          faqs: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
        }));
      }
    } catch (err: unknown) {
      console.error('getPublishedDestinations fetch error:', err);
    }
  }

  return staticDestinations;
}

export async function getDestinationBySlug(slug: string): Promise<DestinationCountryData | undefined> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('destination_countries')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          region: data.region || 'Global',
          h1: data.h1 || `Cargo Services to ${data.name}`,
          seoTitle: data.meta_title || `Cargo to ${data.name}`,
          seoDescription: data.meta_description || `Cargo shipping to ${data.name}`,
          introduction: data.meta_description || `Cargo shipping to ${data.name}`,
          customsGuidance: data.customs_summary || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedOrigins: [],
          cities: [],
          faqs: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
        };
      }
    } catch (err: unknown) {
      console.error('getDestinationBySlug fetch error:', err);
    }
  }

  return staticDestinations.find((d) => d.slug === slug);
}

export function getPublishedStaticDestinations(): DestinationCountryData[] {
  return staticDestinations.filter(
    (dest) => dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true
  );
}

export function getStaticDestinationBySlug(slug: string): DestinationCountryData | undefined {
  const dest = staticDestinations.find((d) => d.slug === slug);
  if (dest && dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true) {
    return dest;
  }
  return undefined;
}

export function getStaticDestinationCity(
  countrySlug: string,
  citySlug: string
): { country: DestinationCountryData; city: DestinationCityData } | undefined {
  const country = getStaticDestinationBySlug(countrySlug);
  if (!country) return undefined;

  const city = country.cities.find((c) => c.slug === citySlug);
  if (
    city &&
    city.status === 'published' &&
    city.isVerified === true &&
    city.isIndexable === true
  ) {
    return { country, city };
  }
  return undefined;
}
