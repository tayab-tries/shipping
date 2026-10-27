/**
 * Canada country page (copy from "Raahi Destination Pages – Final Copy"). Values the copy left as [PLACEHOLDERS]
 * (what the rate includes, packing charges) are omitted; no airports or ports are named.
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

const QUOTE_URL = '/quote?destination=canada';
const WHATSAPP_URL = destinationWhatsappLink('Canada');

export const CANADA_COUNTRY_PAGE: CountryLanding = {
  slug: 'canada',
  name: 'Canada',
  region: 'North America',
  path: '/destinations/canada',
  seoTitle: 'Cargo to Canada from Pakistan | Air & Sea Rates per kg | Raahi',
  seoDescription:
    'Cargo to Canada from Pakistan: air Rs 2,850–2,950/kg in 10–15 days, sea Rs 1,750–1,850/kg in 2–3 months. Home pickup in 8 cities, delivery to any province.',
  h1: 'Cargo to Canada from Pakistan: Prices, Timings and How to Send',
  intro: [
    "Cargo to Canada from Pakistan, picked up at your door in eight Pakistani cities and delivered to the receiver's door in any province: Ontario, British Columbia, Alberta, Quebec and the rest.",
    'Shipping to Canada from Pakistan costs Rs 2,850–2,950 a kilo by air or Rs 1,750–1,850 a kilo by sea, the same from every city we collect in. Your price is confirmed in writing before pickup.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Pakistan to Canada cargo price per kg',
      blocks: [
        {
          type: 'table',
          head: ['Weight', 'By air', 'By sea'],
          rows: [
            ['Per kg', 'Rs 2,850–2,950', 'Rs 1,750–1,850'],
            ['20 kg', 'Rs 57,000–59,000', 'Below the sea minimum'],
            ['50 kg', 'Rs 142,500–147,500', 'Below the sea minimum'],
            ['100 kg', 'Rs 285,000–295,000', 'Rs 175,000–185,000'],
            ['200 kg', 'Rs 570,000–590,000', 'Rs 350,000–370,000'],
          ],
        },
        {
          type: 'p',
          text: `These are our cargo rates from Pakistan to Canada, as of ${RATES_UPDATED}. The sea minimum is 70–100 kg.`,
        },
      ],
    },
    {
      id: 'transit-time',
      title: 'Pakistan to Canada shipping time',
      blocks: [
        {
          type: 'table',
          head: ['', 'Door to door', 'Allow for'],
          rows: [
            ['Air cargo', '10–15 days', 'A day or two before departure for pickup, packing and export clearance'],
            [
              'Sea cargo',
              '2–3 months',
              'Transfer to Karachi port, the ocean crossing, Canadian customs and the final delivery',
            ],
          ],
        },
        {
          type: 'p',
          text: "The cargo ship itself is only part of the sea time; the 2–3 months is counted from your door in Pakistan to the receiver's door in Canada.",
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Pakistan to Canada sea cargo: the cheapest way to ship',
      blocks: [
        {
          type: 'p',
          text: 'Once you have 70–100 kg, sea cargo is the cheapest option, at roughly 38% less than air. On 200 kg the saving is about Rs 200,000–240,000. It suits anything that can wait 2–3 months: a household, furniture, kitchenware, books. Loads up to a small household share a container; a whole house can have a 20 ft or 40 ft container to itself.',
        },
      ],
    },
    {
      id: 'charges',
      title: 'Pakistan to Canada shipping charges: who pays what',
      blocks: [
        {
          type: 'list',
          items: [
            'You pay the per-kg rate before pickup, on actual weight or size weight (length × width × height in cm ÷ 6,000), whichever is higher. Packing is extra if you want it.',
            'The receiver may pay Canadian duty and GST/HST, depending on the goods and their value. A gift worth CAD $60 or less, sent with a note saying it is a gift, comes in free of both ([CBSA](https://cbsa-asfc.gc.ca/import/courier/lvs-efv/prsn-eng.html)).',
            "New permanent residents can usually bring their own used household goods in duty-free as settlers' effects, if they list them when they land. Our [Islamabad to Canada](/routes/islamabad-to-canada) page walks through it.",
          ],
        },
      ],
    },
    {
      id: 'clothes',
      title: 'How to send clothes from Pakistan to Canada',
      blocks: [
        {
          type: 'p',
          text: 'Gifts of clothing go as personal cargo; mark each one as a gift, and each gift worth CAD $60 or less comes in free. Stock for a boutique or online shop goes as [commercial cargo](/services/commercial-cargo) with an invoice, and the CAD $60 allowance does not apply. Winter wear is bulky, so vacuum-pack coats and quilts, or put them in a sea shipment. The [Lahore to Canada](/routes/lahore-to-canada) page has more on winter clothes and student luggage.',
        },
      ],
    },
    {
      id: 'pickup-cities',
      title: 'From eight Pakistani cities to every province',
      blocks: [
        {
          type: 'p',
          text: `We collect in ${originCityLinks(ALL_ORIGIN_KEYS)}, and deliver to Toronto, Mississauga, Brampton, Ottawa, Montreal, Calgary, Edmonton, Vancouver, Surrey, Winnipeg and everywhere else in Canada. See [cargo to Toronto](/destinations/canada/toronto) and [cargo to Vancouver](/destinations/canada/vancouver).`,
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to Canada',
      blocks: [
        {
          type: 'list',
          items: [
            '**Yes:** clothes, shoes, bedding, books, kitchenware, household goods, personal belongings, and commercial goods with an invoice.',
            '**No:** food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous.',
            '**Ask first:** medicines and electronics.',
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
          text: `Send your city, the Canadian postal code, what you are sending and a rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}), or use the [quote form](${QUOTE_URL}). We send a written price, collect and pack, and you track the shipment on our [tracking page](/track).`,
        },
      ],
    },
  ],
  faqTitle: 'Cargo to Canada from Pakistan: questions',
  faqs: [
    { question: 'What is the Pakistan to Canada cargo price per kg?', answer: 'Rs 2,850–2,950 by air and Rs 1,750–1,850 by sea.' },
    { question: 'What is the Pakistan to Canada shipping time?', answer: '10–15 days by air and 2–3 months by sea, door to door.' },
    {
      question: 'How long does a cargo ship take from Pakistan to Canada?',
      answer: 'Allow 2–3 months for sea cargo from pickup in Pakistan to delivery in Canada.',
    },
    { question: 'What is the cheapest cargo from Pakistan to Canada?', answer: 'Sea cargo, from 70–100 kg, at Rs 1,750–1,850 a kilo.' },
    {
      question: 'Can I send a small parcel from Pakistan to Canada?',
      answer: 'Not with us. Our smallest shipment is 20 kg; for a few kilos, use a courier.',
    },
  ],
  closing: `For cargo to Canada from Pakistan, send your city, postal code and rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}) for a written price.`,
  quoteUrl: QUOTE_URL,
  whatsappMessage: destinationWhatsappMessage('Canada'),
  service: {
    name: 'Cargo to Canada from Pakistan',
    areaServed: { code: 'CA', name: 'Canada' },
    offerTarget: 'Canada',
    airRate: [2850, 2950],
    seaRate: [1750, 1850],
  },
};
