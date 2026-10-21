import type { GlobalConfig } from 'payload';

import { isAdminField } from '../access/isAdmin';
import { authenticated } from '../access/authenticated';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { link } from '../fields/link';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Site-wide data fetched once per request by `getSiteData()` (§5.2) and provided to client
 * components via `SiteDataProvider` (CMS-Content-Model.md §3.1).
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site',
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
          name: 'brand',
          label: 'Brand',
          fields: [
            { name: 'siteName', type: 'text' },
            { name: 'alternateName', type: 'text' },
            { name: 'legalName', type: 'text' },
            { name: 'siteUrl', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoAlt', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [
            { name: 'phoneDisplay', type: 'text' },
            { name: 'phoneE164', type: 'text' },
            { name: 'whatsappNumber', type: 'text' },
            { name: 'email', type: 'email' },
          ],
        },
        {
          name: 'location',
          label: 'Location',
          fields: [
            { name: 'addressLines', type: 'array', fields: [{ name: 'line', type: 'text' }] },
            {
              name: 'addressShortLines',
              type: 'array',
              // §7 R9: the generated parent_id index/fk names exceed 63 characters at this nesting depth.
              dbName: 'ss_addr_short_lines',
              fields: [{ name: 'line', type: 'text' }],
            },
            { name: 'locality', type: 'text' },
            { name: 'region', type: 'text' },
            { name: 'country', type: 'text' },
            { name: 'mapsUrl', type: 'text' },
            { name: 'mapEmbedUrl', type: 'text' },
          ],
        },
        {
          name: 'hours',
          label: 'Hours',
          fields: [
            { name: 'displayLines', type: 'array', fields: [{ name: 'line', type: 'text' }] },
            { name: 'summary', type: 'text' },
            { name: 'opens', type: 'text' },
            { name: 'closes', type: 'text' },
            {
              name: 'days',
              type: 'select',
              hasMany: true,
              options: WEEKDAYS.map((day) => ({ label: day, value: day })),
            },
          ],
        },
        {
          name: 'social',
          label: 'Social',
          fields: [
            { name: 'instagramUrl', type: 'text' },
            { name: 'instagramHandle', type: 'text' },
            { name: 'tiktokUrl', type: 'text' },
            { name: 'facebookUrl', type: 'text' },
          ],
        },
        {
          name: 'pricing',
          label: 'Pricing',
          fields: [
            { name: 'vatNote', type: 'text' },
            { name: 'currencyLabel', type: 'text', defaultValue: 'AED' },
          ],
        },
        {
          label: 'Price cards',
          fields: [
            {
              name: 'priceCards',
              type: 'array',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  unique: true,
                  options: ['reformer', 'breathing-room', 'contrast', 'compression', 'massage', 'bundle', 'membership'].map(
                    (value) => ({ label: value, value }),
                  ),
                },
                { name: 'title', type: 'text' },
                { name: 'subtitle', type: 'text' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaHref', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'mindbody',
          label: 'Booking (Mindbody)',
          fields: [
            { name: 'scheduleWidgetId', type: 'text', access: { update: isAdminField } },
            { name: 'appointmentsWidgetId', type: 'text', access: { update: isAdminField } },
            { name: 'registrationWidgetId', type: 'text', access: { update: isAdminField } },
            { name: 'loginSiteId', type: 'text', access: { update: isAdminField } },
            { name: 'loginMbSiteId', type: 'text', access: { update: isAdminField } },
          ],
        },
        {
          label: 'Facts',
          fields: [
            {
              name: 'facts',
              type: 'array',
              fields: [
                { name: 'key', type: 'text', required: true, unique: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO defaults',
          fields: [
            { name: 'titleDefault', type: 'text' },
            { name: 'titleTemplate', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'keywords', type: 'text', hasMany: true },
            { name: 'ogTitle', type: 'text' },
            { name: 'ogDescription', type: 'textarea' },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Leave empty to keep the static /opengraph-image.png (1200×630) — the OG URL does not change.',
              },
            },
            { name: 'ogImageAlt', type: 'text' },
            { name: 'twitterTitle', type: 'text' },
            { name: 'twitterDescription', type: 'textarea' },
            { name: 'locale', type: 'text', defaultValue: 'en_AE' },
          ],
        },
        {
          name: 'structuredData',
          label: 'Structured data',
          fields: [
            { name: 'description', type: 'textarea' },
            {
              name: 'logoUrl',
              type: 'text',
              admin: { description: 'Absolute URL, kept as text so JSON-LD does not switch to a Supabase URL.' },
            },
            { name: 'imageUrl', type: 'text' },
            {
              name: 'priceRange',
              type: 'text',
              admin: { description: 'Tokens allowed, e.g. {price:slug} AED - {price:slug} AED.' },
            },
            { name: 'currenciesAccepted', type: 'text', defaultValue: 'AED' },
            { name: 'paymentAccepted', type: 'text' },
            { name: 'areaServed', type: 'text' },
            {
              name: 'aggregates',
              type: 'array',
              // §7 R9: the generated parent_id index/fk names exceed 63 characters at this nesting depth.
              dbName: 'ss_struct_data_agg',
              fields: [
                {
                  name: 'source',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Massage rituals', value: 'massage-rituals' },
                    { label: 'Offers', value: 'offers' },
                  ],
                },
                {
                  name: 'category',
                  type: 'select',
                  // §7 R9: the full nested path (enum__site_settings_v_version_structured_data_
                  // aggregates_category) is 65 characters — over Postgres's 63-char identifier
                  // limit — so this needs a short dbName.
                  dbName: 'ssd_agg_cat',
                  admin: { condition: (_, siblingData) => siblingData?.source === 'offers' },
                  options: [
                    'reformer',
                    'breathing-room',
                    'contrast',
                    'compression',
                    'add-on',
                    'bundle',
                    'membership',
                  ].map((value) => ({ label: value, value })),
                },
                { name: 'name', type: 'text' },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { description: 'Tokens allowed.' },
                },
              ],
            },
          ],
        },
        {
          name: 'llms',
          label: 'llms.txt',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'summary', type: 'textarea' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'keyPages',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'path', type: 'text' },
                { name: 'description', type: 'text' },
              ],
            },
            {
              name: 'sectionHeadings',
              type: 'array',
              fields: [
                { name: 'key', type: 'text' },
                { name: 'heading', type: 'text' },
              ],
            },
            {
              name: 'massageGroupIntros',
              type: 'array',
              // §7 R9: the generated parent_id index/fk names exceed 63 characters at this nesting depth.
              dbName: 'ss_llms_massage_intros',
              fields: [
                { name: 'group', type: 'text' },
                { name: 'line', type: 'text' },
              ],
            },
            { name: 'policiesBlock', type: 'textarea' },
            { name: 'notesForAi', type: 'textarea' },
          ],
        },
        {
          name: 'announcement',
          label: 'Announcement',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: false },
            { name: 'text', type: 'text' },
            link({ name: 'link' }),
          ],
        },
        {
          name: 'analytics',
          label: 'Analytics',
          fields: [{ name: 'metaPixelId', type: 'text', access: { update: isAdminField } }],
        },
      ],
    },
  ],
};
