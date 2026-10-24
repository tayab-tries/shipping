/**
 * Islamabad city page and Islamabad → country route pages (copy from "Raahi Islamabad Pages – Final Copy").
 *
 * Islamabad is served from the Rawalpindi office, so the copy names that office instead of an Islamabad branch,
 * and each route page has a Rawalpindi section (no separate Rawalpindi route pages).
 * Rates match the Lahore pages and /cargo-services, including the client-confirmed 3–4 day UAE air time.
 * Values the copy left as [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, map, photos,
 * reviews) are deliberately omitted until confirmed; add them here when available.
 */

import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import {
  CityLanding,
  ContentBlock,
  contentWhatsappLink,
  LandingPage,
  OFFICE_HOURS,
  OriginCity,
  PHONE,
  RATES_UPDATED,
  routeBreadcrumbs,
  WHATSAPP_NUMBER,
} from './shared';

export const ISLAMABAD_LOCATION_KEY = 'islamabad';
export const ISLAMABAD_CITY_PATH = '/locations/international-cargo-services-in-islamabad';

const ISLAMABAD: OriginCity = {
  key: ISLAMABAD_LOCATION_KEY,
  name: 'Islamabad',
  province: 'Islamabad Capital Territory',
  cityPath: ISLAMABAD_CITY_PATH,
};

const OFFICE_SHORT = 'Office #1B, opposite Flying Club, near Old Airport Road';
const OFFICE_FULL = `${OFFICE_SHORT}, Dhoke Raja Muhammad Khan, Rawalpindi 46000`;

const QUOTE_URL = '/quote?origin=islamabad';
const routeQuoteUrl = (destination: string) => `${QUOTE_URL}&destination=${destination}`;

const whatsappLink = (destination?: string) => contentWhatsappLink('Islamabad', destination);
const WHATSAPP_URL = whatsappLink();

const NOT_ACCEPTED =
  'We do not accept food items, liquids, perfumes, aerosols, lithium batteries, or flammable and hazardous items.';
const VOLUMETRIC_RULE =
  'You pay for actual or volumetric weight, whichever is higher (length × width × height in cm ÷ 6,000).';

const routeCrumbs = (label: string, url: string) => routeBreadcrumbs(ISLAMABAD, label, url);

const howItWorks = (
  quoteUrl: string,
  whatsappUrl: string,
  addressLabel: string,
  deliveredTo: string,
  confirms = 'delivery time'
): ContentBlock => ({
  type: 'list',
  ordered: true,
  items: [
    `Message us on [WhatsApp at ${PHONE}](${whatsappUrl}), or use the [quote form](${quoteUrl}), with the weight, the contents and the ${addressLabel}.`,
    `We send the price per kg, the total and the ${confirms}.`,
    'We collect from your Islamabad or Rawalpindi address.',
    'We pack if needed, clear Pakistan export customs and dispatch.',
    `You track the shipment on our [tracking page](/track) until it reaches ${deliveredTo}.`,
  ],
});

const routeClosing = (destination: string, quoteUrl: string) =>
  `Ready to send cargo from Islamabad to ${destination}? [WhatsApp ${PHONE}](${whatsappLink(destination)}) or use our [quote form](${quoteUrl}). Pickup areas and the office are on our [international cargo services in Islamabad](${ISLAMABAD_CITY_PATH}) page.`;

const ISLAMABAD_CITY_PAGE: LandingPage = {
  origin: ISLAMABAD,
  path: ISLAMABAD_CITY_PATH,
  linkLabel: 'International cargo services in Islamabad',
  seoTitle: 'International Cargo Services in Islamabad, Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Islamabad: door-to-door air and sea cargo to the UK, Dubai, USA and Canada. Pickup in every sector, air from Rs 1,350/kg.',
  h1: 'International Cargo Services in Islamabad: Door-to-Door Air & Sea Cargo',
  intro: [
    "Raahi International runs international cargo services in Islamabad, carrying boxes door to door from the twin cities to the UK, UAE, Saudi Arabia, USA and Canada. We collect from any sector of Islamabad and deliver to the receiver's door abroad.",
    'Our office is in Rawalpindi, near Old Airport Road, a short drive from Islamabad. As an international cargo service in Islamabad and Rawalpindi, we treat the twin cities as one pickup area. Before we collect a single box, you have the price and the delivery time in writing.',
  ],
  glance: [
    ['Nearest office', `${OFFICE_SHORT}, Rawalpindi`],
    ['Office hours', OFFICE_HOURS],
    ['Call or WhatsApp', `[${PHONE}](${WHATSAPP_URL})`],
    ['Pickup', 'Every Islamabad sector and housing scheme'],
    ['Air cargo', 'From Rs 1,350/kg, minimum 20 kg'],
    ['Sea cargo', 'From Rs 600/kg, minimum 70–100 kg'],
  ],
  sections: [
    {
      id: 'rates',
      title: 'Cargo prices from Islamabad (per kg)',
      blocks: [
        {
          type: 'p',
          text: "The table shows our rate per kilogram, plus what two common shipments cost: 30 kg by air (a student's luggage) and 100 kg by sea (a small household move).",
        },
        {
          type: 'table',
          head: ['Destination', 'Air (Rs/kg)', '30 kg by air', 'Air delivery', 'Sea (Rs/kg)', '100 kg by sea', 'Sea delivery'],
          rows: [
            ['UK (except Scotland)', '1,750–1,850', 'Rs 52,500–55,500', '10–12 days', '950–1,000', 'Rs 95,000–100,000', '1.5–2.5 months'],
            ['Scotland', '2,350', 'Rs 70,500', '10–15 days', '1,250', 'Rs 125,000', '1.5–2.5 months'],
            ['UAE / Dubai', '1,350–1,450', 'Rs 40,500–43,500', '3–4 days', '600–700', 'Rs 60,000–70,000', '1.5–2.5 months'],
            ['Saudi Arabia', '2,150–2,250', 'Rs 64,500–67,500', '10–20 days', '950–1,000', 'Rs 95,000–100,000', '1.5–2.5 months'],
            ['USA', '2,750–2,950', 'Rs 82,500–88,500', '10–15 days', '1,550–1,650', 'Rs 155,000–165,000', '2–2.5 months'],
            ['Canada', '2,850–2,950', 'Rs 85,500–88,500', '10–15 days', '1,750–1,850', 'Rs 175,000–185,000', '2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Rates updated ${RATES_UPDATED}. Australia and Europe are quoted too: see [all cargo rates](/cargo-services).`,
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo services in Islamabad',
      blocks: [
        {
          type: 'p',
          text: "Air cargo suits anything needed within two to three weeks: a student's luggage before term, wedding clothes, gifts for family, or business samples. The minimum is 20 kg.",
        },
        { type: 'h3', text: 'Two boxes, two prices' },
        {
          type: 'p',
          text: 'Air cargo is charged on the higher of the actual weight and the volumetric weight (length × width × height in cm ÷ 6,000).',
        },
        {
          type: 'list',
          items: [
            '**A 50 × 40 × 40 cm box of books weighing 22 kg:** volumetric weight is 13.3 kg, so you pay for the actual 22 kg.',
            '**A 70 × 50 × 50 cm box of duvets weighing 9 kg:** volumetric weight is about 29 kg, so you pay for 29 kg.',
          ],
        },
        {
          type: 'p',
          text: 'Heavy, dense items are cheap to fly. Bulky, light items such as quilts and pillows are often cheaper by sea, or packed in vacuum bags.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo services in Islamabad',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo is for 70–100 kg and up: household moves, furniture, heavy boxes and business stock. It costs 35–60% less per kg than air and takes 1.5–3 months door to door.',
        },
        {
          type: 'p',
          text: 'Islamabad has a lot of people moving abroad for good: families joining relatives, and diplomats and international staff going home at the end of a posting. For a whole house, we quote a 20 ft or 40 ft container just for you. Smaller loads share a container and you pay only for your weight. We arrange the transfer from Islamabad to Karachi port, the export clearance, and delivery to the new address.',
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup in every Islamabad sector',
      blocks: [
        { type: 'p', text: 'We collect from homes, offices and warehouses across Islamabad, including:' },
        {
          type: 'list',
          items: [
            'F-6, F-7, F-8, F-10, F-11 and E-7, E-11',
            'G-6 to G-15, I-8 to I-10 and the I-9 and I-10 industrial areas',
            'D-12, B-17, PWD, Bani Gala and Chak Shahzad',
            'DHA, Bahria Town and Gulberg Greens',
          ],
        },
        {
          type: 'p',
          text: `We also run cargo services in Rawalpindi and Islamabad as one area, so Saddar, Satellite Town, Chaklala and Westridge are covered too. Prefer to drop off? Bring your boxes to [our office near Old Airport Road](#office), ${OFFICE_HOURS}.`,
        },
      ],
    },
    {
      id: 'packing',
      title: 'Packing and crating',
      blocks: [
        {
          type: 'p',
          text: 'We can pack at pickup or at the office. Clothes go into double-wall cartons and vacuum bags, crockery is bubble-wrapped piece by piece, and furniture, mirrors and marble go into wooden crates made from ISPM 15 heat-treated wood, which the UK, USA and Canada require.',
        },
      ],
    },
    {
      id: 'who-ships',
      title: 'Who ships from Islamabad',
      blocks: [
        {
          type: 'list',
          items: [
            '**Families with relatives in the UK:** many British Pakistani families have roots in the Potohar region around Islamabad and Rawalpindi. Clothes, gifts and wedding outfits go back and forth all year.',
            '**Students:** books, bedding and winter clothes for universities in the UK, USA and Canada, sent ahead of the flight.',
            '**Diplomats and international staff:** household goods shipped home at the end of a posting, usually in a full container.',
            '**People posted abroad:** government and company staff moving to the UAE, Saudi Arabia or Europe.',
            '**Businesses:** samples and stock from the I-9 and I-10 industrial areas, with a commercial invoice.',
          ],
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: "What we accept and what we don't",
      blocks: [
        {
          type: 'p',
          text: 'We accept clothes, shoes, books, bedding, kitchenware, household goods, personal belongings and commercial goods with an invoice.',
        },
        { type: 'p', text: `${NOT_ACCEPTED} Ask before sending medicines or electronics: rules differ by country.` },
        {
          type: 'p',
          text: "You need a copy of the sender's CNIC or passport, the receiver's name, address and phone number, and a list of contents with values. Business shipments also need a commercial invoice and packing list.",
        },
      ],
    },
    {
      id: 'destinations',
      title: 'Where we ship from Islamabad',
      blocks: [
        {
          type: 'list',
          items: [
            '[Cargo from Islamabad to UK](/routes/islamabad-to-uk): Rs 1,750–1,850/kg by air, 10–12 days.',
            '[Cargo from Islamabad to Dubai](/routes/islamabad-to-dubai): Rs 1,350–1,450/kg by air, 3–4 days.',
            '[Cargo from Islamabad to USA](/routes/islamabad-to-usa): Rs 2,750–2,950/kg by air, 10–15 days.',
            '[Cargo from Islamabad to Canada](/routes/islamabad-to-canada): Rs 2,850–2,950/kg by air, 10–15 days.',
            '[Cargo to Saudi Arabia](/destinations/ksa): Rs 2,150–2,250/kg by air, 10–20 days.',
          ],
        },
      ],
    },
    {
      id: 'choosing',
      title: 'How to compare cargo companies in Islamabad',
      blocks: [
        {
          type: 'p',
          text: 'Before you hand your boxes to any of the cargo companies in Islamabad, ask these questions. Here are our answers.',
        },
        {
          type: 'table',
          head: ['Ask this', 'Our answer'],
          rows: [
            ['What is your rate per kg, in writing?', 'Published in the table above, confirmed in writing before pickup'],
            ['What is the minimum weight?', '20 kg by air, 70–100 kg by sea'],
            ['How do you calculate volumetric weight?', 'Length × width × height in cm ÷ 6,000'],
            ['Can I visit your office?', 'Yes: [Office #1B, near Old Airport Road, Rawalpindi](#office)'],
            ['Will I get a tracking number?', 'Yes, for our [tracking page](/track)'],
          ],
        },
      ],
    },
    {
      id: 'office',
      title: 'Cargo services in Islamabad: office and contact number',
      blocks: [
        {
          type: 'p',
          text: `Our cargo services in Islamabad contact number is **[${PHONE}](${WHATSAPP_URL})** (calls and WhatsApp).`,
        },
        { type: 'p', text: `${OFFICE_FULL}. Open ${OFFICE_HOURS}.` },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Islamabad',
  faqs: [
    {
      question: 'What is the price of international cargo services in Islamabad?',
      answer:
        'By air, Rs 1,350–1,450 per kg to the UAE, Rs 1,750–1,850 to the UK, Rs 2,150–2,250 to Saudi Arabia, Rs 2,750–2,950 to the USA and Rs 2,850–2,950 to Canada. Sea cargo starts at Rs 600 per kg.',
    },
    {
      question: 'What are the best international cargo services available in Islamabad?',
      answer:
        'Look for a company that publishes its per-kg rate, states its minimum weight, delivers door to door, gives you a tracking number and has an office you can visit. The [comparison table above](#choosing) shows how we answer each.',
    },
    {
      question: 'Do I need to take my boxes to the cargo terminal at Islamabad airport?',
      answer: 'No. We collect from your door anywhere in Islamabad and handle the airport and customs side ourselves.',
    },
    {
      question: 'Is cargo cheaper than courier services in Islamabad?',
      answer:
        'Once you are sending 20 kg or more, yes: per kilo, cargo usually works out well below express courier services in Islamabad. Below 20 kg, a courier tends to win.',
    },
    {
      question: 'Do you have an office in Islamabad?',
      answer:
        'Our office is in Rawalpindi, near Old Airport Road, close to Islamabad. We collect from every Islamabad sector, so you do not need to visit.',
    },
    {
      question: 'Do you collect from Bahria Town and DHA?',
      answer: 'Yes. We collect from Bahria Town, DHA and Gulberg Greens, as well as every sector from D-12 to I-10.',
    },
    {
      question: 'How long does air cargo from Islamabad take?',
      answer:
        'Door to door: 3–4 days to the UAE, 10–12 to the UK, 10–15 to the USA or Canada, and 10–20 to Saudi Arabia.',
    },
    {
      question: 'Can you move a whole household from Islamabad?',
      answer: 'Yes. We quote a 20 ft or 40 ft container, pack and load it, and deliver to your new address abroad.',
    },
    { question: 'Can I send food from Islamabad?', answer: 'No. We do not accept food items.' },
  ],
  closing: `Ready to send? For a quote on international cargo services in Islamabad, message us on [WhatsApp at ${PHONE}](${WHATSAPP_URL}), or use our [quote form](${QUOTE_URL}).`,
  breadcrumbs: [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: 'Islamabad', url: ISLAMABAD_CITY_PATH },
  ],
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Islamabad. Please guide me.',
};

const UK_QUOTE_URL = routeQuoteUrl('uk');

const ISLAMABAD_TO_UK: LandingPage = {
  origin: ISLAMABAD,
  path: '/routes/islamabad-to-uk',
  linkLabel: 'Cargo from Islamabad to UK',
  seoTitle: 'Cargo from Islamabad to UK | Air & Sea from Rs 950/kg | Raahi',
  seoDescription:
    'Cargo from Islamabad and Rawalpindi to UK, door to door: air Rs 1,750–1,850/kg in 10–12 days, sea Rs 950–1,000/kg. Pickup in every sector.',
  h1: 'Cargo from Islamabad to UK: Door-to-Door Air & Sea',
  intro: [
    "Send cargo from Islamabad to UK addresses door to door. We collect from any Islamabad sector, or from Rawalpindi, and deliver to the receiver's door anywhere in England, Wales or Scotland.",
    'Our cargo service from Islamabad to UK costs Rs 1,750–1,850 per kg by air, with delivery in 10–12 days. Sea cargo costs Rs 950–1,000 per kg and takes 1.5–2.5 months. Your price is confirmed in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Islamabad to UK cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'By air', 'By sea'],
          rows: [
            ['England and Wales', 'Rs 1,750–1,850/kg', 'Rs 950–1,000/kg'],
            ['Scotland', 'Rs 2,350/kg', 'Rs 1,250/kg'],
            ['Smallest shipment', '20 kg', '70–100 kg'],
            ['Pickup to UK door', '10–12 days (Scotland 10–15)', '1.5–2.5 months'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}. Northern Ireland is quoted separately.` },
      ],
    },
    {
      id: 'examples',
      title: 'Prices for common shipments',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['25 kg: one large box', 'Rs 43,750–46,250', 'Below sea minimum'],
            ['40 kg: two boxes', 'Rs 70,000–74,000', 'Below sea minimum'],
            ["60 kg: a family's worth of gifts and clothes", 'Rs 105,000–111,000', 'Below sea minimum'],
            ['150 kg: a student or couple moving', 'Rs 262,500–277,500', 'Rs 142,500–150,000'],
            ['300 kg: a small household', 'Rs 525,000–555,000', 'Rs 285,000–300,000'],
          ],
        },
        {
          type: 'p',
          text: 'Prices are for England and Wales. At 150 kg, sending by sea instead of air saves about Rs 112,500–135,000, if you can wait 1.5–2.5 months.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Islamabad to UK',
      blocks: [
        {
          type: 'p',
          text: "Air is for anything with a deadline: clothes for a wedding in Birmingham, a student's luggage before term, or gifts for Eid. Door to door it takes 10–12 days, so book at least three weeks before the date.",
        },
        { type: 'p', text: `${VOLUMETRIC_RULE} Pack dense items together and use vacuum bags for clothes and bedding.` },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Islamabad to UK',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo is for moves and heavy loads from 70–100 kg upwards. It costs Rs 950–1,000 per kg, roughly half the air rate, and takes 1.5–2.5 months.',
        },
        {
          type: 'p',
          text: 'If you are moving your household to the UK, we quote a 20 ft or 40 ft container just for you. Smaller loads share a container, and you pay only for your weight. We handle the transfer to Karachi port and export clearance.',
        },
      ],
    },
    {
      id: 'rawalpindi',
      title: 'Cargo from Rawalpindi to UK',
      blocks: [
        {
          type: 'p',
          text: `Our office is in Rawalpindi, near Old Airport Road, so our cargo service from Rawalpindi to UK runs at the same rates and times. We collect across Rawalpindi, including Saddar, Satellite Town, Chaklala, Westridge and Bahria Town, or you can drop your boxes at the office: ${OFFICE_SHORT}, ${OFFICE_HOURS}.`,
        },
        {
          type: 'p',
          text: `Sending from Jhelum, Gujar Khan or Mirpur? Ask us on [WhatsApp](${buildWhatsappUrl(WHATSAPP_NUMBER, 'Hi Raahi, I want a cargo quote to UK')}) whether we can collect.`,
        },
      ],
    },
    {
      id: 'london',
      title: 'Cargo from Islamabad to London and the rest of the UK',
      blocks: [
        {
          type: 'p',
          text: 'London is priced like the rest of England: 20 kg by air costs Rs 35,000–37,000. We deliver to every UK town and city, including those with large British Pakistani communities: London, Birmingham, Bradford, Manchester, Luton, Slough and Glasgow.',
        },
        {
          type: 'p',
          text: 'See [cargo to London](/destinations/uk/london), [Birmingham](/destinations/uk/birmingham) and [Manchester](/destinations/uk/manchester).',
        },
      ],
    },
    {
      id: 'what-families-send',
      title: 'What families send from Islamabad to the UK',
      blocks: [
        {
          type: 'p',
          text: "Many British Pakistani families have roots in the Potohar region around Islamabad and Rawalpindi, so most of what we send to the UK goes between relatives: wedding outfits, lawn and unstitched suits, shawls, gifts and children's clothes.",
        },
        {
          type: 'p',
          text: "We also move students' books and bedding, and the belongings of people relocating to the UK for work or family.",
        },
        {
          type: 'p',
          text: '**We do not accept** food items, liquids, perfumes, aerosols, lithium batteries, or flammable and hazardous items. Ask before sending medicines or electronics.',
        },
      ],
    },
    {
      id: 'customs',
      title: 'UK import duty on cargo from Pakistan',
      blocks: [
        {
          type: 'p',
          text: 'What the receiver pays depends on why the goods are sent and their value ([gov.uk](https://www.gov.uk/goods-sent-from-abroad/tax-and-duty)):',
        },
        {
          type: 'table',
          head: ['Situation', 'What the UK charges'],
          rows: [
            ['A gift worth £39 or less', 'No VAT'],
            ['A gift worth more than £39', 'VAT'],
            ['Goods worth more than £135', 'VAT, and customs duty depending on the goods'],
            [
              'Your own belongings when you move to the UK',
              'Often nothing, under Transfer of Residence relief: you must have lived outside the UK for 12 months and owned the goods for 6. Apply on form ToR01 before shipping ([gov.uk](https://www.gov.uk/guidance/application-for-transfer-of-residence-relief-tor1))',
            ],
            ['Stock for a UK business', 'Duty and VAT on the invoice value; the receiver needs an EORI number'],
          ],
        },
        { type: 'p', text: 'Always declare the true contents and value.' },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How it works',
      blocks: [howItWorks(UK_QUOTE_URL, whatsappLink('UK'), 'UK address', 'the UK door', 'delivery date')],
    },
  ],
  faqTitle: 'Islamabad to UK cargo: questions people ask',
  faqs: [
    {
      question: 'How much does it cost to send cargo from Islamabad to the UK?',
      answer:
        'Rs 1,750–1,850 per kg by air and Rs 950–1,000 per kg by sea, for England and Wales. Scotland is Rs 2,350 by air and Rs 1,250 by sea.',
    },
    {
      question: 'How long does cargo take from Islamabad to UK?',
      answer: '10–12 days door to door by air, or 10–15 days to Scotland. Sea cargo takes 1.5–2.5 months.',
    },
    {
      question: 'Is the price the same from Rawalpindi?',
      answer: 'Yes. Islamabad and Rawalpindi have the same rates, and our office is in Rawalpindi.',
    },
    {
      question: 'How much does 25 kg cost from Islamabad to Birmingham?',
      answer: 'Rs 43,750–46,250 by air, delivered in 10–12 days.',
    },
    {
      question: 'Can I send less than 20 kg?',
      answer: 'Our air minimum is 20 kg. For a small parcel, a courier is usually cheaper.',
    },
    {
      question: 'Will my relatives in the UK pay duty?',
      answer:
        'Gifts worth £39 or less have no VAT. Above that, VAT applies, and goods over £135 may also have duty. We tell you before you book.',
    },
    { question: 'Can I send mithai or other food?', answer: 'No. We do not accept food items.' },
  ],
  closing: routeClosing('UK', UK_QUOTE_URL),
  breadcrumbs: routeCrumbs('Islamabad to UK', '/routes/islamabad-to-uk'),
  quoteUrl: UK_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Islamabad to the UK. Please give me a quote.',
  service: {
    name: 'Cargo from Islamabad to UK',
    areaServed: { code: 'GB', name: 'United Kingdom' },
    airRate: [1750, 1850],
    seaRate: [950, 1000],
  },
  countrySlug: 'uk',
};

const DUBAI_QUOTE_URL = routeQuoteUrl('uae');

const ISLAMABAD_TO_DUBAI: LandingPage = {
  origin: ISLAMABAD,
  path: '/routes/islamabad-to-dubai',
  linkLabel: 'Cargo from Islamabad to Dubai',
  seoTitle: 'Cargo from Islamabad to Dubai | From Rs 600/kg | Raahi',
  seoDescription:
    'Cargo from Islamabad to Dubai, door to door: air Rs 1,350–1,450/kg, sea Rs 600–700/kg. Pickup in Islamabad and Rawalpindi, delivery to all seven emirates.',
  h1: 'Cargo from Islamabad to Dubai and the UAE',
  intro: [
    'Cargo from Islamabad to Dubai, collected from any Islamabad sector or anywhere in Rawalpindi and delivered door to door in all seven emirates.',
    'The UAE is the least expensive country we ship to: Rs 1,350–1,450 a kilo by air, arriving in 3–4 days, or Rs 600–700 a kilo by sea, arriving in 1.5–2.5 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Islamabad to Dubai cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air', 'Sea'],
          rows: [
            ['Any emirate', 'Rs 1,350–1,450/kg', 'Rs 600–700/kg'],
            ['Minimum weight', '20 kg', '70–100 kg'],
            ['Collection to delivery', '3–4 days', '1.5–2.5 months'],
          ],
        },
        {
          type: 'p',
          text: `Those are our Pakistan to Dubai cargo rates per kg for Islamabad and Rawalpindi pickups, last revised ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'examples',
      title: 'Prices for common shipments',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg: one box of clothes and gifts', 'Rs 27,000–29,000', 'Below sea minimum'],
            ['35 kg: a large suitcase-sized load', 'Rs 47,250–50,750', 'Below sea minimum'],
            ['70 kg: several boxes', 'Rs 94,500–101,500', 'Ask: may qualify for sea'],
            ["120 kg: a single person's move", 'Rs 162,000–174,000', 'Rs 72,000–84,000'],
            ["250 kg: a family's household goods", 'Rs 337,500–362,500', 'Rs 150,000–175,000'],
          ],
        },
        { type: 'p', text: 'On 120 kg, choosing sea over air keeps about Rs 78,000–102,000 in your pocket.' },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Islamabad to Dubai',
      blocks: [
        {
          type: 'p',
          text: 'From 20 kg upwards, air gets your boxes to the UAE in 3–4 days. It is the usual way to send clothes, shoes and gifts to relatives working in the Gulf, or anything you will need soon after you land.',
        },
        {
          type: 'p',
          text: 'Shoes and bedding take up more space than they weigh, and air cargo is billed on whichever is higher: scale weight or size weight (length × width × height in cm ÷ 6,000). Stuff shoes with socks and squeeze bedding into vacuum bags.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo to Dubai for household moves',
      blocks: [
        {
          type: 'p',
          text: "Rs 600–700 a kilo, from 70–100 kg, in 1.5–2.5 months: about half what air costs. Sea suits things that can follow later, such as furniture, kitchen sets, a wedding jahez going to Sharjah, or a family's belongings after a job offer in Abu Dhabi.",
        },
        {
          type: 'p',
          text: 'A whole home is quoted as a 20 ft or 40 ft container, and we take care of the trip to Karachi port and the export clearance.',
        },
      ],
    },
    {
      id: 'rawalpindi',
      title: 'Cargo from Rawalpindi to Dubai',
      blocks: [
        {
          type: 'p',
          text: `Rawalpindi customers pay the Islamabad rate. Our office is on Old Airport Road, opposite the Flying Club, so if you live in Chaklala, Saddar or Westridge you can bring your boxes in yourself, ${OFFICE_HOURS}. Otherwise we come to you, anywhere from Satellite Town to Bahria Town.`,
        },
      ],
    },
    {
      id: 'emirates',
      title: 'Cargo from Islamabad to Abu Dhabi, Sharjah and the rest of the UAE',
      blocks: [
        {
          type: 'p',
          text: 'Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain cost exactly what Dubai costs. See [cargo to Abu Dhabi](/destinations/uae/abu-dhabi) and [cargo to Dubai](/destinations/uae/dubai).',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to the UAE',
      blocks: [
        {
          type: 'p',
          text: 'Yes: clothes, shoes, bedding, books, kitchenware, household goods, and commercial goods with an invoice.',
        },
        {
          type: 'p',
          text: 'No: food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous.',
        },
      ],
    },
    {
      id: 'customs',
      title: 'UAE customs: what to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Depending on the contents and their value, UAE Customs can charge duty and 5% VAT. You get our estimate first.',
            'Some medicines that are ordinary in Pakistan, including some prescription drugs, are controlled in the UAE. Talk to us before packing any.',
            'The receiver must give a complete UAE address and a UAE phone number. If customs wants an ID copy as well, we will let you know.',
            'Every box needs a list of what is inside and what it is worth.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Booking from Islamabad or Rawalpindi',
      blocks: [
        {
          type: 'p',
          text: `Message [WhatsApp ${PHONE}](${whatsappLink('Dubai')}) or use the [quote form](${DUBAI_QUOTE_URL}) with the weight, the contents and the UAE address. Once you accept the price, we collect, pack and clear export customs, and you can follow the shipment on our [tracking page](/track) until it reaches the receiver.`,
        },
      ],
    },
  ],
  faqTitle: 'Islamabad to Dubai cargo: questions people ask',
  faqs: [
    {
      question: 'What is the Pakistan to Dubai cargo price from Islamabad?',
      answer: 'Air is Rs 1,350–1,450 a kilo, so Rs 27,000–29,000 for 20 kg. Sea is Rs 600–700 a kilo.',
    },
    {
      question: 'How long does cargo take from Islamabad to Dubai?',
      answer: '3–4 days by air and 1.5–2.5 months by sea, from collection to delivery.',
    },
    { question: 'Is the price the same from Rawalpindi?', answer: 'Yes, the twin cities share one rate.' },
    { question: 'Do you deliver to Abu Dhabi and Sharjah?', answer: "Yes, and to the other four emirates, at Dubai's price." },
    {
      question: 'Can I send medicine from Pakistan to the UAE?',
      answer: 'Not without checking with us. Several medicines need UAE approval before they can enter.',
    },
    { question: 'Can I send food to Dubai?', answer: 'No. Food is not allowed in our shipments.' },
  ],
  closing: `Book cargo from Islamabad to Dubai on [WhatsApp ${PHONE}](${whatsappLink('Dubai')}). Our twin-city pickup areas and the Rawalpindi office are on the [international cargo services in Islamabad](${ISLAMABAD_CITY_PATH}) page.`,
  breadcrumbs: routeCrumbs('Islamabad to Dubai', '/routes/islamabad-to-dubai'),
  quoteUrl: DUBAI_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Islamabad to Dubai. Please give me a quote.',
  service: {
    name: 'Cargo from Islamabad to Dubai',
    areaServed: { code: 'AE', name: 'United Arab Emirates' },
    airRate: [1350, 1450],
    seaRate: [600, 700],
  },
  countrySlug: 'uae',
};

const USA_QUOTE_URL = routeQuoteUrl('usa');

const ISLAMABAD_TO_USA: LandingPage = {
  origin: ISLAMABAD,
  path: '/routes/islamabad-to-usa',
  linkLabel: 'Cargo from Islamabad to USA',
  seoTitle: 'Cargo from Islamabad to USA | From Rs 1,550/kg | Raahi',
  seoDescription:
    'Cargo from Islamabad to USA, door to door: air Rs 2,750–2,950/kg in 10–15 days, sea Rs 1,550–1,650/kg. Pickup in Islamabad and Rawalpindi.',
  h1: 'Cargo from Islamabad to USA: Door-to-Door Air & Sea',
  intro: [
    "Cargo from Islamabad to USA, door to door: we pick up in any Islamabad sector, from F-6 to G-13, in DHA and Bahria Town, or anywhere in Rawalpindi, and deliver to the receiver's address in any state.",
    'Shipping from Islamabad to USA costs Rs 2,750–2,950 a kilo by air (10–15 days) or Rs 1,550–1,650 a kilo by sea (2–2.5 months), and the price is fixed in writing before collection.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Islamabad to USA cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'By air', 'By sea'],
          rows: [
            ['Any state', 'Rs 2,750–2,950/kg', 'Rs 1,550–1,650/kg'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['Door to door', '10–15 days', '2–2.5 months'],
          ],
        },
        { type: 'p', text: `Updated ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'excess-baggage',
      title: 'Airline excess baggage or cargo?',
      blocks: [
        {
          type: 'p',
          text: 'Flying out of Islamabad International with more than your allowance? Ask your airline what one extra 23 kg bag costs, then compare: 23 kg by air cargo with us is Rs 63,250–67,850 and arrives 10–15 days after pickup.',
        },
        {
          type: 'p',
          text: "Cargo has two other advantages. Boxes can be heavier and bulkier than an airline bag, and nobody has to drag them through two airports. Past two bags' worth, or for anything that can arrive after you, sea cargo is usually far cheaper. See [excess baggage shipping](/services/excess-baggage).",
        },
      ],
    },
    {
      id: 'examples',
      title: 'Prices for common shipments',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ["23 kg: one airline bag's worth", 'Rs 63,250–67,850', 'Below sea minimum'],
            ["46 kg: two airline bags' worth", 'Rs 126,500–135,700', 'Below sea minimum'],
            ["80 kg: a student's year of belongings", 'Rs 220,000–236,000', 'Rs 124,000–132,000 (ask: may qualify)'],
            ['150 kg: a small household', 'Rs 412,500–442,500', 'Rs 232,500–247,500'],
          ],
        },
        {
          type: 'p',
          text: 'Choose sea for 150 kg and you save about Rs 165,000–210,000, provided you can wait 2–2.5 months.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Islamabad to USA',
      blocks: [
        {
          type: 'p',
          text: 'Students heading for a new semester, wedding and Eid clothes for relatives, anything needed within the month: air gets them there in 10–15 days.',
        },
        {
          type: 'p',
          text: 'Every centimetre counts at US rates, because we charge the higher of real weight and size weight (length × width × height in cm ÷ 6,000). Pick the smallest box that fits and fill it to the top.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo to the USA',
      blocks: [
        {
          type: 'p',
          text: 'From 70–100 kg, sea cargo costs Rs 1,550–1,650 a kilo, around 40–45% less than air, and arrives in 2–2.5 months. It is the sensible way to move a household or heavy boxes. A full home is priced as a 20 ft or 40 ft container, and we handle the leg from Islamabad to Karachi port and the export customs.',
        },
      ],
    },
    {
      id: 'rawalpindi',
      title: 'Cargo from Rawalpindi to USA',
      blocks: [
        {
          type: 'p',
          text: `Same rate, same 10–15 days by air. We collect across Rawalpindi, Saddar and Satellite Town included, and you can also drop boxes at our office near Old Airport Road, ${OFFICE_HOURS}.`,
        },
      ],
    },
    {
      id: 'delivery-areas',
      title: 'Where we deliver in the USA',
      blocks: [
        {
          type: 'p',
          text: 'Any state: New York and New Jersey, Texas, Illinois, Virginia, California and the rest. See [cargo to New York](/destinations/usa/new-york), [Chicago](/destinations/usa/chicago) and [Houston](/destinations/usa/houston).',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to the USA',
      blocks: [
        {
          type: 'p',
          text: 'Accepted: clothes, shoes, books, bedding, kitchenware, household goods, and commercial goods with an invoice.',
        },
        {
          type: 'p',
          text: 'Refused: food, liquids, perfumes, aerosols, lithium batteries, and flammable or hazardous items. Medicines and electronics need checking first.',
        },
      ],
    },
    {
      id: 'customs',
      title: 'US customs: what to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Low-value goods no longer enter the US duty-free. The de minimis exemption is suspended ([Federal Register](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)), so expect duty on most cargo.',
            'The exception is a bona fide gift to someone in the US worth $100 or less.',
            'Goods for resale pay duty based on the product type and current tariffs. We estimate it before you book.',
            'Declare everything at its true value, or customs can hold the shipment.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How it works',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `Send the weight, contents and US address on [WhatsApp ${PHONE}](${whatsappLink('USA')}) or through the [quote form](${USA_QUOTE_URL}).`,
            'We reply with the per-kilo price, the total and the delivery time.',
            'Collection from your Islamabad or Rawalpindi address, packing on request, and export clearance in Pakistan.',
            'Tracking on our [tracking page](/track) until delivery.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Islamabad to USA cargo: questions people ask',
  faqs: [
    {
      question: 'What is the cargo price from Pakistan to USA from Islamabad?',
      answer: 'Rs 2,750–2,950 a kilo by air and Rs 1,550–1,650 by sea. A 23 kg box by air is Rs 63,250–67,850.',
    },
    { question: 'How long does cargo take from Islamabad to USA?', answer: 'Air: 10–15 days. Sea: 2–2.5 months.' },
    {
      question: 'How much does it cost to ship 1 kg from Pakistan to the USA?',
      answer: 'We do not take single kilos; 20 kg is the minimum. For one or two kilos a courier is better.',
    },
    {
      question: 'Can I send gifts from Pakistan to the USA without duty?',
      answer: 'Yes, up to $100 of gifts per recipient. Beyond that, expect US duty.',
    },
    { question: 'Is the price the same from Rawalpindi?', answer: 'Yes, Rawalpindi pickups cost the same.' },
    { question: 'Can I send food to the USA?', answer: 'No, food cannot be shipped with us.' },
  ],
  closing: `Ready to send cargo from Islamabad to USA? Message [WhatsApp ${PHONE}](${whatsappLink('USA')}) or fill in our [quote form](${USA_QUOTE_URL}). Twin-city pickup areas and our office details are on the [international cargo services in Islamabad](${ISLAMABAD_CITY_PATH}) page.`,
  breadcrumbs: routeCrumbs('Islamabad to USA', '/routes/islamabad-to-usa'),
  quoteUrl: USA_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Islamabad to the USA. Please give me a quote.',
  service: {
    name: 'Cargo from Islamabad to USA',
    areaServed: { code: 'US', name: 'United States' },
    airRate: [2750, 2950],
    seaRate: [1550, 1650],
  },
  countrySlug: 'usa',
};

const CANADA_QUOTE_URL = routeQuoteUrl('canada');

const ISLAMABAD_TO_CANADA: LandingPage = {
  origin: ISLAMABAD,
  path: '/routes/islamabad-to-canada',
  linkLabel: 'Cargo from Islamabad to Canada',
  seoTitle: 'Cargo from Islamabad to Canada | From Rs 1,750/kg | Raahi',
  seoDescription:
    'Shipping from Islamabad to Canada, door to door: air Rs 2,850–2,950/kg (10–15 days), sea Rs 1,750–1,850/kg. Pickup in Islamabad and Rawalpindi.',
  h1: 'Cargo from Islamabad to Canada: Door-to-Door Air & Sea',
  intro: [
    'Cargo from Islamabad to Canada for families and new immigrants. We collect in Islamabad or Rawalpindi and deliver to the door in Ontario, British Columbia, Alberta, Quebec or any other province.',
    'Shipping from Islamabad to Canada costs Rs 2,850–2,950 per kg by air (10–15 days) or Rs 1,750–1,850 per kg by sea (2–3 months). We confirm your price in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Islamabad to Canada cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'By air', 'By sea'],
          rows: [
            ['Rate, any province', 'Rs 2,850–2,950/kg', 'Rs 1,750–1,850/kg'],
            ['Smallest shipment', '20 kg', '70–100 kg'],
            ['Pickup to Canadian door', '10–15 days', '2–3 months'],
          ],
        },
        { type: 'p', text: `Rates updated ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'moving',
      title: 'Moving to Canada from Islamabad',
      blocks: [
        {
          type: 'p',
          text: 'Most people emigrating to Canada fly with a few suitcases and send the rest of the house by sea. Plan it in this order:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'List everything you are sending, box by box, with a value for each item.',
            'Book the sea shipment before you fly. It takes 2–3 months door to door, so it lands a few weeks after you have settled in.',
            'When you land, give the border officer two lists: what you are carrying, and what is coming later. New permanent residents can usually bring their own household goods in free of duty as settlers\' effects, but goods arriving later only qualify if they are on that "goods to follow" list (CBSA forms BSF186 and BSF186A).',
            'Keep a copy of the list. You will need it when the cargo clears Canadian customs.',
          ],
        },
        { type: 'p', text: "Rules change, so check CBSA's current guidance for settlers before you ship." },
      ],
    },
    {
      id: 'examples',
      title: 'Prices for common shipments',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air', 'By sea'],
          rows: [
            ['20 kg: one box of winter clothes', 'Rs 57,000–59,000', 'Below sea minimum'],
            ["40 kg: a student's first semester", 'Rs 114,000–118,000', 'Below sea minimum'],
            ['60 kg: three boxes', 'Rs 171,000–177,000', 'Below sea minimum'],
            ["100 kg: a couple's belongings", 'Rs 285,000–295,000', 'Rs 175,000–185,000'],
            ["250 kg: a family's household goods", 'Rs 712,500–737,500', 'Rs 437,500–462,500'],
          ],
        },
        { type: 'p', text: 'A 250 kg family move costs about Rs 250,000–300,000 less by sea than by air.' },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Islamabad to Canada',
      blocks: [
        {
          type: 'p',
          text: "Air, at 10–15 days, is for what cannot wait two months: a student's things before term, wedding outfits, Eid gifts.",
        },
        {
          type: 'p',
          text: 'Down jackets and quilts are bulky for their weight, and you pay for the higher of real weight and size weight (length × width × height in cm ÷ 6,000). Vacuum-pack them, or put them in the sea shipment.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Rs 1,750–1,850 a kilo from 70–100 kg, about 35–40% below air, and 2–3 months door to door. A household gets a 20 ft or 40 ft container quote, and we organise the move from Islamabad to Karachi port and the export papers.',
        },
      ],
    },
    {
      id: 'rawalpindi',
      title: 'Cargo from Rawalpindi to Canada',
      blocks: [
        {
          type: 'p',
          text: `A Rawalpindi pickup costs the same as an Islamabad one. Our office, Office #1B opposite the Flying Club near Old Airport Road, takes drop-offs ${OFFICE_HOURS}.`,
        },
      ],
    },
    {
      id: 'delivery-areas',
      title: 'Where we deliver in Canada',
      blocks: [
        {
          type: 'p',
          text: 'Everywhere: Toronto, Mississauga and Brampton; Calgary and Edmonton; Vancouver and Surrey; Montreal; and every other province. See [cargo to Toronto](/destinations/canada/toronto) and [cargo to Vancouver](/destinations/canada/vancouver).',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Clothes, shoes, books, bedding, kitchenware, household goods and invoiced commercial goods are fine. Food, liquids, perfumes, aerosols, lithium batteries and hazardous or flammable items are not. Ask before packing medicines or electronics.',
        },
      ],
    },
    {
      id: 'customs',
      title: 'Canadian customs: what to know',
      blocks: [
        {
          type: 'list',
          items: [
            'Gifts of CAD $60 or less, couriered with a note marking them as gifts, are free of duty and tax ([CBSA](https://cbsa-asfc.gc.ca/import/courier/lvs-efv/prsn-eng.html)).',
            'Other goods may attract duty and GST/HST, depending on type and value. We estimate it before booking.',
            "Settlers' effects: see the [moving section above](#moving).",
            'Under-declaring can hold a shipment at the border.',
          ],
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How it works',
      blocks: [
        {
          type: 'p',
          text: `WhatsApp [${PHONE}](${whatsappLink('Canada')}) or use the [quote form](${CANADA_QUOTE_URL}), and tell us the weight, the contents and the Canadian address. You get a rate and a total. We collect from your Islamabad or Rawalpindi address, and the [tracking page](/track) shows where the shipment is until it reaches Canada.`,
        },
      ],
    },
  ],
  faqTitle: 'Islamabad to Canada cargo: questions people ask',
  faqs: [
    {
      question: 'What is the Pakistan to Canada cargo price per kg from Islamabad?',
      answer: 'Air: Rs 2,850–2,950 a kilo. Sea: Rs 1,750–1,850 a kilo.',
    },
    { question: 'What is the Pakistan to Canada shipping time from Islamabad?', answer: '10–15 days by air; 2–3 months by sea.' },
    {
      question: 'What is the cheapest cargo from Pakistan to Canada?',
      answer: 'Sea cargo, for 70–100 kg or more. On a 250 kg household it saves about Rs 250,000–300,000 compared with air.',
    },
    {
      question: 'Can I send a small parcel from Pakistan to Canada?',
      answer: 'Not with us: air cargo starts at 20 kg. A courier is cheaper for a few kilos.',
    },
    {
      question: "Do settlers' effects need a list?",
      answer: 'Yes. List everything that will arrive after you on the goods-to-follow form when you land, or it may be charged duty.',
    },
    { question: 'Is the price the same from Rawalpindi?', answer: 'Yes, one rate for both cities.' },
    { question: 'Can I send food to Canada?', answer: 'No. We do not take food items.' },
  ],
  closing: `Ready to send cargo from Islamabad to Canada? Get a quote on [WhatsApp ${PHONE}](${whatsappLink('Canada')}). Where we collect, and where the office is, are on our [international cargo services in Islamabad](${ISLAMABAD_CITY_PATH}) page.`,
  breadcrumbs: routeCrumbs('Islamabad to Canada', '/routes/islamabad-to-canada'),
  quoteUrl: CANADA_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Islamabad to Canada. Please give me a quote.',
  service: {
    name: 'Cargo from Islamabad to Canada',
    areaServed: { code: 'CA', name: 'Canada' },
    airRate: [2850, 2950],
    seaRate: [1750, 1850],
  },
  countrySlug: 'canada',
};

export const ISLAMABAD_LANDING: CityLanding = {
  cityPage: ISLAMABAD_CITY_PAGE,
  routes: {
    'islamabad-to-uk': ISLAMABAD_TO_UK,
    'islamabad-to-dubai': ISLAMABAD_TO_DUBAI,
    'islamabad-to-usa': ISLAMABAD_TO_USA,
    'islamabad-to-canada': ISLAMABAD_TO_CANADA,
  },
};
