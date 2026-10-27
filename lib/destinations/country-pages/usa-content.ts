/**
 * USA country page (copy from "Raahi Destination Pages – Final Copy"). US customs rules change fast: re-check the
 * duty section every three months. Values the copy left as [PLACEHOLDERS] (what the rate includes, packing
 * charges) are omitted; no airports or ports are named.
 */

import {
  CountryLanding,
  destinationWhatsappLink,
  destinationWhatsappMessage,
  originCityLinks,
  ALL_ORIGIN_KEYS,
  PHONE,
  RATES_UPDATED,
} from '@/lib/routes/shared';

const QUOTE_URL = '/quote?destination=usa';
const WHATSAPP_URL = destinationWhatsappLink('the USA');

export const USA_COUNTRY_PAGE: CountryLanding = {
  slug: 'usa',
  name: 'United States',
  region: 'North America',
  path: '/destinations/usa',
  seoTitle: 'Cargo to USA from Pakistan | Air & Sea, Door to Door | Raahi',
  seoDescription:
    'Cargo to USA from Pakistan: air Rs 2,750–2,950/kg in 10–15 days, sea Rs 1,550–1,650/kg. Home pickup in 8 cities, delivery to any US state.',
  h1: 'Cargo to USA from Pakistan: Air and Sea, Door to Door',
  intro: [
    'Cargo to USA from Pakistan, collected from your home in any of eight Pakistani cities and delivered to the door in any US state, from New York and New Jersey to Texas and California.',
    'Our cargo services from Pakistan to the USA run by air at Rs 2,750–2,950 a kilo, arriving in 10–15 days, and by sea at Rs 1,550–1,650 a kilo, arriving in 2–2.5 months. Shipping to the USA from Pakistan costs the same whichever city you send from.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Pakistan to USA cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air', 'Sea'],
          rows: [
            ['Rate per kg, any state', 'Rs 2,750–2,950', 'Rs 1,550–1,650'],
            ['Smallest shipment', '20 kg', '70–100 kg'],
            ['25 kg', 'Rs 68,750–73,750', 'Below the sea minimum'],
            ['120 kg', 'Rs 330,000–354,000', 'Rs 186,000–198,000'],
            ['Pickup to US door', '10–15 days', '2–2.5 months'],
          ],
        },
        { type: 'p', text: `Rates as of ${RATES_UPDATED}.` },
      ],
    },
    {
      id: 'charges',
      title: 'Shipping charges to the USA from Pakistan: what you pay, and what the receiver pays',
      blocks: [
        {
          type: 'table',
          head: ['Charge', 'Who pays', 'How much'],
          rows: [
            ['Cargo, door to door', 'You, before pickup', 'The per-kg rate above, on actual or size weight'],
            ['Packing and crating', 'You, if you want us to pack', 'Quoted before you book'],
            [
              'US import duty',
              'Usually the receiver',
              'Depends on the goods; small shipments are no longer duty-free, except gifts of $100 or less',
            ],
          ],
        },
        {
          type: 'p',
          text: 'The US used to let shipments worth under $800 in without duty. That exemption has been suspended ([Federal Register](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)), so ask us for the likely duty before you send anything that is not a small gift.',
        },
      ],
    },
    {
      id: 'clothes',
      title: 'How to send clothes from Pakistan to the USA',
      blocks: [
        {
          type: 'list',
          items: [
            '**As gifts:** personal cargo. Gifts worth $100 or less to one person still enter duty-free. Write each item and its value on the contents list.',
            '**For sale:** [commercial cargo](/services/commercial-cargo) with an invoice, for a boutique or an online shop. Duty is charged on the value.',
            '**Packing:** fold suits flat into vacuum bags and use the smallest box that fits. At US rates, an oversized box is the most expensive mistake you can make.',
            '**Bridal and embroidered wear:** flat, in a rigid box, with tissue between the layers.',
          ],
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Pakistan to the USA',
      blocks: [
        {
          type: 'p',
          text: 'Sea starts at 70–100 kg and costs about 40–45% less than air. It is the sensible way to send furniture, kitchenware or the bulk of a household when someone moves to the US. Shipments leave from Karachi port and take 2–2.5 months door to door. A whole house can go in its own 20 ft or 40 ft container.',
        },
      ],
    },
    {
      id: 'pickup-cities',
      title: 'Sending from Lahore, Islamabad and six other cities',
      blocks: [
        {
          type: 'p',
          text: `We collect in ${originCityLinks(ALL_ORIGIN_KEYS)}. Two routes have their own pages: [cargo from Lahore to USA](/routes/lahore-to-usa), which covers students and the new duty rules, and [cargo from Islamabad to USA](/routes/islamabad-to-usa), which compares cargo with airline excess baggage.`,
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Where we deliver in the USA',
      blocks: [
        {
          type: 'p',
          text: 'Every state, including New York, New Jersey, Texas, Illinois, Virginia, Maryland and California. See cargo to [New York](/destinations/usa/new-york), [Chicago](/destinations/usa/chicago) and [Houston](/destinations/usa/houston).',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to the USA',
      blocks: [
        {
          type: 'list',
          items: [
            '**Accepted:** clothes, shoes, bedding, books, kitchenware, household goods, personal belongings, and commercial goods with an invoice.',
            '**Not accepted:** food of any kind, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous.',
            '**Check first:** medicines and electronics.',
          ],
        },
      ],
    },
    {
      id: 'booking',
      title: 'Booking',
      blocks: [
        {
          type: 'p',
          text: `Message [WhatsApp ${PHONE}](${WHATSAPP_URL}) or use the [quote form](${QUOTE_URL}) with your city, the US ZIP code, the contents and a rough weight. You get a written quote; we collect, pack and clear export customs; you follow the shipment on our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Cargo to USA from Pakistan: questions',
  faqs: [
    { question: 'What is the cargo price from Pakistan to USA for 20 kg?', answer: 'Rs 55,000–59,000 by air, door to door.' },
    { question: 'How long does cargo take from Pakistan to the USA?', answer: '10–15 days by air and 2–2.5 months by sea.' },
    {
      question: 'Can I send gifts from Pakistan to the USA without duty?',
      answer: 'Yes, if the gifts to one person are worth $100 or less. Above that, duty may apply.',
    },
    {
      question: 'Can I send a parcel of 1 or 2 kg?',
      answer: 'No. Our smallest shipment is 20 kg, so a courier is better for a small parcel.',
    },
    { question: 'Is the price the same from Karachi as from Lahore?', answer: 'Yes. The US rate is the same from all eight cities.' },
  ],
  closing: `For cargo to USA from Pakistan, send your city, ZIP code and rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}) for a written quote.`,
  quoteUrl: QUOTE_URL,
  whatsappMessage: destinationWhatsappMessage('the USA'),
  service: {
    name: 'Cargo to USA from Pakistan',
    areaServed: { code: 'US', name: 'United States' },
    offerTarget: 'the USA',
    airRate: [2750, 2950],
    seaRate: [1550, 1650],
  },
};
