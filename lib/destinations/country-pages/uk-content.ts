/**
 * UK country page (copy from "Raahi Destination Pages – Final Copy"). Replaces the shared destination template.
 * Values the copy left as [PLACEHOLDERS] (what the rate includes) are omitted; no airports or ports are named
 * until the client confirms them.
 */

import {
  CountryLanding,
  destinationWhatsappLink,
  destinationWhatsappMessage,
  ORIGIN_CITY_PATHS,
  originCityLinks,
  PHONE,
  RATES_UPDATED,
} from '@/lib/routes/shared';

const QUOTE_URL = '/quote?destination=uk';
const WHATSAPP_URL = destinationWhatsappLink('the UK');

export const UK_COUNTRY_PAGE: CountryLanding = {
  slug: 'uk',
  name: 'United Kingdom',
  region: 'Europe',
  path: '/destinations/uk',
  seoTitle: 'Cargo to UK from Pakistan | Door to Door, Air & Sea | Raahi',
  seoDescription:
    'Cargo to UK from Pakistan, door to door: air Rs 1,750–1,850/kg in 10–12 days, sea Rs 950–1,000/kg. Pickup in 8 Pakistani cities, delivery anywhere in the UK.',
  h1: 'Cargo to UK from Pakistan: Door-to-Door Air and Sea',
  intro: [
    "Cargo to UK from Pakistan, collected from your door in any of eight Pakistani cities and delivered to the receiver's door anywhere in England, Wales or Scotland.",
    'Shipping to the UK from Pakistan with us costs Rs 1,750–1,850 a kilo by air or Rs 950–1,000 a kilo by sea, at the same rate whichever city you send from. You get the price in writing before we collect anything.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Pakistan to UK cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['Delivery to', 'Air, per kg', 'Sea, per kg', '20 kg by air', '100 kg by sea'],
          rows: [
            ['England and Wales', 'Rs 1,750–1,850', 'Rs 950–1,000', 'Rs 35,000–37,000', 'Rs 95,000–100,000'],
            ['Scotland', 'Rs 2,350', 'Rs 1,250', 'Rs 47,000', 'Rs 125,000'],
            ['Northern Ireland', 'On request', 'On request', '', ''],
          ],
        },
        {
          type: 'p',
          text: `These are our cargo from Pakistan to UK costs per kg in rupees, as of ${RATES_UPDATED}. Air starts at 20 kg and sea at 70–100 kg.`,
        },
      ],
    },
    {
      id: 'transit-time',
      title: 'How long does cargo take from Pakistan to the UK?',
      blocks: [
        { type: 'p', text: "One answer, from pickup in Pakistan to the receiver's door:" },
        {
          type: 'table',
          head: ['', 'England and Wales', 'Scotland'],
          rows: [
            ['Air cargo', '10–12 days', '10–15 days'],
            ['Sea cargo', '1.5–2.5 months', '1.5–2.5 months'],
          ],
        },
        {
          type: 'p',
          text: 'Add a day or two before departure for pickup, packing and export clearance. If something has to arrive by a fixed date, such as a wedding or the start of term, book air cargo at least three weeks ahead.',
        },
      ],
    },
    {
      id: 'air-or-sea',
      title: 'Pakistan to UK cargo by air or by sea?',
      blocks: [
        {
          type: 'p',
          text: "Air is for anything under 70 kg, or anything with a date: clothes, gifts, a student's luggage. It is charged on actual weight or size weight (length × width × height in cm ÷ 6,000), whichever is higher.",
        },
        {
          type: 'p',
          text: 'Sea is for 70–100 kg and up: furniture, kitchenware, a household. It costs a little over half the air rate. Smaller loads share a container; a whole house can have a 20 ft or 40 ft container of its own. Every sea shipment leaves Pakistan from Karachi port, whichever city it starts in.',
        },
        {
          type: 'p',
          text: 'A rough rule: under 70 kg or in a hurry, air; over 100 kg and able to wait two months, sea.',
        },
      ],
    },
    {
      id: 'pickup-cities',
      title: 'Door-to-door cargo to the UK from eight cities',
      blocks: [
        { type: 'p', text: 'We collect from homes, shops and offices in these cities, and the UK rate is the same from all of them:' },
        {
          type: 'list',
          items: [
            '[Lahore to UK](/routes/lahore-to-uk) and [Islamabad or Rawalpindi to UK](/routes/islamabad-to-uk), each with its own route page',
            '[Karachi to UK](/routes/karachi-to-uk), where sea cargo starts at the port itself',
            originCityLinks(['faisalabad', 'multan', 'peshawar', 'sialkot']),
          ],
        },
        {
          type: 'p',
          text: `Our walk-in office is in [Rawalpindi](${ORIGIN_CITY_PATHS.rawalpindi}), on Old Airport Road.`,
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Where we deliver in the UK',
      blocks: [
        {
          type: 'p',
          text: 'Every postcode in England, Wales and Scotland, including [London](/destinations/uk/london), [Birmingham](/destinations/uk/birmingham), [Manchester](/destinations/uk/manchester), Bradford, Leeds, Luton, Slough, Leicester and Glasgow. England and Wales are one price; Scotland has its own rate.',
        },
      ],
    },
    {
      id: 'import-duty',
      title: 'Import duty in the UK on cargo from Pakistan',
      blocks: [
        {
          type: 'p',
          text: 'The receiver may pay UK charges when the goods arrive. What they pay depends on what the goods are, what they are worth and why they are being sent ([gov.uk](https://www.gov.uk/goods-sent-from-abroad/tax-and-duty)).',
        },
        {
          type: 'table',
          head: ['What you send', 'UK import tax and duty'],
          rows: [
            ['A gift worth £39 or less', 'Nothing'],
            ['A gift worth more than £39', 'VAT'],
            ['Anything worth more than £135', 'VAT, plus customs duty depending on the goods'],
            ['Stock for a UK business', 'Duty and VAT on the invoice value; the receiver needs an EORI number'],
            [
              'Your own belongings when you move to the UK',
              'Often nothing, under Transfer of Residence relief, if you have lived abroad for 12 months, owned the goods for 6, and applied on form ToR01 before shipping ([gov.uk](https://www.gov.uk/guidance/application-for-transfer-of-residence-relief-tor1))',
            ],
          ],
        },
        { type: 'p', text: 'Declare the real contents and value; under-declared boxes are held and can be fined.' },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to the UK',
      blocks: [
        {
          type: 'list',
          items: [
            '**Yes:** clothes (stitched, unstitched, bridal), shoes, bedding, books, kitchenware, household goods, personal belongings, and [commercial goods](/services/commercial-cargo) with an invoice.',
            '**No:** food (including mithai, spices and pickles), liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous.',
            '**Ask first:** medicines and electronics.',
          ],
        },
      ],
    },
    {
      id: 'how-to-book',
      title: 'How to book',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `Message [WhatsApp ${PHONE}](${WHATSAPP_URL}) or use the [quote form](${QUOTE_URL}): your city, the UK postcode, what you are sending and a rough weight.`,
            'You get the rate, the total and the delivery time in writing.',
            'We collect, weigh, pack and clear export customs.',
            'You follow it on our [tracking page](/track) until it is signed for in the UK.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Cargo to UK from Pakistan: questions',
  faqs: [
    {
      question: 'How much does cargo cost from Pakistan to the UK?',
      answer: 'Rs 1,750–1,850 per kg by air and Rs 950–1,000 per kg by sea, to England and Wales. 20 kg by air is Rs 35,000–37,000.',
    },
    {
      question: 'How long does cargo take from Pakistan to the UK?',
      answer: '10–12 days by air (10–15 to Scotland) and 1.5–2.5 months by sea, door to door.',
    },
    {
      question: 'What is the cheapest way to ship to the UK?',
      answer: 'Sea cargo, once you have 70–100 kg. Below that, air cargo is the only cargo option, from Rs 1,750 a kilo.',
    },
    {
      question: 'Can I send a small parcel, or 1 kg, from Pakistan to the UK?',
      answer: 'Not with us: our smallest shipment is 20 kg. For a few kilos, a courier is the right choice.',
    },
    {
      question: 'Is the price different from Karachi, Lahore or Islamabad?',
      answer: 'No. The UK rate is the same from all eight cities we collect from.',
    },
    {
      question: 'Will the person receiving it pay anything?',
      answer: 'Not on a gift worth £39 or less. Above that VAT is due, and duty can apply on goods worth more than £135.',
    },
  ],
  closing: `For cargo to UK from Pakistan, send your city, postcode and rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}) for a written price.`,
  quoteUrl: QUOTE_URL,
  whatsappMessage: destinationWhatsappMessage('the UK'),
  service: {
    name: 'Cargo to UK from Pakistan',
    areaServed: { code: 'GB', name: 'United Kingdom' },
    offerTarget: 'the UK',
    airRate: [1750, 1850],
    seaRate: [950, 1000],
  },
};
