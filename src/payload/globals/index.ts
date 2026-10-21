import type { GlobalConfig } from 'payload';

import { Footer } from './Footer';
import { Header } from './Header';
import { SiteSettings } from './SiteSettings';
import { SystemPages } from './SystemPages';
import { AboutPage } from './pages/AboutPage';
import { AccountPage } from './pages/AccountPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { BlogPage } from './pages/BlogPage';
import { BreathingRoomPage } from './pages/BreathingRoomPage';
import { ClassesPage } from './pages/ClassesPage';
import { CompressionTherapyPage } from './pages/CompressionTherapyPage';
import { ContactPage } from './pages/ContactPage';
import { ContrastTherapyPage } from './pages/ContrastTherapyPage';
import { EventsPage } from './pages/EventsPage';
import { HomePage } from './pages/HomePage';
import { MassagePage } from './pages/MassagePage';
import { MembershipsPage } from './pages/MembershipsPage';
import { MethodPage } from './pages/MethodPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { PricingPage } from './pages/PricingPage';
import { RecoveryPage } from './pages/RecoveryPage';
import { ReformerPilatesPage } from './pages/ReformerPilatesPage';
import { RegisterPage } from './pages/RegisterPage';
import { SchedulePage } from './pages/SchedulePage';
import { ServicesPage } from './pages/ServicesPage';

/**
 * Every global, registered once. `payload.config.ts` imports only this array — adding or
 * replacing a stub's contents (packages A–D) never touches this file (CMS-Content-Model.md §6
 * rule 4). 4 site-wide globals + 20 page globals = 24 (§0 D1).
 */
export const globals: GlobalConfig[] = [
  SiteSettings,
  Header,
  Footer,
  SystemPages,
  HomePage,
  AboutPage,
  MethodPage,
  ClassesPage,
  SchedulePage,
  AppointmentsPage,
  PricingPage,
  MembershipsPage,
  RecoveryPage,
  ServicesPage,
  ReformerPilatesPage,
  BreathingRoomPage,
  ContrastTherapyPage,
  CompressionTherapyPage,
  MassagePage,
  EventsPage,
  PartnershipsPage,
  ContactPage,
  RegisterPage,
  AccountPage,
  BlogPage,
];
