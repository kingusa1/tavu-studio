import type { CollectionConfig } from 'payload';

import { Authors } from './Authors';
import { Categories } from './Categories';
import { Classes } from './Classes';
import { ContactSubmissions } from './ContactSubmissions';
import { Events } from './Events';
import { Faqs } from './Faqs';
import { LegalPages } from './LegalPages';
import { MassageRituals } from './MassageRituals';
import { Media } from './Media';
import { Offers } from './Offers';
import { Policies } from './Policies';
import { Posts } from './Posts';
import { Testimonials } from './Testimonials';
import { Users } from './Users';

/**
 * Every collection, registered once. `payload.config.ts` imports only this array — adding or
 * replacing a stub's contents (packages A–D) never touches this file (CMS-Content-Model.md §6
 * rule 4). Posts/Categories/Authors/Faqs added by package E (blog + FAQ, brief §A/§C).
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
  Posts,
  Categories,
  Authors,
  Faqs,
];
