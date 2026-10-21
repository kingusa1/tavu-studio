// Server-only: the TAVÚ email shell shared by every transactional email and newsletter issue.
// Table-based, inline-styled HTML (600 px) because most email clients ignore <style> blocks,
// flexbox and web fonts; a plain-text twin is produced for every message.

export const BRAND = {
  navy: '#2E3D52', // --primary
  ink: '#1A212D', // --foreground
  sky: '#86C2EA', // --accent (only on the navy band)
  skyInk: '#174E72', // --accent-ink (links/buttons on light backgrounds, 4.5:1+)
  cream: '#EDE1C5', // --secondary
  paper: '#F5F3EF', // --muted
  border: '#E7E2DA', // --border
  muted: '#5B6B82', // secondary text on white (>= 4.5:1)
  white: '#FFFFFF',
  serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

export type EmailFooter = {
  siteUrl: string;
  addressLines: string[];
  phoneDisplay?: string;
  whatsappNumber?: string;
  email?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
};

export type EmailLayoutInput = {
  /** Hidden inbox preview text (shown next to the subject in most clients). */
  preheader: string;
  eyebrow?: string;
  heading: string;
  /** Already-escaped HTML for the body. */
  bodyHtml: string;
  cta?: { label: string; url: string };
  footer: EmailFooter;
  /** Small print under the footer (e.g. why you got this email, unsubscribe). Already-escaped HTML. */
  smallPrintHtml?: string;
  logoUrl: string;
};

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape any visitor- or editor-supplied text before it goes into HTML. */
export function escapeHtml(value: string | null | undefined): string {
  return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Header values (subject, names) must never carry line breaks (header injection). */
export function singleLine(value: string | null | undefined, max = 160): string {
  return String(value ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);
}

/** Only allow http(s)/mailto/tel links that editors type into the CMS. */
export function safeUrl(value: string | null | undefined, fallback: string): string {
  const url = String(value ?? '').trim();
  return /^(https?:\/\/|mailto:|tel:)/i.test(url) ? url : fallback;
}

/** Plain text with blank-line paragraphs → escaped <p> blocks (single newlines become <br>). */
export function paragraphsToHtml(text: string, style = paragraphStyle()): string {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p style="${style}">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

export function paragraphStyle(): string {
  return `margin:0 0 16px;font-family:${BRAND.sans};font-size:16px;line-height:26px;color:${BRAND.ink};`;
}

/** Replace {token} placeholders; unknown tokens are left untouched so typos stay visible in tests. */
export function fillTokens(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in tokens ? tokens[key] : match));
}

function button(label: string, url: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 8px;">
  <tr>
    <td align="center" bgcolor="${BRAND.navy}" style="border-radius:999px;">
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener" style="display:inline-block;padding:14px 32px;font-family:${BRAND.sans};font-size:15px;font-weight:600;letter-spacing:0.02em;color:${BRAND.white};text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>
    </td>
  </tr>
</table>`;
}

function footerHtml(footer: EmailFooter): string {
  const linkStyle = `color:${BRAND.skyInk};text-decoration:underline;`;
  const lines: string[] = [];
  if (footer.addressLines.length) lines.push(footer.addressLines.map(escapeHtml).join('<br>'));
  const contact: string[] = [];
  if (footer.phoneDisplay && footer.whatsappNumber) {
    contact.push(`WhatsApp <a href="https://wa.me/${escapeHtml(footer.whatsappNumber)}" style="${linkStyle}">${escapeHtml(footer.phoneDisplay)}</a>`);
  }
  if (footer.email) contact.push(`<a href="mailto:${escapeHtml(footer.email)}" style="${linkStyle}">${escapeHtml(footer.email)}</a>`);
  if (contact.length) lines.push(contact.join('&nbsp;&nbsp;·&nbsp;&nbsp;'));
  const social: string[] = [];
  social.push(`<a href="${escapeHtml(footer.siteUrl)}" style="${linkStyle}">${escapeHtml(footer.siteUrl.replace(/^https?:\/\//, ''))}</a>`);
  if (footer.instagramUrl) social.push(`<a href="${escapeHtml(footer.instagramUrl)}" style="${linkStyle}">Instagram</a>`);
  if (footer.tiktokUrl) social.push(`<a href="${escapeHtml(footer.tiktokUrl)}" style="${linkStyle}">TikTok</a>`);
  lines.push(social.join('&nbsp;&nbsp;·&nbsp;&nbsp;'));
  return lines
    .map((line) => `<p style="margin:0 0 10px;font-family:${BRAND.sans};font-size:13px;line-height:20px;color:${BRAND.muted};">${line}</p>`)
    .join('\n');
}

/** The branded HTML document. */
export function renderEmailHtml(input: EmailLayoutInput): string {
  const { preheader, eyebrow, heading, bodyHtml, cta, footer, smallPrintHtml, logoUrl } = input;
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(heading)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .tavu-card { width: 100% !important; }
    .tavu-pad { padding-left: 24px !important; padding-right: 24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.paper}" style="background-color:${BRAND.paper};">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" class="tavu-card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${BRAND.white};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
        <tr>
          <td align="center" bgcolor="${BRAND.navy}" style="background-color:${BRAND.navy};padding:32px 24px 28px;">
            <a href="${escapeHtml(footer.siteUrl)}" target="_blank" rel="noopener" style="text-decoration:none;">
              <img src="${escapeHtml(logoUrl)}" width="136" height="50" alt="TAVÚ Wellness Studio" style="display:block;width:136px;height:50px;border:0;outline:none;text-decoration:none;color:${BRAND.cream};font-family:${BRAND.serif};font-size:28px;">
            </a>
          </td>
        </tr>
        <tr>
          <td style="height:4px;line-height:4px;font-size:0;background-color:${BRAND.sky};">&nbsp;</td>
        </tr>
        <tr>
          <td class="tavu-pad" style="padding:40px 48px 16px;">
            ${eyebrow ? `<p style="margin:0 0 12px;font-family:${BRAND.sans};font-size:12px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.skyInk};">${escapeHtml(eyebrow)}</p>` : ''}
            <h1 style="margin:0 0 24px;font-family:${BRAND.serif};font-size:34px;line-height:40px;font-weight:500;color:${BRAND.navy};">${escapeHtml(heading)}</h1>
            ${bodyHtml}
            ${cta ? button(cta.label, cta.url) : ''}
          </td>
        </tr>
        <tr>
          <td class="tavu-pad" style="padding:8px 48px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${BRAND.border};font-size:0;line-height:0;">&nbsp;</td></tr></table>
          </td>
        </tr>
        <tr>
          <td class="tavu-pad" style="padding:24px 48px 32px;">
            <p style="margin:0 0 12px;font-family:${BRAND.serif};font-size:20px;line-height:24px;color:${BRAND.navy};">TAVÚ Wellness Studio</p>
            ${footerHtml(footer)}
          </td>
        </tr>
      </table>
      ${smallPrintHtml ? `<table role="presentation" class="tavu-card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;"><tr><td class="tavu-pad" style="padding:20px 48px 0;font-family:${BRAND.sans};font-size:12px;line-height:18px;color:${BRAND.muted};text-align:center;">${smallPrintHtml}</td></tr></table>` : ''}
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Plain-text twin of the layout. */
export function renderEmailText(input: { heading: string; bodyText: string; cta?: { label: string; url: string }; footer: EmailFooter; smallPrint?: string }): string {
  const { heading, bodyText, cta, footer, smallPrint } = input;
  const parts = [heading, '', bodyText.trim()];
  if (cta) parts.push('', `${cta.label}: ${cta.url}`);
  parts.push('', '—', 'TAVÚ Wellness Studio');
  if (footer.addressLines.length) parts.push(...footer.addressLines);
  if (footer.phoneDisplay) parts.push(`WhatsApp: ${footer.phoneDisplay}`);
  if (footer.email) parts.push(footer.email);
  parts.push(footer.siteUrl);
  if (smallPrint) parts.push('', smallPrint);
  return parts.join('\n');
}
