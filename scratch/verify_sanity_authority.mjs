import { getSanitySiteSettingsData, getSanityCargoPricingData, getSanityGuidesList, getSanityLocationsList } from '../sanity/lib/fetch.js';

async function testAuthority() {
  console.log('=== SANITY AUTHORITATIVE SOURCE VERIFICATION ===\n');

  // 1. Production Content Verification
  const settings = await getSanitySiteSettingsData();
  const pricing = await getSanityCargoPricingData();
  const guides = await getSanityGuidesList();
  const locations = await getSanityLocationsList();

  console.log('[1] Live Sanity Data Check:');
  console.log('  - Site Settings Phone:', settings?.phone || 'NONE');
  console.log('  - Site Settings WhatsApp:', settings?.whatsappNumber || 'NONE');
  console.log('  - Site Settings Email:', settings?.email || 'NONE');
  console.log('  - Air Rates Count:', pricing?.airCargoSection?.rates?.length || 0);
  console.log('  - Sea Rates Count:', pricing?.seaCargoSection?.rates?.length || 0);
  console.log('  - Published Guides Count:', guides?.length || 0);
  console.log('  - Published Locations Count:', locations?.length || 0);

  if (settings?.phone && pricing?.airCargoSection?.rates?.length > 0) {
    console.log('\n✅ Sanity is actively providing live business data!');
  } else {
    console.error('\n❌ Failed to fetch live Sanity data!');
    process.exit(1);
  }
}

testAuthority().catch((err) => {
  console.error(err);
  process.exit(1);
});
