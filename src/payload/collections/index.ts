import type { CollectionConfig } from 'payload';

import { Classes } from './Classes';
import { ContactSubmissions } from './ContactSubmissions';
import { Events } from './Events';
import { LegalPages } from './LegalPages';
import { MassageRituals } from './MassageRituals';
import { Media } from './Media';
import { NewsletterIssues } from './NewsletterIssues';
import { NewsletterSubscribers } from './NewsletterSubscribers';
import { Offers } from './Offers';
import { Policies } from './Policies';
import { Testimonials } from './Testimonials';
import { Users } from './Users';

/**
 * Every collection, registered once. `payload.config.ts` imports only this array — adding or
 * replacing a stub's contents (packages A–D) never touches this file (CMS-Content-Model.md §6
 * rule 4).
 */
export const collections: CollectionConfig[] = [
  Users,
  Media,
  Offers,
  MassageRituals,
  Classes,
  Policies,
  Events,
  Testimonials,
  LegalPages,
  ContactSubmissions,
  NewsletterSubscribers,
  NewsletterIssues,
];
