/**
 * Verified business facts used for structured data (JSON-LD).
 *
 * Only put REAL, publicly verifiable values here: Google uses these to match the site
 * with the Google Business Profile, and inconsistent name/address/phone (NAP) data hurts
 * local rankings. Empty fields are simply omitted from the schema output.
 *
 * Social profile URLs set in Sanity (Site Settings → Social Links) are merged into `sameAs`
 * automatically; anything listed here is added on top (e.g. Google Business Profile links).
 */

export interface OpeningHoursSpec {
  dayOfWeek: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;
  opens: string; // 24h "HH:MM"
  closes: string;
}

export interface BranchProfile {
  /** Exact street address as shown on the Google Business Profile, e.g. "Office 12, Main Boulevard, Gulberg III". */
  streetAddress?: string;
  postalCode?: string;
  addressRegion?: string;
  /** Branch phone if different from the main line (any format; normalized to E.164). */
  telephone?: string;
  geo?: { latitude: number; longitude: number };
  /** Google Business Profile / Maps URL for this branch. */
  googleBusinessProfileUrl?: string;
  openingHours?: OpeningHoursSpec[];
}

export const businessProfile = {
  telephone: '+923007097063',
  whatsapp: '+923007097063',
  email: 'raahiinternational4@gmail.com',
  availableLanguages: ['English', 'Urdu'],

  /** Default business hours (from business_settings seed: "Mon - Sat: 09:00 AM - 07:00 PM PKT"). */
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ] as OpeningHoursSpec[],

  /** Extra public profiles (Facebook, LinkedIn, Google Business Profile, ...). */
  sameAs: [] as string[],

  /**
   * Per-branch overrides keyed by location short slug (`lahore`, `islamabad`, ...).
   * Branches without an entry fall back to the location's `branchAddress` text.
   */
  branches: {} as Record<string, BranchProfile>,
};
