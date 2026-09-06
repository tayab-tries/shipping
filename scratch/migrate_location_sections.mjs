import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vst9vvau';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('ERROR: SANITY_API_WRITE_TOKEN is missing from .env.local');
  process.exit(1);
}

// 1. Extract historical location-data.ts from git history
console.log('Extracting historical location-data.ts content from git commit 6db74cbb00dfc4af183b0cdf27964051e5272b84^...');
const fileContent = execSync('git show 6db74cbb00dfc4af183b0cdf27964051e5272b84^:lib/locations/location-data.ts', { encoding: 'utf-8' });

// Parse location records
function extractLocationSections(slug) {
  const slugIndex = fileContent.indexOf(`id: '${slug}'`);
  if (slugIndex === -1) return [];

  // find sections: [ ... ] within this block
  const sectionsStart = fileContent.indexOf('sections: [', slugIndex);
  if (sectionsStart === -1) return [];

  // find the end of sections array
  let depth = 0;
  let sectionsEnd = -1;
  const startBracket = fileContent.indexOf('[', sectionsStart);

  for (let i = startBracket; i < fileContent.length; i++) {
    if (fileContent[i] === '[') depth++;
    else if (fileContent[i] === ']') {
      depth--;
      if (depth === 0) {
        sectionsEnd = i + 1;
        break;
      }
    }
  }

  if (sectionsEnd === -1) return [];

  const rawSectionsText = fileContent.substring(sectionsStart, sectionsEnd);
  // evaluate js array representation safely
  try {
    const arrayCode = rawSectionsText.replace('sections:', '');
    const evaluated = eval(`(${arrayCode})`);
    return evaluated;
  } catch (err) {
    console.error(`Failed to parse sections for ${slug}:`, err);
    return [];
  }
}

const slugs = ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar'];

async function patchSanityLocations() {
  console.log('Starting Sanity location documents patching...\n');

  for (const slug of slugs) {
    const docId = `location-${slug}`;
    const sections = extractLocationSections(slug);

    if (!sections || sections.length === 0) {
      console.warn(`[!] No sections extracted for ${slug}`);
      continue;
    }

    console.log(`Patching document "${docId}" (${slug}) with ${sections.length} sections...`);

    // Prepare mutation body
    const mutation = {
      mutations: [
        {
          patch: {
            id: docId,
            set: {
              sections: sections.map((sec) => ({
                _type: 'locationSectionObject',
                _key: `sec_${Math.random().toString(36).substring(2, 9)}`,
                title: sec.title,
                content: sec.content,
                list: sec.list || [],
                links: (sec.links || []).map((link) => ({
                  _type: 'locationLink',
                  _key: `link_${Math.random().toString(36).substring(2, 9)}`,
                  label: link.label,
                  href: link.href,
                })),
              })),
            },
          },
        },
      ],
    };

    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mutation),
    });

    const result = await res.json();
    if (res.ok) {
      console.log(`  ✓ Successfully updated "${docId}" in Sanity!`);
    } else {
      console.error(`  ✗ Error updating "${docId}":`, result);
    }
  }

  console.log('\nFinished location sections migration!');
}

patchSanityLocations().catch(console.error);
