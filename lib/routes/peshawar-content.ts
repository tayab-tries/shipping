/**
 * Peshawar city page (copy from "Raahi City Pages – Final Copy"). No Peshawar office: pickup only.
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, reviews) are omitted.
 */

import { CityLanding, cityBreadcrumbs, contentWhatsappLink, DESTINATION_LINKS, LandingPage, OriginCity, PHONE, RATES_UPDATED } from './shared';

const PESHAWAR: OriginCity = {
  key: 'peshawar',
  name: 'Peshawar',
  province: 'Khyber Pakhtunkhwa',
  cityPath: '/locations/international-cargo-services-in-peshawar',
};

const QUOTE_URL = '/quote?origin=peshawar';
const WHATSAPP_URL = contentWhatsappLink('Peshawar');

const PESHAWAR_CITY_PAGE: LandingPage = {
  origin: PESHAWAR,
  path: PESHAWAR.cityPath,
  linkLabel: 'International cargo services in Peshawar',
  seoTitle: 'International Cargo Services in Peshawar | Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Peshawar with home pickup: air and sea cargo to Dubai, Saudi Arabia, the UK, USA and Canada. Air from Rs 1,350/kg.',
  h1: 'International Cargo Services in Peshawar: Home Pickup, Door-to-Door Delivery',
  intro: [
    'Raahi International runs international cargo services in Peshawar with pickup from your home or shop and delivery to the door in the UAE, Saudi Arabia, the UK, USA and Canada.',
    'Many cargo services in Peshawar move goods within Pakistan. We do not: every booking goes abroad. Air cargo starts at 20 kg and sea cargo at 70–100 kg, and you get a written price per kilo before we collect anything.',
  ],
  sections: [
    {
      id: 'rates',
      title: 'Peshawar cargo rates per kg',
      blocks: [
        {
          type: 'table',
          head: ['Destination', 'By air', '35 kg by air', 'By sea', '90 kg by sea'],
          rows: [
            ['UAE', 'Rs 1,350–1,450/kg', 'Rs 47,250–50,750', 'Rs 600–700/kg', 'Rs 54,000–63,000'],
            ['Saudi Arabia', 'Rs 2,150–2,250/kg', 'Rs 75,250–78,750', 'Rs 950–1,000/kg', 'Rs 85,500–90,000'],
            ['UK (England and Wales)', 'Rs 1,750–1,850/kg', 'Rs 61,250–64,750', 'Rs 950–1,000/kg', 'Rs 85,500–90,000'],
            ['UK (Scotland)', 'Rs 2,350/kg', 'Rs 82,250', 'Rs 1,250/kg', 'Rs 112,500'],
            ['USA', 'Rs 2,750–2,950/kg', 'Rs 96,250–103,250', 'Rs 1,550–1,650/kg', 'Rs 139,500–148,500'],
            ['Canada', 'Rs 2,850–2,950/kg', 'Rs 99,750–103,250', 'Rs 1,750–1,850/kg', 'Rs 157,500–166,500'],
          ],
        },
        {
          type: 'p',
          text: `${RATES_UPDATED} rates. Air delivery takes 3–4 days to the UAE and 10–20 days elsewhere, depending on the country, and sea 1.5–3 months, door to door.`,
        },
      ],
    },
    {
      id: 'gulf',
      title: 'Cargo from Peshawar to Dubai and Saudi Arabia',
      blocks: [
        {
          type: 'p',
          text: 'To the UAE, air cargo costs Rs 1,350–1,450 a kilo and arrives in 3–4 days; any emirate is the same price. To Saudi Arabia, it is Rs 2,150–2,250 a kilo and 10–20 days, with delivery in Riyadh, Jeddah, Dammam and other cities.',
        },
        {
          type: 'p',
          text: 'Both countries charge VAT on imports, 5% in the UAE and 15% in Saudi Arabia, and may add customs duty, depending on the goods and their value. Both restrict some medicines. We tell you the likely charges before you book. See [cargo to Dubai](/destinations/uae/dubai) and [cargo to Saudi Arabia](/destinations/ksa).',
        },
      ],
    },
    {
      id: 'uk',
      title: 'Cargo from Peshawar to UK',
      blocks: [
        {
          type: 'p',
          text: 'Rs 1,750–1,850 a kilo by air, door to door in 10–12 days, or Rs 950–1,000 a kilo by sea in 1.5–2.5 months. 35 kg of clothes and gifts by air comes to Rs 61,250–64,750. A gift worth £39 or less enters the UK without VAT; above that, VAT applies. See [cargo to the UK](/destinations/uk).',
        },
        {
          type: 'p',
          text: 'USA and Canada: Rs 2,750–2,950 and Rs 2,850–2,950 a kilo by air. See [cargo to the USA](/destinations/usa) and [cargo to Canada](/destinations/canada).',
        },
      ],
    },
    {
      id: 'crafts',
      title: 'Sending Peshawari chappals, rugs and crafts',
      blocks: [
        {
          type: 'list',
          items: [
            '**Peshawari chappals:** pack each pair in its own bag and fill the box tightly; loose shoes waste space you pay for.',
            '**Rugs and carpets:** roll, never fold, and wrap in plastic against damp. Rugs are heavy for their size, so a big one is often cheaper by sea.',
            '**Woodwork and carved furniture:** crated in ISPM 15 heat-treated wood, which the UK, USA and Canada require.',
            '**Gemstones and jewellery:** ask us before booking. High-value items must be declared at their real value.',
          ],
        },
        {
          type: 'p',
          text: 'Goods you are selling abroad go as [commercial cargo](/services/commercial-cargo) with an invoice. Dry fruit, spices and other food cannot be shipped.',
        },
      ],
    },
    {
      id: 'excess-baggage',
      title: 'Excess baggage from Peshawar',
      blocks: [
        {
          type: 'p',
          text: 'Flying out for work, study or Umrah with more luggage than the airline allows? Send the extra ahead by air cargo instead of paying excess fees at the airport. 22 kg to Dubai costs Rs 29,700–31,900. See [excess baggage shipping](/services/excess-baggage).',
        },
        { type: 'h3', text: 'Sending luggage ahead before you fly to the Gulf' },
        {
          type: 'list',
          items: [
            '**Compare the price.** Ask your airline what an extra kilo costs at the counter, then compare it with ours: 22 kg to Dubai is Rs 29,700–31,900, and 22 kg to Riyadh is Rs 47,300–49,500.',
            '**Book in time.** Air cargo takes 3–4 days to the UAE and 10–20 days to Saudi Arabia, door to door. For Saudi Arabia, book about three weeks before you fly; for the UAE, a week is usually enough.',
            "**Give a real address.** The boxes go to the address you give, so use your accommodation or a relative's home, with a local phone number.",
            '**Pack what travels well.** Clothes, bedding, work boots and kitchen items are fine. Food, attar and perfume, and power banks cannot go.',
          ],
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup across Peshawar',
      blocks: [
        { type: 'p', text: 'We collect from:' },
        {
          type: 'list',
          items: [
            'Hayatabad, Karkhano Market and the Industrial Estate',
            'University Town, University Road, Board Bazaar and Tehkal',
            'Saddar, Cantt and Gulbahar',
            'Qissa Khwani and the old city',
            'Ring Road, Warsak Road, Charsadda Road, Regi Model Town and DHA Peshawar',
          ],
        },
        { type: 'p', text: `Mardan, Nowshera, Charsadda or Kohat? Ask us on [WhatsApp](${WHATSAPP_URL}) first.` },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How a Peshawar shipment works',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `Send the destination, the contents and a rough weight on [WhatsApp](${WHATSAPP_URL}).`,
            'We reply with a written per-kilo rate and the total.',
            'We collect, weigh and pack at your address.',
            'Air cargo goes out with export clearance done; sea cargo travels to Karachi port first.',
            "You follow it on our [tracking page](/track) to the receiver's door.",
          ],
        },
        {
          type: 'p',
          text: "Bring or have ready: a copy of the sender's CNIC or passport, the receiver's full address and phone number, and a list of what is in each box with values.",
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'What we take',
      blocks: [
        {
          type: 'p',
          text: 'Clothes, shoes, bedding, books, rugs, crafts, kitchenware, household goods, and commercial goods with an invoice. We refuse food, liquids, perfumes, aerosols, lithium batteries, and anything flammable or hazardous.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Peshawar: contact',
      blocks: [
        {
          type: 'p',
          text: `For cargo services in Peshawar, call or WhatsApp **[${PHONE}](${WHATSAPP_URL})**, or fill in the [quote form](${QUOTE_URL}). We have no office in Peshawar; our team comes to your address.`,
        },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Peshawar',
  faqs: [
    { question: 'Do you send cargo within Pakistan, for example Peshawar to Karachi?', answer: 'No. We only ship abroad.' },
    {
      question: 'How much is cargo from Peshawar to UK?',
      answer: 'Rs 1,750–1,850 a kilo by air and Rs 950–1,000 by sea, for England and Wales.',
    },
    {
      question: 'What does cargo from Peshawar to Dubai cost?',
      answer: 'Rs 1,350–1,450 a kilo by air, or Rs 600–700 by sea from 70–100 kg.',
    },
    {
      question: 'Can I send a carpet from Peshawar?',
      answer: 'Yes. Rolled and wrapped, by air or by sea. Large rugs usually cost less by sea.',
    },
    { question: 'Can I send dry fruit from Peshawar?', answer: 'No. We do not carry food of any kind.' },
    {
      question: 'Can I send extra luggage ahead before I fly to Saudi Arabia or the UAE?',
      answer: 'Yes, from 20 kg. Book about three weeks ahead for Saudi Arabia and a week ahead for the UAE.',
    },
    {
      question: 'Do you collect from Hayatabad, University Town and Karkhano Market?',
      answer: 'Yes. All three are in our Peshawar pickup area.',
    },
    {
      question: 'Can I send Peshawari chappals to sell abroad?',
      answer: 'Yes, as commercial cargo with an invoice. The buyer pays any import duty in their country.',
    },
    {
      question: 'What do I need to send cargo from Peshawar?',
      answer:
        "A copy of your CNIC or passport, the receiver's full address and phone number, and a list of what is in each box with values.",
    },
  ],
  closing: `Book international cargo services in Peshawar on [WhatsApp ${PHONE}](${WHATSAPP_URL}), and we will collect from your door.`,
  breadcrumbs: cityBreadcrumbs(PESHAWAR),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Peshawar. Please guide me.',
};

export const PESHAWAR_LANDING: CityLanding = {
  cityPage: PESHAWAR_CITY_PAGE,
  routes: {},
  relatedLinks: DESTINATION_LINKS,
};
