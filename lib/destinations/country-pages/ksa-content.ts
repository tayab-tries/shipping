/**
 * Saudi Arabia country page (copy from "Raahi Destination Pages – Final Copy"). There are no Saudi route pages, so
 * this page carries every Saudi search. Values the copy left as [PLACEHOLDERS] (what the rate includes) are
 * omitted; no airports or ports are named.
 */

import {
  CountryLanding,
  destinationWhatsappLink,
  destinationWhatsappMessage,
  ORIGIN_CITY_PATHS,
  originCityLinks,
  ALL_ORIGIN_KEYS,
  PHONE,
  RATES_UPDATED,
} from '@/lib/routes/shared';

const QUOTE_URL = '/quote?destination=ksa';
const WHATSAPP_URL = destinationWhatsappLink('Saudi Arabia');

export const KSA_COUNTRY_PAGE: CountryLanding = {
  slug: 'ksa',
  name: 'Saudi Arabia',
  region: 'Middle East',
  path: '/destinations/ksa',
  seoTitle: 'Cargo to Saudi Arabia from Pakistan | Rs 2,150/kg | Raahi',
  seoDescription:
    'Cargo to Saudi Arabia from Pakistan, door to door: air Rs 2,150–2,250/kg, sea Rs 950–1,000/kg, to Riyadh, Jeddah, Dammam and other KSA cities. Home pickup.',
  h1: 'Cargo to Saudi Arabia from Pakistan, Door to Door',
  intro: [
    "Cargo to Saudi Arabia from Pakistan, picked up at your home in eight Pakistani cities and delivered to the receiver's door in Riyadh, Jeddah, Dammam and other Saudi cities.",
    'Our Pakistan to KSA cargo service runs by air at Rs 2,150–2,250 a kilo, delivered in 10–20 days, and by sea at Rs 950–1,000 a kilo in 1.5–2.5 months. The price is the same from every city we collect from.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Pakistan to Saudi cargo price per kg',
      blocks: [
        {
          type: 'table',
          head: ['Shipment', 'By air (Rs 2,150–2,250/kg)', 'By sea (Rs 950–1,000/kg)'],
          rows: [
            ['20 kg', 'Rs 43,000–45,000', 'Below the sea minimum'],
            ['40 kg', 'Rs 86,000–90,000', 'Below the sea minimum'],
            ['100 kg', 'Rs 215,000–225,000', 'Rs 95,000–100,000'],
            ['250 kg', 'Rs 537,500–562,500', 'Rs 237,500–250,000'],
          ],
        },
        {
          type: 'p',
          text: `Those are our cargo rates from Pakistan to Saudi Arabia, as of ${RATES_UPDATED}. Air starts at 20 kg and sea at 70–100 kg. On 100 kg, sea saves about Rs 115,000–130,000.`,
        },
      ],
    },
    {
      id: 'how-to-send',
      title: 'How can I cargo from Pakistan to Saudi Arabia?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Check what you are sending.** Clothes, bedding, kitchen items and household goods are fine. Food, perfume and attar, liquids and batteries are not. Medicines need checking first (see below).',
            "**Get the receiver's details.** Full address with district and nearest landmark, a Saudi mobile number, and their Iqama or national ID number in case customs asks for it.",
            `**Message us** on [WhatsApp ${PHONE}](${WHATSAPP_URL}) with your city, the Saudi city and a rough weight. You get a written price.`,
            'We collect and pack at your address, weigh every box and clear Pakistan export customs.',
            'Track it on our [tracking page](/track) until it reaches the door in Saudi Arabia.',
          ],
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Pakistan to Saudi Arabia',
      blocks: [
        {
          type: 'p',
          text: 'Air takes 10–20 days door to door, so it is not the quickest Gulf route: [the UAE](/destinations/uae) is faster. Book early if the boxes need to be there for a date, such as the start of a new job or before Ramadan. Each box is charged on its actual weight or size weight (length × width × height in cm ÷ 6,000), whichever is higher.',
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Ship cargo from Pakistan to Saudi Arabia by sea',
      blocks: [
        {
          type: 'p',
          text: "Sea costs less than half the air rate and suits a family's belongings, furniture, or anything over 100 kg that can wait 1.5–2.5 months. Shipments leave from Karachi port. Smaller loads share a container; a full household can have a 20 ft or 40 ft container of its own.",
        },
      ],
    },
    {
      id: 'customs',
      title: 'Saudi customs: VAT, duty and medicines',
      blocks: [
        {
          type: 'p',
          text: 'Saudi Arabia charges 15% VAT on imports, and customs duty on some goods, depending on what they are and what they are worth. We tell you the likely charges before you book.',
        },
        {
          type: 'p',
          text: 'Medicines are tightly controlled in Saudi Arabia. Some that are sold over the counter in Pakistan, including some painkillers, sleeping tablets and medicines for anxiety, need approval or are banned. Never pack medicine without asking us first.',
        },
        {
          type: 'p',
          text: 'Goods for sale go as [commercial cargo](/services/commercial-cargo) with an invoice, and are cleared by an importer registered in Saudi Arabia.',
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Where we deliver in Saudi Arabia',
      blocks: [
        {
          type: 'p',
          text: 'Riyadh, Jeddah and Dammam, plus other cities on request, all at the same price. See [cargo to Riyadh](/destinations/ksa/riyadh) and [cargo to Jeddah](/destinations/ksa/jeddah).',
        },
        {
          type: 'p',
          text: `We collect in ${originCityLinks(ALL_ORIGIN_KEYS)}. The [Multan](${ORIGIN_CITY_PATHS.multan}) and [Peshawar](${ORIGIN_CITY_PATHS.peshawar}) pages cover sending to family working in Saudi Arabia, and [excess baggage](/services/excess-baggage) covers sending luggage ahead of a flight.`,
        },
      ],
    },
  ],
  faqTitle: 'Cargo to Saudi Arabia from Pakistan: questions',
  faqs: [
    { question: 'What is the Pakistan to Saudi cargo price per kg?', answer: 'Rs 2,150–2,250 by air and Rs 950–1,000 by sea.' },
    {
      question: 'How long does cargo take from Pakistan to Saudi Arabia?',
      answer: '10–20 days by air and 1.5–2.5 months by sea, door to door.',
    },
    {
      question: 'Can I send medicine from Pakistan to Saudi Arabia?',
      answer: 'Only after checking with us. Many medicines need approval in Saudi Arabia, and some are banned.',
    },
    {
      question: 'Can I send luggage ahead before I fly for Umrah or work?',
      answer: 'Yes, from 20 kg by air. Allow three weeks for it to arrive.',
    },
    { question: 'Does the receiver need an Iqama?', answer: 'Customs may ask for an Iqama or national ID number, so have it ready.' },
  ],
  closing: `For cargo to Saudi Arabia from Pakistan, send the Saudi city and a rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}) for a written price.`,
  quoteUrl: QUOTE_URL,
  whatsappMessage: destinationWhatsappMessage('Saudi Arabia'),
  service: {
    name: 'Cargo to Saudi Arabia from Pakistan',
    areaServed: { code: 'SA', name: 'Saudi Arabia' },
    offerTarget: 'Saudi Arabia',
    airRate: [2150, 2250],
    seaRate: [950, 1000],
  },
};
