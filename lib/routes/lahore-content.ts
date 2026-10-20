/**
 * Lahore city page and Lahore → country route pages (copy from "Raahi Lahore Pages – Final Copy").
 *
 * Rates and transit times are the client-confirmed figures shown on /cargo-services.
 * Values the copy left as [PLACEHOLDERS] (street address, pickup time, what the rate includes,
 * reviews, photos) are deliberately omitted until confirmed; add them here when available.
 *
 * Paragraph and list text is Markdown, so inline links work: `[label](/path)`.
 */

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'facts'; items: Array<[label: string, value: string]> };

export interface ContentSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface LahorePage {
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  glance?: Array<[label: string, value: string]>;
  sections: ContentSection[];
  faqs: Array<{ question: string; answer: string }>;
  breadcrumbs: Array<{ label: string; url: string }>;
  quoteUrl: string;
  whatsappMessage: string;
  /** Route pages only: Service schema target. */
  service?: { serviceType: string; areaServed: { code: string; name: string } };
  /** Destination country slug the route serves (links "Shipping from Lahore" on that page). */
  countrySlug?: string;
}

export const LAHORE_LOCATION_KEY = 'lahore';
export const LAHORE_CITY_PATH = '/locations/international-cargo-services-in-lahore';
export const RATES_UPDATED = 'October 2026';
export const LAHORE_HOURS = 'Mon–Sat, 9am–7pm';

const PHONE = '0300 7097063';
const QUOTE_URL = '/quote?origin=lahore';

const NOT_ACCEPTED =
  '**Not accepted:** food items, liquids, perfumes, aerosols, lithium batteries and flammable or hazardous items.';
const VOLUMETRIC_NOTE =
  'Air prices use chargeable weight: a large, light box is charged at its volumetric weight (length × width × height in cm ÷ 6,000).';

const routeCrumbs = (label: string, url: string) => [
  { label: 'Home', url: '/' },
  { label: 'Locations', url: '/locations' },
  { label: 'Lahore', url: LAHORE_CITY_PATH },
  { label, url },
];

const sendSteps = (addressLabel: string, deliveredIn: string): ContentBlock => ({
  type: 'list',
  ordered: true,
  items: [
    `WhatsApp ${PHONE} or fill in the [quote form](${QUOTE_URL}) with what you are sending, the rough weight and the ${addressLabel}.`,
    'We confirm the per-kg rate, the total and the delivery time.',
    'We collect from your home in Lahore.',
    'We weigh, pack if needed, and clear Pakistan export customs.',
    `Track it on our [tracking page](/track) until it is delivered ${deliveredIn}.`,
  ],
});

export const LAHORE_CITY_PAGE: LahorePage = {
  path: LAHORE_CITY_PATH,
  seoTitle: 'International Cargo Services in Lahore | Air & Sea | Raahi',
  seoDescription:
    'Door-to-door air and sea cargo from Lahore to the UK, Dubai, USA and Canada. Home pickup across Lahore, air rates from Rs 1,350/kg. Quote on WhatsApp.',
  h1: 'International Cargo Services in Lahore: Door-to-Door Air & Sea Shipping',
  intro: [
    'Raahi International collects cargo from homes and businesses across Lahore and delivers it to the door in the UK, UAE, Saudi Arabia, USA and Canada.',
    'Air cargo starts at 20 kg and sea cargo at 70–100 kg. You get a per-kilogram price and a delivery time before anything is collected.',
  ],
  glance: [
    ['Office hours', LAHORE_HOURS],
    ['Call or WhatsApp', PHONE],
    ['Home pickup', 'Across Lahore'],
    ['Air cargo', 'From Rs 1,350/kg, minimum 20 kg'],
    ['Sea cargo', 'From Rs 600/kg, minimum 70–100 kg'],
  ],
  sections: [
    {
      id: 'rates',
      title: 'Cargo rates from Lahore',
      blocks: [
        {
          type: 'p',
          text: 'These are our current per-kilogram rates from Lahore. The "20 kg by air" column shows what a typical family shipment costs.',
        },
        {
          type: 'table',
          head: ['Destination', 'Air (Rs/kg)', '20 kg by air', 'Air delivery', 'Sea (Rs/kg)', 'Sea delivery'],
          rows: [
            ['UK (except Scotland)', '1,750–1,850', 'Rs 35,000–37,000', '10–12 days', '950–1,000', '1.5–2.5 months'],
            ['Scotland', '2,350', 'Rs 47,000', '10–15 days', '1,250', '1.5–2.5 months'],
            ['UAE / Dubai', '1,350–1,450', 'Rs 27,000–29,000', '10–17 days', '600–700', '1.5–2.5 months'],
            ['Saudi Arabia', '2,150–2,250', 'Rs 43,000–45,000', '10–20 days', '950–1,000', '1.5–2.5 months'],
            ['USA', '2,750–2,950', 'Rs 55,000–59,000', '10–15 days', '1,550–1,650', '2–2.5 months'],
            ['Canada', '2,850–2,950', 'Rs 57,000–59,000', '10–15 days', '1,750–1,850', '2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Rates updated ${RATES_UPDATED}. Your exact price depends on chargeable weight and the delivery address, and is confirmed in writing before pickup. We also ship to Australia and Europe: [see all cargo rates](/cargo-services).`,
        },
      ],
    },
    {
      id: 'chargeable-weight',
      title: 'How chargeable weight works',
      blocks: [
        {
          type: 'p',
          text: 'Air cargo is charged on the actual weight or the volumetric weight, whichever is higher. Volumetric weight is length × width × height in centimetres, divided by 6,000.',
        },
        {
          type: 'p',
          text: 'Example: a 60 × 50 × 50 cm box has a volumetric weight of 25 kg. If it weighs 18 kg on the scale, you pay for 25 kg. Packing into fewer, fuller boxes keeps the price down.',
        },
        {
          type: 'p',
          text: 'Sea cargo is priced by weight at the rates above. For very large loads we quote by volume instead.',
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Home pickup across Lahore',
      blocks: [
        { type: 'p', text: 'We collect from residential, commercial and industrial areas across the city, including:' },
        {
          type: 'list',
          items: [
            'Gulberg, DHA (Phases 1–9), Cantt, Cavalry Ground',
            'Model Town, Garden Town, Faisal Town, Johar Town',
            'Allama Iqbal Town, Bahria Town',
            'Sundar Industrial Estate and Quaid-e-Azam Industrial Estate',
          ],
        },
        { type: 'p', text: 'Outside these areas? Send your location on WhatsApp and we will confirm.' },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How sending cargo from Lahore works',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `**Tell us what you are sending.** WhatsApp ${PHONE} or use the [quote form](${QUOTE_URL}). Include the destination, what is inside, the rough weight and box sizes.`,
            '**Get your price.** We send the per-kg rate, the delivery time and the total for your weight.',
            '**We collect.** We pick up from your Lahore address, weigh and measure each box, and confirm the final price.',
            '**We clear export customs.** We prepare the paperwork and dispatch by air, or by sea from Karachi port.',
            '**Track it.** Follow your shipment on our [tracking page](/track).',
            "**Delivered to the door.** We handle customs clearance abroad and deliver to the receiver's address.",
          ],
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send',
      blocks: [
        {
          type: 'p',
          text: "Common shipments from Lahore include wedding outfits and lawn suits for family abroad, a student's books and winter clothes, household goods when a family moves, and stock for overseas shops.",
        },
        {
          type: 'table',
          head: ['We accept', 'We do not accept'],
          rows: [
            ['Clothes: stitched, unstitched, bridal wear', 'Food items'],
            ['Shoes, bags, bedding, books', 'Liquids and perfumes'],
            ['Kitchenware and household items', 'Aerosols and flammable items'],
            ['Personal belongings and excess baggage', 'Lithium batteries and hazardous chemicals'],
            ['Commercial goods with an invoice', 'Commercial stock declared as personal baggage'],
          ],
        },
        {
          type: 'p',
          text: 'Ask us before sending medicines, electronics or anything valuable. Rules differ by country, and we will tell you before you pack.',
        },
      ],
    },
    {
      id: 'documents',
      title: 'Documents you need',
      blocks: [
        {
          type: 'list',
          items: [
            "**Personal shipments:** a copy of the sender's CNIC or passport, the receiver's full name, address and phone number, and a list of contents with values.",
            '**Commercial shipments:** a commercial invoice and packing list as well. We tell you what else your goods need when we quote.',
          ],
        },
      ],
    },
    {
      id: 'destinations',
      title: 'Where we ship from Lahore',
      blocks: [
        {
          type: 'list',
          items: [
            '[Lahore to UK](/routes/lahore-to-uk): Rs 1,750–1,850/kg by air, 10–12 days. London, Birmingham, Manchester and the rest of the UK.',
            '[Lahore to Dubai](/routes/lahore-to-dubai): Rs 1,350–1,450/kg by air. Dubai, Abu Dhabi, Sharjah and the rest of the UAE.',
            '[Lahore to USA](/routes/lahore-to-usa): Rs 2,750–2,950/kg by air, 10–15 days.',
            '[Lahore to Canada](/routes/lahore-to-canada): Rs 2,850–2,950/kg by air, 10–15 days.',
            '[Saudi Arabia](/destinations/ksa): Rs 2,150–2,250/kg by air, 10–20 days.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much does cargo from Lahore to the UK cost?',
      answer:
        'Rs 1,750–1,850 per kg by air, so about Rs 35,000–37,000 for 20 kg. Sea cargo is Rs 950–1,000 per kg, with a 70–100 kg minimum.',
    },
    {
      question: 'What is the minimum weight?',
      answer: '20 kg by air and 70–100 kg by sea. For a few kilograms, a courier will usually be cheaper than cargo.',
    },
    {
      question: 'How long does air cargo from Lahore take?',
      answer:
        '10–12 days to the UK, 10–15 days to the USA and Canada, 10–17 days to the UAE and 10–20 days to Saudi Arabia.',
    },
    {
      question: 'Can you collect from my home in Lahore?',
      answer: 'Yes. We pick up across Lahore, including DHA, Gulberg, Johar Town, Model Town and Bahria Town.',
    },
    {
      question: 'Can I send food from Lahore?',
      answer: 'No. We do not accept food items, liquids, perfumes, aerosols or lithium batteries.',
    },
    {
      question: 'Will the receiver pay customs duty?',
      answer: 'It depends on the country and what is inside. We tell you before you book.',
    },
    {
      question: 'How do I track my shipment?',
      answer: 'Use the tracking number we give you on our tracking page, or ask us on WhatsApp.',
    },
  ],
  breadcrumbs: [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: 'Lahore', url: LAHORE_CITY_PATH },
  ],
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Lahore. Please guide me.',
};

const LAHORE_TO_UK: LahorePage = {
  path: '/routes/lahore-to-uk',
  seoTitle: 'Cargo from Lahore to UK | Rs 1,750/kg, Door to Door | Raahi',
  seoDescription:
    'Send cargo from Lahore to London and anywhere in the UK. Air Rs 1,750–1,850/kg (10–12 days), sea Rs 950–1,000/kg. Home pickup in Lahore.',
  h1: 'Cargo from Lahore to UK: Door-to-Door Air & Sea',
  intro: [
    'We collect your boxes from home in Lahore and deliver them to the door anywhere in the UK, from London and Birmingham to Manchester, Bradford and Glasgow.',
    'By air it costs Rs 1,750–1,850 per kg and takes 10–12 days. By sea it costs Rs 950–1,000 per kg and takes 1.5–2.5 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to UK cargo rates',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate (England, Wales)', 'Rs 1,750–1,850/kg', 'Rs 950–1,000/kg'],
            ['Rate (Scotland)', 'Rs 2,350/kg', 'Rs 1,250/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '10–12 days (Scotland 10–15)', '1.5–2.5 months'],
            ['Best for', 'Clothes, gifts, student luggage, anything with a date', 'Household moves, heavy or bulky goods'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}. Northern Ireland: ask us for a quote.` },
      ],
    },
    {
      id: 'examples',
      title: 'What it costs: real examples',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg (one large box)', 'Rs 35,000–37,000', 'Below sea minimum'],
            ['30 kg', 'Rs 52,500–55,500', 'Below sea minimum'],
            ['50 kg', 'Rs 87,500–92,500', 'Below sea minimum'],
            ['100 kg (small household move)', 'Rs 175,000–185,000', 'Rs 95,000–100,000'],
            ['200 kg', 'Rs 350,000–370,000', 'Rs 190,000–200,000'],
          ],
        },
        {
          type: 'p',
          text: 'At 100 kg, sea saves you about Rs 75,000–90,000, but takes 1.5–2.5 months instead of 10–12 days. Prices are for England and Wales and use chargeable weight: if a box is large but light, you pay its volumetric weight (length × width × height in cm ÷ 6,000).',
        },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Air or sea from Lahore?',
      blocks: [
        {
          type: 'p',
          text: '**Choose air** if you are sending under 70 kg, the items are needed within two weeks, or there is a date to meet: a wedding, Eid, the start of term.',
        },
        {
          type: 'p',
          text: '**Choose sea** if you are sending 100 kg or more, moving a household, or can wait two months to save roughly half the cost.',
        },
      ],
    },
    {
      id: 'london',
      title: 'Cargo from Lahore to London',
      blocks: [
        {
          type: 'p',
          text: 'London is priced like the rest of England: Rs 1,750–1,850 per kg by air, delivered in 10–12 days, or Rs 950–1,000 per kg by sea. We deliver to any London address, from Southall and Wembley to Ilford and East Ham. See [cargo to London](/destinations/uk/london).',
        },
        {
          type: 'p',
          text: 'The same rates apply to Birmingham, Manchester, Bradford, Leeds and every other town in England and Wales.',
        },
      ],
    },
    {
      id: 'what-people-send',
      title: 'What people send from Lahore to the UK',
      blocks: [
        {
          type: 'list',
          items: [
            '**Clothes:** lawn suits, wedding and bridal outfits, unstitched fabric, winter clothes for family',
            '**Student luggage:** books, clothes and bedding for university in the UK',
            '**Household goods:** kitchenware, bedding and personal belongings when a family moves to the UK',
            '**Shop stock:** clothing and textiles for UK boutiques, sent as commercial cargo with an invoice',
          ],
        },
        { type: 'p', text: `${NOT_ACCEPTED} Ask us before sending medicines or electronics.` },
      ],
    },
    {
      id: 'customs',
      title: 'UK customs: what the receiver may pay',
      blocks: [
        {
          type: 'p',
          text: 'UK charges depend on what is inside and why it is sent ([gov.uk](https://www.gov.uk/goods-sent-from-abroad/tax-and-duty)):',
        },
        {
          type: 'list',
          items: [
            'Gifts worth £39 or less: no VAT.',
            'Gifts worth more than £39: VAT is charged.',
            'Goods worth more than £135: customs duty may be charged too, at a rate that depends on the type of goods.',
            'Moving to the UK: Transfer of Residence relief can remove duty and VAT on your own belongings if you have lived outside the UK for 12 months and owned the goods for at least 6 months. Apply to HMRC on form ToR01 before you ship ([gov.uk](https://www.gov.uk/guidance/application-for-transfer-of-residence-relief-tor1)).',
            'Shop stock: the UK receiver needs an EORI number, and duty and VAT are charged on the invoice value.',
          ],
        },
        { type: 'p', text: 'Always declare the true contents and value; under-declaring causes delays and fines.' },
      ],
    },
    {
      id: 'how-to-send',
      title: 'How to send cargo from Lahore to the UK',
      blocks: [
        sendSteps('UK address', 'to the UK door'),
        { type: 'p', text: `Pickup areas and office details are on our [Lahore page](${LAHORE_CITY_PATH}).` },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is cargo from Lahore to UK per kg?',
      answer:
        'Rs 1,750–1,850 per kg by air and Rs 950–1,000 per kg by sea, for England and Wales. Scotland is Rs 2,350 by air and Rs 1,250 by sea.',
    },
    {
      question: 'How much does 20 kg cost from Lahore to London?',
      answer: 'Rs 35,000–37,000 by air, delivered in 10–12 days.',
    },
    {
      question: 'How long does cargo from Lahore to UK take?',
      answer: '10–12 days door to door by air (10–15 days to Scotland) and 1.5–2.5 months by sea.',
    },
    {
      question: 'Is sea cargo cheaper from Lahore to UK?',
      answer: 'Yes, about half the price per kg, but the minimum is 70–100 kg and it takes 1.5–2.5 months.',
    },
    {
      question: 'Can I send less than 20 kg?',
      answer: 'Our air minimum is 20 kg. For a few kilograms, a courier is usually cheaper.',
    },
    { question: 'Can I send food from Lahore to the UK?', answer: 'No, we do not accept food items.' },
    {
      question: 'Will my family in the UK pay customs?',
      answer:
        'Gifts worth £39 or less have no VAT. Above that, VAT applies, and goods over £135 may also be charged duty. We explain this before you book.',
    },
  ],
  breadcrumbs: routeCrumbs('Lahore to UK', '/routes/lahore-to-uk'),
  quoteUrl: `${QUOTE_URL}&destination=uk`,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to the UK. Please give me a quote.',
  service: { serviceType: 'Cargo from Lahore to UK', areaServed: { code: 'GB', name: 'United Kingdom' } },
  countrySlug: 'uk',
};

const LAHORE_TO_DUBAI: LahorePage = {
  path: '/routes/lahore-to-dubai',
  seoTitle: 'Cargo from Lahore to Dubai & UAE | Rs 1,350/kg | Raahi',
  seoDescription:
    'Send cargo from Lahore to Dubai, Abu Dhabi and Sharjah. Air Rs 1,350–1,450/kg, sea Rs 600–700/kg. Home pickup across Lahore. Quote on WhatsApp.',
  h1: 'Cargo from Lahore to Dubai and the UAE',
  intro: [
    'We collect from your home in Lahore and deliver to the door in Dubai, Abu Dhabi, Sharjah, Ajman and the rest of the UAE.',
    'The UAE is our lowest-cost route: Rs 1,350–1,450 per kg by air, delivered in 10–17 days, or Rs 600–700 per kg by sea in 1.5–2.5 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to Dubai cargo rates',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate', 'Rs 1,350–1,450/kg', 'Rs 600–700/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '10–17 days', '1.5–2.5 months'],
            ['Best for', 'Clothes, gifts, things needed soon', 'Household goods, heavy or bulky items'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}. The same rates apply across all seven emirates.` },
      ],
    },
    {
      id: 'examples',
      title: 'What it costs: real examples',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg (one large box)', 'Rs 27,000–29,000', 'Below sea minimum'],
            ['30 kg', 'Rs 40,500–43,500', 'Below sea minimum'],
            ['50 kg', 'Rs 67,500–72,500', 'Below sea minimum'],
            ['100 kg', 'Rs 135,000–145,000', 'Rs 60,000–70,000'],
            ['200 kg', 'Rs 270,000–290,000', 'Rs 120,000–140,000'],
          ],
        },
        { type: 'p', text: `At 100 kg, sea saves about Rs 65,000–85,000. ${VOLUMETRIC_NOTE}` },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Air or sea to Dubai?',
      blocks: [
        {
          type: 'p',
          text: '**Choose air** if you are sending under 70 kg or need it within about two and a half weeks.',
        },
        {
          type: 'p',
          text: '**Choose sea** if you are sending 100 kg or more, such as household goods for a family moving to the UAE, and can wait up to 2.5 months to pay about half the air price.',
        },
      ],
    },
    {
      id: 'what-people-send',
      title: 'What people send from Lahore to the UAE',
      blocks: [
        {
          type: 'list',
          items: [
            '**For family working in the UAE:** clothes, shoes, bedding and gifts',
            '**For a move:** household goods and personal belongings when you or your family relocate to Dubai',
            '**For business:** clothing, textiles and other stock for UAE traders, sent with a commercial invoice',
          ],
        },
        { type: 'p', text: NOT_ACCEPTED },
      ],
    },
    {
      id: 'customs',
      title: 'UAE customs: what to expect',
      blocks: [
        {
          type: 'list',
          items: [
            'The UAE may charge customs duty and 5% VAT, depending on what you send and its value. We tell you the likely charge before you book.',
            'The UAE controls some medicines strictly, including some common prescription drugs. Ask us before packing any medicine.',
            'Declare the real contents and value. A wrong declaration can hold a shipment at customs.',
            'The receiver needs to give a full UAE address and a UAE phone number. We will tell you if customs asks for an ID copy.',
          ],
        },
      ],
    },
    {
      id: 'how-to-send',
      title: 'How to send cargo from Lahore to Dubai',
      blocks: [
        sendSteps('UAE address', 'in the UAE'),
        {
          type: 'p',
          text: `Pickup areas and office details are on our [Lahore page](${LAHORE_CITY_PATH}). For the UAE in general, see [cargo to the UAE](/destinations/uae).`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is cargo from Lahore to Dubai per kg?',
      answer: 'Rs 1,350–1,450 per kg by air and Rs 600–700 per kg by sea.',
    },
    {
      question: 'How much does 20 kg cost from Lahore to Dubai?',
      answer: 'Rs 27,000–29,000 by air, delivered in 10–17 days.',
    },
    {
      question: 'How long does cargo from Lahore to Dubai take?',
      answer: '10–17 days door to door by air and 1.5–2.5 months by sea.',
    },
    {
      question: 'Do you deliver outside Dubai?',
      answer: 'Yes, to Abu Dhabi, Sharjah, Ajman and every other emirate, at the same rates.',
    },
    { question: 'Can I send food to Dubai?', answer: 'No, we do not accept food items.' },
    {
      question: 'Can I send medicine to the UAE?',
      answer: 'Only after checking with us first. Some medicines are controlled in the UAE.',
    },
  ],
  breadcrumbs: routeCrumbs('Lahore to Dubai', '/routes/lahore-to-dubai'),
  quoteUrl: `${QUOTE_URL}&destination=uae`,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to Dubai. Please give me a quote.',
  service: { serviceType: 'Cargo from Lahore to Dubai', areaServed: { code: 'AE', name: 'United Arab Emirates' } },
  countrySlug: 'uae',
};

const LAHORE_TO_USA: LahorePage = {
  path: '/routes/lahore-to-usa',
  seoTitle: 'Cargo from Lahore to USA | Rs 2,750/kg, Door to Door | Raahi',
  seoDescription:
    'Send cargo from Lahore to New York, Chicago, Houston and anywhere in the USA. Air Rs 2,750–2,950/kg (10–15 days), sea Rs 1,550–1,650/kg. Home pickup.',
  h1: 'Cargo from Lahore to USA: Door-to-Door Air & Sea',
  intro: [
    'We collect from your home in Lahore and deliver to the door anywhere in the USA, including New York, New Jersey, Chicago, Houston and California.',
    'By air it costs Rs 2,750–2,950 per kg and takes 10–15 days. By sea it costs Rs 1,550–1,650 per kg and takes 2–2.5 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to USA cargo rates',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate', 'Rs 2,750–2,950/kg', 'Rs 1,550–1,650/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '10–15 days', '2–2.5 months'],
            ['Best for', 'Clothes, gifts, student luggage', 'Household moves, heavy or bulky goods'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'examples',
      title: 'What it costs: real examples',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg (one large box)', 'Rs 55,000–59,000', 'Below sea minimum'],
            ['30 kg', 'Rs 82,500–88,500', 'Below sea minimum'],
            ['50 kg', 'Rs 137,500–147,500', 'Below sea minimum'],
            ['100 kg', 'Rs 275,000–295,000', 'Rs 155,000–165,000'],
            ['200 kg', 'Rs 550,000–590,000', 'Rs 310,000–330,000'],
          ],
        },
        { type: 'p', text: `At 100 kg, sea saves about Rs 110,000–140,000. ${VOLUMETRIC_NOTE}` },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Air or sea to the USA?',
      blocks: [
        {
          type: 'p',
          text: '**Choose air** if you are sending under 70 kg, or it needs to arrive within about two weeks: a wedding, a new semester, a family visit.',
        },
        {
          type: 'p',
          text: '**Choose sea** if you are sending 100 kg or more and can wait 2–2.5 months to save about 40–45%.',
        },
      ],
    },
    {
      id: 'what-people-send',
      title: 'What people send from Lahore to the USA',
      blocks: [
        {
          type: 'list',
          items: [
            '**For family:** clothes, wedding outfits, shoes and gifts',
            '**Student luggage:** books, clothes and bedding for university in the US',
            '**Household goods:** personal belongings when a family moves to the US',
            '**Business shipments:** clothing, textiles and samples for US buyers, with a commercial invoice',
          ],
        },
        { type: 'p', text: NOT_ACCEPTED },
      ],
    },
    {
      id: 'customs',
      title: 'US customs: what to expect',
      blocks: [
        {
          type: 'list',
          items: [
            'Low-value shipments are no longer duty-free. The US has suspended its duty-free "de minimis" entry for low-value goods, so most cargo may now owe duty ([Federal Register](https://www.federalregister.gov/documents/2025/08/05/2025-14897/suspending-duty-free-de-minimis-treatment-for-all-countries)).',
            'Gifts worth $100 or less sent to someone in the US are still exempt.',
            'Shop or business goods are charged duty based on what they are and current US tariffs. We confirm the likely charge before you book.',
            'Declare the real contents and value. A wrong declaration can hold a shipment at US customs.',
          ],
        },
      ],
    },
    {
      id: 'how-to-send',
      title: 'How to send cargo from Lahore to the USA',
      blocks: [
        sendSteps('US address', 'in the US'),
        {
          type: 'p',
          text: `Pickup areas and office details are on our [Lahore page](${LAHORE_CITY_PATH}). City details: [New York](/destinations/usa/new-york), [Chicago](/destinations/usa/chicago), [Houston](/destinations/usa/houston).`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is cargo from Lahore to USA per kg?',
      answer: 'Rs 2,750–2,950 per kg by air and Rs 1,550–1,650 per kg by sea.',
    },
    {
      question: 'How much does 20 kg cost from Lahore to the USA?',
      answer: 'Rs 55,000–59,000 by air, delivered in 10–15 days.',
    },
    {
      question: 'How long does cargo from Lahore to USA take?',
      answer: '10–15 days door to door by air and 2–2.5 months by sea.',
    },
    {
      question: 'Can I send 1 kg to the USA?',
      answer: 'Our air minimum is 20 kg. For one or two kilograms, a courier is usually cheaper.',
    },
    {
      question: 'Will the receiver in the USA pay duty?',
      answer:
        'Possibly. Low-value goods are no longer duty-free in the US, but gifts worth $100 or less still are. We explain the likely charge before you book.',
    },
    { question: 'Can I send food to the USA?', answer: 'No, we do not accept food items.' },
  ],
  breadcrumbs: routeCrumbs('Lahore to USA', '/routes/lahore-to-usa'),
  quoteUrl: `${QUOTE_URL}&destination=usa`,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to the USA. Please give me a quote.',
  service: { serviceType: 'Cargo from Lahore to USA', areaServed: { code: 'US', name: 'United States' } },
  countrySlug: 'usa',
};

const LAHORE_TO_CANADA: LahorePage = {
  path: '/routes/lahore-to-canada',
  seoTitle: 'Cargo from Lahore to Canada | Rs 2,850/kg by Air | Raahi',
  seoDescription:
    'Send cargo from Lahore to Toronto, Mississauga, Vancouver and anywhere in Canada. Air Rs 2,850–2,950/kg (10–15 days), sea Rs 1,750–1,850/kg. Home pickup.',
  h1: 'Cargo from Lahore to Canada: Door-to-Door Air & Sea',
  intro: [
    'We collect from your home in Lahore and deliver to the door anywhere in Canada, including Toronto, Mississauga, Brampton, Calgary and Vancouver.',
    'By air it costs Rs 2,850–2,950 per kg and takes 10–15 days. By sea it costs Rs 1,750–1,850 per kg and takes 2–3 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to Canada cargo rates',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate', 'Rs 2,850–2,950/kg', 'Rs 1,750–1,850/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '10–15 days', '2–3 months'],
            ['Best for', 'Clothes, gifts, student luggage', 'Household moves, heavy or bulky goods'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'examples',
      title: 'What it costs: real examples',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg (one large box)', 'Rs 57,000–59,000', 'Below sea minimum'],
            ['30 kg', 'Rs 85,500–88,500', 'Below sea minimum'],
            ['50 kg', 'Rs 142,500–147,500', 'Below sea minimum'],
            ['100 kg', 'Rs 285,000–295,000', 'Rs 175,000–185,000'],
            ['200 kg', 'Rs 570,000–590,000', 'Rs 350,000–370,000'],
          ],
        },
        { type: 'p', text: `At 100 kg, sea saves about Rs 100,000–120,000. ${VOLUMETRIC_NOTE}` },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Air or sea to Canada?',
      blocks: [
        {
          type: 'p',
          text: '**Choose air** if you are sending under 70 kg, or it must arrive within about two weeks: a new semester, a wedding, winter clothes before the cold.',
        },
        {
          type: 'p',
          text: '**Choose sea** if you are sending 100 kg or more, such as household goods for a family that has just moved, and can wait 2–3 months.',
        },
      ],
    },
    {
      id: 'what-people-send',
      title: 'What people send from Lahore to Canada',
      blocks: [
        {
          type: 'list',
          items: [
            '**For family:** clothes, wedding outfits, shoes and gifts',
            '**Student luggage:** books, clothes and bedding for college or university in Canada',
            '**Household goods:** personal belongings for families who have moved to Canada',
            '**Business shipments:** clothing, textiles and samples for Canadian buyers, with a commercial invoice',
          ],
        },
        { type: 'p', text: NOT_ACCEPTED },
      ],
    },
    {
      id: 'customs',
      title: 'Canadian customs: what to expect',
      blocks: [
        {
          type: 'list',
          items: [
            'Gifts worth CAD $60 or less sent to someone in Canada by courier can come in free of duty and tax, with a card or note showing it is a gift ([CBSA](https://www.cbsa-asfc.gc.ca/import/courier/menu-eng.html)).',
            'Other goods may owe duty and tax, depending on what they are and their value. We tell you the likely charge before you book.',
            "New residents can usually bring their own belongings in duty-free as settlers' effects. Check CBSA's rules before you ship.",
            'Declare the real contents and value. A wrong declaration can hold a shipment at Canadian customs.',
          ],
        },
      ],
    },
    {
      id: 'how-to-send',
      title: 'How to send cargo from Lahore to Canada',
      blocks: [
        sendSteps('Canadian address', 'in Canada'),
        {
          type: 'p',
          text: `Pickup areas and office details are on our [Lahore page](${LAHORE_CITY_PATH}). City details: [Toronto](/destinations/canada/toronto), [Vancouver](/destinations/canada/vancouver).`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is cargo from Lahore to Canada per kg?',
      answer: 'Rs 2,850–2,950 per kg by air and Rs 1,750–1,850 per kg by sea.',
    },
    {
      question: 'How much does 20 kg cost from Lahore to Toronto?',
      answer: 'Rs 57,000–59,000 by air, delivered in 10–15 days.',
    },
    {
      question: 'How long does cargo from Lahore to Canada take?',
      answer: '10–15 days door to door by air and 2–3 months by sea.',
    },
    {
      question: 'Can I send gifts to Canada without duty?',
      answer:
        'Gifts worth CAD $60 or less can enter free of duty and tax when marked as a gift. Above that, duty and tax may apply.',
    },
    { question: 'Can I send food to Canada?', answer: 'No, we do not accept food items.' },
  ],
  breadcrumbs: routeCrumbs('Lahore to Canada', '/routes/lahore-to-canada'),
  quoteUrl: `${QUOTE_URL}&destination=canada`,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to Canada. Please give me a quote.',
  service: { serviceType: 'Cargo from Lahore to Canada', areaServed: { code: 'CA', name: 'Canada' } },
  countrySlug: 'canada',
};

export const LAHORE_ROUTE_PAGES: Record<string, LahorePage> = {
  'lahore-to-uk': LAHORE_TO_UK,
  'lahore-to-dubai': LAHORE_TO_DUBAI,
  'lahore-to-usa': LAHORE_TO_USA,
  'lahore-to-canada': LAHORE_TO_CANADA,
};

/** Lahore route page for a destination country slug (`uk`, `uae`, ...), if one exists. */
export function getLahoreRouteForCountry(countrySlug: string): LahorePage | undefined {
  return Object.values(LAHORE_ROUTE_PAGES).find((page) => page.countrySlug === countrySlug);
}
