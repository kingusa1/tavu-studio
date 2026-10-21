// Server-only: every email the website sends, built on the shared TAVÚ layout.
import type { EmailContext } from './context';
import { firstNameOf } from './context';
import {
  BRAND,
  escapeHtml,
  fillTokens,
  paragraphStyle,
  paragraphsToHtml,
  renderEmailHtml,
  renderEmailText,
  safeUrl,
  singleLine,
} from './layout';

export type BuiltEmail = { subject: string; html: string; text: string };

const DUBAI_TIME = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dubai',
  dateStyle: 'medium',
  timeStyle: 'short',
});

function signOffHtml(ctx: EmailContext): string {
  return `<p style="${paragraphStyle()}margin-top:8px;">${escapeHtml(ctx.settings.signOff).replace(/\n/g, '<br>')}</p>`;
}

function quoteBlock(label: string, message: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
  <tr>
    <td style="background-color:${BRAND.paper};border-left:3px solid ${BRAND.sky};border-radius:8px;padding:16px 20px;">
      <p style="margin:0 0 8px;font-family:${BRAND.sans};font-size:12px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(label)}</p>
      <p style="margin:0;font-family:${BRAND.sans};font-size:15px;line-height:24px;color:${BRAND.ink};white-space:pre-wrap;">${escapeHtml(message)}</p>
    </td>
  </tr>
</table>`;
}

function detailRows(rows: [string, string][]): string {
  const cells = rows
    .map(
      ([label, valueHtml]) => `
  <tr>
    <td valign="top" style="padding:10px 16px 10px 0;width:120px;font-family:${BRAND.sans};font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">${escapeHtml(label)}</td>
    <td valign="top" style="padding:10px 0;font-family:${BRAND.sans};font-size:15px;line-height:22px;color:${BRAND.ink};border-bottom:1px solid ${BRAND.border};">${valueHtml}</td>
  </tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">${cells}</table>`;
}

export type ContactMessage = { id: string | number; name: string; email: string; message: string; page?: string | null; createdAt?: string };

/** Notification to the TAVÚ team; Reply-To is the visitor. */
export function contactTeamEmail(msg: ContactMessage, ctx: EmailContext): BuiltEmail {
  const name = singleLine(msg.name, 100);
  const received = DUBAI_TIME.format(msg.createdAt ? new Date(msg.createdAt) : new Date());
  const adminUrl = `${ctx.siteUrl}/admin/collections/contact-submissions/${encodeURIComponent(String(msg.id))}`;
  const link = `color:${BRAND.skyInk};text-decoration:underline;`;
  const pageUrl = msg.page ? safeUrl(msg.page.startsWith('/') ? `${ctx.siteUrl}${msg.page}` : msg.page, '') : '';

  const rows: [string, string][] = [
    ['Name', escapeHtml(name)],
    ['Email', `<a href="mailto:${escapeHtml(msg.email)}" style="${link}">${escapeHtml(msg.email)}</a>`],
    ['Received', `${escapeHtml(received)} (Abu Dhabi time)`],
  ];
  if (pageUrl) rows.push(['Sent from', `<a href="${escapeHtml(pageUrl)}" style="${link}">${escapeHtml(msg.page)}</a>`]);

  const bodyHtml = `
<p style="${paragraphStyle()}">A new message was sent through the contact form on the website. Reply to this email to answer ${escapeHtml(firstNameOf(name))} directly.</p>
${detailRows(rows)}
${quoteBlock('Message', msg.message)}`;

  const subject = singleLine(fillTokens(ctx.settings.contactForm.teamSubject, { name }), 160);
  const html = renderEmailHtml({
    preheader: `${name}: ${singleLine(msg.message, 110)}`,
    eyebrow: 'Website enquiry',
    heading: 'New message from the website',
    bodyHtml,
    cta: { label: 'Open in the CMS', url: adminUrl },
    footer: ctx.footer,
    logoUrl: ctx.logoUrl,
    smallPrintHtml: 'Sent automatically by tavustudio.com. The message is also saved under “Contact submissions” in the CMS.',
  });
  const text = renderEmailText({
    heading: 'New message from the website',
    bodyText: [`Name: ${name}`, `Email: ${msg.email}`, `Received: ${received} (Abu Dhabi time)`, pageUrl ? `Sent from: ${pageUrl}` : '', '', 'Message:', msg.message]
      .filter((line, i, all) => line !== '' || all[i - 1] !== '')
      .join('\n'),
    cta: { label: 'Open in the CMS', url: adminUrl },
    footer: ctx.footer,
  });
  return { subject, html, text };
}

/** Thank-you email to the visitor, with a copy of their message. */
export function contactThankYouEmail(msg: ContactMessage, ctx: EmailContext): BuiltEmail {
  const cf = ctx.settings.contactForm;
  const tokens = { name: firstNameOf(msg.name), ...ctx.tokens };
  const heading = singleLine(fillTokens(cf.thankYouHeading, tokens), 120);
  const body = fillTokens(cf.thankYouBody, tokens);
  const cta = { label: singleLine(cf.thankYouCtaLabel, 60), url: safeUrl(cf.thankYouCtaUrl, `${ctx.siteUrl}/schedule`) };

  const html = renderEmailHtml({
    preheader: singleLine(body, 140),
    eyebrow: 'Message received',
    heading,
    // The visitor's own message is deliberately not repeated: an attacker could otherwise use the
    // form to send their text to any address, branded and from connect@tavustudio.com.
    bodyHtml: paragraphsToHtml(body),
    cta,
    closingHtml: signOffHtml(ctx),
    footer: ctx.footer,
    logoUrl: ctx.logoUrl,
    smallPrintHtml: 'You are receiving this email because you contacted TAVÚ Wellness Studio through tavustudio.com.',
  });
  const text = renderEmailText({
    heading,
    bodyText: `${body}\n\n${ctx.settings.signOff}`,
    cta,
    footer: ctx.footer,
    smallPrint: 'You are receiving this email because you contacted TAVÚ Wellness Studio through tavustudio.com.',
  });
  return { subject: singleLine(fillTokens(cf.thankYouSubject, tokens)), html, text };
}

/** Double opt-in confirmation. */
export function newsletterConfirmEmail(input: { firstName?: string | null; confirmUrl: string }, ctx: EmailContext): BuiltEmail {
  const nl = ctx.settings.newsletter;
  const tokens = { name: firstNameOf(input.firstName), ...ctx.tokens };
  const heading = singleLine(fillTokens(nl.confirmHeading, tokens), 120);
  const body = fillTokens(nl.confirmBody, tokens);
  const cta = { label: singleLine(nl.confirmCtaLabel, 60), url: input.confirmUrl };
  const small = 'This link expires in 48 hours. You received this email because someone entered this address on tavustudio.com.';
  return {
    subject: singleLine(fillTokens(nl.confirmSubject, tokens)),
    html: renderEmailHtml({ preheader: singleLine(body, 140), eyebrow: 'Newsletter', heading, bodyHtml: paragraphsToHtml(body), cta, footer: ctx.footer, logoUrl: ctx.logoUrl, smallPrintHtml: escapeHtml(small) }),
    text: renderEmailText({ heading, bodyText: body, cta, footer: ctx.footer, smallPrint: small }),
  };
}

/** Sent once the subscription is confirmed. */
export function newsletterWelcomeEmail(input: { firstName?: string | null; unsubscribeUrl: string }, ctx: EmailContext): BuiltEmail {
  const nl = ctx.settings.newsletter;
  const tokens = { name: firstNameOf(input.firstName), ...ctx.tokens };
  const heading = singleLine(fillTokens(nl.welcomeHeading, tokens), 120);
  const body = fillTokens(nl.welcomeBody, tokens);
  const cta = { label: singleLine(nl.welcomeCtaLabel, 60), url: safeUrl(nl.welcomeCtaUrl, `${ctx.siteUrl}/blog`) };
  const unsubscribe = `<a href="${escapeHtml(input.unsubscribeUrl)}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe</a>`;
  return {
    subject: singleLine(fillTokens(nl.welcomeSubject, tokens)),
    html: renderEmailHtml({
      preheader: singleLine(body, 140),
      eyebrow: 'Newsletter',
      heading,
      bodyHtml: paragraphsToHtml(body),
      cta,
      closingHtml: signOffHtml(ctx),
      footer: ctx.footer,
      logoUrl: ctx.logoUrl,
      smallPrintHtml: `You are receiving this email because you subscribed to the TAVÚ newsletter. ${unsubscribe}`,
    }),
    text: renderEmailText({
      heading,
      bodyText: `${body}\n\n${ctx.settings.signOff}`,
      cta,
      footer: ctx.footer,
      smallPrint: `You are receiving this email because you subscribed to the TAVÚ newsletter. Unsubscribe: ${input.unsubscribeUrl}`,
    }),
  };
}

/**
 * A newsletter issue. `contentHtml` is the CMS rich text converted to HTML (trusted editor
 * content); Resend replaces {{{RESEND_UNSUBSCRIBE_URL}}} per recipient.
 */
export function newsletterIssueEmail(
  input: { subject: string; preheader?: string | null; heading: string; contentHtml: string; cta?: { label: string; url: string } | null },
  ctx: EmailContext,
): BuiltEmail {
  const unsubscribe = `<a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe</a>`;
  const styledContent = input.contentHtml
    .replace(/<p>/g, `<p style="${paragraphStyle()}">`)
    .replace(/<h2>/g, `<h2 style="margin:28px 0 12px;font-family:${BRAND.serif};font-size:26px;line-height:32px;font-weight:500;color:${BRAND.navy};">`)
    .replace(/<h3>/g, `<h3 style="margin:24px 0 10px;font-family:${BRAND.serif};font-size:21px;line-height:28px;font-weight:500;color:${BRAND.navy};">`)
    .replace(/<a /g, `<a style="color:${BRAND.skyInk};text-decoration:underline;" `)
    .replace(/<(ul|ol)>/g, `<$1 style="margin:0 0 16px;padding-left:22px;font-family:${BRAND.sans};font-size:16px;line-height:26px;color:${BRAND.ink};">`)
    .replace(/<blockquote>/g, `<blockquote style="margin:0 0 16px;padding:12px 20px;border-left:3px solid ${BRAND.sky};background-color:${BRAND.paper};font-family:${BRAND.serif};font-size:19px;line-height:28px;color:${BRAND.navy};">`)
    .replace(/<img /g, '<img style="display:block;max-width:100%;height:auto;border:0;border-radius:12px;margin:0 0 16px;" ');
  const cta = input.cta && input.cta.label && input.cta.url ? { label: singleLine(input.cta.label, 60), url: safeUrl(input.cta.url, ctx.siteUrl) } : undefined;
  const plain = input.contentHtml.replace(/<\/(p|h2|h3|li|blockquote)>/g, '\n\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\n{3,}/g, '\n\n');
  return {
    subject: singleLine(input.subject),
    html: renderEmailHtml({
      preheader: singleLine(input.preheader || plain, 140),
      eyebrow: 'Notes from the studio',
      heading: singleLine(input.heading, 140),
      bodyHtml: styledContent,
      cta,
      closingHtml: signOffHtml(ctx),
      footer: ctx.footer,
      logoUrl: ctx.logoUrl,
      smallPrintHtml: `You are receiving this email because you subscribed to the TAVÚ newsletter at tavustudio.com. ${unsubscribe}`,
    }),
    text: renderEmailText({
      heading: singleLine(input.heading, 140),
      bodyText: `${plain.trim()}\n\n${ctx.settings.signOff}`,
      cta,
      footer: ctx.footer,
      smallPrint: 'You are receiving this email because you subscribed to the TAVÚ newsletter at tavustudio.com. Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}',
    }),
  };
}

/** CMS "Forgot password?" email (Payload calls this from the Users collection). */
export function passwordResetEmail(input: { name?: string | null; email: string; resetUrl: string }, ctx: EmailContext): BuiltEmail {
  const greeting = input.name ? `Hi ${firstNameOf(input.name)},` : 'Hello,';
  const body =
    `${greeting}\n\nWe received a request to reset the password for the TAVÚ website editor account ${input.email}. ` +
    'Press the button below to choose a new password. The link works for one hour and can be used once.\n\n' +
    'If you did not ask for this, you can ignore this email. Your password stays the same.';
  const cta = { label: 'Choose a new password', url: input.resetUrl };
  const small = 'For your security, never forward this email or share the link.';
  return {
    subject: 'Reset your TAVÚ CMS password',
    html: renderEmailHtml({
      preheader: 'Use this link within one hour to choose a new password for the TAVÚ CMS.',
      eyebrow: 'TAVÚ CMS',
      heading: 'Reset your password',
      bodyHtml: paragraphsToHtml(body),
      cta,
      footer: ctx.footer,
      logoUrl: ctx.logoUrl,
      smallPrintHtml: escapeHtml(small),
    }),
    text: renderEmailText({ heading: 'Reset your password', bodyText: body, cta, footer: ctx.footer, smallPrint: small }),
  };
}
