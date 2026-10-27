/**
 * UAE country page (copy from "Raahi Destination Pages – Final Copy"). Targets the whole country; "cargo to dubai
 * from pakistan" belongs to /destinations/uae/dubai. Uses the client-confirmed 3–4 day air time. Values the copy
 * left as [PLACEHOLDERS] (what the rate includes) are omitted; no airports or ports are named.
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

const QUOTE_URL = '/quote?destination=uae';
const WHATSAPP_URL = destinationWhatsappLink('the UAE');

export const UAE_COUNTRY_PAGE: CountryLanding = {
  slug: 'uae',
  name: 'United Arab Emirates',
  region: 'Middle East',
  path: '/destinations/uae',
  seoTitle: 'Cargo to UAE from Pakistan | Rs 1,350/kg, All 7 Emirates | Raahi',
  seoDescription:
    'Cargo to UAE from Pakistan, door to door: air Rs 1,350–1,450/kg, sea Rs 600–700/kg. One price for Dubai, Abu Dhabi, Sharjah and every other emirate.',
  h1: 'Cargo to UAE from Pakistan: One Price for All Seven Emirates',
  intro: [
    'Cargo to UAE from Pakistan costs less, and arrives sooner, than any other route we run. We collect from your door in eight Pakistani cities and deliver to the door in Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah or Umm Al Quwain, at one price for the whole country.',
    'Air cargo is Rs 1,350–1,450 a kilo and takes 3–4 days door to door. Sea cargo is Rs 600–700 a kilo and takes 1.5–2.5 months.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Pakistan to Dubai cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['', 'Air', 'Sea'],
          rows: [
            ['Per kg, any emirate', 'Rs 1,350–1,450', 'Rs 600–700'],
            ['Minimum', '20 kg', '70–100 kg'],
            ['30 kg', 'Rs 40,500–43,500', 'Below the sea minimum'],
            ['150 kg', 'Rs 202,500–217,500', 'Rs 90,000–105,000'],
            ['Door to door', '3–4 days', '1.5–2.5 months'],
          ],
        },
        {
          type: 'p',
          text: `These cargo rates from Pakistan to Dubai per kg apply to every emirate and every pickup city, as of ${RATES_UPDATED}.`,
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Pakistan to Dubai air cargo',
      blocks: [
        {
          type: 'p',
          text: "At 3–4 days door to door, air is quick enough for things that are needed this week: clothes and shoes for someone who has just started a job, the rest of someone's belongings after a move, or stock a shop has run out of. Charges are on actual weight or size weight (length × width × height in cm ÷ 6,000), whichever is higher, so fill the boxes.",
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo to the UAE',
      blocks: [
        {
          type: 'p',
          text: "From 70–100 kg, sea costs Rs 600–700 a kilo, less than half the air rate. It suits a family joining someone already working in the UAE, a bachelor flat's furniture, or a trader's bulk order. A full household goes in its own 20 ft or 40 ft container, quoted separately. Sea shipments leave from Karachi port, whichever city we collect from.",
        },
      ],
    },
    {
      id: 'receiver',
      title: 'Sending to someone working in the UAE',
      blocks: [
        { type: 'p', text: 'If the boxes are for someone living in the UAE for work, this gets them to the door first time:' },
        {
          type: 'list',
          items: [
            'give the full address: building or villa number, street, area, emirate and the nearest landmark;',
            'give a UAE mobile number that will be answered;',
            "have the receiver's Emirates ID number ready, in case customs asks for it;",
            'send to a home or a workplace that accepts deliveries, and name who will sign.',
          ],
        },
      ],
    },
    {
      id: 'customs',
      title: 'UAE customs on cargo from Pakistan',
      blocks: [
        {
          type: 'p',
          text: 'UAE customs can charge 5% VAT and customs duty, depending on what is in the boxes and what it is worth. We tell you the likely amount before you book. Goods for sale go as [commercial cargo](/services/commercial-cargo) with an invoice, and the receiver may need a trade licence to clear them.',
        },
        {
          type: 'p',
          text: 'Some medicines that are sold freely in Pakistan, including some prescription painkillers and sleeping tablets, are controlled in the UAE and need approval before they can be imported. Do not pack any medicine without asking us first.',
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What you can send to the UAE',
      blocks: [
        {
          type: 'list',
          items: [
            '**Yes:** clothes, shoes, bedding, kitchenware, books, household goods, personal belongings, and commercial goods with an invoice.',
            '**No:** food, liquids, perfumes and attar, aerosols, lithium batteries, and anything flammable or hazardous.',
          ],
        },
      ],
    },
    {
      id: 'pickup-cities',
      title: 'From eight Pakistani cities to every emirate',
      blocks: [
        {
          type: 'p',
          text: `We collect in ${originCityLinks(ALL_ORIGIN_KEYS)}. Two routes have their own pages: [cargo from Lahore to Dubai](/routes/lahore-to-dubai) and [cargo from Islamabad to Dubai](/routes/islamabad-to-dubai). For the cities themselves, see [cargo to Dubai](/destinations/uae/dubai) and [cargo to Abu Dhabi](/destinations/uae/abu-dhabi).`,
        },
      ],
    },
    {
      id: 'booking',
      title: 'Booking',
      blocks: [
        {
          type: 'p',
          text: `Send your city, the emirate, what you are sending and a rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}), or use the [quote form](${QUOTE_URL}). You get a written price, we collect and pack, and the [tracking page](/track) shows the shipment until it is delivered.`,
        },
      ],
    },
  ],
  faqTitle: 'Cargo to UAE from Pakistan: questions',
  faqs: [
    { question: 'What is the Pakistan to Dubai cargo price for 20 kg?', answer: 'Rs 27,000–29,000 by air, door to door.' },
    { question: 'Is Sharjah or Abu Dhabi more expensive than Dubai?', answer: 'No. All seven emirates cost the same.' },
    {
      question: 'How long does cargo take from Pakistan to the UAE?',
      answer: '3–4 days by air and 1.5–2.5 months by sea, door to door.',
    },
    {
      question: 'Can I send medicine from Pakistan to the UAE?',
      answer: 'Only after checking with us. Several medicines common in Pakistan are controlled in the UAE.',
    },
    {
      question: 'What does the receiver need?',
      answer: 'A full UAE address, a UAE phone number and, if customs asks, an Emirates ID number.',
    },
  ],
  closing: `For cargo to UAE from Pakistan, send the emirate and a rough weight on [WhatsApp ${PHONE}](${WHATSAPP_URL}) and we will reply with a written price.`,
  quoteUrl: QUOTE_URL,
  whatsappMessage: destinationWhatsappMessage('the UAE'),
  service: {
    name: 'Cargo to UAE from Pakistan',
    areaServed: { code: 'AE', name: 'United Arab Emirates' },
    offerTarget: 'the UAE',
    airRate: [1350, 1450],
    seaRate: [600, 700],
  },
};
