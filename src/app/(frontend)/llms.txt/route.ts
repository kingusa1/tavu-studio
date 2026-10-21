// Generated from the CMS (§5.8, package B). Replaces the static `public/llms.txt` (deleted in
// this commit — a public file at the same path would otherwise conflict with this route, R12).

import { getOffers } from '@/lib/cms/offers';
import { offerLlmsLine } from '@/lib/cms/offerText';
import type { OfferLike } from '@/lib/cms/offerText';
import { getRituals } from '@/lib/cms/massageRituals';
import { getClasses } from '@/lib/cms/classes';
import { getSiteData } from '@/lib/cms/site';
import type { Offer } from '@/payload-types';

export const dynamic = 'force-static';

/**
 * The Classes collection is package C's (§2.5) — in this package's isolated worktree it is
 * still an empty stub, so this section renders with no class names until C merges. The shape
 * below is the final one (`name`, `type`, `family`, `level`), structurally compatible with the
 * real collection once it lands; nothing here needs to change at integration time.
 */
type ClassLike = {
  name?: string | null;
  type?: 'reformer' | 'breathing-room' | null;
  family?: 'tavu-mat' | 'tavu-release' | 'tavu-stretch' | null;
};

const FAMILY_ORDER: Array<NonNullable<ClassLike['family']>> = ['tavu-mat', 'tavu-release', 'tavu-stretch'];
const FAMILY_LABELS: Record<NonNullable<ClassLike['family']>, string> = {
  'tavu-mat': 'TAVÚ MAT',
  'tavu-release': 'TAVÚ RELEASE',
  'tavu-stretch': 'TAVÚ STRETCH',
};

function llmsLines(offers: Offer[]): string[] {
  return offers.map((offer) => offerLlmsLine(offer as unknown as OfferLike));
}

function heading(sectionHeadings: Array<{ key?: string | null; heading?: string | null }> | null | undefined, key: string): string {
  return sectionHeadings?.find((entry) => entry.key === key)?.heading ?? '';
}

async function buildLlmsText(): Promise<string> {
  const [{ settings }, reformerOffers, breathingOffers, contrastOffers, addOnOffers, compressionOffers, bundleOffers, membershipOffers, rituals, classes] =
    await Promise.all([
      getSiteData(),
      getOffers({ category: 'reformer', surface: 'llms' }),
      getOffers({ category: 'breathing-room', surface: 'llms' }),
      getOffers({ category: 'contrast', surface: 'llms' }),
      getOffers({ category: 'add-on', surface: 'llms' }),
      getOffers({ category: 'compression', surface: 'llms' }),
      getOffers({ category: 'bundle', surface: 'llms' }),
      getOffers({ category: 'membership', surface: 'llms' }),
      getRituals(),
      getClasses(),
    ]);

  const llms = settings.llms;
  const sectionHeadings = llms.sectionHeadings;

  // Bundles: llms.txt sorts by price ascending, unlike every other surface (§2.3 Order rule).
  const bundleLines = llmsLines([...bundleOffers].sort((a, b) => a.price - b.price));

  const fullBody = rituals.filter((r) => r.group === 'full-body');
  const targeted = rituals.filter((r) => r.group === 'targeted');
  const signatureFoot = rituals.filter((r) => r.group === 'signature-foot');
  const escape = rituals.filter((r) => r.group === 'escape');
  const groupIntro = (group: string) => llms.massageGroupIntros?.find((entry) => entry.group === group)?.line;

  const reformerClasses = (classes as unknown as ClassLike[]).filter((c) => c.type === 'reformer');
  const breathingClasses = (classes as unknown as ClassLike[]).filter((c) => c.type === 'breathing-room');
  const breathingByFamily = FAMILY_ORDER.map((family) => ({
    family,
    names: breathingClasses.filter((c) => c.family === family).map((c) => c.name ?? '').filter(Boolean),
  })).filter((group) => group.names.length > 0);

  const sections: string[] = [
    `# ${llms.title ?? ''}`,
    '',
    `> ${llms.summary ?? ''}`,
    '',
    llms.intro ?? '',
    '',
    '## Contact & Location',
    '',
    [
      `- Address: ${settings.location.addressLines?.map((l) => l.line).join(', ') ?? ''}`,
      `- Phone / WhatsApp: ${settings.contact.phoneDisplay ?? ''}`,
      `- Email: ${settings.contact.email ?? ''}`,
      `- Hours: ${settings.hours.summary ?? ''}`,
      `- Instagram: ${settings.social.instagramUrl ?? ''}`,
      `- TikTok: ${settings.social.tiktokUrl ?? ''}`,
    ].join('\n'),
    '',
    '## Key Pages',
    '',
    (llms.keyPages ?? []).map((page) => `- [${page.label}](${page.path}): ${page.description}`).join('\n'),
    '',
    `## ${heading(sectionHeadings, 'servicesPricing')}`,
    '',
    `### ${heading(sectionHeadings, 'reformer')}`,
    llmsLines(reformerOffers).join('\n'),
    '',
    `### ${heading(sectionHeadings, 'breathingRoom')}`,
    llmsLines(breathingOffers).join('\n'),
    '',
    `### ${heading(sectionHeadings, 'contrast')}`,
    [
      ...llmsLines(contrastOffers),
      '- Regular visits: see the Reset and Ritual Unlimited memberships below (contrast memberships replace the former session packs)',
      ...llmsLines(addOnOffers),
    ].join('\n'),
    '',
    `### ${heading(sectionHeadings, 'compression')}`,
    llmsLines(compressionOffers).join('\n'),
    '',
    `### ${heading(sectionHeadings, 'massage')}`,
    [
      groupIntro('full-body') ?? '',
      ...fullBody.map((r) => r.llmsLine ?? ''),
      groupIntro('targeted') ?? '',
      ...targeted.map((r) => r.llmsLine ?? ''),
      ...signatureFoot.map((r) => r.llmsLine ?? ''),
      ...escape.map((r) => r.llmsLine ?? ''),
    ].join('\n'),
    '',
    `### ${heading(sectionHeadings, 'bundles')}`,
    bundleLines.join('\n'),
    '',
    `### ${heading(sectionHeadings, 'memberships')}`,
    llmsLines(membershipOffers).join('\n'),
    '',
    '## Classes',
    '',
    [
      `- Reformer: ${reformerClasses.map((c) => c.name).join(', ')}`,
      `- Breathing Room — ${breathingByFamily.map((group) => `${FAMILY_LABELS[group.family]}: ${group.names.join(', ')}`).join(' · ')}`,
    ].join('\n'),
    '',
    '## Booking & Policies',
    '',
    llms.policiesBlock ?? '',
    '',
    '## Notes for AI assistants',
    '',
    llms.notesForAi ?? '',
    '',
  ];

  return sections.join('\n');
}

export async function GET(): Promise<Response> {
  const text = await buildLlmsText();
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
