/**
 * SERP length guards for titles and meta descriptions.
 *
 * CMS values stay authoritative when they fit; otherwise the next candidate
 * (code fallback) is used, and as a last resort the first candidate is shortened.
 */

export const MAX_TITLE_LENGTH = 60;
export const MIN_DESCRIPTION_LENGTH = 120;
export const MAX_DESCRIPTION_LENGTH = 160;

const BRAND_LONG = 'Raahi International';
const BRAND_SHORT = 'Raahi';

type Candidate = string | null | undefined;

function clean(value: Candidate): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : text.slice(0, max)).replace(/[\s|–\-:,]+$/, '');
}

/** Shortens a "Primary | Secondary | Brand" title to fit, dropping middle segments before truncating. */
export function shortenTitle(title: string, max = MAX_TITLE_LENGTH): string {
  let result = clean(title);
  if (result.length <= max) return result;

  result = result.replace(new RegExp(`\\s*\\|\\s*${BRAND_LONG}$`), ` | ${BRAND_SHORT}`);
  if (result.length <= max) return result;

  const segments = result.split(/\s+\|\s+/);
  const hasBrand = segments.length > 1 && segments[segments.length - 1] === BRAND_SHORT;
  const body = hasBrand ? segments.slice(0, -1) : segments;
  while (body.length > 1) {
    body.pop();
    const candidate = hasBrand ? `${body.join(' | ')} | ${BRAND_SHORT}` : body.join(' | ');
    if (candidate.length <= max) return candidate;
  }

  return truncateAtWord(body[0], max);
}

/**
 * First candidate within the title limit, else the first non-empty candidate shortened.
 * Returns '' when no candidate is set, so callers can chain a generic default with `||`
 * (a shortened specific title beats a generic one).
 */
export function pickTitle(...candidates: Candidate[]): string {
  const values = candidates.map(clean).filter(Boolean);
  if (values.length === 0) return '';
  return values.find((v) => v.length <= MAX_TITLE_LENGTH) ?? shortenTitle(values[0]);
}

/**
 * First candidate within 120–160 chars; else the first over-long candidate truncated at a
 * word boundary (a trimmed specific description beats a short generic one); else the longest.
 * Returns '' when no candidate is set, so callers can chain a generic default with `||`.
 */
export function pickDescription(...candidates: Candidate[]): string {
  const values = candidates.map(clean).filter(Boolean);
  const ideal = values.find((v) => v.length >= MIN_DESCRIPTION_LENGTH && v.length <= MAX_DESCRIPTION_LENGTH);
  if (ideal) return ideal;
  const tooLong = values.find((v) => v.length > MAX_DESCRIPTION_LENGTH);
  if (tooLong) return truncateAtWord(tooLong, MAX_DESCRIPTION_LENGTH - 1) + '…';
  return [...values].sort((a, b) => b.length - a.length)[0] ?? '';
}

/** Applies a "%s | Brand" template, shortening the brand or dropping it to stay within the limit. */
export function applyTitleTemplate(title: string): string {
  const base = clean(title);
  const short = shortenTitle(base);
  for (const core of [base, short]) {
    for (const candidate of [`${core} | ${BRAND_LONG}`, `${core} | ${BRAND_SHORT}`]) {
      if (candidate.length <= MAX_TITLE_LENGTH) return candidate;
    }
  }
  return short;
}
