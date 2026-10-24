/**
 * Karachi city page and Karachi → UK route page (copy from "Raahi City Pages – Final Copy").
 * Sea cargo from every city leaves through Karachi port, so both pages lead with sea. Pickup only: the copy
 * names no Karachi address, so there is no LocalBusiness schema.
 *
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, reviews) are omitted.
 */

import {
  CityLanding,
  cityBreadcrumbs,
  contentWhatsappLink,
  DESTINATION_LINKS,
  LandingPage,
  OriginCity,
  PHONE,
  RATES_UPDATED,
  routeBreadcrumbs,
} from './shared';

const KARACHI: OriginCity = {
  key: 'karachi',
  name: 'Karachi',
  province: 'Sindh',
  cityPath: '/locations/international-cargo-services-in-karachi',
};

const QUOTE_URL = '/quote?origin=karachi';
const WHATSAPP_URL = contentWhatsappLink('Karachi');

const KARACHI_CITY_PAGE: LandingPage = {
  origin: KARACHI,
  path: KARACHI.cityPath,
  linkLabel: 'International cargo services in Karachi',
  seoTitle: 'International Cargo Services in Karachi | Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Karachi, door to door: sea from Rs 600/kg, air from Rs 1,350/kg, to the UK, Dubai, Jeddah, USA and Canada. Home pickup.',
  h1: 'International Cargo Services in Karachi: Sea and Air Cargo From the Port City',
  intro: [
    'Raahi International provides international cargo services in Karachi with home pickup anywhere in the city and delivery to the door in the UK, UAE, Saudi Arabia, USA and Canada.',
    "Karachi is where Pakistan's sea cargo leaves the country, so from here your boxes skip the trip down-country that shipments from Lahore or Peshawar make to reach the port. Searches for cargo services in Karachi often bring up domestic couriers; we only ship abroad, by sea from Rs 600 a kilo and by air from Rs 1,350.",
  ],
  glance: [
    ['Call or WhatsApp', `[${PHONE}](${WHATSAPP_URL})`],
    ['Home pickup', 'Anywhere in Karachi'],
    ['Sea cargo', 'From Rs 600 a kilo, 70–100 kg minimum, shared or full container'],
    ['Air cargo', 'From Rs 1,350 a kilo, 20 kg minimum'],
    ['Prices', 'Written per-kilo rate before pickup'],
  ],
  sections: [
    {
      id: 'rates',
      title: 'Cargo services in Karachi: prices per kg',
      blocks: [
        {
          type: 'table',
          head: ['Destination', 'Sea, per kg', '200 kg by sea', 'Sea, door to door', 'Air, per kg', 'Air, door to door'],
          rows: [
            ['UAE', 'Rs 600–700', 'Rs 120,000–140,000', '1.5–2.5 months', 'Rs 1,350–1,450', '3–4 days'],
            ['England and Wales', 'Rs 950–1,000', 'Rs 190,000–200,000', '1.5–2.5 months', 'Rs 1,750–1,850', '10–12 days'],
            ['Saudi Arabia', 'Rs 950–1,000', 'Rs 190,000–200,000', '1.5–2.5 months', 'Rs 2,150–2,250', '10–20 days'],
            ['Scotland', 'Rs 1,250', 'Rs 250,000', '1.5–2.5 months', 'Rs 2,350', '10–15 days'],
            ['USA', 'Rs 1,550–1,650', 'Rs 310,000–330,000', '2–2.5 months', 'Rs 2,750–2,950', '10–15 days'],
            ['Canada', 'Rs 1,750–1,850', 'Rs 350,000–370,000', '2–3 months', 'Rs 2,850–2,950', '10–15 days'],
          ],
        },
        {
          type: 'p',
          text: `Rates as of ${RATES_UPDATED}. The table is sorted from the cheapest sea route to the dearest. Australia and Europe are on our [cargo rates page](/cargo-services).`,
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Karachi: shared or full container?',
      blocks: [
        {
          type: 'p',
          text: 'Sea cargo starts at 70–100 kg and costs roughly 40–55% less than air, depending on the country. There are two ways to send it.',
        },
        {
          type: 'table',
          head: ['', 'Shared container (LCL)', 'Your own container (FCL)'],
          rows: [
            ['How it works', "Your boxes share a container with other customers' cargo", 'A 20 ft or 40 ft container carries only your goods'],
            ['You pay', 'Per kilo, from the table above', 'One price per container, quoted for you'],
            ['Space', 'As much as you send', 'About 33 cubic metres (20 ft) or 67 (40 ft)'],
            ['Best for', 'A few boxes up to a small household', 'A full house move or a large business order'],
          ],
        },
        {
          type: 'p',
          text: `As a rough guide, a 20 ft container takes the furniture and boxes of a one- or two-bedroom home, and a 40 ft container three or four bedrooms. Send us a room-by-room list or a short video on [WhatsApp](${WHATSAPP_URL}) and we will tell you which one you need.`,
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo services in Karachi',
      blocks: [
        {
          type: 'p',
          text: 'Air is the choice when it has to arrive within about two weeks: 10–12 days to the UK, 10–15 to the USA and Canada, 3–4 to the UAE and 10–20 to Saudi Arabia, door to door. It starts at 20 kg.',
        },
        {
          type: 'p',
          text: 'Air cargo is billed on actual weight or size weight, whichever is higher. Size weight is length × width × height in cm divided by 6,000, so a 50 × 50 × 40 cm box is billed as at least 16.7 kg however light it is. Ask us before you buy boxes, and we will suggest sizes that suit your load.',
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Home pickup anywhere in Karachi',
      blocks: [
        { type: 'p', text: 'We collect from homes, offices, shops and warehouses across the city, including:' },
        {
          type: 'list',
          items: [
            'Clifton, DHA and Defence View',
            'PECHS, Bahadurabad, Tariq Road and Saddar',
            'Gulshan-e-Iqbal, Gulistan-e-Johar and Scheme 33',
            'North Nazimabad, Nazimabad and Federal B Area',
            'Malir, Korangi, Landhi and SITE',
            'Bahria Town Karachi',
          ],
        },
        { type: 'p', text: `Not sure we cover your street? Ask on [WhatsApp](${WHATSAPP_URL}).` },
      ],
    },
    {
      id: 'businesses',
      title: 'Shipping and freight services in Karachi for businesses',
      blocks: [
        {
          type: 'p',
          text: 'Small businesses use our shipping services in Karachi to send stock to buyers and branches abroad: garments for a boutique in Dubai, leather goods for an online shop in the UK, spare parts for a workshop in Jeddah.',
        },
        {
          type: 'p',
          text: 'Goods for sale travel as [commercial cargo](/services/commercial-cargo) with a commercial invoice and a packing list, and the receiver clears them in their own name. Larger orders can go as a full container. For freight services in Karachi beyond this, such as regular factory exports, ask us what we can handle before you book.',
        },
      ],
    },
    {
      id: 'packing',
      title: 'Packing and crating',
      blocks: [
        {
          type: 'p',
          text: 'Boxes are packed in double-wall cartons, sealed and labelled before they leave your address. Fragile pieces are wrapped one by one, and furniture or marble goes in a wooden crate made from ISPM 15 heat-treated wood, which the UK, USA and Canada require. See the [packing guide](/guides/packing-cargo-guide).',
        },
        {
          type: 'p',
          text: 'We do not carry food, liquids, perfumes, aerosols, lithium batteries, or anything flammable or hazardous. Ask before sending medicines or electronics.',
        },
      ],
    },
    {
      id: 'destinations',
      title: 'Where we ship from Karachi',
      blocks: [
        { type: 'h3', text: 'Cargo from Karachi to UK' },
        {
          type: 'p',
          text: 'By sea from Rs 950 a kilo, by air from Rs 1,750, to London, Birmingham, Manchester and the rest of the UK. Full details on [cargo from Karachi to UK](/routes/karachi-to-uk).',
        },
        { type: 'h3', text: 'Cargo from Karachi to Dubai' },
        {
          type: 'p',
          text: 'The UAE is our cheapest destination: Rs 600–700 a kilo by sea and Rs 1,350–1,450 by air, the same price for Dubai, Abu Dhabi, Sharjah and the other emirates. See [cargo to Dubai](/destinations/uae/dubai).',
        },
        { type: 'h3', text: 'Cargo from Karachi to Jeddah' },
        {
          type: 'p',
          text: 'Saudi Arabia costs Rs 2,150–2,250 a kilo by air (10–20 days) and Rs 950–1,000 by sea. We deliver to Jeddah and the rest of the country; see [cargo to Saudi Arabia](/destinations/ksa).',
        },
        { type: 'h3', text: 'Cargo from Karachi to USA' },
        {
          type: 'p',
          text: 'Rs 2,750–2,950 a kilo by air in 10–15 days, or Rs 1,550–1,650 by sea in 2–2.5 months, to any state. The US no longer exempts low-value shipments from duty, so ask us what your receiver may pay. See [cargo to the USA](/destinations/usa).',
        },
        { type: 'h3', text: 'Cargo from Karachi to Canada' },
        {
          type: 'p',
          text: 'Rs 2,850–2,950 a kilo by air or Rs 1,750–1,850 by sea, to any province. See [cargo to Canada](/destinations/canada).',
        },
      ],
    },
    {
      id: 'choosing',
      title: 'Cargo companies in Karachi: how to compare quotes',
      blocks: [
        {
          type: 'p',
          text: 'Karachi is full of cargo companies, and their quotes are hard to compare. Line them up on the same five points:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'The rate per kilo, in writing, for your destination.',
            'Whether that rate is door to door or stops at a port or airport.',
            'How they calculate size weight (we divide by 6,000).',
            'Who pays customs charges in the destination country.',
            'Whether you get a tracking number.',
          ],
        },
        { type: 'p', text: 'A quote that leaves out point 2 or 4 is usually cheaper on paper than it turns out to be.' },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Karachi: contact number',
      blocks: [
        {
          type: 'p',
          text: `Our Karachi cargo contact number is **[${PHONE}](${WHATSAPP_URL})**, for calls and WhatsApp. Send your destination, what you are shipping and a rough weight, and we reply with a written price.`,
        },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Karachi',
  faqs: [
    {
      question: 'How much do cargo services in Karachi cost?',
      answer:
        'By sea, from Rs 600 a kilo to the UAE up to Rs 1,750–1,850 to Canada. By air, from Rs 1,350–1,450 a kilo to the UAE up to Rs 2,850–2,950 to Canada.',
    },
    {
      question: 'Where can I find cheap cargo services in Karachi?',
      answer:
        'The lowest per-kilo price is sea cargo to the UAE, from Rs 600, for 70–100 kg or more. For the UK, sea costs Rs 950–1,000 a kilo against Rs 1,750–1,850 by air.',
    },
    {
      question: 'Which are the best cargo services in Karachi?',
      answer:
        'Ones that give a written door-to-door rate, explain size weight, say who pays duty abroad and give you a tracking number. Use the [five points above](#choosing) to compare.',
    },
    {
      question: 'Should I choose a shared container or a full container?',
      answer:
        'A shared container suits anything up to a small household. Once you are filling most of a 20 ft container, ask us to price it both ways: your own container can work out cheaper.',
    },
    {
      question: 'Are you a courier service in Karachi?',
      answer:
        'No. Courier services in Karachi suit documents and small parcels. We ship international cargo from 20 kg by air and 70–100 kg by sea.',
    },
    {
      question: 'How long does cargo from Karachi take?',
      answer: 'By air, 3–4 days to the UAE and 10–20 days elsewhere, depending on the country. By sea, 1.5–3 months.',
    },
    { question: 'Can I send food from Karachi?', answer: 'No. We do not carry food, liquids or perfumes.' },
  ],
  closing: `For international cargo services in Karachi, send your list on [WhatsApp ${PHONE}](${WHATSAPP_URL}) or use the [quote form](${QUOTE_URL}), and we will come to you.`,
  breadcrumbs: cityBreadcrumbs(KARACHI),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Karachi. Please guide me.',
};

const UK_QUOTE_URL = `${QUOTE_URL}&destination=uk`;
const UK_WHATSAPP_URL = contentWhatsappLink('Karachi', 'UK');

const KARACHI_TO_UK: LandingPage = {
  origin: KARACHI,
  path: '/routes/karachi-to-uk',
  linkLabel: 'Cargo from Karachi to UK',
  seoTitle: 'Cargo from Karachi to UK | Sea from Rs 950/kg | Raahi',
  seoDescription:
    'Cargo from Karachi to UK, door to door: sea Rs 950–1,000/kg in 1.5–2.5 months, air Rs 1,750–1,850/kg in 10–12 days. Home pickup across Karachi.',
  h1: 'Cargo from Karachi to UK: Sea and Air, Door to Door',
  intro: [
    'Cargo from Karachi to UK starts with an advantage: the port is in your own city. Anything over 70–100 kg can go by sea at Rs 950–1,000 a kilo, a little over half the air price, and we collect it from your door in Karachi and deliver it to a door in England, Wales or Scotland.',
    'Our cargo service from Karachi to UK also runs by air, at Rs 1,750–1,850 a kilo in 10–12 days, for smaller loads and anything with a date to meet.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Karachi to UK cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Sea', 'Air'],
          rows: [
            ['England and Wales', 'Rs 950–1,000/kg', 'Rs 1,750–1,850/kg'],
            ['Scotland', 'Rs 1,250/kg', 'Rs 2,350/kg'],
            ['From', '70–100 kg', '20 kg'],
            ['Karachi door to UK door', '1.5–2.5 months', '10–12 days (Scotland 10–15)'],
          ],
        },
        { type: 'p', text: `Rates as of ${RATES_UPDATED}. Northern Ireland is priced on request.` },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Karachi to UK',
      blocks: [
        {
          type: 'p',
          text: 'Sea is how most household goods travel: furniture, kitchenware, books, bedding and winter clothes that do not need to arrive this month. Typical costs:',
        },
        {
          type: 'list',
          items: [
            '**100 kg**, a few large boxes: Rs 95,000–100,000 (by air it would be Rs 175,000–185,000)',
            "**250 kg**, a small flat's contents: Rs 237,500–250,000",
            '**A whole house**: a 20 ft or 40 ft container, quoted for you',
          ],
        },
        {
          type: 'p',
          text: `The 1.5–2.5 months covers everything: pickup and packing in Karachi, export clearance at the port, the voyage, UK customs and the last leg to the door. Loads under a full container share space with other customers' cargo, and you pay only for your own kilos. Our [Karachi page](${KARACHI.cityPath}#sea-cargo) explains shared and full containers in more detail.`,
        },
      ],
    },
    {
      id: 'moving',
      title: 'Moving to the UK from Karachi',
      blocks: [
        {
          type: 'p',
          text: 'If you are relocating, your own used belongings may come into the UK free of duty and VAT under Transfer of Residence relief. The conditions: you have lived outside the UK for at least 12 months, and you have owned and used the goods for at least 6. You apply to HMRC on form ToR01 before you ship ([gov.uk](https://www.gov.uk/guidance/application-for-transfer-of-residence-relief-tor1)).',
        },
        {
          type: 'p',
          text: 'Book the sea shipment before you fly, so it lands a few weeks after you do. Make a list of every box and what is in it: you need it for the ToR01 form, and we need it for export.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Karachi to UK',
      blocks: [
        {
          type: 'p',
          text: "Air suits loads under 70 kg and anything with a deadline, such as wedding clothes, a student's things before term, or gifts for Eid. It takes 10–12 days door to door, or 10–15 to Scotland.",
        },
        {
          type: 'list',
          items: ['**20 kg**: Rs 35,000–37,000', '**40 kg**: Rs 70,000–74,000', '**30 kg to Glasgow**: Rs 70,500'],
        },
        {
          type: 'p',
          text: 'Every box is charged on its real weight or its size weight (length × width × height in cm ÷ 6,000), whichever is higher, so pack tightly.',
        },
      ],
    },
    {
      id: 'courier-charges',
      title: 'Karachi to London courier charges, compared with cargo',
      blocks: [
        {
          type: 'p',
          text: "A courier is the faster option and the right one for documents and parcels of a few kilos. Once you reach 20 kg, compare the courier's quote with ours: 20 kg to London by air cargo is Rs 35,000–37,000, door to door, in 10–12 days. Over 70–100 kg, sea cargo at Rs 950–1,000 a kilo is cheaper still.",
        },
      ],
    },
    {
      id: 'london',
      title: 'Cargo from Karachi to London and the rest of the UK',
      blocks: [
        {
          type: 'p',
          text: 'London costs the same as any other address in England. We deliver to every borough, from Tooting and Croydon to Walthamstow, Harrow and Hounslow, and to Birmingham, Manchester, Bradford, Leicester and every other town. Scotland has its own rate; see the table above. More on [cargo to London](/destinations/uk/london).',
        },
      ],
    },
    {
      id: 'customs',
      title: 'What the receiver may pay in the UK',
      blocks: [
        {
          type: 'p',
          text: 'The UK decides charges on arrival, based on what the goods are and why they are sent ([gov.uk](https://www.gov.uk/goods-sent-from-abroad/tax-and-duty)):',
        },
        {
          type: 'list',
          items: [
            'Gifts worth £39 or less come in without VAT; above that, VAT is due.',
            'Goods worth more than £135 can be charged customs duty as well.',
            'Business stock pays duty and VAT on the invoice value, and the receiver needs an EORI number.',
            'Your own belongings, when you move: see [Transfer of Residence above](#moving).',
          ],
        },
        {
          type: 'p',
          text: 'Food, liquids, perfumes, aerosols, lithium batteries and flammable or hazardous goods cannot go in the shipment.',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'Booking cargo from Karachi to UK',
      blocks: [
        {
          type: 'p',
          text: `Message [WhatsApp ${PHONE}](${UK_WHATSAPP_URL}) or use the [quote form](${UK_QUOTE_URL}) with what you are sending, a rough weight and the UK postcode. We reply with the rate, the total and a delivery window, collect from your Karachi address, and give you a number for our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Karachi to UK cargo: your questions',
  faqs: [
    {
      question: 'How much is cargo from Karachi to UK per kg?',
      answer:
        'Rs 950–1,000 by sea and Rs 1,750–1,850 by air, for England and Wales. Scotland is Rs 1,250 by sea and Rs 2,350 by air.',
    },
    {
      question: 'How long does cargo take from Karachi to UK?',
      answer: '1.5–2.5 months by sea and 10–12 days by air (10–15 to Scotland), from pickup to delivery.',
    },
    {
      question: 'What are Karachi to London courier charges compared with cargo?',
      answer:
        "For 20 kg, our air cargo price to London is Rs 35,000–37,000. Get the courier's price for the same weight and compare; under 20 kg, a courier is usually the better choice.",
    },
    {
      question: 'Is cargo from Karachi cheaper than from Lahore or Islamabad?',
      answer: 'No. Our rates are the same from every city. From Karachi, sea shipments simply do not need the journey to the port.',
    },
    {
      question: 'Can I send a full container from Karachi to the UK?',
      answer: 'Yes. A 20 ft or 40 ft container is priced on its own; send us a list of what is going and we will quote.',
    },
    { question: 'Can I send food from Karachi to the UK?', answer: 'No. Food of any kind is excluded.' },
  ],
  closing: `Ready to book cargo from Karachi to UK? Send the weight and postcode on [WhatsApp ${PHONE}](${UK_WHATSAPP_URL}). Our Karachi pickup areas are on the [international cargo services in Karachi](${KARACHI.cityPath}) page.`,
  breadcrumbs: routeBreadcrumbs(KARACHI, 'Karachi to UK', '/routes/karachi-to-uk'),
  quoteUrl: UK_QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Karachi to the UK. Please give me a quote.',
  service: {
    name: 'Cargo from Karachi to UK',
    areaServed: { code: 'GB', name: 'United Kingdom' },
    airRate: [1750, 1850],
    seaRate: [950, 1000],
  },
  countrySlug: 'uk',
  cityLinkLabels: { london: 'Karachi to London cargo' },
};

export const KARACHI_LANDING: CityLanding = {
  cityPage: KARACHI_CITY_PAGE,
  routes: { 'karachi-to-uk': KARACHI_TO_UK },
  relatedLinks: DESTINATION_LINKS.filter((link) => link.href !== '/destinations/uk'),
};
