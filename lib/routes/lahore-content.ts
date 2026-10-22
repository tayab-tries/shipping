/**
 * Lahore city page and Lahore → country route pages (copy from "Raahi Lahore Pages – Final Copy").
 *
 * Rates and transit times are the client-confirmed figures shown on /cargo-services.
 * Values the copy left as [PLACEHOLDERS] (street address, pickup time, what the rate includes, packing charges,
 * reviews, photos) are deliberately omitted until confirmed; add them here when available.
 *
 * Paragraph, list and FAQ answer text is Markdown, so inline links work: `[label](/path)`.
 */

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
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
  /** Keyword anchor text used wherever another page links here. */
  linkLabel: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  glance?: Array<[label: string, value: string]>;
  sections: ContentSection[];
  /** Defaults to "Frequently asked questions". */
  faqTitle?: string;
  /** FAQ answers are Markdown; links are stripped for the FAQPage schema. */
  faqs: Array<{ question: string; answer: string }>;
  /** Last line of the page body, under the FAQs. Markdown. */
  closing?: string;
  breadcrumbs: Array<{ label: string; url: string }>;
  quoteUrl: string;
  whatsappMessage: string;
  /** Route pages only: Service schema, with per-kg PKR price ranges as offers. */
  service?: {
    name: string;
    areaServed: { code: string; name: string };
    airRate: [min: number, max: number];
    seaRate: [min: number, max: number];
  };
  /** Destination country slug the route serves (links "Shipping from Lahore" on that page). */
  countrySlug?: string;
  /** Anchor text on the country page, when it differs from `linkLabel`. */
  countryLinkLabel?: string;
  /** Anchor text on destination city pages, keyed by city slug (e.g. `london`). */
  cityLinkLabels?: Record<string, string>;
}

export const LAHORE_LOCATION_KEY = 'lahore';
export const LAHORE_CITY_PATH = '/locations/international-cargo-services-in-lahore';
export const RATES_UPDATED = 'October 2026';
export const LAHORE_HOURS = 'Mon–Sat, 9am–7pm';

const PHONE = '0300 7097063';
const QUOTE_URL = '/quote?origin=lahore';

const NOT_ACCEPTED =
  '**Not accepted:** food items, liquids, perfumes, aerosols, lithium batteries and flammable or hazardous items.';
const VOLUMETRIC_RULE =
  'Air cargo is charged on actual weight or volumetric weight, whichever is higher. Volumetric weight is length × width × height in cm, divided by 6,000';
const VACUUM_TIP =
  '**Packing tip:** vacuum bags cut the size of a box of clothes, which lowers its volumetric weight.';

const routeCrumbs = (label: string, url: string) => [
  { label: 'Home', url: '/' },
  { label: 'Locations', url: '/locations' },
  { label: 'Lahore', url: LAHORE_CITY_PATH },
  { label, url },
];

const routeQuoteUrl = (destination: string) => `${QUOTE_URL}&destination=${destination}`;

const sendSteps = (
  quoteUrl: string,
  addressLabel: string,
  deliveredIn: string,
  confirms = 'delivery time'
): ContentBlock => ({
  type: 'list',
  ordered: true,
  items: [
    `WhatsApp ${PHONE} or fill in the [quote form](${quoteUrl}) with what you are sending, the rough weight and the ${addressLabel}.`,
    `We confirm the per-kg rate, the total and the ${confirms}.`,
    `We collect from your home in Lahore, or you drop off at our [Lahore office](${LAHORE_CITY_PATH}#office).`,
    'We weigh, pack if needed, and clear Pakistan export customs.',
    `Track it on our [tracking page](/track) until it is delivered ${deliveredIn}.`,
  ],
});

const routeClosing = (destination: string, quoteUrl: string) =>
  `Ready to send cargo from Lahore to ${destination}? WhatsApp ${PHONE} or use our [quote form](${quoteUrl}). Pickup areas and our office are on the [international cargo services in Lahore](${LAHORE_CITY_PATH}) page.`;

export const LAHORE_CITY_PAGE: LahorePage = {
  path: LAHORE_CITY_PATH,
  linkLabel: 'International cargo services in Lahore',
  seoTitle: 'International Cargo Services in Lahore | Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Lahore: door-to-door air and sea cargo to the UK, Dubai, USA and Canada. Home pickup, air from Rs 1,350/kg.',
  h1: 'International Cargo Services in Lahore: Door-to-Door Air & Sea Cargo',
  intro: [
    "Raahi International provides international cargo services in Lahore, Pakistan, with door-to-door delivery to the UK, UAE, Saudi Arabia, USA and Canada. We collect from your home or business anywhere in Lahore and deliver to the receiver's door abroad.",
    'Air cargo starts at 20 kg, from Rs 1,350 per kg. Sea cargo starts at 70–100 kg, from Rs 600 per kg. You get the price and delivery time in writing before anything is collected.',
  ],
  glance: [
    ['Office hours', LAHORE_HOURS],
    ['Call or WhatsApp', PHONE],
    ['Home pickup', 'Anywhere in Lahore'],
    ['Air cargo', 'From Rs 1,350/kg, minimum 20 kg'],
    ['Sea cargo', 'From Rs 600/kg, minimum 70–100 kg'],
  ],
  sections: [
    {
      id: 'rates',
      title: 'International cargo rates from Lahore (per kg)',
      blocks: [
        {
          type: 'p',
          text: 'These are our current rates from Lahore. The "20 kg by air" column shows what a typical family shipment costs.',
        },
        {
          type: 'table',
          head: ['Destination', 'Air (Rs/kg)', '20 kg by air', 'Air delivery', 'Sea (Rs/kg)', 'Sea delivery'],
          rows: [
            ['UK (except Scotland)', '1,750–1,850', 'Rs 35,000–37,000', '10–12 days', '950–1,000', '1.5–2.5 months'],
            ['Scotland', '2,350', 'Rs 47,000', '10–15 days', '1,250', '1.5–2.5 months'],
            ['UAE / Dubai', '1,350–1,450', 'Rs 27,000–29,000', '3–4 days', '600–700', '1.5–2.5 months'],
            ['Saudi Arabia', '2,150–2,250', 'Rs 43,000–45,000', '10–20 days', '950–1,000', '1.5–2.5 months'],
            ['USA', '2,750–2,950', 'Rs 55,000–59,000', '10–15 days', '1,550–1,650', '2–2.5 months'],
            ['Canada', '2,850–2,950', 'Rs 57,000–59,000', '10–15 days', '1,750–1,850', '2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Rates updated ${RATES_UPDATED}. Your exact price depends on chargeable weight and the delivery address. We also ship to Australia and Europe: [see all cargo rates](/cargo-services).`,
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo services in Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Air cargo is the fastest way to send 20 kg or more from Lahore. Door to door, it takes 10–12 days to the UK, 10–15 days to the USA and Canada, 3–4 days to the UAE and 10–20 days to Saudi Arabia.',
        },
        {
          type: 'p',
          text: 'It suits clothes, wedding outfits, gifts and student luggage, including [excess baggage](/services/excess-baggage) you cannot take on your flight.',
        },
        { type: 'h3', text: 'How air cargo is charged' },
        {
          type: 'p',
          text: 'You pay for the actual weight or the volumetric weight, whichever is higher. Volumetric weight is length × width × height in centimetres, divided by 6,000.',
        },
        {
          type: 'p',
          text: 'Example: a 60 × 50 × 50 cm box has a volumetric weight of 25 kg. If it weighs 18 kg on the scale, you pay for 25 kg. Fewer, fuller boxes keep the price down.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo services in Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo costs 35–60% less per kg than air, from Rs 600/kg to the UAE and Rs 950/kg to the UK. It takes 1.5–3 months and starts at 70–100 kg, so it suits household moves, furniture, heavy boxes and business stock.',
        },
        {
          type: 'list',
          items: [
            "**Shared container (LCL):** your boxes travel with other customers' cargo, and you pay only for your weight.",
            '**Full container (FCL):** a 20 ft or 40 ft container just for you, for a complete house move or a large business order. Quoted per container.',
          ],
        },
        {
          type: 'p',
          text: 'Sea cargo leaves Pakistan from Karachi port. We arrange everything from your door in Lahore to the door abroad. Sending stock for a business? See [commercial cargo](/services/commercial-cargo).',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Door-to-door cargo from Lahore: how it works',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `**Tell us what you are sending.** WhatsApp ${PHONE} or use the [quote form](${QUOTE_URL}). Include the destination, what is inside, the rough weight and box sizes.`,
            '**Get your price.** We send the per-kg rate, the delivery time and the total.',
            '**We collect.** We pick up from your Lahore address, weigh and measure each box, and confirm the final price.',
            '**We clear export customs.** We prepare the paperwork and dispatch by air, or by sea from Karachi port.',
            '**Track it.** Follow your shipment on our [tracking page](/track).',
            "**Delivered to the door.** We handle customs clearance abroad and deliver to the receiver's address.",
          ],
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Cargo pickup anywhere in Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Looking for a cargo service near Johar Town, DHA or Gulberg? We collect from homes, offices and factories across the city, including:',
        },
        {
          type: 'list',
          items: [
            'Gulberg, DHA (Phases 1–9), Cantt, Cavalry Ground',
            'Model Town, Garden Town, Faisal Town, Johar Town',
            'Allama Iqbal Town, Bahria Town',
            'Sundar Industrial Estate and Quaid-e-Azam Industrial Estate',
          ],
        },
        {
          type: 'p',
          text: `Outside these areas? Send your location on WhatsApp and we will confirm. Or drop your boxes at [our Lahore office](#office), ${LAHORE_HOURS}.`,
        },
      ],
    },
    {
      id: 'packing',
      title: 'Packing and wooden crating in Lahore',
      blocks: [
        {
          type: 'p',
          text: 'We pack your shipment in Lahore so it is export-ready before it leaves the city. Good packing protects your goods and keeps the chargeable weight down.',
        },
        {
          type: 'table',
          head: ['What you are sending', 'How we pack it'],
          rows: [
            ['Clothes, bedding, books', 'Double-wall export cartons sealed with H-taping. Vacuum bags for clothes, to cut the box size.'],
            ['Bridal and embroidered outfits', 'Packed flat in a rigid box, with tissue between the folds'],
            ['Crockery, glassware, kitchenware', 'Each item bubble-wrapped, with at least 5 cm (2 in) of cushioning'],
            ['Furniture, mirrors, marble and onyx pieces, chandeliers', 'A custom wooden crate'],
            ['Business stock and heavy goods', 'Cartons stacked on a pallet and stretch-wrapped'],
          ],
        },
        {
          type: 'p',
          text: 'Wooden crates for export must be made from heat-treated wood carrying the ISPM 15 stamp. The UK, USA and Canada all require it for wood packaging, and we build our crates to that standard.',
        },
        {
          type: 'p',
          text: 'A crate adds weight and size, so we tell you the chargeable weight after crating, before you confirm. See our [packing guide](/guides/packing-cargo-guide).',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send from Lahore',
      blocks: [
        {
          type: 'p',
          text: "Common shipments include wedding outfits and lawn suits for family abroad, a student's books and winter clothes, household goods when a family moves, and stock for overseas shops.",
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
          text: 'Ask us before sending medicines, electronics or anything valuable. Rules differ by country, and we tell you before you pack.',
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
            '[Cargo from Lahore to UK](/routes/lahore-to-uk): Rs 1,750–1,850/kg by air, 10–12 days, to London, Birmingham, Manchester and the rest of the UK.',
            '[Cargo from Lahore to Dubai](/routes/lahore-to-dubai): Rs 1,350–1,450/kg by air, to Dubai, Abu Dhabi, Sharjah and the rest of the UAE.',
            '[Cargo from Lahore to USA](/routes/lahore-to-usa): Rs 2,750–2,950/kg by air, 10–15 days.',
            '[Shipping from Lahore to Canada](/routes/lahore-to-canada): Rs 2,850–2,950/kg by air, 10–15 days.',
            '[Cargo to Saudi Arabia](/destinations/ksa): Rs 2,150–2,250/kg by air, 10–20 days.',
          ],
        },
      ],
    },
    {
      id: 'choosing',
      title: 'How to choose between cargo companies in Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Lahore has dozens of cargo companies, from freight forwarders to packers and movers. Before you book, ask each one six questions:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'What is your rate per kg, in writing?',
            'What is the minimum weight?',
            'How do you calculate volumetric weight?',
            'Does the price include pickup and delivery to the door, and who pays customs duty abroad?',
            'Do you have an office I can visit, and Google reviews I can read?',
            'Will I get a tracking number?',
          ],
        },
        {
          type: 'p',
          text: 'A company that answers all six clearly is a safer choice than the lowest price on WhatsApp. We answer all six on this page.',
        },
      ],
    },
    {
      id: 'office',
      title: 'Cargo services in Lahore: office address and contact number',
      blocks: [
        { type: 'p', text: `Our cargo services in Lahore contact number is **${PHONE}** (calls and WhatsApp).` },
        { type: 'p', text: `Open ${LAHORE_HOURS}. Drop off your boxes or get packing advice in person.` },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Lahore',
  faqs: [
    {
      question: 'How much is cargo per kg from Lahore?',
      answer:
        'By air, Rs 1,350–1,450 to the UAE, Rs 1,750–1,850 to the UK, Rs 2,150–2,250 to Saudi Arabia, Rs 2,750–2,950 to the USA and Rs 2,850–2,950 to Canada. Sea cargo starts at Rs 600 per kg.',
    },
    {
      question: 'Which companies offer cargo services in Lahore, Pakistan?',
      answer:
        'Many freight forwarders and packers and movers do, including Raahi International. Compare them on a written per-kg rate, minimum weight, who pays duty abroad and real reviews.',
    },
    {
      question: 'Which are the best cargo services in Lahore?',
      answer:
        'The best ones give you a written per-kg rate, a clear minimum weight, door-to-door delivery and a tracking number, and have an office and reviews you can check. Use the [six questions above](#choosing) to compare.',
    },
    {
      question: 'Where can I find cheap cargo services in Lahore?',
      answer:
        'Sea cargo is the cheapest per kg: from Rs 600 to the UAE and Rs 950 to the UK, for 70–100 kg or more. By air, the UAE is the cheapest route at Rs 1,350–1,450 per kg.',
    },
    {
      question: 'Is cargo cheaper than courier services in Lahore?',
      answer:
        'For 20 kg or more, cargo usually costs much less per kg than express courier services in Lahore. Under 20 kg, a courier is usually the better choice, because our air minimum is 20 kg.',
    },
    {
      question: 'How long does air cargo from Lahore take?',
      answer:
        '10–12 days to the UK, 10–15 days to the USA and Canada, 3–4 days to the UAE and 10–20 days to Saudi Arabia, door to door.',
    },
    {
      question: 'Do you offer door-to-door cargo from Lahore?',
      answer:
        "Yes. We collect from your address in Lahore and deliver to the receiver's door in the UK, UAE, Saudi Arabia, USA and Canada.",
    },
    {
      question: 'Do you offer packing and wooden crating services in Lahore?',
      answer:
        'Yes. We pack in export cartons, and build wooden crates from ISPM 15 heat-treated wood for furniture, mirrors, marble and other fragile items.',
    },
    {
      question: 'Can I drop my boxes at your Lahore office?',
      answer: `Yes. Our Lahore office is open ${LAHORE_HOURS}. WhatsApp ${PHONE} before you come.`,
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
      answer: 'Use the tracking number we give you on our [tracking page](/track), or ask us on WhatsApp.',
    },
  ],
  closing: `Ready to send? Get a quote for international cargo services in Lahore on WhatsApp at ${PHONE}, or use our [quote form](${QUOTE_URL}).`,
  breadcrumbs: [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: 'Lahore', url: LAHORE_CITY_PATH },
  ],
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Lahore. Please guide me.',
};

const UK_QUOTE_URL = routeQuoteUrl('uk');

const LAHORE_TO_UK: LahorePage = {
  path: '/routes/lahore-to-uk',
  linkLabel: 'Cargo from Lahore to UK',
  seoTitle: 'Cargo from Lahore to UK | Rs 1,750/kg, Door to Door | Raahi',
  seoDescription:
    'Cargo from Lahore to UK, door to door: air Rs 1,750–1,850/kg in 10–12 days, sea Rs 950–1,000/kg. Home pickup in Lahore, delivery anywhere in the UK.',
  h1: 'Cargo from Lahore to UK: Door-to-Door Air & Sea',
  intro: [
    'Send cargo from Lahore to UK addresses door to door. We collect your boxes from home in Lahore and deliver them anywhere in the UK, from London and Birmingham to Manchester, Bradford and Glasgow.',
    'Our Lahore to UK cargo service costs Rs 1,750–1,850 per kg by air, delivered in 10–12 days, or Rs 950–1,000 per kg by sea in 1.5–2.5 months. You get the price in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to UK cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['England and Wales', 'Rs 1,750–1,850/kg', 'Rs 950–1,000/kg'],
            ['Scotland', 'Rs 2,350/kg', 'Rs 1,250/kg'],
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
          text: 'Prices are for England and Wales. At 100 kg, sea saves about Rs 75,000–90,000 but takes 1.5–2.5 months instead of 10–12 days.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Air is the fastest way to send 20 kg or more: 10–12 days door to door, or 10–15 days to Scotland. It suits clothes, wedding outfits, gifts and student luggage.',
        },
        { type: 'p', text: `${VOLUMETRIC_RULE}, so a light but bulky box can cost more than its scale weight.` },
        {
          type: 'p',
          text: 'Sending for a wedding, Eid or the start of term? Book at least three weeks ahead to allow for pickup, export clearance and UK delivery.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo costs Rs 950–1,000 per kg (Rs 1,250 to Scotland), takes 1.5–2.5 months and starts at 70–100 kg. It is the cheapest way to send a household move, furniture or heavy boxes.',
        },
        {
          type: 'p',
          text: 'For a complete house move, we quote a full 20 ft or 40 ft container. Sea cargo leaves Pakistan from Karachi port, and we arrange everything from your door in Lahore to the UK door.',
        },
      ],
    },
    {
      id: 'london',
      title: 'Cargo from Lahore to London',
      blocks: [
        {
          type: 'p',
          text: 'Our Lahore to London cargo service uses the same rates as the rest of England: Rs 1,750–1,850 per kg by air, so Rs 35,000–37,000 for 20 kg, delivered in 10–12 days. By sea it is Rs 950–1,000 per kg.',
        },
        {
          type: 'p',
          text: 'We deliver to any London address, from Southall and Wembley to Ilford and East Ham. See [cargo to London](/destinations/uk/london).',
        },
        {
          type: 'p',
          text: 'The same rates apply to [Birmingham](/destinations/uk/birmingham), [Manchester](/destinations/uk/manchester), Bradford, Leeds and every other town in England and Wales.',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Clothes are the most common thing families send: lawn suits, bridal and wedding outfits, unstitched fabric and winter wear.',
        },
        {
          type: 'list',
          items: [
            '**Gifts for family** go as personal cargo. Gifts worth more than £39 are charged UK VAT.',
            '**Stock for a UK boutique** goes as [commercial cargo](/services/commercial-cargo) with an invoice, and the UK receiver needs an EORI number.',
            `${VACUUM_TIP} Pack heavily embroidered bridal wear flat, in a rigid box.`,
          ],
        },
        { type: 'p', text: `${NOT_ACCEPTED} Ask us before sending medicines or electronics.` },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Starting university in the UK? Send your books, winter clothes and bedding ahead by air cargo instead of paying airline excess baggage fees. 30 kg costs Rs 52,500–55,500 and arrives in 10–12 days, so book it about three weeks before term starts. See [excess baggage shipping](/services/excess-baggage).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'UK customs duty on cargo from Pakistan',
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
      id: 'how-it-works',
      title: 'Door-to-door cargo from Lahore to UK: how it works',
      blocks: [sendSteps(UK_QUOTE_URL, 'UK address', 'to the UK door', 'delivery date')],
    },
  ],
  faqTitle: 'Lahore to UK cargo: frequently asked questions',
  faqs: [
    {
      question: 'How much is cargo from Lahore to UK per kg?',
      answer:
        'Rs 1,750–1,850 per kg by air and Rs 950–1,000 per kg by sea, for England and Wales. Scotland is Rs 2,350 by air and Rs 1,250 by sea.',
    },
    {
      question: 'How much does it cost to send 20 kg from Lahore to UK?',
      answer:
        'Rs 35,000–37,000 by air, delivered in 10–12 days. That is the same whether it goes to London, Birmingham or Manchester.',
    },
    {
      question: 'How long does cargo take from Lahore to UK?',
      answer: '10–12 days door to door by air (10–15 days to Scotland) and 1.5–2.5 months by sea.',
    },
    {
      question: 'What is the cheapest way to ship from Lahore to the UK?',
      answer:
        'Sea cargo, at Rs 950–1,000 per kg, if you have 70–100 kg or more. Below that, air cargo from Rs 1,750 per kg is the option.',
    },
    {
      question: 'How much does shipping from Lahore to UK cost for a house move?',
      answer: 'About Rs 95,000–100,000 for 100 kg by sea. For a full house, we quote a 20 ft or 40 ft container.',
    },
    {
      question: 'Do you deliver to Scotland?',
      answer: 'Yes, at Rs 2,350 per kg by air (10–15 days) and Rs 1,250 per kg by sea.',
    },
    {
      question: 'Can I send less than 20 kg?',
      answer: 'Our air minimum is 20 kg. For a few kilograms, a courier is usually cheaper.',
    },
    { question: 'Can I send food from Lahore to the UK?', answer: 'No, we do not accept food items.' },
    {
      question: 'Will my family in the UK pay customs duty?',
      answer:
        'Gifts worth £39 or less have no VAT. Above that, VAT applies, and goods over £135 may also be charged duty. We explain this before you book.',
    },
  ],
  closing: routeClosing('UK', UK_QUOTE_URL),
  breadcrumbs: routeCrumbs('Lahore to UK', '/routes/lahore-to-uk'),
  quoteUrl: UK_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to the UK. Please give me a quote.',
  service: {
    name: 'Cargo from Lahore to UK',
    areaServed: { code: 'GB', name: 'United Kingdom' },
    airRate: [1750, 1850],
    seaRate: [950, 1000],
  },
  countrySlug: 'uk',
  cityLinkLabels: { london: 'Lahore to London cargo' },
};

const DUBAI_QUOTE_URL = routeQuoteUrl('uae');

const LAHORE_TO_DUBAI: LahorePage = {
  path: '/routes/lahore-to-dubai',
  linkLabel: 'Cargo from Lahore to Dubai',
  seoTitle: 'Cargo from Lahore to Dubai & UAE | Rs 1,350/kg | Raahi',
  seoDescription:
    'Cargo from Lahore to Dubai, door to door: air Rs 1,350–1,450/kg, sea Rs 600–700/kg. Home pickup in Lahore, delivery across Dubai, Abu Dhabi and Sharjah.',
  h1: 'Cargo from Lahore to Dubai: Door-to-Door Air & Sea',
  intro: [
    'Send cargo from Lahore to Dubai door to door. We collect your boxes from home in Lahore and deliver them anywhere in Dubai, Abu Dhabi, Sharjah, Ajman and the other emirates.',
    'The UAE is our lowest-cost route: Rs 1,350–1,450 per kg by air, delivered in 3–4 days, or Rs 600–700 per kg by sea in 1.5–2.5 months. You get the price in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to Dubai cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate (all seven emirates)', 'Rs 1,350–1,450/kg', 'Rs 600–700/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '3–4 days', '1.5–2.5 months'],
            ['Best for', 'Clothes, gifts, things needed soon', 'Household goods, heavy or bulky items'],
          ],
        },
        {
          type: 'p',
          text: `These are our Pakistan to Dubai cargo rates per kg for pickups in Lahore. Rates updated ${RATES_UPDATED}.`,
        },
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
        {
          type: 'p',
          text: 'At 100 kg, sea saves about Rs 65,000–85,000 but takes 1.5–2.5 months instead of 3–4 days.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to Dubai',
      blocks: [
        {
          type: 'p',
          text: 'Air is the quickest way to send 20 kg or more to the UAE: 3–4 days door to door. It suits clothes, shoes, bedding and gifts for family working in Dubai.',
        },
        { type: 'p', text: `${VOLUMETRIC_RULE}, so pack into fewer, fuller boxes.` },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to Dubai',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo costs Rs 600–700 per kg, about half the air price, and starts at 70–100 kg. It takes 1.5–2.5 months and is the cheapest way to send household goods when you or your family move to Dubai.',
        },
        {
          type: 'p',
          text: 'For a full household or a business order, we quote a 20 ft or 40 ft container. Sea cargo leaves Pakistan from Karachi port, and we arrange everything from your door in Lahore to the door in the UAE.',
        },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Air or sea to Dubai?',
      blocks: [
        {
          type: 'p',
          text: '**Choose air** if you are sending under 70 kg, or the items are needed within a week.',
        },
        {
          type: 'p',
          text: '**Choose sea** if you are sending 100 kg or more and can wait up to 2.5 months to pay about half the air price.',
        },
      ],
    },
    {
      id: 'moving',
      title: 'Moving to Dubai from Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Starting a job in Dubai? Send the essentials you need in the first weeks by air, and the rest of your household by sea. Book the sea shipment about three months before you need it, since it takes 1.5–2.5 months door to door.',
        },
        {
          type: 'p',
          text: 'Keep a list of everything in each box with its value. It speeds up UAE customs, and we need it for every shipment.',
        },
      ],
    },
    {
      id: 'emirates',
      title: 'Cargo from Lahore to Abu Dhabi, Sharjah and the rest of the UAE',
      blocks: [
        {
          type: 'p',
          text: 'The same rates apply across the UAE. We deliver to Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. See [cargo to Abu Dhabi](/destinations/uae/abu-dhabi) and [cargo to the UAE](/destinations/uae).',
        },
      ],
    },
    {
      id: 'what-people-send',
      title: 'What people send from Lahore to Dubai',
      blocks: [
        {
          type: 'list',
          items: [
            '**For family working in the UAE:** clothes, shoes, bedding and gifts',
            '**For a move:** household goods and personal belongings when you or your family relocate to Dubai',
            '**For business:** clothing, textiles and other stock for UAE traders, sent as [commercial cargo](/services/commercial-cargo) with a commercial invoice',
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
      id: 'how-it-works',
      title: 'How door-to-door delivery to Dubai works',
      blocks: [sendSteps(DUBAI_QUOTE_URL, 'UAE address', 'in the UAE')],
    },
  ],
  faqTitle: 'Lahore to Dubai cargo: frequently asked questions',
  faqs: [
    {
      question: 'What does Lahore to Dubai cargo cost per kg?',
      answer: 'Rs 1,350–1,450 per kg by air and Rs 600–700 per kg by sea.',
    },
    {
      question: 'What is the Pakistan to Dubai cargo price for 20 kg?',
      answer: 'From Lahore, 20 kg costs Rs 27,000–29,000 by air, delivered in 3–4 days.',
    },
    {
      question: 'How long does cargo take from Lahore to Dubai?',
      answer: '3–4 days door to door by air and 1.5–2.5 months by sea.',
    },
    {
      question: 'How much does shipping from Lahore to Dubai cost for a house move?',
      answer: 'About Rs 60,000–70,000 for 100 kg by sea. For a full household, we quote a 20 ft or 40 ft container.',
    },
    {
      question: 'Do you deliver outside Dubai?',
      answer: 'Yes, to Abu Dhabi, Sharjah, Ajman and every other emirate, at the same rates.',
    },
    {
      question: 'Can I send medicine from Pakistan to the UAE?',
      answer: 'Only after checking with us first. Some medicines are controlled in the UAE.',
    },
    { question: 'Can I send food to Dubai?', answer: 'No, we do not accept food items.' },
  ],
  closing: routeClosing('Dubai', DUBAI_QUOTE_URL),
  breadcrumbs: routeCrumbs('Lahore to Dubai', '/routes/lahore-to-dubai'),
  quoteUrl: DUBAI_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to Dubai. Please give me a quote.',
  service: {
    name: 'Cargo from Lahore to Dubai',
    areaServed: { code: 'AE', name: 'United Arab Emirates' },
    airRate: [1350, 1450],
    seaRate: [600, 700],
  },
  countrySlug: 'uae',
};

const USA_QUOTE_URL = routeQuoteUrl('usa');

const LAHORE_TO_USA: LahorePage = {
  path: '/routes/lahore-to-usa',
  linkLabel: 'Cargo from Lahore to USA',
  seoTitle: 'Cargo from Lahore to USA | Rs 2,750/kg, Door to Door | Raahi',
  seoDescription:
    'Cargo from Lahore to USA, door to door: air Rs 2,750–2,950/kg in 10–15 days, sea Rs 1,550–1,650/kg. Home pickup in Lahore, delivery anywhere in the USA.',
  h1: 'Cargo from Lahore to USA: Door-to-Door Air & Sea',
  intro: [
    'Send cargo from Lahore to USA addresses door to door. We collect your boxes from home in Lahore and deliver them anywhere in the USA, including New York, New Jersey, Chicago, Houston and California.',
    'Shipping from Lahore to USA costs Rs 2,750–2,950 per kg by air, delivered in 10–15 days, or Rs 1,550–1,650 per kg by sea in 2–2.5 months. You get the price in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to USA cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate (all states)', 'Rs 2,750–2,950/kg', 'Rs 1,550–1,650/kg'],
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
        {
          type: 'p',
          text: 'At 100 kg, sea saves about Rs 110,000–140,000 but takes 2–2.5 months instead of 10–15 days.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to USA',
      blocks: [
        {
          type: 'p',
          text: 'Air is the fastest way to send 20 kg or more: 10–15 days door to door. It suits clothes, wedding outfits, gifts and student luggage.',
        },
        {
          type: 'p',
          text: `${VOLUMETRIC_RULE}. At US rates a bulky, light box gets expensive, so pack tightly into fewer boxes.`,
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to USA',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo costs Rs 1,550–1,650 per kg, about 40–45% less than air, and starts at 70–100 kg. It takes 2–2.5 months and is the cheapest way to send a household move or heavy boxes.',
        },
        {
          type: 'p',
          text: 'For a complete house move, we quote a full 20 ft or 40 ft container. Sea cargo leaves Pakistan from Karachi port, and we arrange everything from your door in Lahore to the US door.',
        },
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
      id: 'cities',
      title: 'Cargo from Lahore to New York, Chicago, Houston and the rest of the USA',
      blocks: [
        {
          type: 'p',
          text: 'The same rates apply to every state. We deliver to New York and New Jersey, Chicago, Houston and the rest of Texas, California and everywhere else in the US. See cargo to [New York](/destinations/usa/new-york), [Chicago](/destinations/usa/chicago) and [Houston](/destinations/usa/houston).',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to the USA',
      blocks: [
        {
          type: 'p',
          text: "Clothes are what most families send: lawn suits, wedding and bridal outfits, unstitched fabric and children's clothes.",
        },
        {
          type: 'list',
          items: [
            '**Gifts for family** go as personal cargo. Gifts worth $100 or less are still duty-free in the US.',
            '**Stock for a US shop or online store** goes as [commercial cargo](/services/commercial-cargo) with an invoice, and duty is charged on its value.',
            VACUUM_TIP,
          ],
        },
        { type: 'p', text: `${NOT_ACCEPTED} Ask us before sending medicines or electronics.` },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to the USA',
      blocks: [
        {
          type: 'p',
          text: 'Starting university in the US? Send books, winter clothes and bedding ahead by air instead of paying airline excess baggage fees. 30 kg costs Rs 82,500–88,500 and arrives in 10–15 days, so book about three weeks before the semester. See [excess baggage shipping](/services/excess-baggage).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'US customs duty on cargo from Pakistan',
      blocks: [
        {
          type: 'list',
          items: [
            'Low-value shipments are no longer duty-free. The US has suspended its duty-free "de minimis" entry for low-value goods, so most cargo may now owe duty ([Federal Register](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)).',
            'Gifts worth $100 or less sent to someone in the US are still exempt.',
            'Shop or business goods are charged duty based on what they are and current US tariffs. We confirm the likely charge before you book.',
            'Declare the real contents and value. A wrong declaration can hold a shipment at US customs.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How door-to-door delivery to the USA works',
      blocks: [sendSteps(USA_QUOTE_URL, 'US address', 'in the US')],
    },
  ],
  faqTitle: 'Lahore to USA cargo: frequently asked questions',
  faqs: [
    {
      question: 'What does Lahore to USA cargo cost per kg?',
      answer: 'Rs 2,750–2,950 per kg by air and Rs 1,550–1,650 per kg by sea.',
    },
    {
      question: 'What is the cargo price from Pakistan to USA for 20 kg?',
      answer: 'From Lahore, 20 kg costs Rs 55,000–59,000 by air, delivered in 10–15 days.',
    },
    {
      question: 'How long does cargo take from Lahore to USA?',
      answer: '10–15 days door to door by air and 2–2.5 months by sea.',
    },
    {
      question: 'How much does shipping from Lahore to USA cost for a house move?',
      answer: 'About Rs 155,000–165,000 for 100 kg by sea. For a full house, we quote a 20 ft or 40 ft container.',
    },
    {
      question: 'How much does it cost to ship 1 kg from Pakistan to the USA?',
      answer:
        'We do not ship single kilograms: our air minimum is 20 kg. For one or two kilograms, a courier is usually cheaper.',
    },
    {
      question: 'Can I send gifts from Pakistan to the USA without duty?',
      answer: 'Yes, if the gift is worth $100 or less. Above that, US duty may apply. We explain the likely charge before you book.',
    },
    { question: 'Can I send food to the USA?', answer: 'No, we do not accept food items.' },
  ],
  closing: routeClosing('USA', USA_QUOTE_URL),
  breadcrumbs: routeCrumbs('Lahore to USA', '/routes/lahore-to-usa'),
  quoteUrl: USA_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to the USA. Please give me a quote.',
  service: {
    name: 'Cargo from Lahore to USA',
    areaServed: { code: 'US', name: 'United States' },
    airRate: [2750, 2950],
    seaRate: [1550, 1650],
  },
  countrySlug: 'usa',
};

const CANADA_QUOTE_URL = routeQuoteUrl('canada');

const LAHORE_TO_CANADA: LahorePage = {
  path: '/routes/lahore-to-canada',
  linkLabel: 'Shipping from Lahore to Canada',
  seoTitle: 'Cargo & Shipping from Lahore to Canada | Rs 2,850/kg | Raahi',
  seoDescription:
    'Shipping from Lahore to Canada, door to door: air Rs 2,850–2,950/kg in 10–15 days, sea Rs 1,750–1,850/kg. Home pickup in Lahore, delivery across Canada.',
  h1: 'Cargo from Lahore to Canada: Door-to-Door Air & Sea',
  intro: [
    'Send cargo from Lahore to Canada door to door. We collect your boxes from home in Lahore and deliver them anywhere in Canada, including Toronto, Mississauga, Brampton, Calgary and Vancouver.',
    'Shipping from Lahore to Canada costs Rs 2,850–2,950 per kg by air, delivered in 10–15 days, or Rs 1,750–1,850 per kg by sea in 2–3 months. You get the price in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to Canada cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air cargo', 'Sea cargo'],
          rows: [
            ['Rate (all provinces)', 'Rs 2,850–2,950/kg', 'Rs 1,750–1,850/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door-to-door time', '10–15 days', '2–3 months'],
            ['Best for', 'Clothes, gifts, student luggage', 'Household moves, heavy or bulky goods'],
          ],
        },
        {
          type: 'p',
          text: `These are our Pakistan to Canada shipping rates per kg for pickups in Lahore. Rates updated ${RATES_UPDATED}.`,
        },
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
        {
          type: 'p',
          text: 'At 100 kg, sea saves about Rs 100,000–120,000 but takes 2–3 months instead of 10–15 days.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Air is the fastest way to send 20 kg or more: 10–15 days door to door. It suits clothes, wedding outfits, gifts and student luggage.',
        },
        {
          type: 'p',
          text: `${VOLUMETRIC_RULE}. At Canada rates a bulky, light box gets expensive, so pack tightly into fewer boxes.`,
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo costs Rs 1,750–1,850 per kg, about 35–40% less than air, and starts at 70–100 kg. It takes 2–3 months and is the cheapest way to send household goods to a family that has moved to Canada.',
        },
        {
          type: 'p',
          text: 'For a complete house move, we quote a full 20 ft or 40 ft container. Sea cargo leaves Pakistan from Karachi port, and we arrange everything from your door in Lahore to the door in Canada.',
        },
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
          text: '**Choose sea** if you are sending 100 kg or more and can wait 2–3 months to save about 35–40%.',
        },
      ],
    },
    {
      id: 'cities',
      title: 'Cargo from Lahore to Toronto, Mississauga, Vancouver and the rest of Canada',
      blocks: [
        {
          type: 'p',
          text: 'The same rates apply to every province. We deliver to Toronto, Mississauga and Brampton, Calgary and Edmonton, Vancouver and Surrey, Montreal and everywhere else in Canada. See [cargo to Toronto](/destinations/canada/toronto) and [cargo to Vancouver](/destinations/canada/vancouver).',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Clothes are what most families send: lawn suits, wedding and bridal outfits, unstitched fabric, and warm clothes for Canadian winters.',
        },
        {
          type: 'list',
          items: [
            '**Gifts for family** go as personal cargo. Gifts worth CAD $60 or less can enter duty and tax free.',
            '**Stock for a Canadian shop** goes as [commercial cargo](/services/commercial-cargo) with an invoice, and duty and tax are charged on its value.',
            VACUUM_TIP,
          ],
        },
        { type: 'p', text: `${NOT_ACCEPTED} Ask us before sending medicines or electronics.` },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Starting college or university in Canada? Send books, bedding and winter clothes ahead by air instead of paying airline excess baggage fees. 30 kg costs Rs 85,500–88,500 and arrives in 10–15 days, so book about three weeks before term. See [excess baggage shipping](/services/excess-baggage).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'Canadian customs: what to expect',
      blocks: [
        {
          type: 'list',
          items: [
            'Gifts worth CAD $60 or less sent to someone in Canada by courier can come in free of duty and tax, with a card or note showing it is a gift ([CBSA](https://cbsa-asfc.gc.ca/import/courier/lvs-efv/prsn-eng.html)).',
            'Other goods may owe duty and tax, depending on what they are and their value. We tell you the likely charge before you book.',
            "New residents can usually bring their own belongings in duty-free as settlers' effects. Check CBSA's rules before you ship.",
            'Declare the real contents and value. A wrong declaration can hold a shipment at Canadian customs.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How door-to-door delivery to Canada works',
      blocks: [sendSteps(CANADA_QUOTE_URL, 'Canadian address', 'in Canada')],
    },
  ],
  faqTitle: 'Lahore to Canada cargo: frequently asked questions',
  faqs: [
    {
      question: 'What is the Pakistan to Canada cargo price per kg from Lahore?',
      answer: 'Rs 2,850–2,950 per kg by air and Rs 1,750–1,850 per kg by sea.',
    },
    {
      question: 'How much does 20 kg cost from Lahore to Toronto?',
      answer: 'Rs 57,000–59,000 by air, delivered in 10–15 days.',
    },
    {
      question: 'What is the Pakistan to Canada shipping time from Lahore?',
      answer: '10–15 days door to door by air and 2–3 months by sea.',
    },
    {
      question: 'How long does a cargo ship take from Pakistan to Canada?',
      answer:
        'Allow 2–3 months door to door for sea cargo from Lahore, including transport to Karachi port and Canadian customs.',
    },
    {
      question: 'What is the cheapest cargo from Pakistan to Canada?',
      answer:
        'Sea cargo, at Rs 1,750–1,850 per kg, if you have 70–100 kg or more. We confirm your shipping charges in writing before pickup.',
    },
    {
      question: 'How much does shipping from Lahore to Canada cost for a house move?',
      answer: 'About Rs 175,000–185,000 for 100 kg by sea. For a full house, we quote a 20 ft or 40 ft container.',
    },
    {
      question: 'Can I send a small parcel from Pakistan to Canada?',
      answer: 'Our air minimum is 20 kg. For a parcel of a few kilograms, a courier is usually cheaper.',
    },
    {
      question: 'Can I send gifts to Canada without duty?',
      answer:
        'Gifts worth CAD $60 or less can enter free of duty and tax when marked as a gift. Above that, duty and tax may apply.',
    },
    { question: 'Can I send food to Canada?', answer: 'No, we do not accept food items.' },
  ],
  closing: routeClosing('Canada', CANADA_QUOTE_URL),
  breadcrumbs: routeCrumbs('Lahore to Canada', '/routes/lahore-to-canada'),
  quoteUrl: CANADA_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Lahore to Canada. Please give me a quote.',
  service: {
    name: 'Cargo from Lahore to Canada',
    areaServed: { code: 'CA', name: 'Canada' },
    airRate: [2850, 2950],
    seaRate: [1750, 1850],
  },
  countrySlug: 'canada',
  countryLinkLabel: 'Cargo from Lahore to Canada',
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
