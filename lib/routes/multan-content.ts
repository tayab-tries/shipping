/**
 * Multan city page (copy from "Raahi City Pages – Final Copy"). No Multan office: pickup only. The old page
 * promoted mango and food exports; this copy says plainly that food is not carried.
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, reviews) are omitted.
 */

import { CityLanding, cityBreadcrumbs, contentWhatsappLink, DESTINATION_LINKS, LandingPage, OriginCity, PHONE, RATES_UPDATED } from './shared';

const MULTAN: OriginCity = {
  key: 'multan',
  name: 'Multan',
  province: 'Punjab',
  cityPath: '/locations/international-cargo-services-in-multan',
};

const QUOTE_URL = '/quote?origin=multan';
const WHATSAPP_URL = contentWhatsappLink('Multan');

const MULTAN_CITY_PAGE: LandingPage = {
  origin: MULTAN,
  path: MULTAN.cityPath,
  linkLabel: 'International cargo services in Multan',
  seoTitle: 'International Cargo Services in Multan | Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Multan with home pickup: air from Rs 1,350/kg to Dubai, Saudi Arabia, the UK, USA and Canada, and sea from Rs 600/kg.',
  h1: 'International Cargo Services in Multan and South Punjab',
  intro: [
    "Raahi International brings international cargo services in Multan to your door: we collect from your home or shop anywhere in the city and deliver to the receiver's door in Saudi Arabia, the UAE, the UK, USA and Canada.",
    'We ship by air from 20 kg and by sea from 70–100 kg. If you have been looking for cargo services in Multan and finding only domestic couriers, this page covers international shipping only, with our rates per kilo set out below.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Multan cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['Destination', 'Air per kg', '40 kg by air', 'Sea per kg', '120 kg by sea'],
          rows: [
            ['UAE', 'Rs 1,350–1,450', 'Rs 54,000–58,000', 'Rs 600–700', 'Rs 72,000–84,000'],
            ['Saudi Arabia', 'Rs 2,150–2,250', 'Rs 86,000–90,000', 'Rs 950–1,000', 'Rs 114,000–120,000'],
            ['England and Wales', 'Rs 1,750–1,850', 'Rs 70,000–74,000', 'Rs 950–1,000', 'Rs 114,000–120,000'],
            ['Scotland', 'Rs 2,350', 'Rs 94,000', 'Rs 1,250', 'Rs 150,000'],
            ['USA', 'Rs 2,750–2,950', 'Rs 110,000–118,000', 'Rs 1,550–1,650', 'Rs 186,000–198,000'],
            ['Canada', 'Rs 2,850–2,950', 'Rs 114,000–118,000', 'Rs 1,750–1,850', 'Rs 210,000–222,000'],
          ],
        },
        {
          type: 'p',
          text: `Door to door, air takes 10–12 days to the UK, 10–15 to the USA and Canada, 3–4 to the UAE and 10–20 to Saudi Arabia. Sea takes 1.5–3 months. Rates as of ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'gulf',
      title: 'Cargo from Multan to Saudi Arabia and the UAE',
      blocks: [
        {
          type: 'p',
          text: '**Saudi Arabia:** Rs 2,150–2,250 a kilo by air, 10–20 days, or Rs 950–1,000 by sea. We deliver to Riyadh, Jeddah, Dammam and the rest of the kingdom. Saudi customs can charge duty and 15% VAT depending on what you send and its value, and some medicines are restricted, so tell us what is in the boxes before you pack. See [cargo to Saudi Arabia](/destinations/ksa).',
        },
        {
          type: 'p',
          text: '**UAE:** our cheapest destination, at Rs 1,350–1,450 a kilo by air and Rs 600–700 by sea, the same for every emirate. See [cargo to Dubai](/destinations/uae/dubai).',
        },
        { type: 'h3', text: 'What the receiver in the Gulf needs' },
        {
          type: 'list',
          items: [
            'A full address: building or villa number, street, area and the nearest landmark.',
            'A local mobile number that will be answered, so the delivery can be arranged.',
            'In Saudi Arabia an Iqama or national ID number, and in the UAE an Emirates ID, in case customs asks for it.',
          ],
        },
        {
          type: 'p',
          text: 'With those, the boxes go to the door: a family flat in Riyadh, a shared apartment in Sharjah or a workplace address.',
        },
      ],
    },
    {
      id: 'uk-usa-canada',
      title: 'Cargo from Multan to the UK, USA and Canada',
      blocks: [
        {
          type: 'list',
          items: [
            '**UK:** Rs 1,750–1,850 a kilo by air, 10–12 days. Gifts worth £39 or less come in without UK VAT. See [cargo to the UK](/destinations/uk).',
            '**USA:** Rs 2,750–2,950 a kilo by air. Low-value shipments no longer enter duty-free, apart from gifts of $100 or less. See [cargo to the USA](/destinations/usa).',
            '**Canada:** Rs 2,850–2,950 a kilo by air. Gifts of CAD $60 or less can enter free of duty and tax. See [cargo to Canada](/destinations/canada).',
          ],
        },
      ],
    },
    {
      id: 'crafts',
      title: 'Sending Multani crafts abroad',
      blocks: [
        { type: 'p', text: "Multan's crafts make good gifts and travel well if they are packed for it." },
        {
          type: 'list',
          items: [
            '**Blue pottery and glazed tiles:** each piece wrapped separately, with at least 5 cm of padding on every side, in a rigid carton. Large pieces go in a wooden crate.',
            '**Camel-skin lamps:** packed in their own box, with the shade filled so it cannot be crushed.',
            '**Khussas and embroidered clothes:** pair the shoes inside clothes cartons to use the space you are paying for.',
          ],
        },
        {
          type: 'p',
          text: 'Anything you are selling abroad, rather than giving, travels as [commercial cargo](/services/commercial-cargo) with an invoice.',
        },
        { type: 'h3', text: 'Packing blue pottery, step by step' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Wrap each piece in two layers of bubble wrap and tape it closed.',
            'Fill hollow pieces, such as vases and bowls, with crumpled paper so they cannot flex.',
            'Pack them into a small inner box with at least 5 cm of padding all round.',
            'Put the inner box inside a larger double-wall carton, with another 5 cm of padding. A knock to the outer box then never reaches the pottery.',
            'Mark the carton "Fragile" and "This way up".',
          ],
        },
        {
          type: 'p',
          text: 'Large plates, tiles and panels go in a wooden crate instead. We can do all of this for you.',
        },
      ],
    },
    {
      id: 'food',
      title: 'Mangoes, sohan halwa and other food',
      blocks: [
        {
          type: 'p',
          text: "Can Multan's mangoes or a box of sohan halwa go in your cargo? No: we do not carry food of any kind, including fruit, sweets, dried fruit and spices. Fresh fruit exports need plant-health certificates and treatment, and are handled by licensed fruit exporters, not by cargo companies like ours.",
        },
      ],
    },
    {
      id: 'air-sea',
      title: 'Air and sea from Multan',
      blocks: [
        {
          type: 'p',
          text: "Air cargo is for anything needed within two to three weeks: clothes, gifts and a student's luggage. Each box is charged on its scale weight or its size weight (length × width × height in cm ÷ 6,000), whichever is greater, so fewer, fuller boxes cost less.",
        },
        {
          type: 'p',
          text: 'Sea cargo is for furniture, household goods and heavy boxes, from 70–100 kg. We take your goods from Multan to Karachi port, clear them for export and ship them in a shared container, or in your own 20 ft or 40 ft container for a full house.',
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup across Multan',
      blocks: [
        { type: 'p', text: 'We collect from addresses across the city, including:' },
        {
          type: 'list',
          items: [
            'Cantt, Gulgasht Colony and Bosan Road',
            'Shah Rukn-e-Alam Colony, Mumtazabad and New Multan',
            'Model Town, Garden Town and Wapda Town',
            'DHA Multan and the Industrial Estate',
            'Hussain Agahi and the old city bazaars',
          ],
        },
        {
          type: 'p',
          text: `In Khanewal, Lodhran, Vehari, Muzaffargarh or Bahawalpur? Ask us on [WhatsApp](${WHATSAPP_URL}) whether we can collect.`,
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What we accept',
      blocks: [
        {
          type: 'p',
          text: 'Clothes, shoes, bedding, books, crafts, kitchenware, household goods, and commercial goods with an invoice. Not accepted: food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous. Ask before packing medicines or electronics. Crates for furniture are built from ISPM 15 heat-treated wood.',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Booking from Multan',
      blocks: [
        {
          type: 'p',
          text: 'Message us with the destination, what you are sending and a rough weight. We send a written price per kilo and a total, collect from your Multan address, pack and clear export customs, and give you a tracking number for our [tracking page](/track).',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Multan: contact',
      blocks: [
        {
          type: 'p',
          text: `Call or WhatsApp **[${PHONE}](${WHATSAPP_URL})** for cargo services in Multan, or use the [quote form](${QUOTE_URL}). There is no Multan office to visit; we come to you.`,
        },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Multan',
  faqs: [
    {
      question: 'How much is cargo from Multan to Saudi Arabia?',
      answer: 'Rs 2,150–2,250 a kilo by air, so Rs 86,000–90,000 for 40 kg, or Rs 950–1,000 a kilo by sea from 70–100 kg.',
    },
    {
      question: 'What is the cheapest way to ship from Multan?',
      answer: 'Sea cargo to the UAE, from Rs 600 a kilo, once you have 70–100 kg. By air, the UAE is also the cheapest at Rs 1,350–1,450.',
    },
    {
      question: 'Can I send mangoes from Multan abroad?',
      answer: 'Not with us. We do not carry food, including fruit. Ask a licensed mango exporter.',
    },
    {
      question: 'Do I need to bring my boxes to Lahore or Rawalpindi?',
      answer: 'No. We collect from your address in Multan.',
    },
    {
      question: 'Can you pack blue pottery so it does not break?',
      answer: 'Yes. Each piece is wrapped and padded separately, and large pieces are crated.',
    },
    {
      question: 'Can my family in Saudi Arabia receive the boxes at home?',
      answer: 'Yes. Delivery is door to door, as long as you give a full address and a local phone number.',
    },
    {
      question: 'How long does cargo from Multan to Dubai take?',
      answer: 'By air, 3–4 days door to door. By sea, 1.5–2.5 months.',
    },
    {
      question: 'Do you collect outside Multan city?',
      answer: 'Ask us first for Khanewal, Lodhran, Vehari, Muzaffargarh and Bahawalpur.',
    },
  ],
  closing: `For international cargo services in Multan, send your list on [WhatsApp ${PHONE}](${WHATSAPP_URL}) and we will reply with a written price.`,
  breadcrumbs: cityBreadcrumbs(MULTAN),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Multan. Please guide me.',
};

export const MULTAN_LANDING: CityLanding = {
  cityPage: MULTAN_CITY_PAGE,
  routes: {},
  relatedLinks: DESTINATION_LINKS,
};
