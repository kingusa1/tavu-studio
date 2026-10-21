import type { Field, GlobalConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { isAdminOrEditor } from '../../access/isAdminOrEditor';
import { ctaSection } from '../../fields/ctaSection';
import { image } from '../../fields/image';
import { link } from '../../fields/link';
import { accentSelect, iconSelect } from '../../fields/options';
import { seo } from '../../fields/seo';
import { revalidateGlobalAfterChange } from '../../hooks/revalidateSite';

/** Reused by `hero.primaryCta`/`hero.secondaryCta` and `testimonials.primaryCta`/`.secondaryCta`. */
const ctaLink = (name: string): Field => link({ name });

/**
 * The home page (CMS-Content-Model.md §3.5 `home-page`, package A). Sections render in today's
 * fixed order — Hero, Packages, ServicesExplorer, About, Method, SocialFeed, [Testimonials],
 * Contact (page.tsx:45-51) — there is no reordering; `enabled = false` just removes a section.
 * Each named tab below stores data exactly like a group of the same name (§3 convention), so
 * `home-page.hero.badge` etc. works either way.
 */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
    description: 'The home page (/). Sections appear in this fixed order; turn a section off with its "Show this section" toggle instead of deleting its content.',
  },
  access: {
    read: authenticated,
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            {
              name: 'slides',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { description: 'The rotating background slides behind the headline.' },
              fields: [
                image(),
                { name: 'title', type: 'text', required: true, admin: { description: 'The word that animates in after "Wellness", e.g. "Movement".' } },
                { name: 'subtitle', type: 'text' },
                { name: 'description', type: 'text' },
                accentSelect('hero', 'accent'),
              ],
            },
            { name: 'badge', type: 'text', admin: { description: 'Small pill above the headline.' } },
            { name: 'headlineLead', type: 'text', admin: { description: 'The static first word of the headline (today "Wellness").' } },
            { name: 'subLine1', type: 'text' },
            { name: 'subLine2', type: 'text' },
            { name: 'subLineItalic', type: 'text' },
            { name: 'subLineSupport', type: 'text' },
            { name: 'taLabel', type: 'text' },
            { name: 'taText', type: 'text' },
            { name: 'vuLabel', type: 'text' },
            { name: 'vuText', type: 'text' },
            ctaLink('primaryCta'),
            ctaLink('secondaryCta'),
          ],
        },
        {
          name: 'packages',
          label: 'Packages',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'showVatNote',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Show the "prices exclude VAT" note under the heading.' },
            },
            {
              name: 'note',
              type: 'text',
              admin: {
                description:
                  'Card titles, subtitles and "Book" buttons come from Site Settings → Price Cards. Rows come from Prices & Packages items marked "Show on Home".',
                readOnly: true,
              },
            },
          ],
        },
        {
          name: 'servicesExplorer',
          label: 'Services Explorer',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'ctaLabel', type: 'text', admin: { description: 'Button label under each service, e.g. "Learn More".' } },
            {
              name: 'items',
              type: 'array',
              admin: { description: 'One tab per service. They rotate automatically every 5 seconds.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'tagline', type: 'text' },
                { name: 'description', type: 'textarea' },
                image(),
                {
                  name: 'imagePosition',
                  type: 'select',
                  // Postgres 63-char identifier limit (R9): the versioned enum name
                  // "home_page_v_version_services_explorer_items_image_position" is 64 chars.
                  dbName: 'svc_explorer_img_pos',
                  defaultValue: 'center',
                  admin: { description: 'Use "Center (40%)" for a tall image that needs to crop higher, e.g. a mirror wall.' },
                  options: [
                    { label: 'Center', value: 'center' },
                    { label: 'Center (40%)', value: 'center-40' },
                  ],
                },
                {
                  name: 'highlights',
                  type: 'array',
                  // R9: the versioned table name plus its auto index/FK suffixes exceed 63 chars.
                  dbName: 'svc_explorer_highlights',
                  fields: [{ name: 'text', type: 'text' }],
                },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          name: 'about',
          label: 'About',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'headingLine1', type: 'text' },
            { name: 'headingLead', type: 'text' },
            { name: 'headingEmphasis', type: 'text', admin: { description: 'Rendered in italic, e.g. "pause".' } },
            { name: 'headingTail', type: 'text' },
            {
              name: 'body',
              type: 'richText',
              admin: { description: 'Bold text renders in the brand accent colour.' },
            },
            link({ name: 'link' }),
            {
              name: 'images',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              admin: { description: 'Exactly 3 images for the photo collage.' },
              fields: [image()],
            },
          ],
        },
        {
          name: 'method',
          label: 'Method',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'headingLead', type: 'text' },
            { name: 'headingEmphasis', type: 'text' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'pillars',
              type: 'array',
              maxRows: 3,
              admin: { description: 'Up to 3 pillar cards (today: Movement and Breath). They rotate automatically.' },
              fields: [
                { name: 'number', type: 'text', admin: { description: 'E.g. "01".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'subtitle', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'benefits', type: 'array', fields: [{ name: 'text', type: 'text' }] },
                image(),
                iconSelect('pillar'),
                accentSelect('pillar'),
                {
                  name: 'stats',
                  type: 'array',
                  maxRows: 3,
                  admin: { description: 'Up to 3 small stat badges, e.g. "15+", "50 min", "All Levels".' },
                  fields: [{ name: 'value', type: 'text' }],
                },
              ],
            },
            link({ name: 'cta' }),
            { name: 'autoPlayingLabel', type: 'text' },
            { name: 'resumeLabel', type: 'text' },
            { name: 'keyboardHint', type: 'text' },
          ],
        },
        {
          name: 'socialFeed',
          label: 'Social Feed',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'instagramButtonLabel', type: 'text' },
            { name: 'tiktokButtonLabel', type: 'text' },
            {
              name: 'showSetupGuide',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Shows a development-only reminder to connect Instagram when no live feed is configured. Never shown to site visitors in production (fix/social-feed hotfix).',
              },
            },
            {
              name: 'fallbackImages',
              type: 'array',
              admin: { description: 'Shown whenever the live Instagram feed is not connected.' },
              fields: [image()],
            },
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Show this section on the home page.' } },
            { name: 'eyebrow', type: 'text' },
            { name: 'headingLead', type: 'text' },
            { name: 'headingEmphasis', type: 'text' },
            { name: 'addressHeading', type: 'text' },
            { name: 'addressTitleLine', type: 'text' },
            { name: 'hoursHeading', type: 'text' },
            { name: 'contactHeading', type: 'text' },
            { name: 'mapTitle', type: 'text', admin: { description: 'The map iframe\'s accessibility title.' } },
            {
              name: 'note',
              type: 'text',
              admin: { description: 'Address, hours, email, WhatsApp and the map link come from Site Settings.', readOnly: true },
            },
          ],
        },
        {
          name: 'testimonials',
          label: 'Testimonials',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Off by default — this section is not shown on the live site today. Turn on once real testimonials are added.' },
            },
            { name: 'eyebrow', type: 'text' },
            { name: 'headingLead', type: 'text' },
            { name: 'headingEmphasis', type: 'text' },
            { name: 'headingTail', type: 'text' },
            { name: 'intro', type: 'textarea' },
            { name: 'ctaHeading', type: 'text' },
            { name: 'ctaText', type: 'text' },
            ctaLink('primaryCta'),
            ctaLink('secondaryCta'),
            {
              name: 'note',
              type: 'text',
              admin: { description: 'The testimonials themselves are managed under Classes & Events → Testimonials.', readOnly: true },
            },
          ],
        },
        { label: 'SEO', fields: [seo()] },
      ],
    },
  ],
};
