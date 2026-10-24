/**
 * Lahore city page and Lahore → country route pages (copy from "Raahi Lahore Pages – Final Copy").
 *
 * Rates and transit times are the client-confirmed figures shown on /cargo-services.
 * Values the copy left as [PLACEHOLDERS] (street address, pickup time, what the rate includes, packing charges,
 * reviews, photos) are deliberately omitted until confirmed; add them here when available.
 */

import {
  CityLanding,
  contentWhatsappLink,
  LandingPage,
  OFFICE_HOURS,
  OriginCity,
  PHONE,
  RATES_UPDATED,
  routeBreadcrumbs,
} from './shared';

export const LAHORE_LOCATION_KEY = 'lahore';
export const LAHORE_CITY_PATH = '/locations/international-cargo-services-in-lahore';

const LAHORE: OriginCity = {
  key: LAHORE_LOCATION_KEY,
  name: 'Lahore',
  province: 'Punjab',
  cityPath: LAHORE_CITY_PATH,
};

const QUOTE_URL = '/quote?origin=lahore';

const whatsappLink = (destination?: string) => contentWhatsappLink('Lahore', destination);
const WHATSAPP_URL = whatsappLink();

const routeCrumbs = (label: string, url: string) => routeBreadcrumbs(LAHORE, label, url);

const routeQuoteUrl = (destination: string) => `${QUOTE_URL}&destination=${destination}`;

const LAHORE_CITY_PAGE: LandingPage = {
  origin: LAHORE,
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
    ['Office hours', OFFICE_HOURS],
    ['Call or WhatsApp', `[${PHONE}](${WHATSAPP_URL})`],
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
            `**Tell us what you are sending.** [WhatsApp ${PHONE}](${WHATSAPP_URL}) or use the [quote form](${QUOTE_URL}). Include the destination, what is inside, the rough weight and box sizes.`,
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
          text: `Outside these areas? Send your location on [WhatsApp](${WHATSAPP_URL}) and we will confirm. Or drop your boxes at [our Lahore office](#office), ${OFFICE_HOURS}.`,
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
        { type: 'p', text: `Our cargo services in Lahore contact number is **[${PHONE}](${WHATSAPP_URL})** (calls and WhatsApp).` },
        { type: 'p', text: `Open ${OFFICE_HOURS}. Drop off your boxes or get packing advice in person.` },
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
      answer: `Yes. Our Lahore office is open ${OFFICE_HOURS}. WhatsApp ${PHONE} before you come.`,
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
      answer: `Use the tracking number we give you on our [tracking page](/track), or ask us on [WhatsApp](${WHATSAPP_URL}).`,
    },
  ],
  closing: `Ready to send? Get a quote for international cargo services in Lahore on [WhatsApp at ${PHONE}](${WHATSAPP_URL}), or use our [quote form](${QUOTE_URL}).`,
  breadcrumbs: [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: 'Lahore', url: LAHORE_CITY_PATH },
  ],
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Lahore. Please guide me.',
};

const UK_QUOTE_URL = routeQuoteUrl('uk');

const LAHORE_TO_UK: LandingPage = {
  origin: LAHORE,
  path: '/routes/lahore-to-uk',
  linkLabel: 'Cargo from Lahore to UK',
  seoTitle: 'Cargo from Lahore to UK | Rs 1,750/kg, Door to Door | Raahi',
  seoDescription:
    'Cargo from Lahore to UK, door to door: air Rs 1,750–1,850/kg in 10–12 days, sea Rs 950–1,000/kg. Home pickup in Lahore, delivery anywhere in the UK.',
  h1: 'Cargo from Lahore to UK: Door-to-Door Air & Sea',
  intro: [
    "Cargo from Lahore to UK, picked up from your home and handed over at the door in England, Wales or Scotland. Wedding outfits for relatives in Bradford, a student's winter things for Manchester, a whole household for London: we weigh it, pack it, clear it for export and deliver it.",
    'Our Lahore to UK cargo service is priced by the kilo: Rs 1,750–1,850 by air, arriving in 10–12 days, or Rs 950–1,000 by sea, arriving in 1.5–2.5 months. The rate is agreed in writing before anything leaves your house.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to UK cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['Destination', 'Air', 'Sea'],
          rows: [
            ['England and Wales', 'Rs 1,750–1,850/kg, 10–12 days', 'Rs 950–1,000/kg, 1.5–2.5 months'],
            ['Scotland', 'Rs 2,350/kg, 10–15 days', 'Rs 1,250/kg'],
            ['Smallest shipment', '20 kg', '70–100 kg'],
          ],
        },
        { type: 'p', text: `Rates last updated ${RATES_UPDATED}. Northern Ireland is quoted on request.` },
      ],
    },
    {
      id: 'examples',
      title: 'What a shipment to the UK costs',
      blocks: [
        {
          type: 'list',
          items: [
            '**One 20 kg box to Birmingham, by air:** Rs 35,000–37,000.',
            '**30 kg to Glasgow, by air:** Rs 70,500.',
            '**50 kg of wedding clothes and gifts, by air:** Rs 87,500–92,500.',
            '**100 kg of household goods, by sea:** Rs 95,000–100,000. The same load by air would be Rs 175,000–185,000.',
          ],
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Most family shipments to Britain have a date attached: a mehndi in Bradford, Eid, the first week of term. Count back from it. Transit is 10–12 days (10–15 to Scotland), and pickup and export paperwork add a day or two, so book three weeks ahead.',
        },
        {
          type: 'p',
          text: 'The charge is based on whichever is greater: what the box weighs on the scale, or its size (length × width × height in cm ÷ 6,000). A 60 × 50 × 50 cm carton counts as 25 kg even if it holds only 15 kg of quilts. Vacuum bags and full boxes keep that gap small.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'Sea starts at 70–100 kg, costs Rs 950–1,000 a kilo (Rs 1,250 to Scotland) and takes 1.5–2.5 months. For a family relocating it roughly halves the bill: 200 kg comes to Rs 190,000–200,000 by sea, against Rs 350,000–370,000 by air.',
        },
        {
          type: 'p',
          text: 'A full household gets its own 20 ft or 40 ft container, priced separately. We arrange the journey from Lahore to Karachi port and the export customs there. If you are settling in the UK, read the [Transfer of Residence rules below](#customs) before you pack: your own belongings may come in free of duty and VAT.',
        },
      ],
    },
    {
      id: 'london',
      title: 'Cargo from Lahore to London',
      blocks: [
        {
          type: 'p',
          text: 'Our Lahore to London cargo service costs the same as anywhere else in England. 20 kg by air is Rs 35,000–37,000 and reaches the door in 10–12 days, whether that door is in Southall, Wembley, Ilford or East Ham. See [cargo to London](/destinations/uk/london).',
        },
        {
          type: 'p',
          text: '[Birmingham](/destinations/uk/birmingham), [Manchester](/destinations/uk/manchester), Bradford, Leeds and every other town in England and Wales are on the same rate.',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'A lot of what leaves Lahore for Britain is clothing: bridal lehngas, formal wear, unstitched lawn and shawls.',
        },
        {
          type: 'list',
          items: [
            'Heavily embroidered pieces travel best folded flat in a rigid box, with tissue between the layers so the work does not crush.',
            'Clothes sent as presents are personal cargo. A gift worth more than £39 is charged UK VAT.',
            'Selling clothes in the UK? Boutique stock goes as [commercial cargo](/services/commercial-cargo) with an invoice, and whoever receives it needs an EORI number.',
          ],
        },
        {
          type: 'p',
          text: 'We cannot carry food, liquids, perfumes, aerosols, lithium batteries, or anything flammable or hazardous. For medicines and electronics, ask first.',
        },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to UK',
      blocks: [
        {
          type: 'p',
          text: 'UK universities start in September, and that is when airline allowances run out fastest. Rather than paying excess baggage at Allama Iqbal airport, send books, bedding and a winter coat ahead: 30 kg costs Rs 52,500–55,500 by air and arrives in 10–12 days. For a September start, book by mid-August. See [excess baggage shipping](/services/excess-baggage).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'UK import duty on cargo from Pakistan',
      blocks: [
        {
          type: 'p',
          text: 'What the receiver pays depends on what the goods are, what they are worth and why they are being sent ([gov.uk](https://www.gov.uk/goods-sent-from-abroad/tax-and-duty)):',
        },
        {
          type: 'list',
          items: [
            '**A gift of £39 or less:** no VAT.',
            '**A gift above £39:** VAT.',
            '**Goods above £135:** VAT, plus any customs duty for that type of goods.',
            '**Your own things, when you move to the UK:** Transfer of Residence relief can remove both duty and VAT. You must have lived outside the UK for at least 12 months and owned the goods for at least 6, and you apply on form ToR01 before shipping ([gov.uk](https://www.gov.uk/guidance/application-for-transfer-of-residence-relief-tor1)).',
            '**Business stock:** duty and VAT on the invoice value, and the receiver needs an EORI number.',
          ],
        },
        {
          type: 'p',
          text: 'An honest declaration is the quickest way through; under-declared boxes get held and fined.',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Door-to-door cargo from Lahore to UK: booking',
      blocks: [
        {
          type: 'p',
          text: `Send what you are shipping, roughly how much it weighs and the UK postcode on [WhatsApp ${PHONE}](${whatsappLink('UK')}), or use the [quote form](${UK_QUOTE_URL}). You get the per-kilo rate, the total and a delivery date. We collect from your home in Lahore (or you bring the boxes to our [Lahore office](${LAHORE_CITY_PATH}#office)), weigh and pack them, clear export customs, and send you a number for our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Lahore to UK cargo: frequently asked questions',
  faqs: [
    {
      question: 'How much is cargo from Lahore to UK per kg?',
      answer: 'England and Wales: Rs 1,750–1,850 by air, Rs 950–1,000 by sea. Scotland: Rs 2,350 by air, Rs 1,250 by sea.',
    },
    {
      question: 'How much does it cost to send 20 kg from Lahore to UK?',
      answer: 'Rs 35,000–37,000 by air to any address in England or Wales, London included.',
    },
    {
      question: 'How long does cargo take from Lahore to UK?',
      answer: 'By air, 10–12 days from pickup to delivery (10–15 for Scotland). By sea, 1.5–2.5 months.',
    },
    {
      question: 'What is the cheapest way to ship from Lahore to the UK?',
      answer: 'Sea, once you have 70–100 kg or more. Anything smaller goes by air, from Rs 1,750 a kilo.',
    },
    {
      question: 'How much does shipping from Lahore to UK cost for a house move?',
      answer: '100 kg by sea is about Rs 95,000–100,000. A complete house gets its own container quote.',
    },
    {
      question: 'Do you deliver to Scotland?',
      answer: 'Yes: Rs 2,350 a kilo by air in 10–15 days, or Rs 1,250 a kilo by sea.',
    },
    {
      question: 'Can I send less than 20 kg?',
      answer: 'No, 20 kg is our smallest air shipment. For a few kilos a courier is the better choice.',
    },
    {
      question: 'Can I send food from Lahore to the UK?',
      answer: 'No. Mithai, spices, pickles and other food cannot go in our shipments.',
    },
    {
      question: 'Will my family in the UK pay customs duty?',
      answer:
        'Not on a gift worth £39 or less. Above that VAT is due, and duty can be added above £135. We go through it with you before you book.',
    },
  ],
  closing: `Ready to book cargo from Lahore to UK? Message [WhatsApp ${PHONE}](${whatsappLink('UK')}) for a price. Our Lahore pickup areas and office are on the [international cargo services in Lahore](${LAHORE_CITY_PATH}) page.`,
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

const LAHORE_TO_DUBAI: LandingPage = {
  origin: LAHORE,
  path: '/routes/lahore-to-dubai',
  linkLabel: 'Cargo from Lahore to Dubai',
  seoTitle: 'Cargo from Lahore to Dubai & UAE | Rs 1,350/kg | Raahi',
  seoDescription:
    'Cargo from Lahore to Dubai, door to door: air Rs 1,350–1,450/kg, sea Rs 600–700/kg. Home pickup in Lahore, delivery across Dubai, Abu Dhabi and Sharjah.',
  h1: 'Cargo from Lahore to Dubai: Door-to-Door Air & Sea',
  intro: [
    'Cargo from Lahore to Dubai is the cheapest international route we run: Rs 1,350–1,450 a kilo by air and Rs 600–700 a kilo by sea. It is door to door: we pick up anywhere in Lahore and hand your boxes over in Dubai, Abu Dhabi, Sharjah or any other emirate.',
    'Air arrives in 3–4 days and sea in 1.5–2.5 months. Your rate is fixed in writing before we collect.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to Dubai cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air', 'Sea'],
          rows: [
            ['Per kilo, any emirate', 'Rs 1,350–1,450', 'Rs 600–700'],
            ['You can send from', '20 kg', '70–100 kg'],
            ['Lahore door to UAE door', '3–4 days', '1.5–2.5 months'],
          ],
        },
        {
          type: 'p',
          text: `These are our Pakistan to Dubai cargo rates per kg for pickups in Lahore, last updated ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'examples',
      title: 'Three typical Lahore to Dubai shipments',
      blocks: [
        {
          type: 'list',
          items: [
            '**Eid clothes for a brother in Sharjah, 22 kg by air:** Rs 29,700–31,900, at the door in 3–4 days.',
            '**Stock for a garment shop in Deira, 60 kg by air:** Rs 81,000–87,000, with a commercial invoice.',
            "**A family's kitchenware and bedding moving to Abu Dhabi, 180 kg by sea:** Rs 108,000–126,000 in 1.5–2.5 months. The same load by air would cost Rs 243,000–261,000.",
          ],
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to Dubai',
      blocks: [
        {
          type: 'p',
          text: 'Most of what leaves Lahore for the UAE goes by air: clothes for relatives working in the Gulf, shoes, bedding, and small orders for traders. Air is the right choice for anything that should arrive within the week.',
        },
        {
          type: 'p',
          text: "Light, bulky items are charged by size rather than weight. A box's chargeable weight is length × width × height in cm ÷ 6,000 whenever that figure is higher than what it weighs, so quilts and pillows cost less packed in vacuum bags.",
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to Dubai',
      blocks: [
        {
          type: 'p',
          text: 'From 70–100 kg upwards, sea is worth it: at Rs 600–700 a kilo it costs about half the air price. It suits furniture, kitchenware and anything else that can follow you a couple of months later. A whole household goes in a 20 ft or 40 ft container, quoted on its own. We move your goods from Lahore to Karachi port and handle export clearance.',
        },
      ],
    },
    {
      id: 'moving',
      title: 'Moving to Dubai from Lahore',
      blocks: [
        {
          type: 'p',
          text: 'Starting a job in Dubai? Fly with what you need for the first weeks and send the rest of your household by sea. Book the sea shipment about three months before you need it, since it takes 1.5–2.5 months door to door.',
        },
        {
          type: 'p',
          text: 'Keep a list of everything in each box with its value. It speeds up UAE customs, and we need it for every shipment.',
        },
      ],
    },
    {
      id: 'traders',
      title: 'Lahore traders shipping to the UAE',
      blocks: [
        {
          type: 'p',
          text: 'Garments, fabric and footwear from Lahore sell in shops across Dubai and Sharjah. Goods for sale travel as [commercial cargo](/services/commercial-cargo) with an invoice and a packing list, and the receiver may need a UAE trade licence to clear them. Tell us what you are shipping and we will check what the receiver needs before you book.',
        },
      ],
    },
    {
      id: 'emirates',
      title: 'Cargo from Lahore to Abu Dhabi, Sharjah and the other emirates',
      blocks: [
        {
          type: 'p',
          text: 'Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain all cost the same. See [cargo to Abu Dhabi](/destinations/uae/abu-dhabi) and [cargo to the UAE](/destinations/uae).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'UAE customs: what to know',
      blocks: [
        {
          type: 'p',
          text: 'UAE Customs may add duty and 5% VAT depending on what is in the box and what it is worth; we tell you the likely amount up front. Some medicines, including common prescription drugs, are controlled in the UAE, so check with us before packing any. The receiver needs a full UAE address and a UAE mobile number.',
        },
        {
          type: 'p',
          text: 'We do not carry food, liquids, perfumes, aerosols, lithium batteries, or anything flammable or hazardous to the UAE.',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Door-to-door cargo from Lahore to Dubai: booking',
      blocks: [
        {
          type: 'p',
          text: `Send us the weight, the contents and the UAE address on [WhatsApp](${whatsappLink('Dubai')}), or use the [quote form](${DUBAI_QUOTE_URL}). We reply with the rate and the total, collect from your Lahore address, and send a tracking number for our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Lahore to Dubai cargo: frequently asked questions',
  faqs: [
    {
      question: 'What does Lahore to Dubai cargo cost per kg?',
      answer: 'Rs 1,350–1,450 a kilo by air and Rs 600–700 a kilo by sea, to any emirate.',
    },
    { question: 'What is the Pakistan to Dubai cargo price for 20 kg?', answer: 'From Lahore, Rs 27,000–29,000 by air.' },
    {
      question: 'How long does cargo take from Lahore to Dubai?',
      answer: '3–4 days by air and 1.5–2.5 months by sea, counted from pickup in Lahore to delivery in the UAE.',
    },
    {
      question: 'How much is shipping from Lahore to Dubai for a house move?',
      answer: 'About Rs 108,000–126,000 for 180 kg by sea. A complete household is quoted as a 20 ft or 40 ft container.',
    },
    { question: 'Is Sharjah or Ajman more expensive than Dubai?', answer: 'No. Every emirate has the same rate.' },
    {
      question: 'Can I send medicine from Pakistan to the UAE?',
      answer: 'Only after you check with us. Some medicines are controlled in the UAE and need approval first.',
    },
    { question: 'Can I put food in the box?', answer: 'No. Food stays out of every shipment we carry.' },
  ],
  closing: `Want a price for cargo from Lahore to Dubai? Message [WhatsApp ${PHONE}](${whatsappLink('Dubai')}). Our pickup areas and office are listed on the [international cargo services in Lahore](${LAHORE_CITY_PATH}) page.`,
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

const LAHORE_TO_USA: LandingPage = {
  origin: LAHORE,
  path: '/routes/lahore-to-usa',
  linkLabel: 'Cargo from Lahore to USA',
  seoTitle: 'Cargo from Lahore to USA | Rs 2,750/kg, Door to Door | Raahi',
  seoDescription:
    'Cargo from Lahore to USA, door to door: air Rs 2,750–2,950/kg in 10–15 days, sea Rs 1,550–1,650/kg. Home pickup in Lahore, delivery anywhere in the USA.',
  h1: 'Cargo from Lahore to USA: Door-to-Door Air & Sea',
  intro: [
    'Cargo from Lahore to USA addresses anywhere in the country, collected from your home in Lahore and delivered to the door, whether that is an apartment in Queens or a house in Sugar Land.',
    'Shipping from Lahore to USA is charged by the kilo: Rs 2,750–2,950 by air, 10–15 days door to door, or Rs 1,550–1,650 by sea, 2–2.5 months. The US no longer lets low-value shipments in duty-free, so read the duty section below before you pack.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Lahore to USA cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air', 'Sea'],
          rows: [
            ['Per kg, any state', 'Rs 2,750–2,950', 'Rs 1,550–1,650'],
            ['Lowest weight we take', '20 kg', '70–100 kg'],
            ['Lahore home to US door', '10–15 days', '2–2.5 months'],
          ],
        },
        { type: 'p', text: `Rates last checked ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'customs',
      title: 'US customs duty on cargo from Pakistan has changed',
      blocks: [
        {
          type: 'p',
          text: 'For years anything worth under $800 entered the US without duty. That exemption, called de minimis, has been suspended, so most boxes arriving from Pakistan can now be charged duty ([Federal Register](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)).',
        },
        {
          type: 'list',
          items: [
            'A genuine gift, sent to a person in the US and worth $100 or less, still comes in free.',
            'Business stock, such as suits for an online shop, pays duty according to the product and the tariffs in force.',
            'We work out the likely charge with you before booking. Every item has to be listed at its real value; a false declaration can leave boxes stuck at US customs.',
          ],
        },
      ],
    },
    {
      id: 'examples',
      title: 'What it costs from Lahore to the USA',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'Air', 'Sea'],
          rows: [
            ['20 kg box of gifts', 'Rs 55,000–59,000', 'Under the sea minimum'],
            ['30 kg of student luggage', 'Rs 82,500–88,500', 'Under the sea minimum'],
            ['100 kg', 'Rs 275,000–295,000', 'Rs 155,000–165,000'],
            ['200 kg family move', 'Rs 550,000–590,000', 'Rs 310,000–330,000'],
          ],
        },
        { type: 'p', text: 'On 200 kg, sea saves Rs 240,000–260,000.' },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to USA',
      blocks: [
        {
          type: 'p',
          text: 'US air rates are the highest we charge, so box size is where people overspend. We bill the larger of actual weight and size weight (length × width × height in cm ÷ 6,000): a 55 × 45 × 40 cm box of quilts that weighs 10 kg is charged as 16.5 kg. Use vacuum bags and the smallest carton that fits, and mix heavy items in with light ones.',
        },
        {
          type: 'p',
          text: 'Air takes 10–15 days door to door, which suits wedding outfits, Eid gifts and anything needed this month.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to USA',
      blocks: [
        {
          type: 'p',
          text: 'Sea starts at 70–100 kg and costs Rs 1,550–1,650 a kilo, roughly 40–45% under the air rate, with delivery in 2–2.5 months. It is how families send furniture, kitchenware and the bulk of a household to America. Bigger moves get a 20 ft or 40 ft container quote, and we arrange transport from Lahore to Karachi port plus the export customs.',
        },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to the USA',
      blocks: [
        {
          type: 'p',
          text: "Most US universities start the fall semester in late August. Even with the airline's checked allowance, there is rarely room for a winter coat, bedding and textbooks. Send them ahead: 30 kg by air costs Rs 82,500–88,500 and arrives in 10–15 days, so book by the end of July. Starting in spring? Book by mid-December. Compare our price with your airline's excess fee on the [excess baggage shipping](/services/excess-baggage) page.",
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to the USA',
      blocks: [
        {
          type: 'p',
          text: 'How to send clothes from Pakistan to the USA comes down to one question: are they presents or goods for sale?',
        },
        {
          type: 'list',
          items: [
            '**Presents for family** go as personal cargo, and gifts worth $100 or less in total to one person enter duty-free.',
            '**Stock for a US shop or online store** goes as [commercial cargo](/services/commercial-cargo) with an invoice, and duty is charged on its value.',
            '**Packing:** fold suits flat in vacuum bags; a smaller box means a smaller size-weight charge.',
          ],
        },
        {
          type: 'p',
          text: 'Not carried: food, liquids, perfumes, aerosols, lithium batteries, or flammable and hazardous goods. Check with us about medicines and electronics.',
        },
      ],
    },
    {
      id: 'cities',
      title: 'Cargo from Lahore to New York, Chicago, Houston and the rest of the USA',
      blocks: [
        {
          type: 'p',
          text: 'One rate covers the whole country: New York and New Jersey, Chicago, Houston and Dallas, the Washington DC area, California and everywhere in between. See [cargo to New York](/destinations/usa/new-york), [Chicago](/destinations/usa/chicago) and [Houston](/destinations/usa/houston).',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Door-to-door cargo from Lahore to USA: how to book',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `Tell us what is going, roughly how heavy it is and the US ZIP code, on [WhatsApp ${PHONE}](${whatsappLink('USA')}) or the [quote form](${USA_QUOTE_URL}).`,
            'Approve the quote: rate per kilo, total and expected delivery.',
            `We pick up from your Lahore home, or you bring the boxes to our [Lahore office](${LAHORE_CITY_PATH}#office).`,
            'Follow the shipment on our [tracking page](/track) until it is signed for in the US.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Lahore to USA cargo: frequently asked questions',
  faqs: [
    {
      question: 'What does Lahore to USA cargo cost per kg?',
      answer: 'Air is Rs 2,750–2,950 and sea is Rs 1,550–1,650, the same for every state.',
    },
    { question: 'What is the cargo price from Pakistan to USA for 20 kg?', answer: 'Rs 55,000–59,000 by air from Lahore.' },
    { question: 'How long does cargo take from Lahore to USA?', answer: 'Allow 10–15 days by air and 2–2.5 months by sea.' },
    {
      question: 'How much does shipping from Lahore to USA cost for a house move?',
      answer: '100 kg by sea comes to about Rs 155,000–165,000. A full house is quoted as a container.',
    },
    {
      question: 'How much does it cost to ship 1 kg from Pakistan to the USA?',
      answer: 'We start at 20 kg, so a single kilo is a job for a courier, not cargo.',
    },
    {
      question: 'Can I send gifts from Pakistan to the USA without duty?',
      answer: 'Yes, as long as the gifts to one person are worth $100 or less in total.',
    },
    { question: 'Can I send food to the USA?', answer: 'No. Food is excluded from every shipment we carry.' },
  ],
  closing: `Want a price for cargo from Lahore to USA? Send the weight and ZIP code on [WhatsApp ${PHONE}](${whatsappLink('USA')}). Pickup areas and our Lahore office address are on the [international cargo services in Lahore](${LAHORE_CITY_PATH}) page.`,
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

const LAHORE_TO_CANADA: LandingPage = {
  origin: LAHORE,
  path: '/routes/lahore-to-canada',
  linkLabel: 'Shipping from Lahore to Canada',
  seoTitle: 'Cargo & Shipping from Lahore to Canada | Rs 2,850/kg | Raahi',
  seoDescription:
    'Shipping from Lahore to Canada, door to door: air Rs 2,850–2,950/kg in 10–15 days, sea Rs 1,750–1,850/kg. Home pickup in Lahore, delivery across Canada.',
  h1: 'Cargo from Lahore to Canada: Door-to-Door Air & Sea',
  intro: [
    'Cargo from Lahore to Canada for families on both ends: parents in Lahore sending winter clothes and wedding outfits to children in Brampton, and new arrivals in Canada having the rest of their home sent on. We collect from your house in Lahore and deliver to the door in any province.',
    'Shipping from Lahore to Canada costs Rs 2,850–2,950 a kilo by air, taking 10–15 days, or Rs 1,750–1,850 a kilo by sea, taking 2–3 months. Your rate is confirmed in writing when you book.',
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
            ['Every province', 'Rs 2,850–2,950 per kg', 'Rs 1,750–1,850 per kg'],
            ['Starts from', '20 kg', '70–100 kg'],
            ['Lahore to Canadian doorstep', '10–15 days', '2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Those are our Pakistan to Canada shipping rates per kg on Lahore pickups, as of ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'examples',
      title: 'Sample prices from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'A 20 kg box to Toronto costs Rs 57,000–59,000 by air. Once a load reaches 100 kg or so, sea starts to pay: 150 kg of household goods is Rs 262,500–277,500 by sea, against Rs 427,500–442,500 by air.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Air is for whatever Canada needs before the weather turns: coats, quilts, shawls and woollens. Those are bulky for their weight, and air cargo bills the larger of real weight and size weight (length × width × height in cm ÷ 6,000). Roll coats and bedding into vacuum bags before boxing them, or send the bulkiest things by sea.',
        },
        { type: 'p', text: 'Door to door, air takes 10–15 days.' },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Pakistan to Canada sea cargo costs Rs 1,750–1,850 a kilo from 70–100 kg upwards, about 38% below air. From pickup in Lahore to delivery in Canada it takes 2–3 months, covering the transfer to Karachi port, the ocean crossing and Canadian clearance. A whole household gets its own 20 ft or 40 ft container price.',
        },
      ],
    },
    {
      id: 'cities',
      title: 'Cargo from Lahore to Toronto, Mississauga, Vancouver and the rest of Canada',
      blocks: [
        {
          type: 'p',
          text: 'The Greater Toronto Area (Mississauga, Brampton, Scarborough, Markham), Calgary and Edmonton, Vancouver and Surrey, Montreal, Ottawa, Winnipeg: one price for the whole country. See [cargo to Toronto](/destinations/canada/toronto) and [cargo to Vancouver](/destinations/canada/vancouver).',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'Sending clothes from Lahore to Canada',
      blocks: [
        { type: 'p', text: 'How to send clothes from Pakistan to Canada depends on who they are for.' },
        {
          type: 'list',
          items: [
            '**Gifts:** personal cargo. A gift worth CAD $60 or less, with a note saying it is a gift, can enter free of duty and tax.',
            '**Stock for a shop:** [commercial cargo](/services/commercial-cargo) with an invoice. Duty and tax are charged on its value.',
            '**Packing:** vacuum bags shrink a box of clothes, and with it the size-weight charge.',
          ],
        },
        {
          type: 'p',
          text: 'Food, liquids, perfumes, aerosols, lithium batteries and flammable or hazardous goods are refused. Medicines or electronics: message us first.',
        },
      ],
    },
    {
      id: 'student-luggage',
      title: 'Student luggage from Lahore to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Most Canadian colleges and universities start in September or January. Rather than pay excess baggage, send books, bedding and a proper winter coat ahead: 30 kg by air costs Rs 85,500–88,500 and arrives in 10–15 days, so book about three weeks before your flight. See [excess baggage shipping](/services/excess-baggage).',
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
            '**Gifts of CAD $60 or less**, sent by courier with a gift card or note, can come in free of duty and tax ([CBSA](https://cbsa-asfc.gc.ca/import/courier/lvs-efv/prsn-eng.html)).',
            '**Everything else** may be charged duty and GST/HST, depending on what it is and what it is worth. You hear the likely amount from us before booking.',
            '**New permanent residents** can usually import their own used belongings duty-free as settlers\' effects, but anything arriving later by cargo must be on the "goods to follow" list you give the border officer when you land. Check CBSA\'s current rules before shipping.',
            'An accurate list of contents and values keeps boxes moving; a wrong one can hold them at Canadian customs.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Door-to-door delivery to Canada: how to book',
      blocks: [
        {
          type: 'p',
          text: `Message [WhatsApp ${PHONE}](${whatsappLink('Canada')}) or use the [quote form](${CANADA_QUOTE_URL}) with the contents, an estimate of the weight and the Canadian postal code. We reply with the rate, the total and a delivery window. On the day, we collect from your Lahore home (or take the boxes in at our [Lahore office](${LAHORE_CITY_PATH}#office)), pack them, clear export customs and give you a number to follow on our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Lahore to Canada cargo: frequently asked questions',
  faqs: [
    {
      question: 'What is the Pakistan to Canada cargo price per kg from Lahore?',
      answer: 'By air Rs 2,850–2,950, by sea Rs 1,750–1,850. No province costs more than another.',
    },
    { question: 'How much does 20 kg cost from Lahore to Toronto?', answer: 'Rs 57,000–59,000 by air.' },
    {
      question: 'What is the Pakistan to Canada shipping time from Lahore?',
      answer: 'Around 10–15 days for air cargo and 2–3 months for sea.',
    },
    {
      question: 'How long does a cargo ship take from Pakistan to Canada?',
      answer:
        'From our pickup in Lahore to delivery, allow 2–3 months. That covers the transfer to Karachi, the voyage and Canadian clearance.',
    },
    { question: 'What is the cheapest cargo from Pakistan to Canada?', answer: 'Sea, if you have at least 70–100 kg.' },
    {
      question: 'How much does shipping from Lahore to Canada cost for a house move?',
      answer: 'Around Rs 262,500–277,500 for 150 kg by sea. A full house is priced as a container.',
    },
    {
      question: 'Can I send a small parcel from Pakistan to Canada?',
      answer: 'Our smallest air shipment is 20 kg, so a courier suits small parcels better.',
    },
    {
      question: 'Can I send gifts to Canada without duty?',
      answer: 'Yes, up to CAD $60 a gift, clearly marked as a gift. Above that, duty and tax can apply.',
    },
    { question: 'Can I send food to Canada?', answer: 'No, food is not accepted.' },
  ],
  closing: `To send your boxes with cargo from Lahore to Canada, ask for a quote on [WhatsApp ${PHONE}](${whatsappLink('Canada')}). Our Lahore pickup areas and office are listed on the [international cargo services in Lahore](${LAHORE_CITY_PATH}) page.`,
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

export const LAHORE_LANDING: CityLanding = {
  cityPage: LAHORE_CITY_PAGE,
  routes: {
    'lahore-to-uk': LAHORE_TO_UK,
    'lahore-to-dubai': LAHORE_TO_DUBAI,
    'lahore-to-usa': LAHORE_TO_USA,
    'lahore-to-canada': LAHORE_TO_CANADA,
  },
};
