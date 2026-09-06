const projectId = 'vst9vvau';
const dataset = 'production';

const schemaMap = {
  siteSettings: [
    'businessName', 'shortDescription', 'phone', 'whatsappNumber', 'email', 'address',
    'operatingHours', 'logo', 'logoDark', 'logoLight', 'navigationItems', 'primaryCta',
    'footerDescription', 'footerGroups', 'copyrightText', 'defaultSeoTitle',
    'defaultSeoDescription', 'defaultSocialImage', 'socialLinks'
  ],
  homepage: [
    'seo', 'hero', 'heroFeatureChips', 'quickQuote', 'trustMetrics', 'registrations',
    'trustedMarket', 'whatCanYouSend', 'servicesOverview', 'pickupCities',
    'destinationsShowcase', 'howItWorks', 'testimonials', 'faqs', 'bottomCta'
  ],
  aboutPage: [
    'seo', 'hero', 'story', 'values', 'teamHighlights', 'certifications', 'cta'
  ],
  cargoPricing: [
    'hero', 'airCargoSection', 'seaCargoSection', 'quickComparison', 'decisionGuidance',
    'doorToDoor', 'faqs', 'seo'
  ],
  service: [
    'title', 'slug', 'name', 'shortDescription', 'category', 'quoteCargoType', 'iconName',
    'sortOrder', 'heroImage', 'heroImageAlt', 'serviceOverview', 'targetAudience',
    'keyConsiderations', 'body', 'processSteps', 'faq', 'seo'
  ],
  location: [
    'name', 'slug', 'province', 'h1', 'seoTitle', 'seoDescription', 'introduction',
    'serviceAvailable', 'collectionAvailable', 'hasPhysicalBranch', 'branchAddress',
    'localCoverageText', 'supportedServices', 'supportedDestinations', 'faqs', 'sections',
    'heroImage', 'heroImageAlt', 'seo'
  ],
  destinationCountry: [
    'name', 'slug', 'region', 'h1', 'introduction', 'shippingOverview', 'customsGuidance',
    'sortOrder', 'heroImage', 'heroImageAlt', 'supportedServices', 'supportedOrigins',
    'faqs', 'seo'
  ],
  destinationCity: [
    'name', 'slug', 'country', 'h1', 'introduction', 'overview', 'preparationConsiderations',
    'sortOrder', 'heroImage', 'heroImageAlt', 'seo'
  ],
  guide: [
    'title', 'slug', 'excerpt', 'category', 'authorName', 'publishedAt', 'updatedAt',
    'readingTimeMinutes', 'isFeatured', 'containsRegulatoryClaims', 'verificationNotes',
    'contentMarkdown', 'body', 'supportedServices', 'supportedOrigins', 'supportedDestinations',
    'faqs', 'seo'
  ]
};

const builtInFields = ['_id', '_type', '_createdAt', '_updatedAt', '_rev', '_system'];

async function runAudit() {
  console.log('=== SANITY UNKNOWN FIELDS & SCHEMA CONSISTENCY AUDIT ===\n');

  const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent('*[_type != "system.group"]{...}')}`);
  const data = await res.json();
  const docs = data.result || [];

  console.log(`Total documents fetched from dataset "${dataset}": ${docs.length}\n`);

  const unknownFieldsInventory = [];

  for (const doc of docs) {
    const docType = doc._type;
    const docId = doc._id;
    const validFields = schemaMap[docType];

    if (!validFields) {
      console.log(`[!] Unrecognized document type: "${docType}" (ID: ${docId})`);
      continue;
    }

    const docKeys = Object.keys(doc);
    const unknownKeys = docKeys.filter(k => !builtInFields.includes(k) && !validFields.includes(k));

    for (const key of unknownKeys) {
      unknownFieldsInventory.push({
        docType,
        docId,
        docTitle: doc.title || doc.name || doc.heading || doc.businessName || docId,
        unknownField: key,
        value: typeof doc[key] === 'object' ? JSON.stringify(doc[key]).substring(0, 100) : String(doc[key]),
      });
    }
  }

  console.log('--- INVENTORY OF ALL UNKNOWN / UNRECOGNIZED FIELDS IN PRODUCTION ---');
  if (unknownFieldsInventory.length === 0) {
    console.log('None found!');
  } else {
    console.log(`Found ${unknownFieldsInventory.length} unknown field occurrences across documents:\n`);
    unknownFieldsInventory.forEach((item, idx) => {
      console.log(`[${idx + 1}] Document Type: "${item.docType}" | ID: "${item.docId}"`);
      console.log(`    Title: "${item.docTitle}"`);
      console.log(`    Unknown Field Name: "${item.unknownField}"`);
      console.log(`    Current Value: ${item.value}`);
      console.log('    --------------------------------------------------');
    });
  }
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
