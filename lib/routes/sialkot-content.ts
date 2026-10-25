/**
 * Sialkot city page (copy from "Raahi City Pages – Final Copy"). Written for small exporters as well as
 * families. No Sialkot office: pickup only.
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, reviews) are omitted.
 */

import { CityLanding, cityBreadcrumbs, contentWhatsappLink, DESTINATION_LINKS, LandingPage, OriginCity, PHONE, RATES_UPDATED } from './shared';

const SIALKOT: OriginCity = {
  key: 'sialkot',
  name: 'Sialkot',
  province: 'Punjab',
  cityPath: '/locations/international-cargo-services-in-sialkot',
};

const QUOTE_URL = '/quote?origin=sialkot';
const WHATSAPP_URL = contentWhatsappLink('Sialkot');

const SIALKOT_CITY_PAGE: LandingPage = {
  origin: SIALKOT,
  path: SIALKOT.cityPath,
  linkLabel: 'Cargo services in Sialkot',
  seoTitle: 'Cargo Services in Sialkot: Air & Sea, Door to Door | Raahi',
  seoDescription:
    'Cargo services in Sialkot for families and exporters: samples, stock and personal boxes to the UK, USA, Canada, Dubai and Saudi Arabia. Air from Rs 1,350/kg.',
  h1: 'International Cargo Services in Sialkot for Exporters and Families',
  intro: [
    'Raahi International provides cargo services in Sialkot for two kinds of customer: exporters sending samples and small orders to buyers abroad, and families sending clothes, gifts and household goods to relatives.',
    'Our international cargo services in Sialkot include pickup from your factory, workshop or home and delivery to the door in the UK, USA, Canada, UAE and Saudi Arabia. Air cargo starts at 20 kg, sea cargo at 70–100 kg.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Sialkot cargo rates per kg',
      blocks: [
        {
          type: 'p',
          text: 'The 60 kg column is a typical small export order or a large sample run by air; the 300 kg column is a pallet-sized load by sea.',
        },
        {
          type: 'table',
          head: ['Destination', 'Air per kg', '60 kg by air', 'Sea per kg', '300 kg by sea'],
          rows: [
            ['UK (England and Wales)', 'Rs 1,750–1,850', 'Rs 105,000–111,000', 'Rs 950–1,000', 'Rs 285,000–300,000'],
            ['UK (Scotland)', 'Rs 2,350', 'Rs 141,000', 'Rs 1,250', 'Rs 375,000'],
            ['USA', 'Rs 2,750–2,950', 'Rs 165,000–177,000', 'Rs 1,550–1,650', 'Rs 465,000–495,000'],
            ['Canada', 'Rs 2,850–2,950', 'Rs 171,000–177,000', 'Rs 1,750–1,850', 'Rs 525,000–555,000'],
            ['UAE', 'Rs 1,350–1,450', 'Rs 81,000–87,000', 'Rs 600–700', 'Rs 180,000–210,000'],
            ['Saudi Arabia', 'Rs 2,150–2,250', 'Rs 129,000–135,000', 'Rs 950–1,000', 'Rs 285,000–300,000'],
          ],
        },
        {
          type: 'p',
          text: `Air: 10–12 days to the UK, 10–15 to the USA and Canada, 3–4 to the UAE, 10–20 to Saudi Arabia. Sea: 1.5–3 months. All door to door. Rates as of ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'exports',
      title: 'Samples and small export orders from Sialkot',
      blocks: [
        {
          type: 'p',
          text: "Sialkot's sports goods, gloves, leather wear and instruments sell all over the world, and a lot of that trade starts with a sample box. For a few kilos, a courier is faster. From 20 kg up, air cargo costs much less per kilo, and from 70–100 kg sea cargo cuts the price again.",
        },
        { type: 'p', text: 'For a commercial shipment, have ready:' },
        {
          type: 'list',
          items: [
            'a commercial invoice and a packing list;',
            "the buyer's full name, address, phone number and any import number they use (an EORI number in the UK);",
            'the HS code for each product, if your buyer asks for it.',
          ],
        },
        {
          type: 'p',
          text: 'Two rules to check with your buyer first. The USA no longer exempts small commercial shipments from duty. And medical and surgical instruments can need approvals in the destination country before they are sold, which the importer usually handles. For regular full-container exports, tell us the volumes and we will tell you whether we can take them on. See [commercial cargo](/services/commercial-cargo).',
        },
        { type: 'h3', text: 'Export paperwork, in plain terms' },
        {
          type: 'list',
          items: [
            "**Pakistan side:** every commercial shipment is declared to Pakistan Customs before it leaves. We prepare that declaration from your invoice and packing list. If your bank is handling the buyer's payment, it may ask for its own export paperwork too.",
            "**Buyer's side:** some buyers ask for a certificate of origin, which the local chamber of commerce issues. Ask your buyer before you book, not after the boxes have gone.",
            '**Values:** samples sent free still need a value on the invoice, usually what they cost you to make. A shipment with no value gets held.',
          ],
        },
        { type: 'p', text: 'We tell you what your particular shipment needs when we quote.' },
      ],
    },
    {
      id: 'packing',
      title: 'Packing sports goods, leather and instruments',
      blocks: [
        {
          type: 'list',
          items: [
            '**Balls:** ask the buyer whether they want them inflated. Deflated balls take far less space, which matters when you pay for size.',
            '**Gloves, jackets and other leather:** pack dry, with silica gel, in breathable wrap rather than sealed plastic, so they cannot go mouldy on a long sea journey.',
            '**Instruments and anything with fine edges:** individually wrapped and boxed, with padding on every side.',
            '**Bulk cartons:** stacked on a pallet and stretch-wrapped for sea cargo; any wooden pallet or crate must be ISPM 15 heat-treated for the UK, USA and Canada.',
          ],
        },
        {
          type: 'p',
          text: 'Steel instruments (surgical, dental, beauty and manicure tools) can rust on a long sea journey through humid ports. Pack them dry, in anti-corrosion (VCI) bags, in foam-lined boxes, and add silica gel to every carton. For samples a buyer is waiting on, send by air instead.',
        },
      ],
    },
    {
      id: 'uk-usa',
      title: 'Cargo from Sialkot to UK and USA',
      blocks: [
        {
          type: 'list',
          items: [
            '**UK:** Rs 1,750–1,850 a kilo by air, 10–12 days. Business stock pays UK duty and VAT, and gifts above £39 pay VAT. See [cargo to the UK](/destinations/uk).',
            '**USA:** Rs 2,750–2,950 a kilo by air, 10–15 days. Only genuine gifts of $100 or less still enter duty-free. See [cargo to the USA](/destinations/usa).',
            '**Canada, UAE, Saudi Arabia:** see [cargo to Canada](/destinations/canada), [Dubai](/destinations/uae/dubai) and [Saudi Arabia](/destinations/ksa).',
          ],
        },
        { type: 'h3', text: 'Getting samples to a buyer on time' },
        {
          type: 'p',
          text: "Work back from the buyer's deadline. Air cargo takes 10–12 days to the UK and 10–15 days to the USA and Canada, door to door, plus a day or two for pickup and export clearance in Sialkot. For a UK meeting on the 30th, book by about the 15th. For Europe and other countries, see our [cargo rates page](/cargo-services) or ask us.",
        },
      ],
    },
    {
      id: 'families',
      title: 'For families in Sialkot',
      blocks: [
        {
          type: 'p',
          text: "Not exporting? We carry personal shipments too: wedding clothes, gifts, a student's luggage and household goods. Clothes and gifts usually go by air; a household move goes by sea, through Karachi port, in a shared container or one of your own.",
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup across Sialkot',
      blocks: [
        { type: 'p', text: 'We collect from factories, workshops and homes, including:' },
        {
          type: 'list',
          items: [
            'Cantt, Paris Road and Kashmir Road',
            'Daska Road, Pasrur Road and Defence Road',
            'Model Town, Hajipura and Ugoki',
            'the Small Industries Estate and Sambrial',
          ],
        },
        { type: 'p', text: `Daska, Pasrur or Narowal? Ask us on [WhatsApp](${WHATSAPP_URL}) first.` },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What we accept',
      blocks: [
        {
          type: 'p',
          text: 'Commercial goods with an invoice, sports goods, leather goods, clothes, shoes, bedding, books and household goods. Not accepted: food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous. Ask before sending medicines or electronics.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Sialkot: contact',
      blocks: [
        {
          type: 'p',
          text: `For cargo services in Sialkot, call or WhatsApp **[${PHONE}](${WHATSAPP_URL})** or use the [quote form](${QUOTE_URL}). Send the products, the number of cartons, their sizes and weights, and the destination, and we reply with a written price and a tracking number once booked. We have no Sialkot office; we come to you.`,
        },
      ],
    },
  ],
  faqTitle: 'FAQs about cargo services in Sialkot',
  faqs: [
    {
      question: 'Can I send product samples from Sialkot?',
      answer: 'Yes, from 20 kg by air. Smaller sample packs are better sent by courier.',
    },
    {
      question: 'What documents does a commercial shipment need?',
      answer: "A commercial invoice and packing list, the buyer's details and, if they ask, the HS codes.",
    },
    {
      question: 'How much is cargo from Sialkot to the UK?',
      answer: 'Rs 1,750–1,850 a kilo by air and Rs 950–1,000 by sea, for England and Wales.',
    },
    {
      question: 'Do you collect from factories and the Small Industries Estate?',
      answer: 'Yes, and from Sambrial. For large or regular orders, tell us the volume first.',
    },
    {
      question: 'Do you ship full containers of exports?',
      answer: 'Ask us with your volumes. We quote 20 ft and 40 ft containers, and will tell you plainly if an order is beyond what we handle.',
    },
    {
      question: 'How long does air cargo take from Sialkot to the UK?',
      answer: '10–12 days door to door, plus a day or two for pickup and export clearance.',
    },
    {
      question: 'Do I need a certificate of origin?',
      answer: 'Only if your buyer or their country asks for one. It is issued by the local chamber of commerce.',
    },
    {
      question: 'How do I stop leather and steel goods getting damaged by damp?',
      answer: 'Pack them dry with silica gel; put steel in anti-corrosion bags and leather in breathable wrap, not sealed plastic.',
    },
    {
      question: 'Do samples sent free need a value?',
      answer: 'Yes. Put a realistic value on the invoice, usually the cost of making them, or customs may hold the shipment.',
    },
  ],
  closing: `For cargo services in Sialkot, send your carton list on [WhatsApp ${PHONE}](${WHATSAPP_URL}) for a written price.`,
  breadcrumbs: cityBreadcrumbs(SIALKOT),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send cargo from Sialkot. Please give me a quote.',
};

export const SIALKOT_LANDING: CityLanding = {
  cityPage: SIALKOT_CITY_PAGE,
  routes: {},
  relatedLinks: DESTINATION_LINKS,
};
