/**
 * Faisalabad city page (copy from "Raahi City Pages – Final Copy"). No Faisalabad office: pickup only.
 * Rates match /cargo-services, including the client-confirmed 3–4 day UAE air time. Values the copy left as
 * [PLACEHOLDERS] (pickup time, what the rate includes, packing charges, reviews) are omitted.
 */

import { CityLanding, cityBreadcrumbs, contentWhatsappLink, DESTINATION_LINKS, LandingPage, OriginCity, PHONE, RATES_UPDATED } from './shared';

const FAISALABAD: OriginCity = {
  key: 'faisalabad',
  name: 'Faisalabad',
  province: 'Punjab',
  cityPath: '/locations/international-cargo-services-in-faisalabad',
};

const QUOTE_URL = '/quote?origin=faisalabad';
const WHATSAPP_URL = contentWhatsappLink('Faisalabad');

const FAISALABAD_CITY_PAGE: LandingPage = {
  origin: FAISALABAD,
  path: FAISALABAD.cityPath,
  linkLabel: 'International cargo services in Faisalabad',
  seoTitle: 'International Cargo Services in Faisalabad, Air & Sea | Raahi',
  seoDescription:
    'International cargo services in Faisalabad with home and factory pickup: air from Rs 1,350/kg, sea from Rs 600/kg, to the UK, Dubai, USA and Canada.',
  h1: 'International Cargo Services in Faisalabad for Families and Textile Businesses',
  intro: [
    'Raahi International offers international cargo services in Faisalabad with pickup from your home, shop or factory, and delivery to the door in the UK, UAE, Saudi Arabia, USA and Canada.',
    "Some of what we carry from Faisalabad is the city's own product: bed linen, towels and lawn going to family abroad, and fabric samples and stock going to buyers. The rest is the usual mix of clothes, gifts and household goods. Air cargo starts at 20 kg and Rs 1,350 a kilo; sea cargo at 70–100 kg and Rs 600 a kilo.",
  ],
  sections: [
    {
      id: 'rates',
      title: 'Faisalabad cargo rates per kg',
      blocks: [
        { type: 'p', text: 'The 50 kg column is roughly two large cartons of bedding and clothes sent by air.' },
        {
          type: 'table',
          head: ['Destination', 'Air per kg', '50 kg by air', 'Sea per kg', 'Air / sea time, door to door'],
          rows: [
            ['UAE', 'Rs 1,350–1,450', 'Rs 67,500–72,500', 'Rs 600–700', '3–4 days / 1.5–2.5 months'],
            ['England and Wales', 'Rs 1,750–1,850', 'Rs 87,500–92,500', 'Rs 950–1,000', '10–12 days / 1.5–2.5 months'],
            ['Scotland', 'Rs 2,350', 'Rs 117,500', 'Rs 1,250', '10–15 days / 1.5–2.5 months'],
            ['Saudi Arabia', 'Rs 2,150–2,250', 'Rs 107,500–112,500', 'Rs 950–1,000', '10–20 days / 1.5–2.5 months'],
            ['USA', 'Rs 2,750–2,950', 'Rs 137,500–147,500', 'Rs 1,550–1,650', '10–15 days / 2–2.5 months'],
            ['Canada', 'Rs 2,850–2,950', 'Rs 142,500–147,500', 'Rs 1,750–1,850', '10–15 days / 2–3 months'],
          ],
        },
        {
          type: 'p',
          text: `Rates as of ${RATES_UPDATED}. More destinations on the [cargo rates page](/cargo-services).`,
        },
      ],
    },
    {
      id: 'uk',
      title: 'Cargo from Faisalabad to UK',
      blocks: [
        {
          type: 'p',
          text: 'Faisalabad to the UK costs Rs 1,750–1,850 a kilo by air, door to door in 10–12 days, or Rs 950–1,000 a kilo by sea in 1.5–2.5 months. Scotland is Rs 2,350 by air and Rs 1,250 by sea.',
        },
        {
          type: 'list',
          items: [
            '30 kg of clothes and bed linen by air: Rs 52,500–55,500',
            '150 kg of household goods by sea: Rs 142,500–150,000',
          ],
        },
        {
          type: 'p',
          text: 'Bed linen, towels and clothing sent as gifts come in free of UK VAT up to £39 per gift; above that, VAT is charged. Stock for a UK shop goes as [commercial cargo](/services/commercial-cargo), and the buyer needs an EORI number. See [cargo to the UK](/destinations/uk) for London, Birmingham, Manchester and the rest.',
        },
      ],
    },
    {
      id: 'textiles',
      title: 'Sending textiles: pack them to cost less',
      blocks: [
        {
          type: 'p',
          text: "Textiles are where size weight catches people out. Air cargo is charged on a box's real weight or its size weight (length × width × height in cm ÷ 6,000), whichever is higher.",
        },
        {
          type: 'list',
          items: [
            '**Folded bedsheets, towels and unstitched suits** are dense. A full carton usually weighs more than its size weight, so you pay the scale weight.',
            '**Quilts, razais, pillows and blankets** are the opposite: light for their size. Vacuum-pack them, or send them by sea.',
            '**Mixing both in one box** often gives the best price: the dense pieces fill the weight, the soft ones fill the gaps.',
          ],
        },
        { type: 'h3', text: 'Two boxes, two prices' },
        {
          type: 'p',
          text: 'Two cartons of the same size, 60 × 40 × 40 cm, each have a size weight of 16 kg (60 × 40 × 40 ÷ 6,000).',
        },
        {
          type: 'list',
          items: [
            'Packed with folded bedsheets and towels, each weighs about 22 kg. You pay for the 44 kg on the scale: Rs 77,000–81,400 to England by air.',
            'Packed with two razais each, they weigh about 7 kg apiece. You pay for 32 kg of size weight, Rs 56,000–59,200, to send 14 kg of quilts.',
          ],
        },
        {
          type: 'p',
          text: 'Per kilo of goods, the quilts cost more than twice as much. Vacuum-pack them, or send them by sea, where the minimum is 70–100 kg and the rate drops to Rs 950–1,000 a kilo.',
        },
      ],
    },
    {
      id: 'samples',
      title: 'Fabric samples and stock for buyers abroad',
      blocks: [
        {
          type: 'p',
          text: "For a few kilos of swatches, a courier is the quicker choice. From 20 kg up, air cargo costs less per kilo: sample ranges, a boutique's first order or garments for an online shop.",
        },
        {
          type: 'p',
          text: 'Goods for sale travel as commercial cargo with a commercial invoice and a packing list, and the buyer clears them in their own name. For full-container exports from mills and factories, tell us the volume and destination and we will tell you whether we can take it on.',
        },
      ],
    },
    {
      id: 'home-sellers',
      title: 'Selling from home or a boutique',
      blocks: [
        {
          type: 'p',
          text: "A lot of Faisalabad stock goes abroad in small amounts: a home-based seller's lawn suits for customers in Canada, or a boutique's first order for a shop in Birmingham. That is commercial cargo, even at 25 kg.",
        },
        {
          type: 'list',
          items: [
            '**Invoice:** list each item, the quantity and the price you are selling at.',
            '**UK:** the buyer needs an EORI number and pays duty and VAT on the invoice value.',
            '**Canada:** goods for sale pay duty and GST/HST. The CAD $60 gift allowance does not cover them.',
            '**USA:** small commercial shipments no longer enter duty-free.',
          ],
        },
        {
          type: 'p',
          text: 'Declaring stock as gifts to avoid duty can get the whole shipment held at customs. We would rather tell you the likely charges before you book.',
        },
      ],
    },
    {
      id: 'air-cargo',
      title: 'Air cargo from Faisalabad',
      blocks: [
        {
          type: 'p',
          text: "Air takes 10–12 days to the UK, 10–15 days to the USA and Canada, 3–4 to the UAE and 10–20 to Saudi Arabia, counted from pickup in Faisalabad to the receiver's door. Use it for anything with a date: a wedding abroad, the start of a term, Eid.",
        },
      ],
    },
    {
      id: 'sea-cargo',
      title: 'Sea cargo from Faisalabad',
      blocks: [
        {
          type: 'p',
          text: 'Sea starts at 70–100 kg and suits furniture, household goods and bulk stock. We move your goods from Faisalabad to Karachi port and clear them for export. A few boxes share a container with other cargo; a full house or a big order gets its own 20 ft or 40 ft container, quoted separately.',
        },
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup across Faisalabad',
      blocks: [
        { type: 'p', text: 'We collect from homes, markets and factories, including:' },
        {
          type: 'list',
          items: [
            'the Clock Tower bazaars and Kachehri Bazaar',
            'D Ground, Peoples Colony, Madina Town and Susan Road',
            'Gulberg, Canal Road, Jinnah Colony and Kohinoor City',
            'Satiana Road, Jaranwala Road and Sargodha Road',
            'Faisalabad Industrial Estate, Khurrianwala and M-3 Industrial City',
          ],
        },
        {
          type: 'p',
          text: `Further out, in Jhang, Chiniot or Toba Tek Singh? Ask us on [WhatsApp](${WHATSAPP_URL}) before you book.`,
        },
      ],
    },
    {
      id: 'what-you-can-send',
      title: 'Packing and what we accept',
      blocks: [
        {
          type: 'p',
          text: 'We pack in double-wall export cartons, wrap fragile items piece by piece, and crate furniture in ISPM 15 heat-treated wood, as the UK, USA and Canada require.',
        },
        {
          type: 'p',
          text: 'We accept clothes, textiles, shoes, bedding, books, kitchenware, household goods, and commercial goods with an invoice. We do not accept food, liquids, perfumes, aerosols, lithium batteries, or anything flammable or hazardous. Check with us before packing medicines or electronics.',
        },
      ],
    },
    {
      id: 'destinations',
      title: 'Where else we ship from Faisalabad',
      blocks: [
        {
          type: 'list',
          items: [
            '[Cargo to Dubai and the UAE](/destinations/uae/dubai): Rs 1,350–1,450/kg by air, all seven emirates',
            '[Cargo to Saudi Arabia](/destinations/ksa): Rs 2,150–2,250/kg by air',
            '[Cargo to the USA](/destinations/usa): Rs 2,750–2,950/kg by air, any state',
            '[Cargo to Canada](/destinations/canada): Rs 2,850–2,950/kg by air, any province',
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Cargo services in Faisalabad: contact',
      blocks: [
        {
          type: 'p',
          text: `For cargo services in Faisalabad, call or WhatsApp **[${PHONE}](${WHATSAPP_URL})**. Tell us the destination, what you are sending and roughly how much it weighs, and we send a written price. There is no walk-in office in Faisalabad: we come to your address.`,
        },
      ],
    },
  ],
  faqTitle: 'FAQs about international cargo services in Faisalabad',
  faqs: [
    {
      question: 'How much is cargo from Faisalabad to the UK?',
      answer: 'Rs 1,750–1,850 a kilo by air and Rs 950–1,000 by sea, for England and Wales. 30 kg by air costs Rs 52,500–55,500.',
    },
    {
      question: 'Do you collect from factories and industrial areas?',
      answer:
        'Yes, including Faisalabad Industrial Estate, Khurrianwala and M-3 Industrial City. For a large factory order, tell us the volume first.',
    },
    {
      question: 'Can I send fabric samples to a buyer abroad?',
      answer: 'Yes, from 20 kg as cargo. For lighter sample packs, a courier is faster.',
    },
    {
      question: 'Do I have to take my boxes to Lahore?',
      answer: 'No. We pick up in Faisalabad. Our offices are in Rawalpindi and Lahore, but you do not need to visit either.',
    },
    { question: 'Can I send food from Faisalabad?', answer: 'No. Food is not accepted in any shipment.' },
    {
      question: 'How long does air cargo take from Faisalabad?',
      answer: 'Door to door: 10–12 days to the UK, 10–15 to the USA and Canada, 3–4 to the UAE and 10–20 to Saudi Arabia.',
    },
    {
      question: 'What is the difference between scale weight and size weight?',
      answer:
        'Scale weight is what the box weighs. Size weight is length × width × height in cm ÷ 6,000. You pay whichever is higher, box by box.',
    },
    {
      question: 'Can a home-based seller send stock abroad?',
      answer:
        'Yes, as commercial cargo with an invoice, from 20 kg by air. Tell us the destination and we will tell you what the buyer will pay on arrival.',
    },
  ],
  closing: `For international cargo services in Faisalabad, message [WhatsApp ${PHONE}](${WHATSAPP_URL}) or use the [quote form](${QUOTE_URL}), and we will collect from your door.`,
  breadcrumbs: cityBreadcrumbs(FAISALABAD),
  quoteUrl: QUOTE_URL,
  whatsappMessage: 'Assalam o Alaikum, I want to send international cargo from Faisalabad. Please guide me.',
};

export const FAISALABAD_LANDING: CityLanding = {
  cityPage: FAISALABAD_CITY_PAGE,
  routes: {},
  relatedLinks: DESTINATION_LINKS,
};
