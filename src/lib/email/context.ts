// Server-only: loads `email-settings` + `site-settings` once per send and merges them with
// EMAIL_DEFAULTS, so an empty CMS field never produces an empty email.
import type { Payload } from 'payload';

import { EMAIL_DEFAULTS, type EmailSettingsValue } from './defaults';
import { singleLine, type EmailFooter } from './layout';

export type EmailContext = {
  settings: EmailSettingsValue;
  footer: EmailFooter;
  siteUrl: string;
  logoUrl: string;
  /** "TAVÚ Wellness Studio <connect@tavustudio.com>" */
  from: string;
  fromAddress: string;
  tokens: { phone: string; email: string };
};

type Loose = Record<string, unknown> | null | undefined;

function pick<T>(fallback: T, value: unknown): T {
  if (typeof fallback === 'boolean') return (typeof value === 'boolean' ? value : fallback) as T;
  if (Array.isArray(fallback)) return (Array.isArray(value) && value.length > 0 ? value : fallback) as T;
  if (typeof fallback === 'string') return (typeof value === 'string' && value.trim() ? value : fallback) as T;
  return fallback;
}

function mergeGroup<T extends Record<string, unknown>>(defaults: T, raw: Loose): T {
  const out: Record<string, unknown> = {};
  for (const [key, fallback] of Object.entries(defaults)) out[key] = pick(fallback, raw?.[key]);
  return out as T;
}

export async function loadEmailContext(payload: Payload): Promise<EmailContext> {
  const [raw, site] = await Promise.all([
    payload.findGlobal({ slug: 'email-settings', overrideAccess: true, depth: 0 }).catch(() => null) as Promise<Loose>,
    payload.findGlobal({ slug: 'site-settings', overrideAccess: true, depth: 0 }).catch(() => null) as Promise<Loose>,
  ]);

  const newsletterRaw = raw?.newsletter as Loose;
  const settings: EmailSettingsValue = {
    sender: mergeGroup({ ...EMAIL_DEFAULTS.sender }, raw?.sender as Loose),
    contactForm: mergeGroup(
      { ...EMAIL_DEFAULTS.contactForm, teamRecipients: EMAIL_DEFAULTS.contactForm.teamRecipients.map((r) => ({ ...r })) },
      raw?.contactForm as Loose,
    ),
    newsletter: {
      ...mergeGroup({ ...EMAIL_DEFAULTS.newsletter }, newsletterRaw),
      segmentId: typeof newsletterRaw?.segmentId === 'string' && newsletterRaw.segmentId ? newsletterRaw.segmentId : null,
    },
    signOff: pick(EMAIL_DEFAULTS.signOff as string, raw?.signOff),
  };

  const brand = (site?.brand ?? {}) as Record<string, unknown>;
  const contact = (site?.contact ?? {}) as Record<string, unknown>;
  const location = (site?.location ?? {}) as Record<string, unknown>;
  const social = (site?.social ?? {}) as Record<string, unknown>;

  // NEXT_PUBLIC_SERVER_URL wins so local/preview tests link back to themselves; production sets it to
  // https://tavustudio.com. Never derived from the request Host header (link poisoning).
  const siteUrl = String(process.env.NEXT_PUBLIC_SERVER_URL || brand.siteUrl || 'https://tavustudio.com').replace(/\/+$/, '');
  const addressLines = Array.isArray(location.addressLines)
    ? (location.addressLines as { line?: string }[]).map((row) => row.line || '').filter(Boolean)
    : [];

  const footer: EmailFooter = {
    siteUrl,
    addressLines,
    phoneDisplay: (contact.phoneDisplay as string) || undefined,
    whatsappNumber: (contact.whatsappNumber as string) || undefined,
    email: (contact.email as string) || settings.sender.fromAddress,
    instagramUrl: (social.instagramUrl as string) || undefined,
    tiktokUrl: (social.tiktokUrl as string) || undefined,
  };

  const fromAddress = settings.sender.fromAddress;
  return {
    settings,
    footer,
    siteUrl,
    // The logo must load in any inbox, so it always comes from the public site (even in local tests).
    logoUrl: `${String(brand.siteUrl || 'https://tavustudio.com').replace(/\/+$/, '')}/logo.png`,
    from: `${singleLine(settings.sender.fromName, 80)} <${fromAddress}>`,
    fromAddress,
    tokens: { phone: footer.phoneDisplay || '', email: footer.email || fromAddress },
  };
}

/** First name for greetings ("Sara Ahmed" → "Sara"); empty when unknown (see fillTokens). */
export function firstNameOf(name: string | null | undefined): string {
  return singleLine(name, 80).split(' ')[0] || '';
}
