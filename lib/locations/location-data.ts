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
    h1: 'International Cargo Services in Lahore — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Lahore | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Lahore for air cargo, sea cargo, household goods & commercial shipments. Door-to-door pickup, customs clearance & worldwide delivery from Lahore.',
    primaryKeyword: 'international cargo services in Lahore',
    introduction:
      "If you're searching for international cargo services in Lahore, Raahi International provides complete air cargo, sea cargo, and door-to-door shipping solutions for individuals, families, and businesses sending shipments from Lahore to destinations worldwide. Whether you need to send personal belongings, household goods, commercial cargo, parcels, or larger consignments, our Lahore cargo services cover the entire international shipping process — from doorstep pickup to final delivery abroad.\n\nOur international cargo company in Lahore combines cargo collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one complete service — so you don't need to coordinate multiple providers for a single shipment.",
    localCoverageText:
      'We collect cargo from all major areas of Lahore, including DHA Lahore, Gulberg, Model Town, Johar Town, Bahria Town Lahore, Wapda Town, Cantt, Iqbal Town, and Allama Iqbal Town, as well as surrounding industrial zones along Ferozepur Road and Multan Road.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Main Airport Cargo Terminal Area, Lahore Cantt, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Lahore',
        content:
          'Our door-to-door cargo service in Lahore means your shipment is collected directly from your home, office, shop, or warehouse and delivered to the final address at your destination country — with no need to visit a cargo office or freight terminal.\n\nDoor-to-door international shipping from Lahore includes exact services depending on your shipment type, destination country, and chosen shipping method — our team advises the best option when you request a quote.',
        list: [
          'Doorstep cargo pickup in Lahore',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Lahore',
        content:
          'For urgent, lightweight, or time-sensitive international shipments, air cargo from Lahore offers significantly faster delivery than sea freight — often within days rather than weeks.\n\nAir cargo pricing from Lahore is generally calculated using actual weight or volumetric weight (whichever is greater), along with destination, cargo type, and service level.',
        list: [
          'Personal belongings and gifts',
          'Documents and urgent parcels',
          'Business samples',
          'Commercial goods and export products',
          'Electronics and permitted high-value items',
          'Household items sent on a tighter timeline',
          'Time-sensitive and perishable shipments',
        ],
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Lahore',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Lahore is typically the most cost-effective international shipping option — especially for FCL (Full Container Load) and LCL (Less than Container Load) shipments.\n\nSea cargo from Lahore moves through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        list: [
          'Household goods and furniture',
          'Commercial and business cargo',
          'Bulk shipments and business inventory',
          'Machinery and industrial equipment',
          'Larger personal consignments',
          'Export goods for overseas buyers',
        ],
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Lahore',
        content:
          "Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Lahore is built for exactly this — whether you're moving permanently or simply sending personal effects to loved ones.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations. This is one of the most common services we provide for the large overseas Pakistani community sending goods from Lahore to the UK, USA, Canada, and the Gulf.",
      },
      {
        title: 'Commercial Cargo Services from Lahore',
        content:
          "Lahore is one of Pakistan's largest commercial and industrial hubs, and businesses across the city rely on international cargo services to reach overseas customers and partners. Our commercial cargo service from Lahore supports exporters sending products, samples, inventory, and business shipments internationally.\n\nWe help select the right shipping method — air freight for urgent commercial cargo, sea freight (FCL/LCL) for bulk export orders — based on weight, volume, destination, and delivery timeline.",
        links: [{ label: 'View Commercial Services', href: '/services/commercial-cargo' }],
      },
      {
        title: 'Customs Clearance & Documentation for Lahore Shipments',
        content:
          'International shipments from Lahore require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Requirements vary by destination, goods type, and shipment value — our team reviews your cargo details before booking to ensure a smooth customs process.',
        list: [
          'Export documentation preparation',
          'Customs declaration and coordination',
          'Compliance with destination-country import regulations',
          'Guidance on restricted and prohibited items',
        ],
      },
      {
        title: 'Why Choose Raahi International for Cargo Services in Lahore?',
        content:
          'Choosing Raahi International means partnering with an experienced logistics team dedicated to handling your overseas shipment safely and efficiently.',
        list: [
          'Door-to-door shipping across all Lahore areas',
          'Air cargo and sea cargo (FCL & LCL) solutions',
          'Doorstep pickup — no drop-off required',
          'Personal, household, and commercial cargo handling',
          'Full documentation and customs clearance assistance',
          'Worldwide destination delivery',
          'End-to-end support from pickup to final delivery',
        ],
      },
      {
        title: 'Ship from Lahore to Worldwide Destinations',
        content:
          "Whether you're sending a small personal parcel or a large commercial shipment, our international cargo services in Lahore cover popular destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping schedules.",
        links: [
          { label: 'Lahore to UK Cargo', href: '/destinations/uk?origin=lahore' },
          { label: 'Lahore to UAE Cargo', href: '/destinations/uae?origin=lahore' },
          { label: 'Lahore to USA Cargo', href: '/destinations/usa?origin=lahore' },
        ],
      },
      {
        title: 'How International Cargo Shipping from Lahore Works',
        content:
          'Our streamlined 6-step international cargo dispatch workflow ensures your shipment moves smoothly from your Lahore address to its destination abroad:',
        list: [
          '1. Request a Quote — Share your destination, cargo details, weight, and dimensions',
          '2. Choose Your Shipping Method — We help determine whether air freight or sea freight suits your shipment',
          '3. Pickup & Preparation — Your cargo is collected from your Lahore address and professionally packed',
          '4. Documentation & Customs — Required shipping and customs paperwork is prepared and processed',
          '5. International Transportation — Your shipment is dispatched via air or sea freight',
          '6. Destination Delivery — Cargo is delivered to the destination address, door-to-door',
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Lahore do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Lahore, including DHA, Gulberg, Model Town, Johar Town, Bahria Town, Wapda Town, Cantt, and surrounding industrial zones.',
      },
      {
        question: 'How much does international cargo shipping from Lahore cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Lahore?',
        answer:
          'Air cargo is faster and better suited to urgent, lightweight, or high-value shipments. Sea cargo is more economical for larger, heavier, or bulk shipments where delivery time is less critical.',
      },
      {
        question: 'Can I send household goods from Lahore when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Lahore for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Lahore shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Lahore, both in Pakistan and at the destination country.',
      },
      {
        question: 'Which countries can I ship cargo to from Lahore?',
        answer:
          'We ship from Lahore to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 2. KARACHI
  {
    id: 'karachi',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    h1: 'International Cargo Services in Karachi — Direct Port Access, Air & Sea Cargo Worldwide',
    seoTitle: 'International Cargo Services in Karachi | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Karachi with direct port access. Air cargo, sea cargo (FCL/LCL), household goods & commercial shipments. Door-to-door pickup & customs clearance.',
    primaryKeyword: 'international cargo services in Karachi',
    introduction:
      "As Pakistan's principal port city, Karachi offers a direct advantage for international cargo that no inland city can match — shipments move straight to Karachi Port and Port Qasim without the additional inland freight time and cost that inland cities require to reach the coast. Raahi International provides complete international cargo services in Karachi, covering air cargo, sea cargo, and door-to-door shipping for individuals, families, and businesses sending shipments worldwide.\n\nOur Karachi cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into a single streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major areas of Karachi, including Clifton, DHA Karachi, Gulshan-e-Iqbal, North Nazimabad, Korangi, Saddar, Malir, and PECHS, as well as the industrial zones along Korangi Industrial Area and SITE.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Cargo Port Complex, Korangi Industrial Area, Karachi, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Karachi',
        content:
          'Our door-to-door cargo service in Karachi means your shipment is collected directly from your home, office, shop, or warehouse and delivered to the final address at your destination country — with no need to visit a port terminal or cargo office yourself.',
        list: [
          'Doorstep cargo pickup across Karachi',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Direct port access and customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Karachi',
        content:
          "For urgent, lightweight, or time-sensitive shipments, air cargo from Karachi provides fast international delivery through Jinnah International Airport, one of Pakistan's busiest cargo hubs with frequent international departures.\n\nAir freight from Karachi is well suited for personal belongings, urgent parcels, commercial goods, and time-sensitive perishable exports including seafood.",
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Karachi',
        content:
          'Karachi is Pakistan’s primary sea freight hub, home to both Karachi Port and Port Qasim — meaning sea cargo from Karachi bypasses the inland transport required by shipments originating in other cities. This makes sea cargo from Karachi one of the most efficient and cost-effective international shipping options in the country, particularly for FCL (Full Container Load) and LCL (Less than Container Load) shipments.',
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Karachi',
        content:
          'Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Karachi supports both permanent relocation and personal effects shipments to family and friends.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations.',
      },
      {
        title: 'Commercial Cargo Services from Karachi',
        content:
          'As Pakistan’s largest commercial and industrial city, Karachi is home to major export sectors including textiles, pharmaceuticals, chemicals, seafood, and light engineering goods. Our commercial cargo service from Karachi supports exporters and businesses sending products, samples, inventory, and bulk shipments.',
      },
      {
        title: 'Customs Clearance & Documentation for Karachi Shipments',
        content:
          "As the location of Pakistan's two major ports, Karachi handles a significant share of the country's international customs processing. Our team assists with export documentation preparation, customs declaration at Karachi Port and Port Qasim, and compliance coordination.",
      },
      {
        title: 'Ship from Karachi to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a large commercial shipment, our international cargo services in Karachi cover popular destinations worldwide.',
        links: [
          { label: 'Karachi to UK Cargo', href: '/destinations/uk?origin=karachi' },
          { label: 'Karachi to UAE Cargo', href: '/destinations/uae?origin=karachi' },
          { label: 'Karachi to USA Cargo', href: '/destinations/usa?origin=karachi' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Karachi do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Karachi, including Clifton, DHA, Gulshan-e-Iqbal, North Nazimabad, Korangi, Saddar, and Malir.',
      },
      {
        question: 'Is sea cargo cheaper from Karachi than from other Pakistani cities?',
        answer:
          'Yes — since Karachi is home to both Karachi Port and Port Qasim, sea cargo originating here avoids the inland freight cost and transit time that shipments from inland cities require to reach the coast.',
      },
      {
        question: 'How much does international cargo shipping from Karachi cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Karachi?',
        answer:
          "Air cargo is faster and better suited to urgent, lightweight, perishable, or high-value shipments. Sea cargo is more economical for larger, heavier, or bulk shipments, and Karachi's direct port access makes it especially cost-effective here.",
      },
      {
        question: 'Can I send household goods from Karachi when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Karachi for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Karachi Port and Port Qasim shipments?',
        answer:
          'Yes, our team manages export documentation and customs coordination for shipments processed through both Karachi Port and Port Qasim, as well as air cargo through Jinnah International Airport.',
      },
      {
        question: 'Which countries can I ship cargo to from Karachi?',
        answer:
          'We ship from Karachi to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 3. ISLAMABAD
  {
    id: 'islamabad',
    name: 'Islamabad',
    slug: 'islamabad',
    province: 'Islamabad Capital Territory',
    h1: 'International Cargo Services in Islamabad — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Islamabad | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Islamabad. Air cargo, sea cargo, household goods & commercial shipments with door-to-door pickup and customs clearance to worldwide destinations.',
    primaryKeyword: 'international cargo services in Islamabad',
    introduction:
      "As Pakistan's capital and a fast-growing center for corporate, diplomatic, and government-linked activity, Islamabad generates steady year-round demand for reliable international cargo services. Raahi International provides complete international cargo services in Islamabad, covering air cargo, sea cargo, and door-to-door shipping for individuals, families, and businesses sending shipments from Islamabad to destinations worldwide.\n\nOur Islamabad cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major sectors of Islamabad, including F-6, F-7, F-8, F-10, F-11, G-6, G-7, G-9, G-10, G-11, G-13, Bahria Town Islamabad, DHA Islamabad, and Blue Area, as well as surrounding embassy and diplomatic zones.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: true,
    branchAddress: 'Blue Area Commercial Center, Islamabad, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Islamabad',
        content:
          'Our door-to-door cargo service in Islamabad means your shipment is collected directly from your home, office, or business address and delivered to the final address at your destination country — with no need to visit a cargo terminal or drop-off point yourself.',
        list: [
          'Doorstep cargo pickup across Islamabad',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Islamabad',
        content:
          'For urgent, lightweight, or time-sensitive shipments, air cargo from Islamabad is dispatched through Islamabad International Airport, offering direct international connections without the need to route cargo through another city first.',
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Islamabad',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Islamabad is typically the most cost-effective international shipping option — especially for FCL (Full Container Load) and LCL (Less than Container Load) shipments.\n\nSea cargo from Islamabad is routed through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Islamabad',
        content:
          "Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Islamabad is designed for both permanent relocation and personal effects shipments to loved ones overseas.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations — a service widely used by Islamabad's diplomatic community, returning overseas Pakistanis, and families relocating abroad.",
      },
      {
        title: 'Commercial Cargo Services from Islamabad',
        content:
          'Islamabad’s economy is increasingly driven by corporate offices, IT and services exports, government-linked organizations, and NGOs, alongside traditional trade. Our commercial cargo service from Islamabad supports businesses and institutions sending documents, equipment, samples, and inventory.',
      },
      {
        title: 'Customs Clearance & Documentation for Islamabad Shipments',
        content:
          'International shipments from Islamabad require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Our team assists with export documentation preparation, customs declaration, and guidance on restricted and prohibited items.',
      },
      {
        title: 'Ship from Islamabad to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a larger commercial shipment, our international cargo services in Islamabad cover popular destinations worldwide.',
        links: [
          { label: 'Islamabad to UK Cargo', href: '/destinations/uk?origin=islamabad' },
          { label: 'Islamabad to UAE Cargo', href: '/destinations/uae?origin=islamabad' },
          { label: 'Islamabad to USA Cargo', href: '/destinations/usa?origin=islamabad' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Islamabad do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major sectors of Islamabad, including F-6 through F-11, G-6 through G-13, Bahria Town Islamabad, DHA Islamabad, and Blue Area.',
      },
      {
        question: 'How much does international cargo shipping from Islamabad cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Islamabad?',
        answer:
          'Air cargo is faster and better suited to urgent, lightweight, or high-value shipments, and departs directly from Islamabad International Airport. Sea cargo is more economical for larger, heavier, or bulk shipments where delivery time is less critical.',
      },
      {
        question: 'Can I send household goods from Islamabad when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Islamabad for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Islamabad shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Islamabad, both in Pakistan and at the destination country.',
      },
      {
        question: 'Do you provide cargo services for corporate offices and embassies in Islamabad?',
        answer:
          'Yes, we support corporate, diplomatic, and institutional shipments from Islamabad, including document courier, equipment, and office relocation cargo, in addition to personal and household shipments.',
      },
      {
        question: 'Which countries can I ship cargo to from Islamabad?',
        answer:
          'We ship from Islamabad to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 4. RAWALPINDI
  {
    id: 'rawalpindi',
    name: 'Rawalpindi',
    slug: 'rawalpindi',
    province: 'Punjab',
    h1: 'International Cargo Services in Rawalpindi — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Rawalpindi | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Rawalpindi. Air cargo, sea cargo, household goods & commercial shipments with door-to-door pickup and customs clearance to worldwide destinations.',
    primaryKeyword: 'international cargo services in Rawalpindi',
    introduction:
      "Rawalpindi has long been one of Pakistan's most established trading and commercial centers, with a history as a cantonment city and a major hub for wholesale trade, retail goods, and small-scale manufacturing. That trading heritage continues today through steady demand for reliable international cargo services in Rawalpindi. Raahi International provides complete air cargo, sea cargo, and door-to-door shipping solutions for individuals, families, and businesses sending shipments from Rawalpindi to destinations worldwide.\n\nOur Rawalpindi cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major areas of Rawalpindi, including Saddar, Raja Bazaar, Committee Chowk, Chaklala, Bahria Town Rawalpindi, Askari, Satellite Town, and Westridge, as well as the surrounding cantonment and commercial districts.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Saddar Commercial District, Rawalpindi, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Rawalpindi',
        content:
          'Our door-to-door cargo service in Rawalpindi means your shipment is collected directly from your home, shop, office, or warehouse and delivered to the final address at your destination country — with no need to visit a cargo terminal or drop-off point yourself.',
        list: [
          'Doorstep cargo pickup across Rawalpindi',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Rawalpindi',
        content:
          'For urgent, lightweight, or time-sensitive shipments, air cargo from Rawalpindi offers a fast international shipping option, with cargo dispatched via the nearby international airport serving the region.',
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Rawalpindi',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Rawalpindi is typically the most cost-effective international shipping option — especially for wholesale and trading businesses moving FCL (Full Container Load) and LCL (Less than Container Load) shipments.\n\nSea cargo from Rawalpindi is routed through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Rawalpindi',
        content:
          'Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Rawalpindi is designed for both permanent relocation and personal effects shipments to loved ones overseas.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations.',
      },
      {
        title: 'Commercial Cargo Services from Rawalpindi',
        content:
          'Rawalpindi’s economy has long centered on wholesale trading, retail goods distribution, and small-to-medium manufacturing, particularly around its historic bazaars and commercial districts. Our commercial cargo service from Rawalpindi supports traders and businesses sending products, samples, inventory, and bulk trade shipments.',
      },
      {
        title: 'Customs Clearance & Documentation for Rawalpindi Shipments',
        content:
          'International shipments from Rawalpindi require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Our team assists with export documentation preparation, customs declaration, and compliance guidance.',
      },
      {
        title: 'Ship from Rawalpindi to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a larger commercial shipment, our international cargo services in Rawalpindi cover popular destinations worldwide.',
        links: [
          { label: 'Rawalpindi to UK Cargo', href: '/destinations/uk?origin=rawalpindi' },
          { label: 'Rawalpindi to UAE Cargo', href: '/destinations/uae?origin=rawalpindi' },
          { label: 'Rawalpindi to USA Cargo', href: '/destinations/usa?origin=rawalpindi' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Rawalpindi do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Rawalpindi, including Saddar, Raja Bazaar, Committee Chowk, Chaklala, Bahria Town Rawalpindi, and Satellite Town.',
      },
      {
        question: 'How much does international cargo shipping from Rawalpindi cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Rawalpindi?',
        answer:
          "Air cargo is faster and better suited to urgent, lightweight, or high-value shipments. Sea cargo is more economical for larger, heavier, or bulk shipments, and is commonly used by Rawalpindi's wholesale and trading businesses.",
      },
      {
        question: 'Can I send household goods from Rawalpindi when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Rawalpindi for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Rawalpindi shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Rawalpindi, both in Pakistan and at the destination country.',
      },
      {
        question: 'Do you provide cargo pickup from Raja Bazaar and other trading areas of Rawalpindi?',
        answer:
          "Yes, we collect cargo from Rawalpindi's commercial and trading districts, including Raja Bazaar and Committee Chowk, in addition to residential areas across the city.",
      },
      {
        question: 'Which countries can I ship cargo to from Rawalpindi?',
        answer:
          'We ship from Rawalpindi to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 5. MULTAN
  {
    id: 'multan',
    name: 'Multan',
    slug: 'multan',
    province: 'Punjab',
    h1: 'International Cargo Services in Multan — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Multan | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Multan. Air cargo, sea cargo, household goods & commercial shipments with door-to-door pickup and customs clearance to worldwide destinations.',
    primaryKeyword: 'international cargo services in Multan',
    introduction:
      "Known as the commercial heart of South Punjab, Multan has built its economy around agricultural exports, handicrafts, textiles, and ceramics — from the city's famous mangoes and citrus to its centuries-old tradition of blue pottery and embroidery. That export-driven economy relies heavily on dependable international cargo services in Multan. Raahi International provides complete air cargo, sea cargo, and door-to-door shipping solutions for individuals, families, and businesses sending shipments from Multan to destinations worldwide.\n\nOur Multan cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major areas of Multan, including Cantt, Gulgasht Colony, Shah Rukn-e-Alam Colony, Bosan Road, New Multan, Model Town, and Vehari Road, as well as the surrounding agricultural and industrial zones.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Gulgasht Commercial Area, Multan, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Multan',
        content:
          'Our door-to-door cargo service in Multan means your shipment is collected directly from your home, farm, shop, or business address and delivered to the final address at your destination country — with no need to visit a cargo terminal or drop-off point yourself.',
        list: [
          'Doorstep cargo pickup across Multan',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Multan',
        content:
          'For urgent, lightweight, perishable, or time-sensitive shipments, air cargo from Multan is dispatched through Multan International Airport, giving South Punjab direct international air freight access without routing cargo through another city first.',
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Multan',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Multan is typically the most cost-effective international shipping option — especially for exporters moving FCL (Full Container Load) and LCL (Less than Container Load) shipments of textiles, handicrafts, or bulk goods.\n\nSea cargo from Multan is routed through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Multan',
        content:
          'Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Multan is designed for both permanent relocation and personal effects shipments to loved ones overseas.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations.',
      },
      {
        title: 'Commercial Cargo Services from Multan',
        content:
          'Multan is one of Pakistan’s most important centers for agricultural export, handicrafts, textiles, and ceramics, with its famous mango exports forming a major seasonal trade. Our commercial cargo service from Multan supports exporters and businesses sending agricultural produce, handicraft goods, textile products, and inventory.',
      },
      {
        title: 'Customs Clearance & Documentation for Multan Shipments',
        content:
          'International shipments from Multan require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Our team assists with export documentation preparation, customs declaration, and compliance for agricultural and general exports.',
      },
      {
        title: 'Ship from Multan to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a larger commercial shipment, our international cargo services in Multan cover popular destinations worldwide.',
        links: [
          { label: 'Multan to UK Cargo', href: '/destinations/uk?origin=multan' },
          { label: 'Multan to UAE Cargo', href: '/destinations/uae?origin=multan' },
          { label: 'Multan to USA Cargo', href: '/destinations/usa?origin=multan' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Multan do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Multan, including Cantt, Gulgasht Colony, Shah Rukn-e-Alam Colony, Bosan Road, and New Multan.',
      },
      {
        question: 'How much does international cargo shipping from Multan cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Can I export mangoes or other perishable goods from Multan by air cargo?',
        answer:
          'Yes, air cargo from Multan is commonly used for time-sensitive and perishable exports such as mangoes and citrus during peak season. Destination-country regulations for agricultural imports apply, and our team can advise on requirements when you book.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Multan?',
        answer:
          'Air cargo is faster and better suited to urgent, perishable, or high-value shipments, and departs directly from Multan International Airport. Sea cargo is more economical for larger, heavier, or bulk shipments such as handicrafts and textiles.',
      },
      {
        question: 'Can I send household goods from Multan when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Multan for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Multan shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Multan, both in Pakistan and at the destination country, including any additional requirements for agricultural exports.',
      },
      {
        question: 'Which countries can I ship cargo to from Multan?',
        answer:
          'We ship from Multan to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 6. FAISALABAD
  {
    id: 'faisalabad',
    name: 'Faisalabad',
    slug: 'faisalabad',
    province: 'Punjab',
    h1: 'International Cargo Services in Faisalabad — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Faisalabad | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Faisalabad. Air cargo, sea cargo, textile export & commercial shipments with door-to-door pickup and customs clearance to worldwide destinations.',
    primaryKeyword: 'international cargo services in Faisalabad',
    introduction:
      "Known as the 'Manchester of Pakistan' for its dominant textile industry, Faisalabad is home to one of the country's largest volumes of commercial and export cargo — from yarn and fabric to finished garments and home textiles shipped to buyers around the world. That export-driven economy depends on dependable international cargo services in Faisalabad. Raahi International provides complete air cargo, sea cargo, and door-to-door shipping solutions for individuals, families, and businesses sending shipments from Faisalabad to destinations worldwide.\n\nOur Faisalabad cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major areas of Faisalabad, including Peoples Colony, Madina Town, Gulberg Faisalabad, Jaranwala Road, D Ground, Susan Road, and Batala Colony, as well as the surrounding industrial and textile manufacturing zones.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'Peoples Colony Commercial Hub, Faisalabad, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Faisalabad',
        content:
          'Our door-to-door cargo service in Faisalabad means your shipment is collected directly from your home, factory, shop, or warehouse and delivered to the final address at your destination country — with no need to visit a cargo terminal or drop-off point yourself.',
        list: [
          'Doorstep cargo pickup across Faisalabad',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Faisalabad',
        content:
          'For urgent, lightweight, or time-sensitive shipments, air cargo from Faisalabad provides a fast international shipping option — particularly useful for textile buyers who need fabric or garment samples delivered quickly to confirm orders.',
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Faisalabad',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Faisalabad is typically the most cost-effective international shipping option — especially for the city's textile exporters moving FCL (Full Container Load) and LCL (Less than Container Load) shipments of yarn, fabric, and finished garments.\n\nSea cargo from Faisalabad is routed through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Faisalabad',
        content:
          'Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Faisalabad is designed for both permanent relocation and personal effects shipments to loved ones overseas.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations.',
      },
      {
        title: 'Commercial Cargo Services from Faisalabad',
        content:
          'As Pakistan’s textile capital, Faisalabad is home to a dense concentration of spinning mills, weaving units, garment manufacturers, and hosiery exporters. Our commercial cargo service from Faisalabad supports exporters and businesses sending yarn, fabric, garments, home textiles, and bulk inventory.',
      },
      {
        title: 'Customs Clearance & Documentation for Faisalabad Shipments',
        content:
          'International shipments from Faisalabad require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Our team assists with export documentation preparation, customs declaration, and compliance for textile and garment export requirements.',
      },
      {
        title: 'Ship from Faisalabad to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a larger commercial shipment, our international cargo services in Faisalabad cover popular destinations worldwide.',
        links: [
          { label: 'Faisalabad to UK Cargo', href: '/destinations/uk?origin=faisalabad' },
          { label: 'Faisalabad to UAE Cargo', href: '/destinations/uae?origin=faisalabad' },
          { label: 'Faisalabad to USA Cargo', href: '/destinations/usa?origin=faisalabad' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Faisalabad do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Faisalabad, including Peoples Colony, Madina Town, Gulberg Faisalabad, Jaranwala Road, and D Ground.',
      },
      {
        question: 'How much does international cargo shipping from Faisalabad cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Do you handle bulk textile and garment export shipments from Faisalabad?',
        answer:
          "Yes, sea cargo (FCL/LCL) from Faisalabad is commonly used by the city's textile and garment exporters for bulk shipments of yarn, fabric, and finished apparel to international buyers.",
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Faisalabad?',
        answer:
          'Air cargo is faster and better suited to urgent items, buyer samples, or high-value shipments. Sea cargo is more economical for larger, heavier, or bulk shipments such as textile exports.',
      },
      {
        question: 'Can I send household goods from Faisalabad when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Faisalabad for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Faisalabad shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Faisalabad, both in Pakistan and at the destination country, including textile and garment export requirements.',
      },
      {
        question: 'Which countries can I ship cargo to from Faisalabad?',
        answer:
          'We ship from Faisalabad to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },

  // 7. PESHAWAR
  {
    id: 'peshawar',
    name: 'Peshawar',
    slug: 'peshawar',
    province: 'Khyber Pakhtunkhwa',
    h1: 'International Cargo Services in Peshawar — Air, Sea & Door-to-Door Shipping Worldwide',
    seoTitle: 'International Cargo Services in Peshawar | Air & Sea Cargo, Door-to-Door Shipping',
    seoDescription:
      'International cargo services in Peshawar. Air cargo, sea cargo, household goods & commercial shipments with door-to-door pickup and customs clearance to worldwide destinations.',
    primaryKeyword: 'international cargo services in Peshawar',
    introduction:
      "As the gateway to Khyber Pakhtunkhwa and one of the region's oldest centers of trade, Peshawar has a long history of connecting local commerce with markets far beyond Pakistan's borders. That trading tradition continues today through steady demand for reliable international cargo services in Peshawar. Raahi International provides complete air cargo, sea cargo, and door-to-door shipping solutions for individuals, families, and businesses sending shipments from Peshawar to destinations worldwide.\n\nOur Peshawar cargo services combine doorstep collection, professional export packing, air and sea freight, customs documentation, and destination delivery into one streamlined service — so you're not coordinating separate providers for pickup, freight, and delivery.",
    localCoverageText:
      'We collect cargo from all major areas of Peshawar, including Hayatabad, University Town, Cantt, Saddar, Board Bazaar, Gulbahar, and Dalazak Road, as well as the surrounding commercial and industrial zones.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedDestinations: ['uk', 'uae', 'usa', 'canada', 'saudi-arabia', 'qatar', 'australia'],
    serviceAvailable: true,
    collectionAvailable: true,
    hasPhysicalBranch: false,
    branchAddress: 'University Town Commercial Area, Peshawar, Pakistan',
    sections: [
      {
        title: 'Door-to-Door International Cargo Services in Peshawar',
        content:
          'Our door-to-door cargo service in Peshawar means your shipment is collected directly from your home, shop, office, or warehouse and delivered to the final address at your destination country — with no need to visit a cargo terminal or drop-off point yourself.',
        list: [
          'Doorstep cargo pickup across Peshawar',
          'Professional export packing and shipment preparation',
          'Air freight or sea freight (based on your shipment)',
          'Export documentation and customs paperwork',
          'Customs clearance coordination',
          'International freight transportation',
          'Destination country handling and import clearance',
          "Final delivery to the recipient's address",
        ],
      },
      {
        title: 'Air Cargo Services from Peshawar',
        content:
          'For urgent, lightweight, or time-sensitive shipments, air cargo from Peshawar is dispatched through Bacha Khan International Airport, giving Khyber Pakhtunkhwa direct international air freight access without routing cargo through another city first.',
        links: [{ label: 'View Air Cargo Services', href: '/services/air-freight' }],
      },
      {
        title: 'Sea Cargo Services from Peshawar',
        content:
          "For larger, heavier, or bulkier shipments where delivery time is less critical, sea cargo from Peshawar is typically the most cost-effective international shipping option — especially for exporters moving FCL (Full Container Load) and LCL (Less than Container Load) shipments of furniture, marble, or handicrafts.\n\nSea cargo from Peshawar is routed through Pakistan's port network (primarily Karachi Port and Port Qasim) before continuing on to its international destination.",
        links: [{ label: 'View Sea Cargo Services', href: '/services/sea-cargo' }],
      },
      {
        title: 'International Household Goods Shipping from Peshawar',
        content:
          'Relocating abroad, or sending belongings to family overseas? Our household goods shipping service from Peshawar is designed for both permanent relocation and personal effects shipments to loved ones overseas.\n\nWe coordinate the shipment of permitted household items including furniture, clothing, personal belongings, kitchenware, and other goods, subject to destination-country customs regulations.',
      },
      {
        title: 'Commercial Cargo Services from Peshawar',
        content:
          'Peshawar and the surrounding region are known for furniture and woodwork, marble and stone products, dry fruits, handicrafts, and gemstones, alongside its long-standing role as a cross-border trading hub. Our commercial cargo service from Peshawar supports exporters and businesses sending furniture, marble, dry fruits, handicrafts, and inventory.',
      },
      {
        title: 'Customs Clearance & Documentation for Peshawar Shipments',
        content:
          'International shipments from Peshawar require proper documentation and are subject to customs procedures both in Pakistan and at the destination country. Our team assists with export documentation preparation, customs declaration, and compliance guidance.',
      },
      {
        title: 'Ship from Peshawar to Worldwide Destinations',
        content:
          'Whether you are sending a small personal parcel or a larger commercial shipment, our international cargo services in Peshawar cover popular destinations worldwide.',
        links: [
          { label: 'Peshawar to UK Cargo', href: '/destinations/uk?origin=peshawar' },
          { label: 'Peshawar to UAE Cargo', href: '/destinations/uae?origin=peshawar' },
          { label: 'Peshawar to USA Cargo', href: '/destinations/usa?origin=peshawar' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What areas of Peshawar do you provide cargo pickup for?',
        answer:
          'We provide doorstep cargo pickup across all major areas of Peshawar, including Hayatabad, University Town, Cantt, Saddar, and Board Bazaar.',
      },
      {
        question: 'How much does international cargo shipping from Peshawar cost?',
        answer:
          'Cargo costs depend on shipping method (air or sea), weight or volume, destination country, and cargo type. Request a free quote with your shipment details for an accurate price.',
      },
      {
        question: 'Can I export furniture, marble, or handicrafts from Peshawar?',
        answer:
          'Yes, sea cargo (FCL/LCL) from Peshawar is commonly used for exporting furniture, marble, dry fruits, and handicrafts in bulk to international buyers.',
      },
      {
        question: 'Is air cargo or sea cargo better for shipping from Peshawar?',
        answer:
          'Air cargo is faster and better suited to urgent, lightweight, or high-value shipments, and departs directly from Bacha Khan International Airport. Sea cargo is more economical for larger, heavier, or bulk shipments such as furniture and marble.',
      },
      {
        question: 'Can I send household goods from Peshawar when relocating abroad?',
        answer:
          'Yes, we provide household goods and personal effects shipping from Peshawar for customers relocating internationally, subject to destination-country customs regulations.',
      },
      {
        question: 'Do you handle customs clearance for Peshawar shipments?',
        answer:
          'Yes, our team assists with export documentation and customs coordination for shipments from Peshawar, both in Pakistan and at the destination country.',
      },
      {
        question: 'Which countries can I ship cargo to from Peshawar?',
        answer:
          'We ship from Peshawar to worldwide destinations including the UK, USA, Canada, Australia, UAE, Saudi Arabia, and Qatar, with availability depending on current shipping services.',
      },
    ],
  },
];
