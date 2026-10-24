/**
 * Rawalpindi city page (copy from "Raahi City Pages – Final Copy"). The only city with a walk-in office,
 * so it carries LocalBusiness schema (address in config/business-profile.ts). Route searches from Rawalpindi
 * are covered by the Islamabad route pages, which have a Rawalpindi section.
 *
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, map, photos, reviews) are omitted.
 */

import { CityLanding, contentWhatsappLink, LandingPage, OFFICE_HOURS, OriginCity, PHONE, RATES_UPDATED, cityBreadcrumbs } from './shared';

const RAWALPINDI: OriginCity = {
  key: 'rawalpindi',
  name: 'Rawalpindi',
  province: 'Punjab',
  cityPath: '/locations/international-cargo-services-in-rawalpindi',
};

const OFFICE_ADDRESS = 'Office #1B, opposite Flying Club, near Old Airport Road, Dhoke Raja Muhammad Khan, Rawalpindi 46000';
const QUOTE_URL = '/quote?origin=rawalpindi';
const WHATSAPP_URL = contentWhatsappLink('Rawalpindi');

const RAWALPINDI_CITY_PAGE: LandingPage = {
  origin: RAWALPINDI,
  path: RAWALPINDI.cityPath,
  linkLabel: 'International cargo services in Rawalpindi',
  seoTitle: 'International Cargo Services in Rawalpindi | Raahi',
  seoDescription:
    'International cargo services in Rawalpindi from our Old Airport Road office: air and sea cargo to the UK, Dubai, USA and Canada, with home pickup.',
  h1: 'International Cargo Services in Rawalpindi: Walk In or Book a Pickup',
  intro: [
    'Raahi International runs its international cargo services in Rawalpindi from a walk-in office on Old Airport Road, opposite the Flying Club. Bring your boxes in and watch them weighed, or book a home pickup anywhere in the city.',
    'Most searches for a cargo service in Rawalpindi turn up domestic couriers. We only ship abroad: air and sea cargo, door to door, to the UK, UAE, Saudi Arabia, USA and Canada. Islamabad is part of the same pickup area, so cargo services in Rawalpindi and Islamabad cost the same.',
  ],
  glance: [
    ['Office', OFFICE_ADDRESS],
    ['Open', OFFICE_HOURS],
    ['Call or WhatsApp', `[${PHONE}](${WHATSAPP_URL})`],
    ['Home pickup', 'Anywhere in Rawalpindi and Islamabad'],
    ['Air cargo', 'From Rs 1,350 a kilo, 20 kg minimum'],
    ['Sea cargo', 'From Rs 600 a kilo, 70–100 kg minimum'],
  ],
  sections: [
    {
      id: 'rates',
      title: 'International cargo services in Rawalpindi: rates per kg',
      blocks: [
        {
          type: 'p',
          text: 'The two price columns show a mid-sized air shipment (25 kg, about one large box) and a typical sea shipment (150 kg, a small household).',
        },
        {
          type: 'table',
          head: ['Destination', 'Air, per kg', '25 kg by air', 'Sea, per kg', '150 kg by sea', 'Door to door (air / sea)'],
          rows: [
            ['England and Wales', 'Rs 1,750–1,850', 'Rs 43,750–46,250', 'Rs 950–1,000', 'Rs 142,500–150,000', '10–12 days / 1.5–2.5 months'],
            ['Scotland', 'Rs 2,350', 'Rs 58,750', 'Rs 1,250', 'Rs 187,500', '10–15 days / 1.5–2.5 months'],
            ['UAE', 'Rs 1,350–1,450', 'Rs 33,750–36,250', 'Rs 600–700', 'Rs 90,000–105,000', '3–4 days / 1.5–2.5 months'],
            ['Saudi Arabia', 'Rs 2,150–2,250', 'Rs 53,750–56,250', 'Rs 950–1,000', 'Rs 142,500–150,000', '10–20 days / 1.5–2.5 months'],
            ['USA', 'Rs 2,750–2,950', 'Rs 68,750–73,750', 'Rs 1,550–1,650', 'Rs 232,500–247,500', '10–15 days / 2–2.5 months'],
            ['Canada', 'Rs 2,850–2,950', 'Rs 71,250–73,750', 'Rs 1,750–1,850', 'Rs 262,500–277,500', '10–15 days / 2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Rates as of ${RATES_UPDATED}. Other countries, including Australia, are on our [cargo rates page](/cargo-services).`,
        },
      ],
    },
    {
      id: 'office',
      title: 'Bring your boxes to our Rawalpindi office',
      blocks: [
        { type: 'p', text: 'Walking in is the quickest way to an exact price. At the counter we:' },
        {
          type: 'list',
          items: [
            'Weigh every box on our scale while you watch, and measure it.',
            'Work out the chargeable weight and show you the total before you pay.',
            'Repack an oversized box if a smaller one would cut the price.',
            'Give you a receipt and a tracking number.',
          ],
        },
        {
          type: 'p',
          text: "Bring a copy of your CNIC or passport, the receiver's full name, address and phone number, and a list of what is in each box with values. For goods you are selling abroad, bring the invoice and packing list as well.",
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo services in Rawalpindi',
      blocks: [
        {
          type: 'p',
          text: "Air cargo reaches the UK in 10–12 days, the USA and Canada in 10–15, the UAE in 3–4 and Saudi Arabia in 10–20, counted from pickup to the receiver's door. It is what most people use for clothes, gifts, a student's luggage and [excess baggage](/services/excess-baggage).",
        },
        { type: 'h3', text: 'Fill the box you pay for' },
        {
          type: 'p',
          text: 'Each box is charged on its scale weight or its size weight (length × width × height in cm ÷ 6,000), whichever is more. A 70 × 45 × 30 cm box has a size weight of 15.75 kg. If you have packed only 12 kg into it, you are paying for air: fill it to about 16 kg and the extra goes at no extra cost.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo services in Rawalpindi',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo is for loads of 70–100 kg and up, at Rs 600 a kilo to the UAE and Rs 950 to the UK. It takes 1.5–3 months depending on the country, so it suits furniture, kitchenware and the bulk of a household that can follow you abroad.',
        },
        {
          type: 'p',
          text: "Smaller loads share a container with other customers' goods. A full house goes in a 20 ft or 40 ft container of its own, priced separately. Either way, we take care of the journey from Rawalpindi to Karachi port and the export clearance.",
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Home pickup across Rawalpindi and Islamabad',
      blocks: [
        { type: 'p', text: 'We collect from homes, shops and offices across both cities. In Rawalpindi that includes:' },
        {
          type: 'list',
          items: [
            'Saddar, Raja Bazaar and the old city',
            'Satellite Town, Westridge and Peshawar Road',
            'Chaklala, Askari and the Cantt',
            'Bahria Town, DHA and Adiala Road',
          ],
        },
        {
          type: 'p',
          text: `Need cargo services in Saddar, Rawalpindi, or somewhere else on this list? Send your location on [WhatsApp](${WHATSAPP_URL}). Wah, Taxila and Gujar Khan: ask us first.`,
        },
      ],
    },
    {
      id: 'packing',
      title: 'Packing at our Rawalpindi office',
      blocks: [
        {
          type: 'p',
          text: 'Bring things loose and we will box them, or bring them packed and we will check them for the journey. Clothes and bedding go into double-wall cartons, crockery is wrapped piece by piece, and furniture, mirrors and marble go in a wooden crate.',
        },
        {
          type: 'p',
          text: 'Crates are made from heat-treated wood with the ISPM 15 stamp, which the UK, USA and Canada require for wood packaging. See the [packing guide](/guides/packing-cargo-guide).',
        },
      ],
    },
    {
      id: 'traders',
      title: "Shipping stock from Raja Bazaar and Rawalpindi's markets",
      blocks: [
        {
          type: 'p',
          text: 'Traders sending cloth, garments or other stock to a shop abroad ship it as [commercial cargo](/services/commercial-cargo), with an invoice and a packing list. The buyer usually clears it in their own name: in the UK, for example, they need an EORI number. Tell us the goods and the country and we will tell you what the receiver needs before you book.',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: "What we take, and what we don't",
      blocks: [
        {
          type: 'p',
          text: 'Yes: clothes, shoes, bags, bedding, books, kitchenware, household goods, personal belongings, and commercial goods with an invoice.',
        },
        {
          type: 'p',
          text: 'No: food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous. Ask before packing medicines or electronics.',
        },
      ],
    },
    {
      id: 'destinations',
      title: 'Where we ship from Rawalpindi',
      blocks: [
        {
          type: 'list',
          items: [
            '[Cargo from Rawalpindi to UK](/routes/islamabad-to-uk): Rs 1,750–1,850/kg by air, England, Wales and Scotland.',
            '[Cargo from Rawalpindi to Dubai](/routes/islamabad-to-dubai): Rs 1,350–1,450/kg by air, all seven emirates.',
            '[Cargo from Rawalpindi to USA](/routes/islamabad-to-usa): Rs 2,750–2,950/kg by air, any state.',
            '[Cargo from Rawalpindi to Canada](/routes/islamabad-to-canada): Rs 2,850–2,950/kg by air, any province.',
            '[Cargo to Saudi Arabia](/destinations/ksa): Rs 2,150–2,250/kg by air.',
          ],
        },
      ],
    },
    {
      id: 'choosing',
      title: 'Cargo companies in Rawalpindi: what to check',
      blocks: [
        {
          type: 'p',
          text: 'Plenty of cargo companies in Rawalpindi advertise only a phone number. Before you hand one your boxes, check that:',
        },
        {
          type: 'list',
          items: [
            'it has an address you can find on Google Maps, with reviews from real customers;',
            'it weighs your boxes in front of you and gives a written rate per kilo;',
            'it hands you a receipt and a tracking number;',
            'it tells you up front who pays customs charges in the destination country.',
          ],
        },
        { type: 'p', text: `You can check all four with us: the office is open ${OFFICE_HOURS}.` },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Rawalpindi: office address and contact number',
      blocks: [
        {
          type: 'p',
          text: `Our cargo services in Rawalpindi contact number is **[${PHONE}](${WHATSAPP_URL})**, for calls and WhatsApp.`,
        },
        { type: 'p', text: `Raahi International, ${OFFICE_ADDRESS}. Open ${OFFICE_HOURS}.` },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Rawalpindi',
  faqs: [
    {
      question: 'What are the international cargo services in Rawalpindi rates?',
      answer:
        'Per kilo by air: Rs 1,350–1,450 to the UAE, Rs 1,750–1,850 to England and Wales, Rs 2,150–2,250 to Saudi Arabia, Rs 2,750–2,950 to the USA and Rs 2,850–2,950 to Canada. By sea, from Rs 600.',
    },
    {
      question: 'Which are the best cargo services in Rawalpindi?',
      answer:
        'Look for one with an office you can visit, a written rate per kilo, boxes weighed in front of you and a tracking number. Those four checks rule out most problems.',
    },
    {
      question: 'Where are the cheapest cargo services in Rawalpindi?',
      answer:
        'The cheapest way to ship is by sea, from Rs 600 a kilo to the UAE once you have 70–100 kg. By air, the UAE is the cheapest destination at Rs 1,350–1,450 a kilo.',
    },
    {
      question: 'Do you collect from Saddar, Rawalpindi?',
      answer: 'Yes. Saddar, Raja Bazaar and the rest of the city are all in our pickup area.',
    },
    {
      question: 'Is your Rawalpindi office the same one that serves Islamabad?',
      answer: 'Yes. One office serves both cities, and the rates are the same.',
    },
    {
      question: 'Are you a courier service in Rawalpindi?',
      answer: 'No. We ship international cargo from 20 kg upwards. For a parcel of a few kilos, a courier is cheaper.',
    },
    { question: 'Can I send food from Rawalpindi?', answer: 'No. We do not carry food of any kind.' },
  ],
  closing: `Walk in or book a pickup: for international cargo services in Rawalpindi, message [WhatsApp ${PHONE}](${WHATSAPP_URL}) or fill in the [quote form](${QUOTE_URL}).`,
  breadcrumbs: cityBreadcrumbs(RAWALPINDI),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Rawalpindi. Please guide me.',
  localBusiness: true,
};

export const RAWALPINDI_LANDING: CityLanding = {
  cityPage: RAWALPINDI_CITY_PAGE,
  routes: {},
  relatedLinks: [
    { label: 'Cargo from Rawalpindi to UK', href: '/routes/islamabad-to-uk' },
    { label: 'Cargo from Rawalpindi to Dubai', href: '/routes/islamabad-to-dubai' },
    { label: 'Cargo from Rawalpindi to USA', href: '/routes/islamabad-to-usa' },
    { label: 'Cargo from Rawalpindi to Canada', href: '/routes/islamabad-to-canada' },
  ],
};
