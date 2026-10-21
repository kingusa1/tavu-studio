import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_offers_category" AS ENUM('reformer', 'breathing-room', 'contrast', 'compression', 'add-on', 'bundle', 'membership');
  CREATE TYPE "payload"."enum_offers_kind" AS ENUM('drop-in', 'class-pack', 'session', 'package', 'bundle', 'membership', 'add-on');
  CREATE TYPE "payload"."enum_offers_structured_data_mode" AS ENUM('none', 'offer');
  CREATE TYPE "payload"."enum__offers_v_version_category" AS ENUM('reformer', 'breathing-room', 'contrast', 'compression', 'add-on', 'bundle', 'membership');
  CREATE TYPE "payload"."enum__offers_v_version_kind" AS ENUM('drop-in', 'class-pack', 'session', 'package', 'bundle', 'membership', 'add-on');
  CREATE TYPE "payload"."enum__offers_v_version_structured_data_mode" AS ENUM('none', 'offer');
  CREATE TYPE "payload"."enum_massage_rituals_group" AS ENUM('full-body', 'targeted', 'signature-foot', 'escape');
  CREATE TYPE "payload"."enum__massage_rituals_v_version_group" AS ENUM('full-body', 'targeted', 'signature-foot', 'escape');
  CREATE TYPE "payload"."enum_classes_type" AS ENUM('reformer', 'breathing-room');
  CREATE TYPE "payload"."enum_classes_family" AS ENUM('tavu-mat', 'tavu-release', 'tavu-stretch');
  CREATE TYPE "payload"."enum_classes_level" AS ENUM('foundation', 'all-levels', 'intermediate', 'advanced');
  CREATE TYPE "payload"."enum__classes_v_version_type" AS ENUM('reformer', 'breathing-room');
  CREATE TYPE "payload"."enum__classes_v_version_family" AS ENUM('tavu-mat', 'tavu-release', 'tavu-stretch');
  CREATE TYPE "payload"."enum__classes_v_version_level" AS ENUM('foundation', 'all-levels', 'intermediate', 'advanced');
  CREATE TYPE "payload"."enum_policies_show_on" AS ENUM('schedule', 'classes', 'appointments');
  CREATE TYPE "payload"."enum__policies_v_version_show_on" AS ENUM('schedule', 'classes', 'appointments');
  CREATE TYPE "payload"."enum_events_kind" AS ENUM('upcoming', 'highlight');
  CREATE TYPE "payload"."enum__events_v_version_kind" AS ENUM('upcoming', 'highlight');
  CREATE TYPE "payload"."enum_legal_pages_slug" AS ENUM('terms-of-service', 'privacy-policy', 'editorial-policy');
  CREATE TYPE "payload"."enum_legal_pages_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__legal_pages_v_version_slug" AS ENUM('terms-of-service', 'privacy-policy', 'editorial-policy');
  CREATE TYPE "payload"."enum__legal_pages_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_contact_submissions_email_status" AS ENUM('sent', 'partial', 'failed', 'skipped');
  CREATE TYPE "payload"."enum_newsletter_subscribers_status" AS ENUM('pending', 'subscribed', 'unsubscribed');
  CREATE TYPE "payload"."enum_newsletter_issues_action" AS ENUM('none', 'test', 'send');
  CREATE TYPE "payload"."enum_newsletter_issues_status" AS ENUM('draft', 'sent');
  CREATE TYPE "payload"."enum__newsletter_issues_v_version_action" AS ENUM('none', 'test', 'send');
  CREATE TYPE "payload"."enum__newsletter_issues_v_version_status" AS ENUM('draft', 'sent');
  CREATE TYPE "payload"."enum_posts_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__posts_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_categories_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__categories_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_faqs_topic" AS ENUM('general', 'reformer-pilates', 'breathing-room', 'contrast-therapy', 'compression-therapy', 'massage', 'memberships-pricing', 'booking');
  CREATE TYPE "payload"."enum__faqs_v_version_topic" AS ENUM('general', 'reformer-pilates', 'breathing-room', 'contrast-therapy', 'compression-therapy', 'massage', 'memberships-pricing', 'booking');
  CREATE TYPE "payload"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "payload"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "payload"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "payload"."enum_site_settings_hours_days" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  CREATE TYPE "payload"."enum_site_settings_price_cards_category" AS ENUM('reformer', 'breathing-room', 'contrast', 'compression', 'massage', 'bundle', 'membership');
  CREATE TYPE "payload"."enum_ss_struct_data_agg_source" AS ENUM('massage-rituals', 'offers');
  CREATE TYPE "payload"."ssd_agg_cat" AS ENUM('reformer', 'breathing-room', 'contrast', 'compression', 'add-on', 'bundle', 'membership');
  CREATE TYPE "payload"."enum__site_settings_v_version_hours_days" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  CREATE TYPE "payload"."enum__site_settings_v_version_price_cards_category" AS ENUM('reformer', 'breathing-room', 'contrast', 'compression', 'massage', 'bundle', 'membership');
  CREATE TYPE "payload"."enum__ss_struct_data_agg_v_source" AS ENUM('massage-rituals', 'offers');
  CREATE TYPE "payload"."enum_header_dropdowns_items_icon" AS ENUM('lines', 'chat-bubble', 'heart', 'bolt', 'building', 'mail', 'calendar', 'sparkles', 'briefcase');
  CREATE TYPE "payload"."enum__header_v_version_dropdowns_items_icon" AS ENUM('lines', 'chat-bubble', 'heart', 'bolt', 'building', 'mail', 'calendar', 'sparkles', 'briefcase');
  CREATE TYPE "payload"."enum_home_page_hero_slides_accent" AS ENUM('blue', 'cyan', 'amber');
  CREATE TYPE "payload"."svc_explorer_img_pos" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_home_page_method_pillars_icon" AS ENUM('pin', 'drop');
  CREATE TYPE "payload"."enum_home_page_method_pillars_accent" AS ENUM('blue', 'emerald', 'amber');
  CREATE TYPE "payload"."enum_home_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__home_page_v_version_hero_slides_accent" AS ENUM('blue', 'cyan', 'amber');
  CREATE TYPE "payload"."enum__home_page_v_version_method_pillars_icon" AS ENUM('pin', 'drop');
  CREATE TYPE "payload"."enum__home_page_v_version_method_pillars_accent" AS ENUM('blue', 'emerald', 'amber');
  CREATE TYPE "payload"."enum__home_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_about_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_about_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__about_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__about_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_method_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__method_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_classes_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_classes_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__classes_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__classes_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_schedule_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__schedule_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_appointments_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__appointments_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_pricing_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_pricing_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__pricing_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__pricing_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_memberships_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_memberships_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__memberships_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__memberships_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_recovery_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__recovery_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_services_page_items_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_services_page_items_accent" AS ENUM('blue', 'emerald', 'amber', 'cyan', 'rose');
  CREATE TYPE "payload"."enum_services_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_services_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__services_page_v_version_items_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__services_page_v_version_items_accent" AS ENUM('blue', 'emerald', 'amber', 'cyan', 'rose');
  CREATE TYPE "payload"."enum__services_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__services_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_reformer_pilates_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_reformer_pilates_page_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_reformer_pilates_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__reformer_pilates_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__reformer_pilates_page_v_version_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__reformer_pilates_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_breathing_room_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_breathing_room_page_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_breathing_room_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__breathing_room_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__breathing_room_page_v_version_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__breathing_room_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_contrast_therapy_page_benefits_items_icon" AS ENUM('bolt', 'heart', 'circulation', 'lightbulb');
  CREATE TYPE "payload"."enum_contrast_therapy_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_contrast_therapy_page_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_contrast_therapy_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__contrast_therapy_page_v_version_benefits_items_icon" AS ENUM('bolt', 'heart', 'circulation', 'lightbulb');
  CREATE TYPE "payload"."enum__contrast_therapy_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__contrast_therapy_page_v_version_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__contrast_therapy_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_compression_therapy_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_compression_therapy_page_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_compression_therapy_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__compression_therapy_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__compression_therapy_page_v_version_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__compression_therapy_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_massage_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_massage_page_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum_massage_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__massage_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__massage_page_v_version_hero_image_position" AS ENUM('center', 'center-40');
  CREATE TYPE "payload"."enum__massage_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_events_page_event_types_items_icon" AS ENUM('star', 'lock', 'users', 'moon');
  CREATE TYPE "payload"."enum_events_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_events_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__events_page_v_version_event_types_items_icon" AS ENUM('star', 'lock', 'users', 'moon');
  CREATE TYPE "payload"."enum__events_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__events_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_partnerships_page_types_items_icon" AS ENUM('corporate', 'sports', 'hotels', 'brand');
  CREATE TYPE "payload"."enum_partnerships_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_partnerships_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__partnerships_page_v_version_types_items_icon" AS ENUM('corporate', 'sports', 'hotels', 'brand');
  CREATE TYPE "payload"."enum__partnerships_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__partnerships_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_contact_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__contact_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_register_page_benefits_items_icon" AS ENUM('instant-booking', 'track-journey', 'manage-packages', 'exclusive-access');
  CREATE TYPE "payload"."enum_register_page_trust_badges_items_icon" AS ENUM('shield', 'lock', 'bolt');
  CREATE TYPE "payload"."enum_register_page_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum_register_page_quick_links_items_icon" AS ENUM('faq', 'schedule', 'about');
  CREATE TYPE "payload"."enum_register_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__register_page_v_version_benefits_items_icon" AS ENUM('instant-booking', 'track-journey', 'manage-packages', 'exclusive-access');
  CREATE TYPE "payload"."enum__register_page_v_version_trust_badges_items_icon" AS ENUM('shield', 'lock', 'bolt');
  CREATE TYPE "payload"."enum__register_page_v_version_cta_buttons_style" AS ENUM('primary', 'outline');
  CREATE TYPE "payload"."enum__register_page_v_version_quick_links_items_icon" AS ENUM('faq', 'schedule', 'about');
  CREATE TYPE "payload"."enum__register_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_account_page_features_items_icon" AS ENUM('book-classes', 'view-history', 'manage-packages', 'book-recovery');
  CREATE TYPE "payload"."enum_account_page_quick_actions_buttons_icon" AS ENUM('calendar', 'currency');
  CREATE TYPE "payload"."enum_account_page_trust_badges_items_icon" AS ENUM('shield', 'lock', 'bolt');
  CREATE TYPE "payload"."enum_account_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__account_page_v_version_features_items_icon" AS ENUM('book-classes', 'view-history', 'manage-packages', 'book-recovery');
  CREATE TYPE "payload"."enum__account_page_v_version_quick_actions_buttons_icon" AS ENUM('calendar', 'currency');
  CREATE TYPE "payload"."enum__account_page_v_version_trust_badges_items_icon" AS ENUM('shield', 'lock', 'bolt');
  CREATE TYPE "payload"."enum__account_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum_blog_page_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "payload"."enum__blog_page_v_version_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TABLE "payload"."offers_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."offers_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."offers_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."offers_recommended_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"admin_label" varchar,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "payload"."enum_offers_category" NOT NULL,
  	"kind" "payload"."enum_offers_kind",
  	"price" numeric NOT NULL,
  	"price_period" varchar,
  	"duration_short" varchar,
  	"duration_long" varchar,
  	"capacity_label" varchar,
  	"validity" varchar,
  	"complimentary" varchar,
  	"description" varchar,
  	"bonus" varchar,
  	"note" varchar,
  	"includes_heading" varchar DEFAULT 'Package Includes',
  	"notes_heading" varchar DEFAULT 'Please Note',
  	"highlight_enabled" boolean DEFAULT false,
  	"highlight_label" varchar DEFAULT 'Most Complete',
  	"display_full_name" varchar,
  	"display_compact_description" varchar,
  	"display_pricing_duration" varchar,
  	"display_card_subtitle" varchar,
  	"feature_card_enabled" boolean DEFAULT false,
  	"feature_card_subtitle" varchar,
  	"feature_card_body" jsonb,
  	"feature_card_includes_heading" varchar DEFAULT 'Membership Includes',
  	"feature_card_policy_heading" varchar DEFAULT 'Booking Policy',
  	"feature_card_policy_text" varchar,
  	"feature_card_cta_label" varchar,
  	"feature_card_cta_href" varchar,
  	"feature_card_cta_new_tab" boolean DEFAULT false,
  	"visibility_show_on_home" boolean DEFAULT false,
  	"visibility_show_on_pricing" boolean DEFAULT false,
  	"visibility_show_on_classes" boolean DEFAULT false,
  	"visibility_show_on_service_page" boolean DEFAULT false,
  	"visibility_show_on_appointments" boolean DEFAULT false,
  	"visibility_show_on_llms" boolean DEFAULT true,
  	"available_from" timestamp(3) with time zone,
  	"available_until" timestamp(3) with time zone,
  	"structured_data_mode" "payload"."enum_offers_structured_data_mode" DEFAULT 'none',
  	"structured_data_name" varchar,
  	"structured_data_description" varchar,
  	"llms_line" varchar,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_offers_v_version_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_offers_v_version_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_offers_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_offers_v_version_recommended_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_offers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_admin_label" varchar,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_category" "payload"."enum__offers_v_version_category" NOT NULL,
  	"version_kind" "payload"."enum__offers_v_version_kind",
  	"version_price" numeric NOT NULL,
  	"version_price_period" varchar,
  	"version_duration_short" varchar,
  	"version_duration_long" varchar,
  	"version_capacity_label" varchar,
  	"version_validity" varchar,
  	"version_complimentary" varchar,
  	"version_description" varchar,
  	"version_bonus" varchar,
  	"version_note" varchar,
  	"version_includes_heading" varchar DEFAULT 'Package Includes',
  	"version_notes_heading" varchar DEFAULT 'Please Note',
  	"version_highlight_enabled" boolean DEFAULT false,
  	"version_highlight_label" varchar DEFAULT 'Most Complete',
  	"version_display_full_name" varchar,
  	"version_display_compact_description" varchar,
  	"version_display_pricing_duration" varchar,
  	"version_display_card_subtitle" varchar,
  	"version_feature_card_enabled" boolean DEFAULT false,
  	"version_feature_card_subtitle" varchar,
  	"version_feature_card_body" jsonb,
  	"version_feature_card_includes_heading" varchar DEFAULT 'Membership Includes',
  	"version_feature_card_policy_heading" varchar DEFAULT 'Booking Policy',
  	"version_feature_card_policy_text" varchar,
  	"version_feature_card_cta_label" varchar,
  	"version_feature_card_cta_href" varchar,
  	"version_feature_card_cta_new_tab" boolean DEFAULT false,
  	"version_visibility_show_on_home" boolean DEFAULT false,
  	"version_visibility_show_on_pricing" boolean DEFAULT false,
  	"version_visibility_show_on_classes" boolean DEFAULT false,
  	"version_visibility_show_on_service_page" boolean DEFAULT false,
  	"version_visibility_show_on_appointments" boolean DEFAULT false,
  	"version_visibility_show_on_llms" boolean DEFAULT true,
  	"version_available_from" timestamp(3) with time zone,
  	"version_available_until" timestamp(3) with time zone,
  	"version_structured_data_mode" "payload"."enum__offers_v_version_structured_data_mode" DEFAULT 'none',
  	"version_structured_data_name" varchar,
  	"version_structured_data_description" varchar,
  	"version_llms_line" varchar,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."massage_rituals_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."massage_rituals_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."massage_rituals_salt_blends" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."massage_rituals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"group" "payload"."enum_massage_rituals_group" NOT NULL,
  	"card_title" varchar,
  	"description" varchar,
  	"short_description" varchar,
  	"duration_short" varchar,
  	"duration_long" varchar,
  	"price" numeric NOT NULL,
  	"price90" numeric,
  	"duration90_long" varchar DEFAULT '90 Minutes',
  	"add_on_price" numeric,
  	"pack_price" numeric,
  	"pack_formula" varchar DEFAULT '5 + 1',
  	"pack_sessions" numeric DEFAULT 6,
  	"pack_validity" varchar DEFAULT '45 days',
  	"includes_heading" varchar,
  	"salt_blends_heading" varchar DEFAULT 'Choose Your Salt Blend',
  	"salt_blends_footnote" varchar,
  	"note" varchar,
  	"book_label" varchar,
  	"llms_line" varchar,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_massage_rituals_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_rituals_v_version_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_rituals_v_version_salt_blends" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_rituals_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar,
  	"version_group" "payload"."enum__massage_rituals_v_version_group" NOT NULL,
  	"version_card_title" varchar,
  	"version_description" varchar,
  	"version_short_description" varchar,
  	"version_duration_short" varchar,
  	"version_duration_long" varchar,
  	"version_price" numeric NOT NULL,
  	"version_price90" numeric,
  	"version_duration90_long" varchar DEFAULT '90 Minutes',
  	"version_add_on_price" numeric,
  	"version_pack_price" numeric,
  	"version_pack_formula" varchar DEFAULT '5 + 1',
  	"version_pack_sessions" numeric DEFAULT 6,
  	"version_pack_validity" varchar DEFAULT '45 days',
  	"version_includes_heading" varchar,
  	"version_salt_blends_heading" varchar DEFAULT 'Choose Your Salt Blend',
  	"version_salt_blends_footnote" varchar,
  	"version_note" varchar,
  	"version_book_label" varchar,
  	"version_llms_line" varchar,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "payload"."enum_classes_type" NOT NULL,
  	"family" "payload"."enum_classes_family",
  	"level" "payload"."enum_classes_level",
  	"description" varchar NOT NULL,
  	"duration_label" varchar DEFAULT '50 min',
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_classes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_type" "payload"."enum__classes_v_version_type" NOT NULL,
  	"version_family" "payload"."enum__classes_v_version_family",
  	"version_level" "payload"."enum__classes_v_version_level",
  	"version_description" varchar NOT NULL,
  	"version_duration_label" varchar DEFAULT '50 min',
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."policies_show_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum_policies_show_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."policies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_policies_v_version_show_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum__policies_v_version_show_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."_policies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_label" varchar NOT NULL,
  	"version_text" varchar NOT NULL,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."events_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar
  );
  
  CREATE TABLE "payload"."events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kind" "payload"."enum_events_kind" NOT NULL,
  	"category_label" varchar,
  	"date_label" varchar,
  	"time_label" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar,
  	"logo_media_id" integer,
  	"logo_alt" varchar,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_events_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_kind" "payload"."enum__events_v_version_kind" NOT NULL,
  	"version_category_label" varchar,
  	"version_date_label" varchar,
  	"version_time_label" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_description" varchar,
  	"version_logo_media_id" integer,
  	"version_logo_alt" varchar,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"location" varchar,
  	"quote" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"active" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_role" varchar,
  	"version_location" varchar,
  	"version_quote" varchar NOT NULL,
  	"version_rating" numeric DEFAULT 5,
  	"version_image_media_id" integer,
  	"version_image_alt" varchar,
  	"version_active" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."legal_pages_contact_card_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" "payload"."enum_legal_pages_slug" NOT NULL,
  	"last_updated" timestamp(3) with time zone,
  	"body" jsonb,
  	"contact_card_enabled" boolean DEFAULT true,
  	"contact_card_organisation_name" varchar,
  	"contact_card_show_email" boolean DEFAULT true,
  	"contact_card_show_whatsapp" boolean DEFAULT true,
  	"contact_card_hours_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_legal_pages_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."legal_pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_legal_pages_v_version_contact_card_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" "payload"."enum__legal_pages_v_version_slug" NOT NULL,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_body" jsonb,
  	"version_contact_card_enabled" boolean DEFAULT true,
  	"version_contact_card_organisation_name" varchar,
  	"version_contact_card_show_email" boolean DEFAULT true,
  	"version_contact_card_show_whatsapp" boolean DEFAULT true,
  	"version_contact_card_hours_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__legal_pages_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_legal_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"first_name" varchar,
  	"status" "payload"."enum_newsletter_subscribers_status" DEFAULT 'pending' NOT NULL,
  	"source" varchar,
  	"consent_text" varchar,
  	"consent_given_at" timestamp(3) with time zone,
  	"confirmed_at" timestamp(3) with time zone,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"resend_contact_id" varchar,
  	"confirm_token_hash" varchar,
  	"confirm_token_expires_at" timestamp(3) with time zone,
  	"confirm_email_sent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."newsletter_issues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"preheader" varchar,
  	"heading" varchar NOT NULL,
  	"cover_image_id" integer,
  	"content" jsonb NOT NULL,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"action" "payload"."enum_newsletter_issues_action" DEFAULT 'none',
  	"test_email" varchar,
  	"status" "payload"."enum_newsletter_issues_status" DEFAULT 'draft',
  	"last_test_sent_at" timestamp(3) with time zone,
  	"sent_at" timestamp(3) with time zone,
  	"broadcast_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_newsletter_issues_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_subject" varchar NOT NULL,
  	"version_preheader" varchar,
  	"version_heading" varchar NOT NULL,
  	"version_cover_image_id" integer,
  	"version_content" jsonb NOT NULL,
  	"version_cta_label" varchar,
  	"version_cta_url" varchar,
  	"version_action" "payload"."enum__newsletter_issues_v_version_action" DEFAULT 'none',
  	"version_test_email" varchar,
  	"version_status" "payload"."enum__newsletter_issues_v_version_status" DEFAULT 'draft',
  	"version_last_test_sent_at" timestamp(3) with time zone,
  	"version_sent_at" timestamp(3) with time zone,
  	"version_broadcast_id" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."posts_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "payload"."posts_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "payload"."posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_media_id" integer,
  	"cover_image_alt" varchar,
  	"body" jsonb,
  	"author_id" integer,
  	"reviewed_by_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_posts_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload"."_posts_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_posts_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_media_id" integer,
  	"version_cover_image_alt" varchar,
  	"version_body" jsonb,
  	"version_author_id" integer,
  	"version_reviewed_by_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__posts_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_categories_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."categories_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__categories_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_categories_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."authors_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "payload"."authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" varchar,
  	"credentials" varchar,
  	"bio" varchar,
  	"photo_media_id" integer,
  	"photo_alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_authors_v_version_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_authors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_role" varchar,
  	"version_credentials" varchar,
  	"version_bio" varchar,
  	"version_photo_media_id" integer,
  	"version_photo_alt" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"topic" "payload"."enum_faqs_topic" NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"source_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar NOT NULL,
  	"version_answer" varchar NOT NULL,
  	"version_topic" "payload"."enum__faqs_v_version_topic" NOT NULL,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_active" boolean DEFAULT true,
  	"version_source_note" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "payload"."enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "payload"."enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload"."payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "payload"."enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_location_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."ss_addr_short_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."site_settings_hours_display_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."site_settings_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum_site_settings_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_price_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "payload"."enum_site_settings_price_cards_category" NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar
  );
  
  CREATE TABLE "payload"."site_settings_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."ss_struct_data_agg" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "payload"."enum_ss_struct_data_agg_source" NOT NULL,
  	"category" "payload"."ssd_agg_cat",
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."site_settings_llms_key_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"path" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."site_settings_llms_section_headings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"heading" varchar
  );
  
  CREATE TABLE "payload"."ss_llms_massage_intros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" varchar,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_site_name" varchar,
  	"brand_alternate_name" varchar,
  	"brand_legal_name" varchar,
  	"brand_site_url" varchar,
  	"brand_logo_id" integer,
  	"brand_logo_alt" varchar,
  	"brand_background_image_id" integer,
  	"contact_phone_display" varchar,
  	"contact_phone_e164" varchar,
  	"contact_whatsapp_number" varchar,
  	"contact_email" varchar,
  	"location_locality" varchar,
  	"location_region" varchar,
  	"location_country" varchar,
  	"location_maps_url" varchar,
  	"location_map_embed_url" varchar,
  	"hours_summary" varchar,
  	"hours_opens" varchar,
  	"hours_closes" varchar,
  	"social_instagram_url" varchar,
  	"social_instagram_handle" varchar,
  	"social_tiktok_url" varchar,
  	"social_facebook_url" varchar,
  	"pricing_vat_note" varchar,
  	"pricing_currency_label" varchar DEFAULT 'AED',
  	"mindbody_schedule_widget_id" varchar,
  	"mindbody_appointments_widget_id" varchar,
  	"mindbody_registration_widget_id" varchar,
  	"mindbody_login_site_id" varchar,
  	"mindbody_login_mb_site_id" varchar,
  	"seo_title_default" varchar,
  	"seo_title_template" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_og_image_alt" varchar,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_locale" varchar DEFAULT 'en_AE',
  	"structured_data_description" varchar,
  	"structured_data_logo_url" varchar,
  	"structured_data_image_url" varchar,
  	"structured_data_price_range" varchar,
  	"structured_data_currencies_accepted" varchar DEFAULT 'AED',
  	"structured_data_payment_accepted" varchar,
  	"structured_data_area_served" varchar,
  	"llms_title" varchar,
  	"llms_summary" varchar,
  	"llms_intro" varchar,
  	"llms_policies_block" varchar,
  	"llms_notes_for_ai" varchar,
  	"announcement_enabled" boolean DEFAULT false,
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"announcement_link_href" varchar,
  	"announcement_link_new_tab" boolean DEFAULT false,
  	"analytics_meta_pixel_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."site_settings_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_location_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_ss_addr_short_lines_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_hours_display_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum__site_settings_v_version_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_price_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "payload"."enum__site_settings_v_version_price_cards_category" NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_ss_struct_data_agg_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "payload"."enum__ss_struct_data_agg_v_source" NOT NULL,
  	"category" "payload"."ssd_agg_cat",
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_llms_key_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"path" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v_version_llms_section_headings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_ss_llms_massage_intros_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group" varchar,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_brand_site_name" varchar,
  	"version_brand_alternate_name" varchar,
  	"version_brand_legal_name" varchar,
  	"version_brand_site_url" varchar,
  	"version_brand_logo_id" integer,
  	"version_brand_logo_alt" varchar,
  	"version_brand_background_image_id" integer,
  	"version_contact_phone_display" varchar,
  	"version_contact_phone_e164" varchar,
  	"version_contact_whatsapp_number" varchar,
  	"version_contact_email" varchar,
  	"version_location_locality" varchar,
  	"version_location_region" varchar,
  	"version_location_country" varchar,
  	"version_location_maps_url" varchar,
  	"version_location_map_embed_url" varchar,
  	"version_hours_summary" varchar,
  	"version_hours_opens" varchar,
  	"version_hours_closes" varchar,
  	"version_social_instagram_url" varchar,
  	"version_social_instagram_handle" varchar,
  	"version_social_tiktok_url" varchar,
  	"version_social_facebook_url" varchar,
  	"version_pricing_vat_note" varchar,
  	"version_pricing_currency_label" varchar DEFAULT 'AED',
  	"version_mindbody_schedule_widget_id" varchar,
  	"version_mindbody_appointments_widget_id" varchar,
  	"version_mindbody_registration_widget_id" varchar,
  	"version_mindbody_login_site_id" varchar,
  	"version_mindbody_login_mb_site_id" varchar,
  	"version_seo_title_default" varchar,
  	"version_seo_title_template" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_og_image_alt" varchar,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_locale" varchar DEFAULT 'en_AE',
  	"version_structured_data_description" varchar,
  	"version_structured_data_logo_url" varchar,
  	"version_structured_data_image_url" varchar,
  	"version_structured_data_price_range" varchar,
  	"version_structured_data_currencies_accepted" varchar DEFAULT 'AED',
  	"version_structured_data_payment_accepted" varchar,
  	"version_structured_data_area_served" varchar,
  	"version_llms_title" varchar,
  	"version_llms_summary" varchar,
  	"version_llms_intro" varchar,
  	"version_llms_policies_block" varchar,
  	"version_llms_notes_for_ai" varchar,
  	"version_announcement_enabled" boolean DEFAULT false,
  	"version_announcement_text" varchar,
  	"version_announcement_link_label" varchar,
  	"version_announcement_link_href" varchar,
  	"version_announcement_link_new_tab" boolean DEFAULT false,
  	"version_analytics_meta_pixel_id" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_site_settings_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."header_dropdowns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"icon" "payload"."enum_header_dropdowns_items_icon"
  );
  
  CREATE TABLE "payload"."header_dropdowns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"login_label" varchar,
  	"login_mobile_label" varchar,
  	"login_href" varchar,
  	"login_aria_label" varchar,
  	"register_label" varchar,
  	"register_mobile_label" varchar,
  	"register_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"secondary_cta_new_tab" boolean DEFAULT false,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"primary_cta_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."_header_v_version_dropdowns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"icon" "payload"."enum__header_v_version_dropdowns_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_header_v_version_dropdowns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_login_label" varchar,
  	"version_login_mobile_label" varchar,
  	"version_login_href" varchar,
  	"version_login_aria_label" varchar,
  	"version_register_label" varchar,
  	"version_register_mobile_label" varchar,
  	"version_register_href" varchar,
  	"version_secondary_cta_label" varchar,
  	"version_secondary_cta_href" varchar,
  	"version_secondary_cta_new_tab" boolean DEFAULT false,
  	"version_primary_cta_label" varchar,
  	"version_primary_cta_href" varchar,
  	"version_primary_cta_new_tab" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."footer_tagline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "payload"."footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "payload"."footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"visit_us_heading" varchar,
  	"visit_us_maps_link_label" varchar,
  	"visit_us_hours_heading" varchar,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."_footer_v_version_tagline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_footer_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_visit_us_heading" varchar,
  	"version_visit_us_maps_link_label" varchar,
  	"version_visit_us_hours_heading" varchar,
  	"version_copyright" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."system_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"not_found_code" varchar,
  	"not_found_heading" varchar,
  	"not_found_text_line1" varchar,
  	"not_found_text_line2" varchar,
  	"not_found_button_label" varchar,
  	"not_found_button_href" varchar,
  	"not_found_button_new_tab" boolean DEFAULT false,
  	"error_heading" varchar,
  	"error_text" varchar,
  	"error_retry_label" varchar,
  	"error_home_label" varchar,
  	"loading_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."_system_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_not_found_code" varchar,
  	"version_not_found_heading" varchar,
  	"version_not_found_text_line1" varchar,
  	"version_not_found_text_line2" varchar,
  	"version_not_found_button_label" varchar,
  	"version_not_found_button_href" varchar,
  	"version_not_found_button_new_tab" boolean DEFAULT false,
  	"version_error_heading" varchar,
  	"version_error_text" varchar,
  	"version_error_retry_label" varchar,
  	"version_error_home_label" varchar,
  	"version_loading_text" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."home_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"accent" "payload"."enum_home_page_hero_slides_accent"
  );
  
  CREATE TABLE "payload"."svc_explorer_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."home_page_services_explorer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"image_position" "payload"."svc_explorer_img_pos" DEFAULT 'center',
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."home_page_about_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar
  );
  
  CREATE TABLE "payload"."home_page_method_pillars_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."home_page_method_pillars_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "payload"."home_page_method_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"icon" "payload"."enum_home_page_method_pillars_icon",
  	"accent" "payload"."enum_home_page_method_pillars_accent"
  );
  
  CREATE TABLE "payload"."home_page_social_feed_fallback_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar
  );
  
  CREATE TABLE "payload"."home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar,
  	"hero_headline_lead" varchar,
  	"hero_sub_line1" varchar,
  	"hero_sub_line2" varchar,
  	"hero_sub_line_italic" varchar,
  	"hero_sub_line_support" varchar,
  	"hero_ta_label" varchar,
  	"hero_ta_text" varchar,
  	"hero_vu_label" varchar,
  	"hero_vu_text" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_primary_cta_href" varchar,
  	"hero_primary_cta_new_tab" boolean DEFAULT false,
  	"hero_secondary_cta_label" varchar,
  	"hero_secondary_cta_href" varchar,
  	"hero_secondary_cta_new_tab" boolean DEFAULT false,
  	"packages_enabled" boolean DEFAULT true,
  	"packages_eyebrow" varchar,
  	"packages_heading" varchar,
  	"packages_intro" varchar,
  	"packages_show_vat_note" boolean DEFAULT true,
  	"packages_note" varchar,
  	"services_explorer_enabled" boolean DEFAULT true,
  	"services_explorer_eyebrow" varchar,
  	"services_explorer_heading" varchar,
  	"services_explorer_intro" varchar,
  	"services_explorer_cta_label" varchar,
  	"about_enabled" boolean DEFAULT true,
  	"about_eyebrow" varchar,
  	"about_heading_line1" varchar,
  	"about_heading_lead" varchar,
  	"about_heading_emphasis" varchar,
  	"about_heading_tail" varchar,
  	"about_body" jsonb,
  	"about_link_label" varchar,
  	"about_link_href" varchar,
  	"about_link_new_tab" boolean DEFAULT false,
  	"method_enabled" boolean DEFAULT true,
  	"method_eyebrow" varchar,
  	"method_heading_lead" varchar,
  	"method_heading_emphasis" varchar,
  	"method_intro" varchar,
  	"method_cta_label" varchar,
  	"method_cta_href" varchar,
  	"method_cta_new_tab" boolean DEFAULT false,
  	"method_auto_playing_label" varchar,
  	"method_resume_label" varchar,
  	"method_keyboard_hint" varchar,
  	"social_feed_enabled" boolean DEFAULT true,
  	"social_feed_eyebrow" varchar,
  	"social_feed_instagram_button_label" varchar,
  	"social_feed_tiktok_button_label" varchar,
  	"social_feed_show_setup_guide" boolean DEFAULT true,
  	"contact_enabled" boolean DEFAULT true,
  	"contact_eyebrow" varchar,
  	"contact_heading_lead" varchar,
  	"contact_heading_emphasis" varchar,
  	"contact_address_heading" varchar,
  	"contact_address_title_line" varchar,
  	"contact_hours_heading" varchar,
  	"contact_contact_heading" varchar,
  	"contact_map_title" varchar,
  	"contact_note" varchar,
  	"testimonials_enabled" boolean DEFAULT false,
  	"testimonials_eyebrow" varchar,
  	"testimonials_heading_lead" varchar,
  	"testimonials_heading_emphasis" varchar,
  	"testimonials_heading_tail" varchar,
  	"testimonials_intro" varchar,
  	"testimonials_cta_heading" varchar,
  	"testimonials_cta_text" varchar,
  	"testimonials_primary_cta_label" varchar,
  	"testimonials_primary_cta_href" varchar,
  	"testimonials_primary_cta_new_tab" boolean DEFAULT false,
  	"testimonials_secondary_cta_label" varchar,
  	"testimonials_secondary_cta_href" varchar,
  	"testimonials_secondary_cta_new_tab" boolean DEFAULT false,
  	"testimonials_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_home_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."home_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"accent" "payload"."enum__home_page_v_version_hero_slides_accent",
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_svc_explorer_highlights_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_services_explorer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"image_position" "payload"."svc_explorer_img_pos" DEFAULT 'center',
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_about_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_method_pillars_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_method_pillars_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_method_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"icon" "payload"."enum__home_page_v_version_method_pillars_icon",
  	"accent" "payload"."enum__home_page_v_version_method_pillars_accent",
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v_version_social_feed_fallback_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_badge" varchar,
  	"version_hero_headline_lead" varchar,
  	"version_hero_sub_line1" varchar,
  	"version_hero_sub_line2" varchar,
  	"version_hero_sub_line_italic" varchar,
  	"version_hero_sub_line_support" varchar,
  	"version_hero_ta_label" varchar,
  	"version_hero_ta_text" varchar,
  	"version_hero_vu_label" varchar,
  	"version_hero_vu_text" varchar,
  	"version_hero_primary_cta_label" varchar,
  	"version_hero_primary_cta_href" varchar,
  	"version_hero_primary_cta_new_tab" boolean DEFAULT false,
  	"version_hero_secondary_cta_label" varchar,
  	"version_hero_secondary_cta_href" varchar,
  	"version_hero_secondary_cta_new_tab" boolean DEFAULT false,
  	"version_packages_enabled" boolean DEFAULT true,
  	"version_packages_eyebrow" varchar,
  	"version_packages_heading" varchar,
  	"version_packages_intro" varchar,
  	"version_packages_show_vat_note" boolean DEFAULT true,
  	"version_packages_note" varchar,
  	"version_services_explorer_enabled" boolean DEFAULT true,
  	"version_services_explorer_eyebrow" varchar,
  	"version_services_explorer_heading" varchar,
  	"version_services_explorer_intro" varchar,
  	"version_services_explorer_cta_label" varchar,
  	"version_about_enabled" boolean DEFAULT true,
  	"version_about_eyebrow" varchar,
  	"version_about_heading_line1" varchar,
  	"version_about_heading_lead" varchar,
  	"version_about_heading_emphasis" varchar,
  	"version_about_heading_tail" varchar,
  	"version_about_body" jsonb,
  	"version_about_link_label" varchar,
  	"version_about_link_href" varchar,
  	"version_about_link_new_tab" boolean DEFAULT false,
  	"version_method_enabled" boolean DEFAULT true,
  	"version_method_eyebrow" varchar,
  	"version_method_heading_lead" varchar,
  	"version_method_heading_emphasis" varchar,
  	"version_method_intro" varchar,
  	"version_method_cta_label" varchar,
  	"version_method_cta_href" varchar,
  	"version_method_cta_new_tab" boolean DEFAULT false,
  	"version_method_auto_playing_label" varchar,
  	"version_method_resume_label" varchar,
  	"version_method_keyboard_hint" varchar,
  	"version_social_feed_enabled" boolean DEFAULT true,
  	"version_social_feed_eyebrow" varchar,
  	"version_social_feed_instagram_button_label" varchar,
  	"version_social_feed_tiktok_button_label" varchar,
  	"version_social_feed_show_setup_guide" boolean DEFAULT true,
  	"version_contact_enabled" boolean DEFAULT true,
  	"version_contact_eyebrow" varchar,
  	"version_contact_heading_lead" varchar,
  	"version_contact_heading_emphasis" varchar,
  	"version_contact_address_heading" varchar,
  	"version_contact_address_title_line" varchar,
  	"version_contact_hours_heading" varchar,
  	"version_contact_contact_heading" varchar,
  	"version_contact_map_title" varchar,
  	"version_contact_note" varchar,
  	"version_testimonials_enabled" boolean DEFAULT false,
  	"version_testimonials_eyebrow" varchar,
  	"version_testimonials_heading_lead" varchar,
  	"version_testimonials_heading_emphasis" varchar,
  	"version_testimonials_heading_tail" varchar,
  	"version_testimonials_intro" varchar,
  	"version_testimonials_cta_heading" varchar,
  	"version_testimonials_cta_text" varchar,
  	"version_testimonials_primary_cta_label" varchar,
  	"version_testimonials_primary_cta_href" varchar,
  	"version_testimonials_primary_cta_new_tab" boolean DEFAULT false,
  	"version_testimonials_secondary_cta_label" varchar,
  	"version_testimonials_secondary_cta_href" varchar,
  	"version_testimonials_secondary_cta_new_tab" boolean DEFAULT false,
  	"version_testimonials_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__home_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_home_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."about_page_philosophy_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."about_page_philosophy_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"label" varchar,
  	"heading" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."about_page_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar
  );
  
  CREATE TABLE "payload"."about_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_about_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_intro" varchar,
  	"hero_tagline" varchar,
  	"philosophy_eyebrow" varchar,
  	"philosophy_heading" varchar,
  	"journey_image_media_id" integer,
  	"journey_image_alt" varchar,
  	"journey_eyebrow" varchar,
  	"journey_heading" varchar,
  	"journey_intro" varchar,
  	"journey_ta_label" varchar,
  	"journey_ta_text" varchar,
  	"journey_vu_label" varchar,
  	"journey_vu_text" varchar,
  	"journey_paragraph2" varchar,
  	"journey_paragraph3" varchar,
  	"journey_closing_line1" varchar,
  	"journey_closing_line2" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_heading" varchar,
  	"gallery_intro" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_about_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."about_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_about_page_v_version_philosophy_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_about_page_v_version_philosophy_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"label" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_about_page_v_version_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_about_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__about_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar NOT NULL,
  	"version_hero_intro" varchar,
  	"version_hero_tagline" varchar,
  	"version_philosophy_eyebrow" varchar,
  	"version_philosophy_heading" varchar,
  	"version_journey_image_media_id" integer,
  	"version_journey_image_alt" varchar,
  	"version_journey_eyebrow" varchar,
  	"version_journey_heading" varchar,
  	"version_journey_intro" varchar,
  	"version_journey_ta_label" varchar,
  	"version_journey_ta_text" varchar,
  	"version_journey_vu_label" varchar,
  	"version_journey_vu_text" varchar,
  	"version_journey_paragraph2" varchar,
  	"version_journey_paragraph3" varchar,
  	"version_journey_closing_line1" varchar,
  	"version_journey_closing_line2" varchar,
  	"version_gallery_eyebrow" varchar,
  	"version_gallery_heading" varchar,
  	"version_gallery_intro" varchar,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__about_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_about_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."method_page_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."method_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"progression_heading" varchar,
  	"progression_intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_method_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."method_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_method_page_v_version_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_method_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar NOT NULL,
  	"version_intro" varchar,
  	"version_progression_heading" varchar,
  	"version_progression_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__method_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_method_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."classes_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_classes_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."classes_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"packages_eyebrow" varchar,
  	"packages_heading" varchar,
  	"packages_show_vat_note" boolean DEFAULT true,
  	"policies_enabled" boolean DEFAULT true,
  	"policies_heading" varchar,
  	"reformer_room_image_media_id" integer,
  	"reformer_room_image_alt" varchar,
  	"reformer_room_eyebrow" varchar,
  	"reformer_room_heading" varchar,
  	"reformer_room_lead" varchar,
  	"reformer_room_body" varchar,
  	"reformer_room_cta_label" varchar,
  	"reformer_room_cta_href" varchar,
  	"reformer_room_cta_new_tab" boolean DEFAULT false,
  	"reformer_room_card_cta_label" varchar,
  	"reformer_room_card_cta_href" varchar,
  	"breathing_room_eyebrow" varchar,
  	"breathing_room_heading" varchar,
  	"breathing_room_lead" varchar,
  	"breathing_room_body" varchar,
  	"breathing_room_cta_label" varchar,
  	"breathing_room_cta_href" varchar,
  	"breathing_room_cta_new_tab" boolean DEFAULT false,
  	"breathing_room_image_media_id" integer,
  	"breathing_room_image_alt" varchar,
  	"breathing_room_card_cta_label" varchar,
  	"breathing_room_card_cta_href" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_classes_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."classes_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_classes_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__classes_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_classes_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_packages_eyebrow" varchar,
  	"version_packages_heading" varchar,
  	"version_packages_show_vat_note" boolean DEFAULT true,
  	"version_policies_enabled" boolean DEFAULT true,
  	"version_policies_heading" varchar,
  	"version_reformer_room_image_media_id" integer,
  	"version_reformer_room_image_alt" varchar,
  	"version_reformer_room_eyebrow" varchar,
  	"version_reformer_room_heading" varchar,
  	"version_reformer_room_lead" varchar,
  	"version_reformer_room_body" varchar,
  	"version_reformer_room_cta_label" varchar,
  	"version_reformer_room_cta_href" varchar,
  	"version_reformer_room_cta_new_tab" boolean DEFAULT false,
  	"version_reformer_room_card_cta_label" varchar,
  	"version_reformer_room_card_cta_href" varchar,
  	"version_breathing_room_eyebrow" varchar,
  	"version_breathing_room_heading" varchar,
  	"version_breathing_room_lead" varchar,
  	"version_breathing_room_body" varchar,
  	"version_breathing_room_cta_label" varchar,
  	"version_breathing_room_cta_href" varchar,
  	"version_breathing_room_cta_new_tab" boolean DEFAULT false,
  	"version_breathing_room_image_media_id" integer,
  	"version_breathing_room_image_alt" varchar,
  	"version_breathing_room_card_cta_label" varchar,
  	"version_breathing_room_card_cta_href" varchar,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__classes_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_classes_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."schedule_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"booking_info_heading" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_schedule_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."schedule_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_schedule_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_intro" varchar,
  	"version_booking_info_heading" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__schedule_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_schedule_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."appointments_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"packages_heading" varchar,
  	"info_heading" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_appointments_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."appointments_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_appointments_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_intro" varchar,
  	"version_packages_heading" varchar,
  	"version_info_heading" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__appointments_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_appointments_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."pricing_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_pricing_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."pricing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_title" varchar,
  	"header_show_vat_note" boolean DEFAULT true,
  	"cards_compression_benefits_heading" varchar DEFAULT 'Benefits:',
  	"cards_compression_recommended_heading" varchar DEFAULT 'Recommended for:',
  	"memberships_enabled" boolean DEFAULT true,
  	"memberships_heading" varchar DEFAULT 'Memberships',
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_pricing_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."pricing_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_pricing_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__pricing_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pricing_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_title" varchar,
  	"version_header_show_vat_note" boolean DEFAULT true,
  	"version_cards_compression_benefits_heading" varchar DEFAULT 'Benefits:',
  	"version_cards_compression_recommended_heading" varchar DEFAULT 'Recommended for:',
  	"version_memberships_enabled" boolean DEFAULT true,
  	"version_memberships_heading" varchar DEFAULT 'Memberships',
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__pricing_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_pricing_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."memberships_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_memberships_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."memberships_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"tiers_eyebrow" varchar DEFAULT 'Tiers',
  	"tiers_heading" varchar DEFAULT 'Membership Options',
  	"tiers_show_vat_note" boolean DEFAULT true,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_memberships_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."memberships_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_memberships_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__memberships_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_memberships_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_tiers_eyebrow" varchar DEFAULT 'Tiers',
  	"version_tiers_heading" varchar DEFAULT 'Membership Options',
  	"version_tiers_show_vat_note" boolean DEFAULT true,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__memberships_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_memberships_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."recovery_page_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"price_text" varchar
  );
  
  CREATE TABLE "payload"."recovery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_new_tab" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_recovery_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."recovery_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_recovery_page_v_version_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"price_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_recovery_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_intro" varchar,
  	"version_cta_label" varchar,
  	"version_cta_href" varchar,
  	"version_cta_new_tab" boolean DEFAULT false,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__recovery_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_recovery_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."services_page_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."services_page_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"image_position" "payload"."enum_services_page_items_image_position" DEFAULT 'center',
  	"accent" "payload"."enum_services_page_items_accent",
  	"href" varchar
  );
  
  CREATE TABLE "payload"."services_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_services_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"learn_more_label" varchar DEFAULT 'Learn More',
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_services_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."services_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_services_page_v_version_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_services_page_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"image_media_id" integer,
  	"image_alt" varchar,
  	"image_position" "payload"."enum__services_page_v_version_items_image_position" DEFAULT 'center',
  	"accent" "payload"."enum__services_page_v_version_items_accent",
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_services_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__services_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_learn_more_label" varchar DEFAULT 'Learn More',
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__services_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_services_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."rpp_overview_para" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."reformer_pilates_page_overview_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."rpp_overview_card_bul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."reformer_pilates_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_reformer_pilates_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."reformer_pilates_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_position" "payload"."enum_reformer_pilates_page_hero_image_position" DEFAULT 'center',
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"overview_heading" varchar,
  	"overview_cta_label" varchar,
  	"overview_cta_href" varchar,
  	"overview_cta_new_tab" boolean DEFAULT false,
  	"overview_card_image_media_id" integer,
  	"overview_card_image_alt" varchar,
  	"overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"overview_card_title_line1" varchar,
  	"overview_card_title_line2" varchar,
  	"classes_heading" varchar,
  	"classes_intro" varchar,
  	"classes_card_cta_label" varchar,
  	"classes_card_cta_href" varchar,
  	"packages_heading" varchar,
  	"packages_show_vat_note" boolean DEFAULT true,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_reformer_pilates_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."reformer_pilates_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_rpp_overview_para_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_reformer_pilates_page_v_version_overview_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_rpp_overview_card_bul_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_reformer_pilates_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__reformer_pilates_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_reformer_pilates_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_position" "payload"."enum__reformer_pilates_page_v_version_hero_image_position" DEFAULT 'center',
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_overview_heading" varchar,
  	"version_overview_cta_label" varchar,
  	"version_overview_cta_href" varchar,
  	"version_overview_cta_new_tab" boolean DEFAULT false,
  	"version_overview_card_image_media_id" integer,
  	"version_overview_card_image_alt" varchar,
  	"version_overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"version_overview_card_title_line1" varchar,
  	"version_overview_card_title_line2" varchar,
  	"version_classes_heading" varchar,
  	"version_classes_intro" varchar,
  	"version_classes_card_cta_label" varchar,
  	"version_classes_card_cta_href" varchar,
  	"version_packages_heading" varchar,
  	"version_packages_show_vat_note" boolean DEFAULT true,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__reformer_pilates_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_reformer_pilates_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."brp_overview_para" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."breathing_room_page_overview_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."brp_overview_card_bul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."breathing_room_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_breathing_room_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."breathing_room_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_position" "payload"."enum_breathing_room_page_hero_image_position" DEFAULT 'center',
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"overview_heading" varchar,
  	"overview_cta_label" varchar,
  	"overview_cta_href" varchar,
  	"overview_cta_new_tab" boolean DEFAULT false,
  	"overview_card_image_media_id" integer,
  	"overview_card_image_alt" varchar,
  	"overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"overview_card_title_line1" varchar,
  	"overview_card_title_line2" varchar,
  	"classes_heading" varchar,
  	"classes_intro" varchar,
  	"classes_card_cta_label" varchar,
  	"classes_card_cta_href" varchar,
  	"packages_heading" varchar,
  	"packages_show_vat_note" boolean DEFAULT true,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_breathing_room_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."breathing_room_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_brp_overview_para_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_breathing_room_page_v_version_overview_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_brp_overview_card_bul_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_breathing_room_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__breathing_room_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_breathing_room_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_position" "payload"."enum__breathing_room_page_v_version_hero_image_position" DEFAULT 'center',
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_overview_heading" varchar,
  	"version_overview_cta_label" varchar,
  	"version_overview_cta_href" varchar,
  	"version_overview_cta_new_tab" boolean DEFAULT false,
  	"version_overview_card_image_media_id" integer,
  	"version_overview_card_image_alt" varchar,
  	"version_overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"version_overview_card_title_line1" varchar,
  	"version_overview_card_title_line2" varchar,
  	"version_classes_heading" varchar,
  	"version_classes_intro" varchar,
  	"version_classes_card_cta_label" varchar,
  	"version_classes_card_cta_href" varchar,
  	"version_packages_heading" varchar,
  	"version_packages_show_vat_note" boolean DEFAULT true,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__breathing_room_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_breathing_room_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."ctp_overview_para" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."ctp_overview_card_bul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."contrast_therapy_page_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_contrast_therapy_page_benefits_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."contrast_therapy_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_contrast_therapy_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."contrast_therapy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_position" "payload"."enum_contrast_therapy_page_hero_image_position" DEFAULT 'center',
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"overview_heading" varchar,
  	"overview_cta_label" varchar,
  	"overview_cta_href" varchar,
  	"overview_cta_new_tab" boolean DEFAULT false,
  	"overview_card_image_media_id" integer,
  	"overview_card_image_alt" varchar,
  	"overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"overview_card_title_line1" varchar,
  	"overview_card_title_line2" varchar,
  	"benefits_eyebrow" varchar,
  	"benefits_heading" varchar,
  	"benefits_intro" varchar,
  	"sessions_heading" varchar,
  	"sessions_intro" varchar,
  	"sessions_show_vat_note" boolean DEFAULT true,
  	"memberships_note_prefix" varchar,
  	"memberships_note_link_label" varchar,
  	"memberships_note_link_href" varchar,
  	"memberships_note_link_new_tab" boolean DEFAULT false,
  	"memberships_note_suffix" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_contrast_therapy_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."contrast_therapy_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_ctp_overview_para_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_ctp_overview_card_bul_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_contrast_therapy_page_v_version_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__contrast_therapy_page_v_version_benefits_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_contrast_therapy_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__contrast_therapy_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_contrast_therapy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_position" "payload"."enum__contrast_therapy_page_v_version_hero_image_position" DEFAULT 'center',
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_overview_heading" varchar,
  	"version_overview_cta_label" varchar,
  	"version_overview_cta_href" varchar,
  	"version_overview_cta_new_tab" boolean DEFAULT false,
  	"version_overview_card_image_media_id" integer,
  	"version_overview_card_image_alt" varchar,
  	"version_overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"version_overview_card_title_line1" varchar,
  	"version_overview_card_title_line2" varchar,
  	"version_benefits_eyebrow" varchar,
  	"version_benefits_heading" varchar,
  	"version_benefits_intro" varchar,
  	"version_sessions_heading" varchar,
  	"version_sessions_intro" varchar,
  	"version_sessions_show_vat_note" boolean DEFAULT true,
  	"version_memberships_note_prefix" varchar,
  	"version_memberships_note_link_label" varchar,
  	"version_memberships_note_link_href" varchar,
  	"version_memberships_note_link_new_tab" boolean DEFAULT false,
  	"version_memberships_note_suffix" varchar,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__contrast_therapy_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_contrast_therapy_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."cmp_overview_para" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."cmp_overview_card_bul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."compression_therapy_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_compression_therapy_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."compression_therapy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_position" "payload"."enum_compression_therapy_page_hero_image_position" DEFAULT 'center',
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"overview_heading" varchar,
  	"overview_cta_label" varchar,
  	"overview_cta_href" varchar,
  	"overview_cta_new_tab" boolean DEFAULT false,
  	"overview_card_image_media_id" integer,
  	"overview_card_image_alt" varchar,
  	"overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"overview_card_title_line1" varchar,
  	"overview_card_title_line2" varchar,
  	"pricing_heading" varchar,
  	"pricing_intro" varchar,
  	"pricing_benefits_heading" varchar,
  	"pricing_recommended_heading" varchar,
  	"pricing_individual_cta_label" varchar,
  	"pricing_pack_cta_label" varchar,
  	"pricing_cta_href" varchar,
  	"pricing_show_vat_note" boolean DEFAULT true,
  	"pair_with_heading" varchar,
  	"pair_with_text" varchar,
  	"pair_with_link_label" varchar,
  	"pair_with_link_href" varchar,
  	"pair_with_link_new_tab" boolean DEFAULT false,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_compression_therapy_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."compression_therapy_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_cmp_overview_para_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_cmp_overview_card_bul_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_compression_therapy_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__compression_therapy_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_compression_therapy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_position" "payload"."enum__compression_therapy_page_v_version_hero_image_position" DEFAULT 'center',
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_overview_heading" varchar,
  	"version_overview_cta_label" varchar,
  	"version_overview_cta_href" varchar,
  	"version_overview_cta_new_tab" boolean DEFAULT false,
  	"version_overview_card_image_media_id" integer,
  	"version_overview_card_image_alt" varchar,
  	"version_overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"version_overview_card_title_line1" varchar,
  	"version_overview_card_title_line2" varchar,
  	"version_pricing_heading" varchar,
  	"version_pricing_intro" varchar,
  	"version_pricing_benefits_heading" varchar,
  	"version_pricing_recommended_heading" varchar,
  	"version_pricing_individual_cta_label" varchar,
  	"version_pricing_pack_cta_label" varchar,
  	"version_pricing_cta_href" varchar,
  	"version_pricing_show_vat_note" boolean DEFAULT true,
  	"version_pair_with_heading" varchar,
  	"version_pair_with_text" varchar,
  	"version_pair_with_link_label" varchar,
  	"version_pair_with_link_href" varchar,
  	"version_pair_with_link_new_tab" boolean DEFAULT false,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__compression_therapy_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_compression_therapy_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."massage_page_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."massage_page_overview_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."massage_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_massage_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."massage_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_position" "payload"."enum_massage_page_hero_image_position" DEFAULT 'center',
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"overview_heading" varchar DEFAULT 'Healing Touch',
  	"overview_badge" varchar DEFAULT 'Ladies Only',
  	"overview_cta_label" varchar,
  	"overview_cta_href" varchar,
  	"overview_cta_new_tab" boolean DEFAULT false,
  	"overview_card_image_media_id" integer,
  	"overview_card_image_alt" varchar,
  	"overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"overview_card_title_line1" varchar,
  	"overview_card_title_line2" varchar,
  	"full_body_heading" varchar,
  	"full_body_intro" varchar,
  	"full_body_book_label" varchar DEFAULT 'Book →',
  	"full_body_book_href" varchar DEFAULT '/appointments',
  	"targeted_heading" varchar,
  	"targeted_intro" varchar,
  	"targeted_add_on_label" varchar DEFAULT '30-Minute Add-On',
  	"targeted_ritual_label" varchar DEFAULT '60-Minute Ritual',
  	"targeted_pack_label" varchar DEFAULT 'Ritual Pack | 5 + 1',
  	"rooted_heading" varchar DEFAULT 'TAVÚ Exclusive Foot Ritual',
  	"rooted_intro" varchar,
  	"rooted_pack_heading" varchar DEFAULT 'Ritual Pack',
  	"escape_heading" varchar DEFAULT 'TAVÚ Recovery Escape',
  	"escape_intro" varchar,
  	"escape_duration_prefix" varchar DEFAULT 'Duration:',
  	"summary_heading" varchar DEFAULT 'Package Pricing Summary',
  	"summary_column_labels_ritual" varchar DEFAULT 'Ritual Price',
  	"summary_column_labels_value" varchar DEFAULT 'Six-Session Value',
  	"summary_column_labels_pack" varchar DEFAULT 'Package Price',
  	"summary_column_labels_saving" varchar DEFAULT 'Saving',
  	"summary_footnote" varchar,
  	"summary_show_vat_note" boolean DEFAULT true,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_massage_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."massage_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_massage_page_v_version_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_page_v_version_overview_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__massage_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_massage_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_position" "payload"."enum__massage_page_v_version_hero_image_position" DEFAULT 'center',
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_overview_heading" varchar DEFAULT 'Healing Touch',
  	"version_overview_badge" varchar DEFAULT 'Ladies Only',
  	"version_overview_cta_label" varchar,
  	"version_overview_cta_href" varchar,
  	"version_overview_cta_new_tab" boolean DEFAULT false,
  	"version_overview_card_image_media_id" integer,
  	"version_overview_card_image_alt" varchar,
  	"version_overview_card_eyebrow" varchar DEFAULT 'TAVÚ',
  	"version_overview_card_title_line1" varchar,
  	"version_overview_card_title_line2" varchar,
  	"version_full_body_heading" varchar,
  	"version_full_body_intro" varchar,
  	"version_full_body_book_label" varchar DEFAULT 'Book →',
  	"version_full_body_book_href" varchar DEFAULT '/appointments',
  	"version_targeted_heading" varchar,
  	"version_targeted_intro" varchar,
  	"version_targeted_add_on_label" varchar DEFAULT '30-Minute Add-On',
  	"version_targeted_ritual_label" varchar DEFAULT '60-Minute Ritual',
  	"version_targeted_pack_label" varchar DEFAULT 'Ritual Pack | 5 + 1',
  	"version_rooted_heading" varchar DEFAULT 'TAVÚ Exclusive Foot Ritual',
  	"version_rooted_intro" varchar,
  	"version_rooted_pack_heading" varchar DEFAULT 'Ritual Pack',
  	"version_escape_heading" varchar DEFAULT 'TAVÚ Recovery Escape',
  	"version_escape_intro" varchar,
  	"version_escape_duration_prefix" varchar DEFAULT 'Duration:',
  	"version_summary_heading" varchar DEFAULT 'Package Pricing Summary',
  	"version_summary_column_labels_ritual" varchar DEFAULT 'Ritual Price',
  	"version_summary_column_labels_value" varchar DEFAULT 'Six-Session Value',
  	"version_summary_column_labels_pack" varchar DEFAULT 'Package Price',
  	"version_summary_column_labels_saving" varchar DEFAULT 'Saving',
  	"version_summary_footnote" varchar,
  	"version_summary_show_vat_note" boolean DEFAULT true,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__massage_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_massage_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."events_page_event_types_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_events_page_event_types_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."events_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_events_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"upcoming_eyebrow" varchar,
  	"upcoming_heading" varchar,
  	"upcoming_empty_text" varchar,
  	"event_types_eyebrow" varchar,
  	"event_types_heading" varchar,
  	"highlights_eyebrow" varchar,
  	"highlights_heading" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_events_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."events_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_events_page_v_version_event_types_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__events_page_v_version_event_types_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_events_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__events_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_events_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_upcoming_eyebrow" varchar,
  	"version_upcoming_heading" varchar,
  	"version_upcoming_empty_text" varchar,
  	"version_event_types_eyebrow" varchar,
  	"version_event_types_heading" varchar,
  	"version_highlights_eyebrow" varchar,
  	"version_highlights_heading" varchar,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__events_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_events_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."partnerships_page_types_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."partnerships_page_types_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_partnerships_page_types_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."partnerships_page_why_partner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."partnerships_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_partnerships_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."partnerships_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_media_id" integer,
  	"hero_image_alt" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"types_eyebrow" varchar,
  	"types_heading" varchar,
  	"why_partner_image_media_id" integer,
  	"why_partner_image_alt" varchar,
  	"why_partner_eyebrow" varchar,
  	"why_partner_heading" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_partnerships_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."partnerships_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_partnerships_page_v_version_types_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_partnerships_page_v_version_types_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__partnerships_page_v_version_types_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_partnerships_page_v_version_why_partner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_partnerships_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__partnerships_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_partnerships_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_media_id" integer,
  	"version_hero_image_alt" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_types_eyebrow" varchar,
  	"version_types_heading" varchar,
  	"version_why_partner_image_media_id" integer,
  	"version_why_partner_image_alt" varchar,
  	"version_why_partner_eyebrow" varchar,
  	"version_why_partner_heading" varchar,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__partnerships_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_partnerships_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading_lead" varchar,
  	"hero_heading_emphasis" varchar,
  	"hero_intro" varchar,
  	"image_card_image_media_id" integer,
  	"image_card_image_alt" varchar,
  	"image_card_caption" varchar,
  	"tiles_location_label" varchar,
  	"tiles_hours_label" varchar,
  	"tiles_phone_label" varchar,
  	"tiles_email_label" varchar,
  	"tiles_whatsapp_label" varchar,
  	"form_name_label" varchar,
  	"form_name_placeholder" varchar,
  	"form_email_label" varchar,
  	"form_email_placeholder" varchar,
  	"form_message_label" varchar,
  	"form_message_placeholder" varchar,
  	"form_submit_label" varchar,
  	"form_submitting_label" varchar,
  	"form_footnote" varchar,
  	"form_whatsapp_template" varchar,
  	"form_errors_name" varchar,
  	"form_errors_email" varchar,
  	"form_errors_message" varchar,
  	"map_title" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_contact_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."contact_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading_lead" varchar,
  	"version_hero_heading_emphasis" varchar,
  	"version_hero_intro" varchar,
  	"version_image_card_image_media_id" integer,
  	"version_image_card_image_alt" varchar,
  	"version_image_card_caption" varchar,
  	"version_tiles_location_label" varchar,
  	"version_tiles_hours_label" varchar,
  	"version_tiles_phone_label" varchar,
  	"version_tiles_email_label" varchar,
  	"version_tiles_whatsapp_label" varchar,
  	"version_form_name_label" varchar,
  	"version_form_name_placeholder" varchar,
  	"version_form_email_label" varchar,
  	"version_form_email_placeholder" varchar,
  	"version_form_message_label" varchar,
  	"version_form_message_placeholder" varchar,
  	"version_form_submit_label" varchar,
  	"version_form_submitting_label" varchar,
  	"version_form_footnote" varchar,
  	"version_form_whatsapp_template" varchar,
  	"version_form_errors_name" varchar,
  	"version_form_errors_email" varchar,
  	"version_form_errors_message" varchar,
  	"version_map_title" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__contact_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_contact_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."register_page_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_register_page_benefits_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."register_page_perks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."register_page_trust_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_register_page_trust_badges_items_icon",
  	"label" varchar
  );
  
  CREATE TABLE "payload"."register_page_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum_register_page_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."register_page_quick_links_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_register_page_quick_links_items_icon",
  	"title" varchar,
  	"text" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "payload"."register_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"benefits_heading" varchar,
  	"perks_heading" varchar,
  	"form_card_heading" varchar,
  	"form_card_text" varchar,
  	"form_card_sign_in_prompt" varchar,
  	"form_card_sign_in_link_label" varchar,
  	"form_card_sign_in_link_href" varchar,
  	"form_card_sign_in_link_new_tab" boolean DEFAULT false,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_register_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."register_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v_version_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__register_page_v_version_benefits_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v_version_perks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v_version_trust_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__register_page_v_version_trust_badges_items_icon",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v_version_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"style" "payload"."enum__register_page_v_version_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v_version_quick_links_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__register_page_v_version_quick_links_items_icon",
  	"title" varchar,
  	"text" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_register_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_benefits_heading" varchar,
  	"version_perks_heading" varchar,
  	"version_form_card_heading" varchar,
  	"version_form_card_text" varchar,
  	"version_form_card_sign_in_prompt" varchar,
  	"version_form_card_sign_in_link_label" varchar,
  	"version_form_card_sign_in_link_href" varchar,
  	"version_form_card_sign_in_link_new_tab" boolean DEFAULT false,
  	"version_cta_enabled" boolean DEFAULT true,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__register_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_register_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."account_page_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_account_page_features_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."account_page_quick_actions_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"icon" "payload"."enum_account_page_quick_actions_buttons_icon"
  );
  
  CREATE TABLE "payload"."account_page_trust_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum_account_page_trust_badges_items_icon",
  	"label" varchar
  );
  
  CREATE TABLE "payload"."account_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading_lead" varchar,
  	"hero_heading_emphasis" varchar,
  	"hero_intro" varchar,
  	"login_card_heading" varchar,
  	"login_card_subheading" varchar,
  	"login_card_sign_in_label" varchar,
  	"login_card_widget_inner_text" varchar,
  	"login_card_divider_label" varchar,
  	"login_card_create_account_label" varchar,
  	"login_card_create_account_href" varchar,
  	"login_card_create_account_new_tab" boolean DEFAULT false,
  	"login_card_help_prefix" varchar,
  	"login_card_help_link_label" varchar,
  	"login_card_help_link_href" varchar,
  	"login_card_help_link_new_tab" boolean DEFAULT false,
  	"features_heading" varchar,
  	"features_intro" varchar,
  	"quick_actions_enabled" boolean DEFAULT true,
  	"quick_actions_heading" varchar,
  	"quick_actions_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_account_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."account_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_account_page_v_version_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__account_page_v_version_features_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_account_page_v_version_quick_actions_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_href" varchar NOT NULL,
  	"link_new_tab" boolean DEFAULT false,
  	"icon" "payload"."enum__account_page_v_version_quick_actions_buttons_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_account_page_v_version_trust_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "payload"."enum__account_page_v_version_trust_badges_items_icon",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_account_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading_lead" varchar,
  	"version_hero_heading_emphasis" varchar,
  	"version_hero_intro" varchar,
  	"version_login_card_heading" varchar,
  	"version_login_card_subheading" varchar,
  	"version_login_card_sign_in_label" varchar,
  	"version_login_card_widget_inner_text" varchar,
  	"version_login_card_divider_label" varchar,
  	"version_login_card_create_account_label" varchar,
  	"version_login_card_create_account_href" varchar,
  	"version_login_card_create_account_new_tab" boolean DEFAULT false,
  	"version_login_card_help_prefix" varchar,
  	"version_login_card_help_link_label" varchar,
  	"version_login_card_help_link_href" varchar,
  	"version_login_card_help_link_new_tab" boolean DEFAULT false,
  	"version_features_heading" varchar,
  	"version_features_intro" varchar,
  	"version_quick_actions_enabled" boolean DEFAULT true,
  	"version_quick_actions_heading" varchar,
  	"version_quick_actions_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__account_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_account_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."email_cf_team_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."email_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sender_from_name" varchar DEFAULT 'TAVÚ Wellness Studio',
  	"sender_from_address" varchar DEFAULT 'connect@tavustudio.com',
  	"contact_form_notify_team" boolean DEFAULT true,
  	"contact_form_team_subject" varchar DEFAULT 'New website message from {name}',
  	"contact_form_send_thank_you" boolean DEFAULT true,
  	"contact_form_thank_you_subject" varchar DEFAULT 'Thank you for contacting TAVÚ',
  	"contact_form_thank_you_heading" varchar DEFAULT 'Thank you, {name}',
  	"contact_form_thank_you_body" varchar DEFAULT 'We have received your message and a member of the TAVÚ team will get back to you as soon as possible.
  
  Class and appointment bookings are handled through our online schedule, which is open at any time. For anything urgent, message us on WhatsApp at {phone}.',
  	"contact_form_thank_you_cta_label" varchar DEFAULT 'View the class schedule',
  	"contact_form_thank_you_cta_url" varchar DEFAULT 'https://tavustudio.com/schedule',
  	"newsletter_segment_id" varchar,
  	"newsletter_segment_name" varchar DEFAULT 'TAVÚ Newsletter',
  	"newsletter_signup_eyebrow" varchar DEFAULT 'Newsletter',
  	"newsletter_signup_heading" varchar DEFAULT 'Notes from the studio',
  	"newsletter_signup_text" varchar DEFAULT 'New articles, studio news and upcoming events from TAVÚ, straight to your inbox.',
  	"newsletter_consent_text" varchar DEFAULT 'By subscribing you agree to receive emails from TAVÚ Wellness Studio. You can unsubscribe at any time.',
  	"newsletter_success_text" varchar DEFAULT 'Almost there. Please check your inbox and confirm your subscription.',
  	"newsletter_confirm_subject" varchar DEFAULT 'Please confirm your TAVÚ newsletter subscription',
  	"newsletter_confirm_heading" varchar DEFAULT 'Confirm your subscription',
  	"newsletter_confirm_body" varchar DEFAULT 'Thank you for signing up to the TAVÚ newsletter. Please confirm that this is your email address by pressing the button below.
  
  If you did not sign up, you can ignore this email and you will not be subscribed.',
  	"newsletter_confirm_cta_label" varchar DEFAULT 'Confirm my subscription',
  	"newsletter_welcome_subject" varchar DEFAULT 'Welcome to the TAVÚ newsletter',
  	"newsletter_welcome_heading" varchar DEFAULT 'Welcome, {name}',
  	"newsletter_welcome_body" varchar DEFAULT 'Your subscription is confirmed. You will now receive new articles, studio news and upcoming events from TAVÚ.
  
  In the meantime, the journal is a good place to start.',
  	"newsletter_welcome_cta_label" varchar DEFAULT 'Read the journal',
  	"newsletter_welcome_cta_url" varchar DEFAULT 'https://tavustudio.com/blog',
  	"newsletter_confirmed_page_heading" varchar DEFAULT 'You are subscribed',
  	"newsletter_confirmed_page_text" varchar DEFAULT 'Thank you for confirming. The next TAVÚ newsletter will arrive in your inbox.',
  	"newsletter_unsubscribed_page_heading" varchar DEFAULT 'You have been unsubscribed',
  	"newsletter_unsubscribed_page_text" varchar DEFAULT 'You will no longer receive the TAVÚ newsletter. You can subscribe again at any time from our blog.',
  	"newsletter_invalid_page_heading" varchar DEFAULT 'This link is no longer valid',
  	"newsletter_invalid_page_text" varchar DEFAULT 'The link has expired or was already used. Please subscribe again from our blog.',
  	"sign_off" varchar DEFAULT 'Warm regards,
  The TAVÚ team',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."_email_cf_team_recipients_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_email_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_sender_from_name" varchar DEFAULT 'TAVÚ Wellness Studio',
  	"version_sender_from_address" varchar DEFAULT 'connect@tavustudio.com',
  	"version_contact_form_notify_team" boolean DEFAULT true,
  	"version_contact_form_team_subject" varchar DEFAULT 'New website message from {name}',
  	"version_contact_form_send_thank_you" boolean DEFAULT true,
  	"version_contact_form_thank_you_subject" varchar DEFAULT 'Thank you for contacting TAVÚ',
  	"version_contact_form_thank_you_heading" varchar DEFAULT 'Thank you, {name}',
  	"version_contact_form_thank_you_body" varchar DEFAULT 'We have received your message and a member of the TAVÚ team will get back to you as soon as possible.
  
  Class and appointment bookings are handled through our online schedule, which is open at any time. For anything urgent, message us on WhatsApp at {phone}.',
  	"version_contact_form_thank_you_cta_label" varchar DEFAULT 'View the class schedule',
  	"version_contact_form_thank_you_cta_url" varchar DEFAULT 'https://tavustudio.com/schedule',
  	"version_newsletter_segment_id" varchar,
  	"version_newsletter_segment_name" varchar DEFAULT 'TAVÚ Newsletter',
  	"version_newsletter_signup_eyebrow" varchar DEFAULT 'Newsletter',
  	"version_newsletter_signup_heading" varchar DEFAULT 'Notes from the studio',
  	"version_newsletter_signup_text" varchar DEFAULT 'New articles, studio news and upcoming events from TAVÚ, straight to your inbox.',
  	"version_newsletter_consent_text" varchar DEFAULT 'By subscribing you agree to receive emails from TAVÚ Wellness Studio. You can unsubscribe at any time.',
  	"version_newsletter_success_text" varchar DEFAULT 'Almost there. Please check your inbox and confirm your subscription.',
  	"version_newsletter_confirm_subject" varchar DEFAULT 'Please confirm your TAVÚ newsletter subscription',
  	"version_newsletter_confirm_heading" varchar DEFAULT 'Confirm your subscription',
  	"version_newsletter_confirm_body" varchar DEFAULT 'Thank you for signing up to the TAVÚ newsletter. Please confirm that this is your email address by pressing the button below.
  
  If you did not sign up, you can ignore this email and you will not be subscribed.',
  	"version_newsletter_confirm_cta_label" varchar DEFAULT 'Confirm my subscription',
  	"version_newsletter_welcome_subject" varchar DEFAULT 'Welcome to the TAVÚ newsletter',
  	"version_newsletter_welcome_heading" varchar DEFAULT 'Welcome, {name}',
  	"version_newsletter_welcome_body" varchar DEFAULT 'Your subscription is confirmed. You will now receive new articles, studio news and upcoming events from TAVÚ.
  
  In the meantime, the journal is a good place to start.',
  	"version_newsletter_welcome_cta_label" varchar DEFAULT 'Read the journal',
  	"version_newsletter_welcome_cta_url" varchar DEFAULT 'https://tavustudio.com/blog',
  	"version_newsletter_confirmed_page_heading" varchar DEFAULT 'You are subscribed',
  	"version_newsletter_confirmed_page_text" varchar DEFAULT 'Thank you for confirming. The next TAVÚ newsletter will arrive in your inbox.',
  	"version_newsletter_unsubscribed_page_heading" varchar DEFAULT 'You have been unsubscribed',
  	"version_newsletter_unsubscribed_page_text" varchar DEFAULT 'You will no longer receive the TAVÚ newsletter. You can subscribe again at any time from our blog.',
  	"version_newsletter_invalid_page_heading" varchar DEFAULT 'This link is no longer valid',
  	"version_newsletter_invalid_page_text" varchar DEFAULT 'The link has expired or was already used. Please subscribe again from our blog.',
  	"version_sign_off" varchar DEFAULT 'Warm regards,
  The TAVÚ team',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"empty_state_heading" varchar,
  	"empty_state_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "payload"."enum_blog_page_seo_robots" DEFAULT 'index-follow',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."blog_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."_blog_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_empty_state_heading" varchar,
  	"version_empty_state_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "payload"."enum__blog_page_v_version_seo_robots" DEFAULT 'index-follow',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."_blog_page_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload"."media" ADD COLUMN "prefix" varchar DEFAULT 'dev-f0';
  ALTER TABLE "payload"."contact_submissions" ADD COLUMN "email_status" "payload"."enum_contact_submissions_email_status";
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "massage_rituals_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "policies_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "newsletter_subscribers_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "newsletter_issues_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload"."offers_includes" ADD CONSTRAINT "offers_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."offers_notes" ADD CONSTRAINT "offers_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."offers_benefits" ADD CONSTRAINT "offers_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."offers_recommended_for" ADD CONSTRAINT "offers_recommended_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_offers_v_version_includes" ADD CONSTRAINT "_offers_v_version_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_offers_v_version_notes" ADD CONSTRAINT "_offers_v_version_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_offers_v_version_benefits" ADD CONSTRAINT "_offers_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_offers_v_version_recommended_for" ADD CONSTRAINT "_offers_v_version_recommended_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."massage_rituals_benefits" ADD CONSTRAINT "massage_rituals_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_rituals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_rituals_includes" ADD CONSTRAINT "massage_rituals_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_rituals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_rituals_salt_blends" ADD CONSTRAINT "massage_rituals_salt_blends_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_rituals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_rituals_v_version_benefits" ADD CONSTRAINT "_massage_rituals_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_rituals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_rituals_v_version_includes" ADD CONSTRAINT "_massage_rituals_v_version_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_rituals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_rituals_v_version_salt_blends" ADD CONSTRAINT "_massage_rituals_v_version_salt_blends_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_rituals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_rituals_v" ADD CONSTRAINT "_massage_rituals_v_parent_id_massage_rituals_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."massage_rituals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_classes_v" ADD CONSTRAINT "_classes_v_parent_id_classes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."policies_show_on" ADD CONSTRAINT "policies_show_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_policies_v_version_show_on" ADD CONSTRAINT "_policies_v_version_show_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_policies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_policies_v" ADD CONSTRAINT "_policies_v_parent_id_policies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."policies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."events_images" ADD CONSTRAINT "events_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."events_images" ADD CONSTRAINT "events_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."events" ADD CONSTRAINT "events_logo_media_id_media_id_fk" FOREIGN KEY ("logo_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_events_v_version_images" ADD CONSTRAINT "_events_v_version_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_events_v_version_images" ADD CONSTRAINT "_events_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_events_v" ADD CONSTRAINT "_events_v_version_logo_media_id_media_id_fk" FOREIGN KEY ("version_logo_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."testimonials" ADD CONSTRAINT "testimonials_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_image_media_id_media_id_fk" FOREIGN KEY ("version_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."legal_pages_contact_card_address_lines" ADD CONSTRAINT "legal_pages_contact_card_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."legal_pages" ADD CONSTRAINT "legal_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."legal_pages_texts" ADD CONSTRAINT "legal_pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_legal_pages_v_version_contact_card_address_lines" ADD CONSTRAINT "_legal_pages_v_version_contact_card_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_legal_pages_v_texts" ADD CONSTRAINT "_legal_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."newsletter_issues" ADD CONSTRAINT "newsletter_issues_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_newsletter_issues_v" ADD CONSTRAINT "_newsletter_issues_v_parent_id_newsletter_issues_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."newsletter_issues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_newsletter_issues_v" ADD CONSTRAINT "_newsletter_issues_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_faq" ADD CONSTRAINT "posts_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_sources" ADD CONSTRAINT "posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_cover_image_media_id_media_id_fk" FOREIGN KEY ("cover_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_reviewed_by_id_authors_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_version_faq" ADD CONSTRAINT "_posts_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_version_sources" ADD CONSTRAINT "_posts_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_media_id_media_id_fk" FOREIGN KEY ("version_cover_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_reviewed_by_id_authors_id_fk" FOREIGN KEY ("version_reviewed_by_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."categories" ADD CONSTRAINT "categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."categories_texts" ADD CONSTRAINT "categories_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_categories_v" ADD CONSTRAINT "_categories_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_categories_v_texts" ADD CONSTRAINT "_categories_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."authors_same_as" ADD CONSTRAINT "authors_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."authors" ADD CONSTRAINT "authors_photo_media_id_media_id_fk" FOREIGN KEY ("photo_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_authors_v_version_same_as" ADD CONSTRAINT "_authors_v_version_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_authors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_authors_v" ADD CONSTRAINT "_authors_v_parent_id_authors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_authors_v" ADD CONSTRAINT "_authors_v_version_photo_media_id_media_id_fk" FOREIGN KEY ("version_photo_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_location_address_lines" ADD CONSTRAINT "site_settings_location_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."ss_addr_short_lines" ADD CONSTRAINT "ss_addr_short_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_hours_display_lines" ADD CONSTRAINT "site_settings_hours_display_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_hours_days" ADD CONSTRAINT "site_settings_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_price_cards" ADD CONSTRAINT "site_settings_price_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_facts" ADD CONSTRAINT "site_settings_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."ss_struct_data_agg" ADD CONSTRAINT "ss_struct_data_agg_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_llms_key_pages" ADD CONSTRAINT "site_settings_llms_key_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_llms_section_headings" ADD CONSTRAINT "site_settings_llms_section_headings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."ss_llms_massage_intros" ADD CONSTRAINT "ss_llms_massage_intros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings" ADD CONSTRAINT "site_settings_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."site_settings" ADD CONSTRAINT "site_settings_brand_background_image_id_media_id_fk" FOREIGN KEY ("brand_background_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_texts" ADD CONSTRAINT "site_settings_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_location_address_lines" ADD CONSTRAINT "_site_settings_v_version_location_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_ss_addr_short_lines_v" ADD CONSTRAINT "_ss_addr_short_lines_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_hours_display_lines" ADD CONSTRAINT "_site_settings_v_version_hours_display_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_hours_days" ADD CONSTRAINT "_site_settings_v_version_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_price_cards" ADD CONSTRAINT "_site_settings_v_version_price_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_facts" ADD CONSTRAINT "_site_settings_v_version_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_ss_struct_data_agg_v" ADD CONSTRAINT "_ss_struct_data_agg_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_llms_key_pages" ADD CONSTRAINT "_site_settings_v_version_llms_key_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_version_llms_section_headings" ADD CONSTRAINT "_site_settings_v_version_llms_section_headings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_ss_llms_massage_intros_v" ADD CONSTRAINT "_ss_llms_massage_intros_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_brand_logo_id_media_id_fk" FOREIGN KEY ("version_brand_logo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_brand_background_image_id_media_id_fk" FOREIGN KEY ("version_brand_background_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_site_settings_v_texts" ADD CONSTRAINT "_site_settings_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."header_dropdowns_items" ADD CONSTRAINT "header_dropdowns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."header_dropdowns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."header_dropdowns" ADD CONSTRAINT "header_dropdowns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_header_v_version_dropdowns_items" ADD CONSTRAINT "_header_v_version_dropdowns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_header_v_version_dropdowns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_header_v_version_dropdowns" ADD CONSTRAINT "_header_v_version_dropdowns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_tagline_lines" ADD CONSTRAINT "footer_tagline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_footer_v_version_tagline_lines" ADD CONSTRAINT "_footer_v_version_tagline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_footer_v_version_legal_links" ADD CONSTRAINT "_footer_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."svc_explorer_highlights" ADD CONSTRAINT "svc_explorer_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page_services_explorer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_services_explorer_items" ADD CONSTRAINT "home_page_services_explorer_items_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_services_explorer_items" ADD CONSTRAINT "home_page_services_explorer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_about_images" ADD CONSTRAINT "home_page_about_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_about_images" ADD CONSTRAINT "home_page_about_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_method_pillars_benefits" ADD CONSTRAINT "home_page_method_pillars_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_method_pillars_stats" ADD CONSTRAINT "home_page_method_pillars_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_method_pillars" ADD CONSTRAINT "home_page_method_pillars_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_method_pillars" ADD CONSTRAINT "home_page_method_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page_social_feed_fallback_images" ADD CONSTRAINT "home_page_social_feed_fallback_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_social_feed_fallback_images" ADD CONSTRAINT "home_page_social_feed_fallback_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."home_page" ADD CONSTRAINT "home_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."home_page_texts" ADD CONSTRAINT "home_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_svc_explorer_highlights_v" ADD CONSTRAINT "_svc_explorer_highlights_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v_version_services_explorer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_services_explorer_items" ADD CONSTRAINT "_home_page_v_version_services_explorer_items_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_services_explorer_items" ADD CONSTRAINT "_home_page_v_version_services_explorer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_about_images" ADD CONSTRAINT "_home_page_v_version_about_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_about_images" ADD CONSTRAINT "_home_page_v_version_about_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars_benefits" ADD CONSTRAINT "_home_page_v_version_method_pillars_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v_version_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars_stats" ADD CONSTRAINT "_home_page_v_version_method_pillars_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v_version_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars" ADD CONSTRAINT "_home_page_v_version_method_pillars_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars" ADD CONSTRAINT "_home_page_v_version_method_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_social_feed_fallback_images" ADD CONSTRAINT "_home_page_v_version_social_feed_fallback_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_version_social_feed_fallback_images" ADD CONSTRAINT "_home_page_v_version_social_feed_fallback_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v" ADD CONSTRAINT "_home_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_home_page_v_texts" ADD CONSTRAINT "_home_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."about_page_philosophy_lines" ADD CONSTRAINT "about_page_philosophy_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."about_page_philosophy_panels" ADD CONSTRAINT "about_page_philosophy_panels_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."about_page_philosophy_panels" ADD CONSTRAINT "about_page_philosophy_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."about_page_gallery_images" ADD CONSTRAINT "about_page_gallery_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."about_page_gallery_images" ADD CONSTRAINT "about_page_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."about_page_cta_buttons" ADD CONSTRAINT "about_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."about_page" ADD CONSTRAINT "about_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."about_page" ADD CONSTRAINT "about_page_journey_image_media_id_media_id_fk" FOREIGN KEY ("journey_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."about_page_texts" ADD CONSTRAINT "about_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_philosophy_lines" ADD CONSTRAINT "_about_page_v_version_philosophy_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_philosophy_panels" ADD CONSTRAINT "_about_page_v_version_philosophy_panels_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_philosophy_panels" ADD CONSTRAINT "_about_page_v_version_philosophy_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_gallery_images" ADD CONSTRAINT "_about_page_v_version_gallery_images_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_gallery_images" ADD CONSTRAINT "_about_page_v_version_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_version_cta_buttons" ADD CONSTRAINT "_about_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v" ADD CONSTRAINT "_about_page_v_version_journey_image_media_id_media_id_fk" FOREIGN KEY ("version_journey_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v" ADD CONSTRAINT "_about_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_about_page_v_texts" ADD CONSTRAINT "_about_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."method_page_levels" ADD CONSTRAINT "method_page_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."method_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."method_page" ADD CONSTRAINT "method_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."method_page_texts" ADD CONSTRAINT "method_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."method_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_method_page_v_version_levels" ADD CONSTRAINT "_method_page_v_version_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_method_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_method_page_v" ADD CONSTRAINT "_method_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_method_page_v_texts" ADD CONSTRAINT "_method_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_method_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."classes_page_cta_buttons" ADD CONSTRAINT "classes_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."classes_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."classes_page" ADD CONSTRAINT "classes_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."classes_page" ADD CONSTRAINT "classes_page_reformer_room_image_media_id_media_id_fk" FOREIGN KEY ("reformer_room_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."classes_page" ADD CONSTRAINT "classes_page_breathing_room_image_media_id_media_id_fk" FOREIGN KEY ("breathing_room_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."classes_page" ADD CONSTRAINT "classes_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."classes_page_texts" ADD CONSTRAINT "classes_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."classes_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v_version_cta_buttons" ADD CONSTRAINT "_classes_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_classes_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v" ADD CONSTRAINT "_classes_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v" ADD CONSTRAINT "_classes_page_v_version_reformer_room_image_media_id_media_id_fk" FOREIGN KEY ("version_reformer_room_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v" ADD CONSTRAINT "_classes_page_v_version_breathing_room_image_media_id_media_id_fk" FOREIGN KEY ("version_breathing_room_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v" ADD CONSTRAINT "_classes_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_classes_page_v_texts" ADD CONSTRAINT "_classes_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_classes_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."schedule_page" ADD CONSTRAINT "schedule_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."schedule_page_texts" ADD CONSTRAINT "schedule_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."schedule_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_schedule_page_v" ADD CONSTRAINT "_schedule_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_schedule_page_v_texts" ADD CONSTRAINT "_schedule_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_schedule_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."appointments_page" ADD CONSTRAINT "appointments_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."appointments_page_texts" ADD CONSTRAINT "appointments_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."appointments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_appointments_page_v" ADD CONSTRAINT "_appointments_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_appointments_page_v_texts" ADD CONSTRAINT "_appointments_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_appointments_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pricing_page_cta_buttons" ADD CONSTRAINT "pricing_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pricing_page" ADD CONSTRAINT "pricing_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pricing_page_texts" ADD CONSTRAINT "pricing_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pricing_page_v_version_cta_buttons" ADD CONSTRAINT "_pricing_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pricing_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pricing_page_v" ADD CONSTRAINT "_pricing_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pricing_page_v_texts" ADD CONSTRAINT "_pricing_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_pricing_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."memberships_page_cta_buttons" ADD CONSTRAINT "memberships_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."memberships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."memberships_page" ADD CONSTRAINT "memberships_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."memberships_page" ADD CONSTRAINT "memberships_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."memberships_page_texts" ADD CONSTRAINT "memberships_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."memberships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_memberships_page_v_version_cta_buttons" ADD CONSTRAINT "_memberships_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_memberships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_memberships_page_v" ADD CONSTRAINT "_memberships_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_memberships_page_v" ADD CONSTRAINT "_memberships_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_memberships_page_v_texts" ADD CONSTRAINT "_memberships_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_memberships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."recovery_page_cards" ADD CONSTRAINT "recovery_page_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."recovery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."recovery_page" ADD CONSTRAINT "recovery_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."recovery_page_texts" ADD CONSTRAINT "recovery_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."recovery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_recovery_page_v_version_cards" ADD CONSTRAINT "_recovery_page_v_version_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_recovery_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_recovery_page_v" ADD CONSTRAINT "_recovery_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_recovery_page_v_texts" ADD CONSTRAINT "_recovery_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_recovery_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."services_page_items_features" ADD CONSTRAINT "services_page_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."services_page_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."services_page_items" ADD CONSTRAINT "services_page_items_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."services_page_items" ADD CONSTRAINT "services_page_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."services_page_cta_buttons" ADD CONSTRAINT "services_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."services_page" ADD CONSTRAINT "services_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."services_page_texts" ADD CONSTRAINT "services_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v_version_items_features" ADD CONSTRAINT "_services_page_v_version_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_services_page_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v_version_items" ADD CONSTRAINT "_services_page_v_version_items_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v_version_items" ADD CONSTRAINT "_services_page_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v_version_cta_buttons" ADD CONSTRAINT "_services_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v" ADD CONSTRAINT "_services_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_services_page_v_texts" ADD CONSTRAINT "_services_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."rpp_overview_para" ADD CONSTRAINT "rpp_overview_para_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."reformer_pilates_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page_overview_stats" ADD CONSTRAINT "reformer_pilates_page_overview_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."reformer_pilates_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."rpp_overview_card_bul" ADD CONSTRAINT "rpp_overview_card_bul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."reformer_pilates_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page_cta_buttons" ADD CONSTRAINT "reformer_pilates_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."reformer_pilates_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page" ADD CONSTRAINT "reformer_pilates_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page" ADD CONSTRAINT "reformer_pilates_page_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page" ADD CONSTRAINT "reformer_pilates_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."reformer_pilates_page_texts" ADD CONSTRAINT "reformer_pilates_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."reformer_pilates_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_rpp_overview_para_v" ADD CONSTRAINT "_rpp_overview_para_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_reformer_pilates_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v_version_overview_stats" ADD CONSTRAINT "_reformer_pilates_page_v_version_overview_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_reformer_pilates_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_rpp_overview_card_bul_v" ADD CONSTRAINT "_rpp_overview_card_bul_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_reformer_pilates_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v_version_cta_buttons" ADD CONSTRAINT "_reformer_pilates_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_reformer_pilates_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v" ADD CONSTRAINT "_reformer_pilates_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v" ADD CONSTRAINT "_reformer_pilates_page_v_version_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("version_overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v" ADD CONSTRAINT "_reformer_pilates_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_reformer_pilates_page_v_texts" ADD CONSTRAINT "_reformer_pilates_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_reformer_pilates_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."brp_overview_para" ADD CONSTRAINT "brp_overview_para_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."breathing_room_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page_overview_stats" ADD CONSTRAINT "breathing_room_page_overview_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."breathing_room_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."brp_overview_card_bul" ADD CONSTRAINT "brp_overview_card_bul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."breathing_room_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page_cta_buttons" ADD CONSTRAINT "breathing_room_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."breathing_room_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page" ADD CONSTRAINT "breathing_room_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page" ADD CONSTRAINT "breathing_room_page_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page" ADD CONSTRAINT "breathing_room_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."breathing_room_page_texts" ADD CONSTRAINT "breathing_room_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."breathing_room_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_brp_overview_para_v" ADD CONSTRAINT "_brp_overview_para_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_breathing_room_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v_version_overview_stats" ADD CONSTRAINT "_breathing_room_page_v_version_overview_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_breathing_room_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_brp_overview_card_bul_v" ADD CONSTRAINT "_brp_overview_card_bul_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_breathing_room_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v_version_cta_buttons" ADD CONSTRAINT "_breathing_room_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_breathing_room_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v" ADD CONSTRAINT "_breathing_room_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v" ADD CONSTRAINT "_breathing_room_page_v_version_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("version_overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v" ADD CONSTRAINT "_breathing_room_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_breathing_room_page_v_texts" ADD CONSTRAINT "_breathing_room_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_breathing_room_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."ctp_overview_para" ADD CONSTRAINT "ctp_overview_para_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."contrast_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."ctp_overview_card_bul" ADD CONSTRAINT "ctp_overview_card_bul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."contrast_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page_benefits_items" ADD CONSTRAINT "contrast_therapy_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."contrast_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page_cta_buttons" ADD CONSTRAINT "contrast_therapy_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."contrast_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page" ADD CONSTRAINT "contrast_therapy_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page" ADD CONSTRAINT "contrast_therapy_page_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page" ADD CONSTRAINT "contrast_therapy_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."contrast_therapy_page_texts" ADD CONSTRAINT "contrast_therapy_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."contrast_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_ctp_overview_para_v" ADD CONSTRAINT "_ctp_overview_para_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_contrast_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_ctp_overview_card_bul_v" ADD CONSTRAINT "_ctp_overview_card_bul_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_contrast_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v_version_benefits_items" ADD CONSTRAINT "_contrast_therapy_page_v_version_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_contrast_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v_version_cta_buttons" ADD CONSTRAINT "_contrast_therapy_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_contrast_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v" ADD CONSTRAINT "_contrast_therapy_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v" ADD CONSTRAINT "_contrast_therapy_page_v_version_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("version_overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v" ADD CONSTRAINT "_contrast_therapy_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_contrast_therapy_page_v_texts" ADD CONSTRAINT "_contrast_therapy_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_contrast_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."cmp_overview_para" ADD CONSTRAINT "cmp_overview_para_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."compression_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."cmp_overview_card_bul" ADD CONSTRAINT "cmp_overview_card_bul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."compression_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."compression_therapy_page_cta_buttons" ADD CONSTRAINT "compression_therapy_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."compression_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."compression_therapy_page" ADD CONSTRAINT "compression_therapy_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."compression_therapy_page" ADD CONSTRAINT "compression_therapy_page_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."compression_therapy_page" ADD CONSTRAINT "compression_therapy_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."compression_therapy_page_texts" ADD CONSTRAINT "compression_therapy_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."compression_therapy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_cmp_overview_para_v" ADD CONSTRAINT "_cmp_overview_para_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_compression_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_cmp_overview_card_bul_v" ADD CONSTRAINT "_cmp_overview_card_bul_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_compression_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_compression_therapy_page_v_version_cta_buttons" ADD CONSTRAINT "_compression_therapy_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_compression_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_compression_therapy_page_v" ADD CONSTRAINT "_compression_therapy_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_compression_therapy_page_v" ADD CONSTRAINT "_compression_therapy_page_v_version_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("version_overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_compression_therapy_page_v" ADD CONSTRAINT "_compression_therapy_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_compression_therapy_page_v_texts" ADD CONSTRAINT "_compression_therapy_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_compression_therapy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_page_overview_paragraphs" ADD CONSTRAINT "massage_page_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_page_overview_card_bullets" ADD CONSTRAINT "massage_page_overview_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_page_cta_buttons" ADD CONSTRAINT "massage_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."massage_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."massage_page" ADD CONSTRAINT "massage_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."massage_page" ADD CONSTRAINT "massage_page_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."massage_page" ADD CONSTRAINT "massage_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."massage_page_texts" ADD CONSTRAINT "massage_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."massage_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v_version_overview_paragraphs" ADD CONSTRAINT "_massage_page_v_version_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v_version_overview_card_bullets" ADD CONSTRAINT "_massage_page_v_version_overview_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v_version_cta_buttons" ADD CONSTRAINT "_massage_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_massage_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v" ADD CONSTRAINT "_massage_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v" ADD CONSTRAINT "_massage_page_v_version_overview_card_image_media_id_media_id_fk" FOREIGN KEY ("version_overview_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v" ADD CONSTRAINT "_massage_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_massage_page_v_texts" ADD CONSTRAINT "_massage_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_massage_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."events_page_event_types_items" ADD CONSTRAINT "events_page_event_types_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."events_page_cta_buttons" ADD CONSTRAINT "events_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."events_page" ADD CONSTRAINT "events_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."events_page" ADD CONSTRAINT "events_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."events_page_texts" ADD CONSTRAINT "events_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_events_page_v_version_event_types_items" ADD CONSTRAINT "_events_page_v_version_event_types_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_events_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_events_page_v_version_cta_buttons" ADD CONSTRAINT "_events_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_events_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_events_page_v" ADD CONSTRAINT "_events_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_events_page_v" ADD CONSTRAINT "_events_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_events_page_v_texts" ADD CONSTRAINT "_events_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_events_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page_types_items_features" ADD CONSTRAINT "partnerships_page_types_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."partnerships_page_types_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page_types_items" ADD CONSTRAINT "partnerships_page_types_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."partnerships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page_why_partner_items" ADD CONSTRAINT "partnerships_page_why_partner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."partnerships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page_cta_buttons" ADD CONSTRAINT "partnerships_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."partnerships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page" ADD CONSTRAINT "partnerships_page_hero_image_media_id_media_id_fk" FOREIGN KEY ("hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page" ADD CONSTRAINT "partnerships_page_why_partner_image_media_id_media_id_fk" FOREIGN KEY ("why_partner_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page" ADD CONSTRAINT "partnerships_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."partnerships_page_texts" ADD CONSTRAINT "partnerships_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."partnerships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v_version_types_items_features" ADD CONSTRAINT "_partnerships_page_v_version_types_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_partnerships_page_v_version_types_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v_version_types_items" ADD CONSTRAINT "_partnerships_page_v_version_types_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_partnerships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v_version_why_partner_items" ADD CONSTRAINT "_partnerships_page_v_version_why_partner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_partnerships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v_version_cta_buttons" ADD CONSTRAINT "_partnerships_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_partnerships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v" ADD CONSTRAINT "_partnerships_page_v_version_hero_image_media_id_media_id_fk" FOREIGN KEY ("version_hero_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v" ADD CONSTRAINT "_partnerships_page_v_version_why_partner_image_media_id_media_id_fk" FOREIGN KEY ("version_why_partner_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v" ADD CONSTRAINT "_partnerships_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_partnerships_page_v_texts" ADD CONSTRAINT "_partnerships_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_partnerships_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."contact_page" ADD CONSTRAINT "contact_page_image_card_image_media_id_media_id_fk" FOREIGN KEY ("image_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."contact_page_texts" ADD CONSTRAINT "contact_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_image_card_image_media_id_media_id_fk" FOREIGN KEY ("version_image_card_image_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_contact_page_v_texts" ADD CONSTRAINT "_contact_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page_benefits_items" ADD CONSTRAINT "register_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page_perks_items" ADD CONSTRAINT "register_page_perks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page_trust_badges_items" ADD CONSTRAINT "register_page_trust_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page_cta_buttons" ADD CONSTRAINT "register_page_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page_quick_links_items" ADD CONSTRAINT "register_page_quick_links_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."register_page" ADD CONSTRAINT "register_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."register_page_texts" ADD CONSTRAINT "register_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."register_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_version_benefits_items" ADD CONSTRAINT "_register_page_v_version_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_version_perks_items" ADD CONSTRAINT "_register_page_v_version_perks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_version_trust_badges_items" ADD CONSTRAINT "_register_page_v_version_trust_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_version_cta_buttons" ADD CONSTRAINT "_register_page_v_version_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_version_quick_links_items" ADD CONSTRAINT "_register_page_v_version_quick_links_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v" ADD CONSTRAINT "_register_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_register_page_v_texts" ADD CONSTRAINT "_register_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_register_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."account_page_features_items" ADD CONSTRAINT "account_page_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."account_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."account_page_quick_actions_buttons" ADD CONSTRAINT "account_page_quick_actions_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."account_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."account_page_trust_badges_items" ADD CONSTRAINT "account_page_trust_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."account_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."account_page" ADD CONSTRAINT "account_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."account_page_texts" ADD CONSTRAINT "account_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."account_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_account_page_v_version_features_items" ADD CONSTRAINT "_account_page_v_version_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_account_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_account_page_v_version_quick_actions_buttons" ADD CONSTRAINT "_account_page_v_version_quick_actions_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_account_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_account_page_v_version_trust_badges_items" ADD CONSTRAINT "_account_page_v_version_trust_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_account_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_account_page_v" ADD CONSTRAINT "_account_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_account_page_v_texts" ADD CONSTRAINT "_account_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_account_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."email_cf_team_recipients" ADD CONSTRAINT "email_cf_team_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_email_cf_team_recipients_v" ADD CONSTRAINT "_email_cf_team_recipients_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_email_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_page" ADD CONSTRAINT "blog_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_page_texts" ADD CONSTRAINT "blog_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_page_v" ADD CONSTRAINT "_blog_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_page_v_texts" ADD CONSTRAINT "_blog_page_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_blog_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "offers_includes_order_idx" ON "payload"."offers_includes" USING btree ("_order");
  CREATE INDEX "offers_includes_parent_id_idx" ON "payload"."offers_includes" USING btree ("_parent_id");
  CREATE INDEX "offers_notes_order_idx" ON "payload"."offers_notes" USING btree ("_order");
  CREATE INDEX "offers_notes_parent_id_idx" ON "payload"."offers_notes" USING btree ("_parent_id");
  CREATE INDEX "offers_benefits_order_idx" ON "payload"."offers_benefits" USING btree ("_order");
  CREATE INDEX "offers_benefits_parent_id_idx" ON "payload"."offers_benefits" USING btree ("_parent_id");
  CREATE INDEX "offers_recommended_for_order_idx" ON "payload"."offers_recommended_for" USING btree ("_order");
  CREATE INDEX "offers_recommended_for_parent_id_idx" ON "payload"."offers_recommended_for" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "payload"."offers" USING btree ("slug");
  CREATE INDEX "offers_category_idx" ON "payload"."offers" USING btree ("category");
  CREATE INDEX "offers_updated_at_idx" ON "payload"."offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "payload"."offers" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_idx" ON "payload"."offers" USING btree ("active","sort_order");
  CREATE INDEX "_offers_v_version_includes_order_idx" ON "payload"."_offers_v_version_includes" USING btree ("_order");
  CREATE INDEX "_offers_v_version_includes_parent_id_idx" ON "payload"."_offers_v_version_includes" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_version_notes_order_idx" ON "payload"."_offers_v_version_notes" USING btree ("_order");
  CREATE INDEX "_offers_v_version_notes_parent_id_idx" ON "payload"."_offers_v_version_notes" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_version_benefits_order_idx" ON "payload"."_offers_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_offers_v_version_benefits_parent_id_idx" ON "payload"."_offers_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_version_recommended_for_order_idx" ON "payload"."_offers_v_version_recommended_for" USING btree ("_order");
  CREATE INDEX "_offers_v_version_recommended_for_parent_id_idx" ON "payload"."_offers_v_version_recommended_for" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_parent_idx" ON "payload"."_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_slug_idx" ON "payload"."_offers_v" USING btree ("version_slug");
  CREATE INDEX "_offers_v_version_version_category_idx" ON "payload"."_offers_v" USING btree ("version_category");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "payload"."_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "payload"."_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_created_at_idx" ON "payload"."_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "payload"."_offers_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_idx" ON "payload"."_offers_v" USING btree ("version_active","version_sort_order");
  CREATE INDEX "massage_rituals_benefits_order_idx" ON "payload"."massage_rituals_benefits" USING btree ("_order");
  CREATE INDEX "massage_rituals_benefits_parent_id_idx" ON "payload"."massage_rituals_benefits" USING btree ("_parent_id");
  CREATE INDEX "massage_rituals_includes_order_idx" ON "payload"."massage_rituals_includes" USING btree ("_order");
  CREATE INDEX "massage_rituals_includes_parent_id_idx" ON "payload"."massage_rituals_includes" USING btree ("_parent_id");
  CREATE INDEX "massage_rituals_salt_blends_order_idx" ON "payload"."massage_rituals_salt_blends" USING btree ("_order");
  CREATE INDEX "massage_rituals_salt_blends_parent_id_idx" ON "payload"."massage_rituals_salt_blends" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "massage_rituals_slug_idx" ON "payload"."massage_rituals" USING btree ("slug");
  CREATE INDEX "massage_rituals_updated_at_idx" ON "payload"."massage_rituals" USING btree ("updated_at");
  CREATE INDEX "massage_rituals_created_at_idx" ON "payload"."massage_rituals" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_1_idx" ON "payload"."massage_rituals" USING btree ("active","sort_order");
  CREATE INDEX "_massage_rituals_v_version_benefits_order_idx" ON "payload"."_massage_rituals_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_massage_rituals_v_version_benefits_parent_id_idx" ON "payload"."_massage_rituals_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_massage_rituals_v_version_includes_order_idx" ON "payload"."_massage_rituals_v_version_includes" USING btree ("_order");
  CREATE INDEX "_massage_rituals_v_version_includes_parent_id_idx" ON "payload"."_massage_rituals_v_version_includes" USING btree ("_parent_id");
  CREATE INDEX "_massage_rituals_v_version_salt_blends_order_idx" ON "payload"."_massage_rituals_v_version_salt_blends" USING btree ("_order");
  CREATE INDEX "_massage_rituals_v_version_salt_blends_parent_id_idx" ON "payload"."_massage_rituals_v_version_salt_blends" USING btree ("_parent_id");
  CREATE INDEX "_massage_rituals_v_parent_idx" ON "payload"."_massage_rituals_v" USING btree ("parent_id");
  CREATE INDEX "_massage_rituals_v_version_version_slug_idx" ON "payload"."_massage_rituals_v" USING btree ("version_slug");
  CREATE INDEX "_massage_rituals_v_version_version_updated_at_idx" ON "payload"."_massage_rituals_v" USING btree ("version_updated_at");
  CREATE INDEX "_massage_rituals_v_version_version_created_at_idx" ON "payload"."_massage_rituals_v" USING btree ("version_created_at");
  CREATE INDEX "_massage_rituals_v_created_at_idx" ON "payload"."_massage_rituals_v" USING btree ("created_at");
  CREATE INDEX "_massage_rituals_v_updated_at_idx" ON "payload"."_massage_rituals_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_1_idx" ON "payload"."_massage_rituals_v" USING btree ("version_active","version_sort_order");
  CREATE UNIQUE INDEX "classes_slug_idx" ON "payload"."classes" USING btree ("slug");
  CREATE INDEX "classes_type_idx" ON "payload"."classes" USING btree ("type");
  CREATE INDEX "classes_updated_at_idx" ON "payload"."classes" USING btree ("updated_at");
  CREATE INDEX "classes_created_at_idx" ON "payload"."classes" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_2_idx" ON "payload"."classes" USING btree ("active","sort_order");
  CREATE INDEX "_classes_v_parent_idx" ON "payload"."_classes_v" USING btree ("parent_id");
  CREATE INDEX "_classes_v_version_version_slug_idx" ON "payload"."_classes_v" USING btree ("version_slug");
  CREATE INDEX "_classes_v_version_version_type_idx" ON "payload"."_classes_v" USING btree ("version_type");
  CREATE INDEX "_classes_v_version_version_updated_at_idx" ON "payload"."_classes_v" USING btree ("version_updated_at");
  CREATE INDEX "_classes_v_version_version_created_at_idx" ON "payload"."_classes_v" USING btree ("version_created_at");
  CREATE INDEX "_classes_v_created_at_idx" ON "payload"."_classes_v" USING btree ("created_at");
  CREATE INDEX "_classes_v_updated_at_idx" ON "payload"."_classes_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_2_idx" ON "payload"."_classes_v" USING btree ("version_active","version_sort_order");
  CREATE INDEX "policies_show_on_order_idx" ON "payload"."policies_show_on" USING btree ("order");
  CREATE INDEX "policies_show_on_parent_idx" ON "payload"."policies_show_on" USING btree ("parent_id");
  CREATE INDEX "policies_updated_at_idx" ON "payload"."policies" USING btree ("updated_at");
  CREATE INDEX "policies_created_at_idx" ON "payload"."policies" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_3_idx" ON "payload"."policies" USING btree ("active","sort_order");
  CREATE INDEX "_policies_v_version_show_on_order_idx" ON "payload"."_policies_v_version_show_on" USING btree ("order");
  CREATE INDEX "_policies_v_version_show_on_parent_idx" ON "payload"."_policies_v_version_show_on" USING btree ("parent_id");
  CREATE INDEX "_policies_v_parent_idx" ON "payload"."_policies_v" USING btree ("parent_id");
  CREATE INDEX "_policies_v_version_version_updated_at_idx" ON "payload"."_policies_v" USING btree ("version_updated_at");
  CREATE INDEX "_policies_v_version_version_created_at_idx" ON "payload"."_policies_v" USING btree ("version_created_at");
  CREATE INDEX "_policies_v_created_at_idx" ON "payload"."_policies_v" USING btree ("created_at");
  CREATE INDEX "_policies_v_updated_at_idx" ON "payload"."_policies_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_3_idx" ON "payload"."_policies_v" USING btree ("version_active","version_sort_order");
  CREATE INDEX "events_images_order_idx" ON "payload"."events_images" USING btree ("_order");
  CREATE INDEX "events_images_parent_id_idx" ON "payload"."events_images" USING btree ("_parent_id");
  CREATE INDEX "events_images_image_image_media_idx" ON "payload"."events_images" USING btree ("image_media_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "payload"."events" USING btree ("slug");
  CREATE INDEX "events_kind_idx" ON "payload"."events" USING btree ("kind");
  CREATE INDEX "events_logo_logo_media_idx" ON "payload"."events" USING btree ("logo_media_id");
  CREATE INDEX "events_updated_at_idx" ON "payload"."events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "payload"."events" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_4_idx" ON "payload"."events" USING btree ("active","sort_order");
  CREATE INDEX "_events_v_version_images_order_idx" ON "payload"."_events_v_version_images" USING btree ("_order");
  CREATE INDEX "_events_v_version_images_parent_id_idx" ON "payload"."_events_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_images_image_image_media_idx" ON "payload"."_events_v_version_images" USING btree ("image_media_id");
  CREATE INDEX "_events_v_parent_idx" ON "payload"."_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "payload"."_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_kind_idx" ON "payload"."_events_v" USING btree ("version_kind");
  CREATE INDEX "_events_v_version_logo_version_logo_media_idx" ON "payload"."_events_v" USING btree ("version_logo_media_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "payload"."_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "payload"."_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_created_at_idx" ON "payload"."_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "payload"."_events_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_4_idx" ON "payload"."_events_v" USING btree ("version_active","version_sort_order");
  CREATE INDEX "testimonials_image_image_media_idx" ON "payload"."testimonials" USING btree ("image_media_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "payload"."testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "payload"."testimonials" USING btree ("created_at");
  CREATE INDEX "active_sortOrder_5_idx" ON "payload"."testimonials" USING btree ("active","sort_order");
  CREATE INDEX "_testimonials_v_parent_idx" ON "payload"."_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_image_version_image_media_idx" ON "payload"."_testimonials_v" USING btree ("version_image_media_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "payload"."_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "payload"."_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "payload"."_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "payload"."_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "version_active_version_sortOrder_5_idx" ON "payload"."_testimonials_v" USING btree ("version_active","version_sort_order");
  CREATE INDEX "legal_pages_contact_card_address_lines_order_idx" ON "payload"."legal_pages_contact_card_address_lines" USING btree ("_order");
  CREATE INDEX "legal_pages_contact_card_address_lines_parent_id_idx" ON "payload"."legal_pages_contact_card_address_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "payload"."legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_seo_seo_og_image_idx" ON "payload"."legal_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "legal_pages_updated_at_idx" ON "payload"."legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "payload"."legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages_texts_order_parent" ON "payload"."legal_pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "_legal_pages_v_version_contact_card_address_lines_order_idx" ON "payload"."_legal_pages_v_version_contact_card_address_lines" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_contact_card_address_lines_parent_id_idx" ON "payload"."_legal_pages_v_version_contact_card_address_lines" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "payload"."_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "payload"."_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_seo_version_seo_og_image_idx" ON "payload"."_legal_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "payload"."_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "payload"."_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "payload"."_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "payload"."_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_texts_order_parent" ON "payload"."_legal_pages_v_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "payload"."newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_status_idx" ON "payload"."newsletter_subscribers" USING btree ("status");
  CREATE INDEX "newsletter_subscribers_confirmed_at_idx" ON "payload"."newsletter_subscribers" USING btree ("confirmed_at");
  CREATE INDEX "newsletter_subscribers_confirm_token_hash_idx" ON "payload"."newsletter_subscribers" USING btree ("confirm_token_hash");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "payload"."newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "payload"."newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "newsletter_issues_cover_image_idx" ON "payload"."newsletter_issues" USING btree ("cover_image_id");
  CREATE INDEX "newsletter_issues_updated_at_idx" ON "payload"."newsletter_issues" USING btree ("updated_at");
  CREATE INDEX "newsletter_issues_created_at_idx" ON "payload"."newsletter_issues" USING btree ("created_at");
  CREATE INDEX "_newsletter_issues_v_parent_idx" ON "payload"."_newsletter_issues_v" USING btree ("parent_id");
  CREATE INDEX "_newsletter_issues_v_version_version_cover_image_idx" ON "payload"."_newsletter_issues_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_newsletter_issues_v_version_version_updated_at_idx" ON "payload"."_newsletter_issues_v" USING btree ("version_updated_at");
  CREATE INDEX "_newsletter_issues_v_version_version_created_at_idx" ON "payload"."_newsletter_issues_v" USING btree ("version_created_at");
  CREATE INDEX "_newsletter_issues_v_created_at_idx" ON "payload"."_newsletter_issues_v" USING btree ("created_at");
  CREATE INDEX "_newsletter_issues_v_updated_at_idx" ON "payload"."_newsletter_issues_v" USING btree ("updated_at");
  CREATE INDEX "posts_faq_order_idx" ON "payload"."posts_faq" USING btree ("_order");
  CREATE INDEX "posts_faq_parent_id_idx" ON "payload"."posts_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_sources_order_idx" ON "payload"."posts_sources" USING btree ("_order");
  CREATE INDEX "posts_sources_parent_id_idx" ON "payload"."posts_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "payload"."posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_cover_image_media_idx" ON "payload"."posts" USING btree ("cover_image_media_id");
  CREATE INDEX "posts_author_idx" ON "payload"."posts" USING btree ("author_id");
  CREATE INDEX "posts_reviewed_by_idx" ON "payload"."posts" USING btree ("reviewed_by_id");
  CREATE INDEX "posts_published_at_idx" ON "payload"."posts" USING btree ("published_at");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "payload"."posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "payload"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "payload"."posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "payload"."posts" USING btree ("_status");
  CREATE INDEX "posts_texts_order_parent" ON "payload"."posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "payload"."posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "payload"."posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "payload"."posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "payload"."posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "payload"."posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_version_faq_order_idx" ON "payload"."_posts_v_version_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_version_faq_parent_id_idx" ON "payload"."_posts_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sources_order_idx" ON "payload"."_posts_v_version_sources" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sources_parent_id_idx" ON "payload"."_posts_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "payload"."_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "payload"."_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_cover_image_version_cover_image_media_idx" ON "payload"."_posts_v" USING btree ("version_cover_image_media_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "payload"."_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_reviewed_by_idx" ON "payload"."_posts_v" USING btree ("version_reviewed_by_id");
  CREATE INDEX "_posts_v_version_version_published_at_idx" ON "payload"."_posts_v" USING btree ("version_published_at");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "payload"."_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "payload"."_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "payload"."_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "payload"."_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "payload"."_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "payload"."_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "payload"."_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_texts_order_parent" ON "payload"."_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "payload"."_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "payload"."_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "payload"."_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "payload"."_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "payload"."_posts_v_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "payload"."categories" USING btree ("slug");
  CREATE INDEX "categories_seo_seo_og_image_idx" ON "payload"."categories" USING btree ("seo_og_image_id");
  CREATE INDEX "categories_updated_at_idx" ON "payload"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "payload"."categories" USING btree ("created_at");
  CREATE INDEX "categories_texts_order_parent" ON "payload"."categories_texts" USING btree ("order","parent_id");
  CREATE INDEX "_categories_v_parent_idx" ON "payload"."_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "payload"."_categories_v" USING btree ("version_slug");
  CREATE INDEX "_categories_v_version_seo_version_seo_og_image_idx" ON "payload"."_categories_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "payload"."_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "payload"."_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_created_at_idx" ON "payload"."_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "payload"."_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_texts_order_parent" ON "payload"."_categories_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "authors_same_as_order_idx" ON "payload"."authors_same_as" USING btree ("_order");
  CREATE INDEX "authors_same_as_parent_id_idx" ON "payload"."authors_same_as" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "payload"."authors" USING btree ("slug");
  CREATE INDEX "authors_photo_photo_media_idx" ON "payload"."authors" USING btree ("photo_media_id");
  CREATE INDEX "authors_updated_at_idx" ON "payload"."authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "payload"."authors" USING btree ("created_at");
  CREATE INDEX "_authors_v_version_same_as_order_idx" ON "payload"."_authors_v_version_same_as" USING btree ("_order");
  CREATE INDEX "_authors_v_version_same_as_parent_id_idx" ON "payload"."_authors_v_version_same_as" USING btree ("_parent_id");
  CREATE INDEX "_authors_v_parent_idx" ON "payload"."_authors_v" USING btree ("parent_id");
  CREATE INDEX "_authors_v_version_version_slug_idx" ON "payload"."_authors_v" USING btree ("version_slug");
  CREATE INDEX "_authors_v_version_photo_version_photo_media_idx" ON "payload"."_authors_v" USING btree ("version_photo_media_id");
  CREATE INDEX "_authors_v_version_version_updated_at_idx" ON "payload"."_authors_v" USING btree ("version_updated_at");
  CREATE INDEX "_authors_v_version_version_created_at_idx" ON "payload"."_authors_v" USING btree ("version_created_at");
  CREATE INDEX "_authors_v_created_at_idx" ON "payload"."_authors_v" USING btree ("created_at");
  CREATE INDEX "_authors_v_updated_at_idx" ON "payload"."_authors_v" USING btree ("updated_at");
  CREATE INDEX "faqs_topic_idx" ON "payload"."faqs" USING btree ("topic");
  CREATE INDEX "faqs_updated_at_idx" ON "payload"."faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "payload"."faqs" USING btree ("created_at");
  CREATE INDEX "_faqs_v_parent_idx" ON "payload"."_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_topic_idx" ON "payload"."_faqs_v" USING btree ("version_topic");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "payload"."_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "payload"."_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_created_at_idx" ON "payload"."_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "payload"."_faqs_v" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload"."payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload"."payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload"."payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload"."payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload"."payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload"."payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload"."payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload"."payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload"."payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload"."payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload"."payload_jobs" USING btree ("created_at");
  CREATE INDEX "site_settings_location_address_lines_order_idx" ON "payload"."site_settings_location_address_lines" USING btree ("_order");
  CREATE INDEX "site_settings_location_address_lines_parent_id_idx" ON "payload"."site_settings_location_address_lines" USING btree ("_parent_id");
  CREATE INDEX "ss_addr_short_lines_order_idx" ON "payload"."ss_addr_short_lines" USING btree ("_order");
  CREATE INDEX "ss_addr_short_lines_parent_id_idx" ON "payload"."ss_addr_short_lines" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hours_display_lines_order_idx" ON "payload"."site_settings_hours_display_lines" USING btree ("_order");
  CREATE INDEX "site_settings_hours_display_lines_parent_id_idx" ON "payload"."site_settings_hours_display_lines" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hours_days_order_idx" ON "payload"."site_settings_hours_days" USING btree ("order");
  CREATE INDEX "site_settings_hours_days_parent_idx" ON "payload"."site_settings_hours_days" USING btree ("parent_id");
  CREATE INDEX "site_settings_price_cards_order_idx" ON "payload"."site_settings_price_cards" USING btree ("_order");
  CREATE INDEX "site_settings_price_cards_parent_id_idx" ON "payload"."site_settings_price_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_price_cards_category_idx" ON "payload"."site_settings_price_cards" USING btree ("category");
  CREATE INDEX "site_settings_facts_order_idx" ON "payload"."site_settings_facts" USING btree ("_order");
  CREATE INDEX "site_settings_facts_parent_id_idx" ON "payload"."site_settings_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_facts_key_idx" ON "payload"."site_settings_facts" USING btree ("key");
  CREATE INDEX "ss_struct_data_agg_order_idx" ON "payload"."ss_struct_data_agg" USING btree ("_order");
  CREATE INDEX "ss_struct_data_agg_parent_id_idx" ON "payload"."ss_struct_data_agg" USING btree ("_parent_id");
  CREATE INDEX "site_settings_llms_key_pages_order_idx" ON "payload"."site_settings_llms_key_pages" USING btree ("_order");
  CREATE INDEX "site_settings_llms_key_pages_parent_id_idx" ON "payload"."site_settings_llms_key_pages" USING btree ("_parent_id");
  CREATE INDEX "site_settings_llms_section_headings_order_idx" ON "payload"."site_settings_llms_section_headings" USING btree ("_order");
  CREATE INDEX "site_settings_llms_section_headings_parent_id_idx" ON "payload"."site_settings_llms_section_headings" USING btree ("_parent_id");
  CREATE INDEX "ss_llms_massage_intros_order_idx" ON "payload"."ss_llms_massage_intros" USING btree ("_order");
  CREATE INDEX "ss_llms_massage_intros_parent_id_idx" ON "payload"."ss_llms_massage_intros" USING btree ("_parent_id");
  CREATE INDEX "site_settings_brand_brand_logo_idx" ON "payload"."site_settings" USING btree ("brand_logo_id");
  CREATE INDEX "site_settings_brand_brand_background_image_idx" ON "payload"."site_settings" USING btree ("brand_background_image_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "payload"."site_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "site_settings_texts_order_parent" ON "payload"."site_settings_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_settings_v_version_location_address_lines_order_idx" ON "payload"."_site_settings_v_version_location_address_lines" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_location_address_lines_parent_id_idx" ON "payload"."_site_settings_v_version_location_address_lines" USING btree ("_parent_id");
  CREATE INDEX "_ss_addr_short_lines_v_order_idx" ON "payload"."_ss_addr_short_lines_v" USING btree ("_order");
  CREATE INDEX "_ss_addr_short_lines_v_parent_id_idx" ON "payload"."_ss_addr_short_lines_v" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_hours_display_lines_order_idx" ON "payload"."_site_settings_v_version_hours_display_lines" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_hours_display_lines_parent_id_idx" ON "payload"."_site_settings_v_version_hours_display_lines" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_hours_days_order_idx" ON "payload"."_site_settings_v_version_hours_days" USING btree ("order");
  CREATE INDEX "_site_settings_v_version_hours_days_parent_idx" ON "payload"."_site_settings_v_version_hours_days" USING btree ("parent_id");
  CREATE INDEX "_site_settings_v_version_price_cards_order_idx" ON "payload"."_site_settings_v_version_price_cards" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_price_cards_parent_id_idx" ON "payload"."_site_settings_v_version_price_cards" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_price_cards_category_idx" ON "payload"."_site_settings_v_version_price_cards" USING btree ("category");
  CREATE INDEX "_site_settings_v_version_facts_order_idx" ON "payload"."_site_settings_v_version_facts" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_facts_parent_id_idx" ON "payload"."_site_settings_v_version_facts" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_facts_key_idx" ON "payload"."_site_settings_v_version_facts" USING btree ("key");
  CREATE INDEX "_ss_struct_data_agg_v_order_idx" ON "payload"."_ss_struct_data_agg_v" USING btree ("_order");
  CREATE INDEX "_ss_struct_data_agg_v_parent_id_idx" ON "payload"."_ss_struct_data_agg_v" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_llms_key_pages_order_idx" ON "payload"."_site_settings_v_version_llms_key_pages" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_llms_key_pages_parent_id_idx" ON "payload"."_site_settings_v_version_llms_key_pages" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_llms_section_headings_order_idx" ON "payload"."_site_settings_v_version_llms_section_headings" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_llms_section_headings_parent_id_idx" ON "payload"."_site_settings_v_version_llms_section_headings" USING btree ("_parent_id");
  CREATE INDEX "_ss_llms_massage_intros_v_order_idx" ON "payload"."_ss_llms_massage_intros_v" USING btree ("_order");
  CREATE INDEX "_ss_llms_massage_intros_v_parent_id_idx" ON "payload"."_ss_llms_massage_intros_v" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_brand_version_brand_logo_idx" ON "payload"."_site_settings_v" USING btree ("version_brand_logo_id");
  CREATE INDEX "_site_settings_v_version_brand_version_brand_background__idx" ON "payload"."_site_settings_v" USING btree ("version_brand_background_image_id");
  CREATE INDEX "_site_settings_v_version_seo_version_seo_og_image_idx" ON "payload"."_site_settings_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "payload"."_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "payload"."_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_texts_order_parent" ON "payload"."_site_settings_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "header_dropdowns_items_order_idx" ON "payload"."header_dropdowns_items" USING btree ("_order");
  CREATE INDEX "header_dropdowns_items_parent_id_idx" ON "payload"."header_dropdowns_items" USING btree ("_parent_id");
  CREATE INDEX "header_dropdowns_order_idx" ON "payload"."header_dropdowns" USING btree ("_order");
  CREATE INDEX "header_dropdowns_parent_id_idx" ON "payload"."header_dropdowns" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_dropdowns_items_order_idx" ON "payload"."_header_v_version_dropdowns_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_dropdowns_items_parent_id_idx" ON "payload"."_header_v_version_dropdowns_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_dropdowns_order_idx" ON "payload"."_header_v_version_dropdowns" USING btree ("_order");
  CREATE INDEX "_header_v_version_dropdowns_parent_id_idx" ON "payload"."_header_v_version_dropdowns" USING btree ("_parent_id");
  CREATE INDEX "_header_v_created_at_idx" ON "payload"."_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "payload"."_header_v" USING btree ("updated_at");
  CREATE INDEX "footer_tagline_lines_order_idx" ON "payload"."footer_tagline_lines" USING btree ("_order");
  CREATE INDEX "footer_tagline_lines_parent_id_idx" ON "payload"."footer_tagline_lines" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "payload"."footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "payload"."footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "payload"."footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "payload"."footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "payload"."footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "payload"."footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_tagline_lines_order_idx" ON "payload"."_footer_v_version_tagline_lines" USING btree ("_order");
  CREATE INDEX "_footer_v_version_tagline_lines_parent_id_idx" ON "payload"."_footer_v_version_tagline_lines" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "payload"."_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "payload"."_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "payload"."_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "payload"."_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_legal_links_order_idx" ON "payload"."_footer_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_legal_links_parent_id_idx" ON "payload"."_footer_v_version_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_created_at_idx" ON "payload"."_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "payload"."_footer_v" USING btree ("updated_at");
  CREATE INDEX "_system_pages_v_created_at_idx" ON "payload"."_system_pages_v" USING btree ("created_at");
  CREATE INDEX "_system_pages_v_updated_at_idx" ON "payload"."_system_pages_v" USING btree ("updated_at");
  CREATE INDEX "home_page_hero_slides_order_idx" ON "payload"."home_page_hero_slides" USING btree ("_order");
  CREATE INDEX "home_page_hero_slides_parent_id_idx" ON "payload"."home_page_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_slides_image_image_media_idx" ON "payload"."home_page_hero_slides" USING btree ("image_media_id");
  CREATE INDEX "svc_explorer_highlights_order_idx" ON "payload"."svc_explorer_highlights" USING btree ("_order");
  CREATE INDEX "svc_explorer_highlights_parent_id_idx" ON "payload"."svc_explorer_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_explorer_items_order_idx" ON "payload"."home_page_services_explorer_items" USING btree ("_order");
  CREATE INDEX "home_page_services_explorer_items_parent_id_idx" ON "payload"."home_page_services_explorer_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_explorer_items_image_image_media_idx" ON "payload"."home_page_services_explorer_items" USING btree ("image_media_id");
  CREATE INDEX "home_page_about_images_order_idx" ON "payload"."home_page_about_images" USING btree ("_order");
  CREATE INDEX "home_page_about_images_parent_id_idx" ON "payload"."home_page_about_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_images_image_image_media_idx" ON "payload"."home_page_about_images" USING btree ("image_media_id");
  CREATE INDEX "home_page_method_pillars_benefits_order_idx" ON "payload"."home_page_method_pillars_benefits" USING btree ("_order");
  CREATE INDEX "home_page_method_pillars_benefits_parent_id_idx" ON "payload"."home_page_method_pillars_benefits" USING btree ("_parent_id");
  CREATE INDEX "home_page_method_pillars_stats_order_idx" ON "payload"."home_page_method_pillars_stats" USING btree ("_order");
  CREATE INDEX "home_page_method_pillars_stats_parent_id_idx" ON "payload"."home_page_method_pillars_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_method_pillars_order_idx" ON "payload"."home_page_method_pillars" USING btree ("_order");
  CREATE INDEX "home_page_method_pillars_parent_id_idx" ON "payload"."home_page_method_pillars" USING btree ("_parent_id");
  CREATE INDEX "home_page_method_pillars_image_image_media_idx" ON "payload"."home_page_method_pillars" USING btree ("image_media_id");
  CREATE INDEX "home_page_social_feed_fallback_images_order_idx" ON "payload"."home_page_social_feed_fallback_images" USING btree ("_order");
  CREATE INDEX "home_page_social_feed_fallback_images_parent_id_idx" ON "payload"."home_page_social_feed_fallback_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_social_feed_fallback_images_image_image_media_idx" ON "payload"."home_page_social_feed_fallback_images" USING btree ("image_media_id");
  CREATE INDEX "home_page_seo_seo_og_image_idx" ON "payload"."home_page" USING btree ("seo_og_image_id");
  CREATE INDEX "home_page_texts_order_parent" ON "payload"."home_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_home_page_v_version_hero_slides_order_idx" ON "payload"."_home_page_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_slides_parent_id_idx" ON "payload"."_home_page_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_slides_image_image_media_idx" ON "payload"."_home_page_v_version_hero_slides" USING btree ("image_media_id");
  CREATE INDEX "_svc_explorer_highlights_v_order_idx" ON "payload"."_svc_explorer_highlights_v" USING btree ("_order");
  CREATE INDEX "_svc_explorer_highlights_v_parent_id_idx" ON "payload"."_svc_explorer_highlights_v" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_services_explorer_items_order_idx" ON "payload"."_home_page_v_version_services_explorer_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_services_explorer_items_parent_id_idx" ON "payload"."_home_page_v_version_services_explorer_items" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_services_explorer_items_image_image_idx" ON "payload"."_home_page_v_version_services_explorer_items" USING btree ("image_media_id");
  CREATE INDEX "_home_page_v_version_about_images_order_idx" ON "payload"."_home_page_v_version_about_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_about_images_parent_id_idx" ON "payload"."_home_page_v_version_about_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_about_images_image_image_media_idx" ON "payload"."_home_page_v_version_about_images" USING btree ("image_media_id");
  CREATE INDEX "_home_page_v_version_method_pillars_benefits_order_idx" ON "payload"."_home_page_v_version_method_pillars_benefits" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_method_pillars_benefits_parent_id_idx" ON "payload"."_home_page_v_version_method_pillars_benefits" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_method_pillars_stats_order_idx" ON "payload"."_home_page_v_version_method_pillars_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_method_pillars_stats_parent_id_idx" ON "payload"."_home_page_v_version_method_pillars_stats" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_method_pillars_order_idx" ON "payload"."_home_page_v_version_method_pillars" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_method_pillars_parent_id_idx" ON "payload"."_home_page_v_version_method_pillars" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_method_pillars_image_image_media_idx" ON "payload"."_home_page_v_version_method_pillars" USING btree ("image_media_id");
  CREATE INDEX "_home_page_v_version_social_feed_fallback_images_order_idx" ON "payload"."_home_page_v_version_social_feed_fallback_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_social_feed_fallback_images_parent_id_idx" ON "payload"."_home_page_v_version_social_feed_fallback_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_social_feed_fallback_images_image_i_idx" ON "payload"."_home_page_v_version_social_feed_fallback_images" USING btree ("image_media_id");
  CREATE INDEX "_home_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_home_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_home_page_v_created_at_idx" ON "payload"."_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "payload"."_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_texts_order_parent" ON "payload"."_home_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "about_page_philosophy_lines_order_idx" ON "payload"."about_page_philosophy_lines" USING btree ("_order");
  CREATE INDEX "about_page_philosophy_lines_parent_id_idx" ON "payload"."about_page_philosophy_lines" USING btree ("_parent_id");
  CREATE INDEX "about_page_philosophy_panels_order_idx" ON "payload"."about_page_philosophy_panels" USING btree ("_order");
  CREATE INDEX "about_page_philosophy_panels_parent_id_idx" ON "payload"."about_page_philosophy_panels" USING btree ("_parent_id");
  CREATE INDEX "about_page_philosophy_panels_image_image_media_idx" ON "payload"."about_page_philosophy_panels" USING btree ("image_media_id");
  CREATE INDEX "about_page_gallery_images_order_idx" ON "payload"."about_page_gallery_images" USING btree ("_order");
  CREATE INDEX "about_page_gallery_images_parent_id_idx" ON "payload"."about_page_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_gallery_images_image_image_media_idx" ON "payload"."about_page_gallery_images" USING btree ("image_media_id");
  CREATE INDEX "about_page_cta_buttons_order_idx" ON "payload"."about_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "about_page_cta_buttons_parent_id_idx" ON "payload"."about_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_image_hero_image_media_idx" ON "payload"."about_page" USING btree ("hero_image_media_id");
  CREATE INDEX "about_page_journey_image_journey_image_media_idx" ON "payload"."about_page" USING btree ("journey_image_media_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "payload"."about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "about_page_texts_order_parent" ON "payload"."about_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_about_page_v_version_philosophy_lines_order_idx" ON "payload"."_about_page_v_version_philosophy_lines" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_philosophy_lines_parent_id_idx" ON "payload"."_about_page_v_version_philosophy_lines" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_philosophy_panels_order_idx" ON "payload"."_about_page_v_version_philosophy_panels" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_philosophy_panels_parent_id_idx" ON "payload"."_about_page_v_version_philosophy_panels" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_philosophy_panels_image_image_medi_idx" ON "payload"."_about_page_v_version_philosophy_panels" USING btree ("image_media_id");
  CREATE INDEX "_about_page_v_version_gallery_images_order_idx" ON "payload"."_about_page_v_version_gallery_images" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_gallery_images_parent_id_idx" ON "payload"."_about_page_v_version_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_gallery_images_image_image_media_idx" ON "payload"."_about_page_v_version_gallery_images" USING btree ("image_media_id");
  CREATE INDEX "_about_page_v_version_cta_buttons_order_idx" ON "payload"."_about_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_about_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_hero_image_version_hero_image_medi_idx" ON "payload"."_about_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_about_page_v_version_journey_image_version_journey_imag_idx" ON "payload"."_about_page_v" USING btree ("version_journey_image_media_id");
  CREATE INDEX "_about_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_about_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_about_page_v_created_at_idx" ON "payload"."_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "payload"."_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_texts_order_parent" ON "payload"."_about_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "method_page_levels_order_idx" ON "payload"."method_page_levels" USING btree ("_order");
  CREATE INDEX "method_page_levels_parent_id_idx" ON "payload"."method_page_levels" USING btree ("_parent_id");
  CREATE INDEX "method_page_seo_seo_og_image_idx" ON "payload"."method_page" USING btree ("seo_og_image_id");
  CREATE INDEX "method_page_texts_order_parent" ON "payload"."method_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_method_page_v_version_levels_order_idx" ON "payload"."_method_page_v_version_levels" USING btree ("_order");
  CREATE INDEX "_method_page_v_version_levels_parent_id_idx" ON "payload"."_method_page_v_version_levels" USING btree ("_parent_id");
  CREATE INDEX "_method_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_method_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_method_page_v_created_at_idx" ON "payload"."_method_page_v" USING btree ("created_at");
  CREATE INDEX "_method_page_v_updated_at_idx" ON "payload"."_method_page_v" USING btree ("updated_at");
  CREATE INDEX "_method_page_v_texts_order_parent" ON "payload"."_method_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "classes_page_cta_buttons_order_idx" ON "payload"."classes_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "classes_page_cta_buttons_parent_id_idx" ON "payload"."classes_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "classes_page_hero_image_hero_image_media_idx" ON "payload"."classes_page" USING btree ("hero_image_media_id");
  CREATE INDEX "classes_page_reformer_room_image_reformer_room_image_med_idx" ON "payload"."classes_page" USING btree ("reformer_room_image_media_id");
  CREATE INDEX "classes_page_breathing_room_image_breathing_room_image_m_idx" ON "payload"."classes_page" USING btree ("breathing_room_image_media_id");
  CREATE INDEX "classes_page_seo_seo_og_image_idx" ON "payload"."classes_page" USING btree ("seo_og_image_id");
  CREATE INDEX "classes_page_texts_order_parent" ON "payload"."classes_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_classes_page_v_version_cta_buttons_order_idx" ON "payload"."_classes_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_classes_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_classes_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_classes_page_v_version_hero_image_version_hero_image_me_idx" ON "payload"."_classes_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_classes_page_v_version_reformer_room_image_version_refo_idx" ON "payload"."_classes_page_v" USING btree ("version_reformer_room_image_media_id");
  CREATE INDEX "_classes_page_v_version_breathing_room_image_version_bre_idx" ON "payload"."_classes_page_v" USING btree ("version_breathing_room_image_media_id");
  CREATE INDEX "_classes_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_classes_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_classes_page_v_created_at_idx" ON "payload"."_classes_page_v" USING btree ("created_at");
  CREATE INDEX "_classes_page_v_updated_at_idx" ON "payload"."_classes_page_v" USING btree ("updated_at");
  CREATE INDEX "_classes_page_v_texts_order_parent" ON "payload"."_classes_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "schedule_page_seo_seo_og_image_idx" ON "payload"."schedule_page" USING btree ("seo_og_image_id");
  CREATE INDEX "schedule_page_texts_order_parent" ON "payload"."schedule_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_schedule_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_schedule_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_schedule_page_v_created_at_idx" ON "payload"."_schedule_page_v" USING btree ("created_at");
  CREATE INDEX "_schedule_page_v_updated_at_idx" ON "payload"."_schedule_page_v" USING btree ("updated_at");
  CREATE INDEX "_schedule_page_v_texts_order_parent" ON "payload"."_schedule_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "appointments_page_seo_seo_og_image_idx" ON "payload"."appointments_page" USING btree ("seo_og_image_id");
  CREATE INDEX "appointments_page_texts_order_parent" ON "payload"."appointments_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_appointments_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_appointments_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_appointments_page_v_created_at_idx" ON "payload"."_appointments_page_v" USING btree ("created_at");
  CREATE INDEX "_appointments_page_v_updated_at_idx" ON "payload"."_appointments_page_v" USING btree ("updated_at");
  CREATE INDEX "_appointments_page_v_texts_order_parent" ON "payload"."_appointments_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "pricing_page_cta_buttons_order_idx" ON "payload"."pricing_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "pricing_page_cta_buttons_parent_id_idx" ON "payload"."pricing_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_seo_seo_og_image_idx" ON "payload"."pricing_page" USING btree ("seo_og_image_id");
  CREATE INDEX "pricing_page_texts_order_parent" ON "payload"."pricing_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pricing_page_v_version_cta_buttons_order_idx" ON "payload"."_pricing_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pricing_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_pricing_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pricing_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_pricing_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pricing_page_v_created_at_idx" ON "payload"."_pricing_page_v" USING btree ("created_at");
  CREATE INDEX "_pricing_page_v_updated_at_idx" ON "payload"."_pricing_page_v" USING btree ("updated_at");
  CREATE INDEX "_pricing_page_v_texts_order_parent" ON "payload"."_pricing_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "memberships_page_cta_buttons_order_idx" ON "payload"."memberships_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "memberships_page_cta_buttons_parent_id_idx" ON "payload"."memberships_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "memberships_page_hero_image_hero_image_media_idx" ON "payload"."memberships_page" USING btree ("hero_image_media_id");
  CREATE INDEX "memberships_page_seo_seo_og_image_idx" ON "payload"."memberships_page" USING btree ("seo_og_image_id");
  CREATE INDEX "memberships_page_texts_order_parent" ON "payload"."memberships_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_memberships_page_v_version_cta_buttons_order_idx" ON "payload"."_memberships_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_memberships_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_memberships_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_memberships_page_v_version_hero_image_version_hero_imag_idx" ON "payload"."_memberships_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_memberships_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_memberships_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_memberships_page_v_created_at_idx" ON "payload"."_memberships_page_v" USING btree ("created_at");
  CREATE INDEX "_memberships_page_v_updated_at_idx" ON "payload"."_memberships_page_v" USING btree ("updated_at");
  CREATE INDEX "_memberships_page_v_texts_order_parent" ON "payload"."_memberships_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "recovery_page_cards_order_idx" ON "payload"."recovery_page_cards" USING btree ("_order");
  CREATE INDEX "recovery_page_cards_parent_id_idx" ON "payload"."recovery_page_cards" USING btree ("_parent_id");
  CREATE INDEX "recovery_page_seo_seo_og_image_idx" ON "payload"."recovery_page" USING btree ("seo_og_image_id");
  CREATE INDEX "recovery_page_texts_order_parent" ON "payload"."recovery_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_recovery_page_v_version_cards_order_idx" ON "payload"."_recovery_page_v_version_cards" USING btree ("_order");
  CREATE INDEX "_recovery_page_v_version_cards_parent_id_idx" ON "payload"."_recovery_page_v_version_cards" USING btree ("_parent_id");
  CREATE INDEX "_recovery_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_recovery_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_recovery_page_v_created_at_idx" ON "payload"."_recovery_page_v" USING btree ("created_at");
  CREATE INDEX "_recovery_page_v_updated_at_idx" ON "payload"."_recovery_page_v" USING btree ("updated_at");
  CREATE INDEX "_recovery_page_v_texts_order_parent" ON "payload"."_recovery_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "services_page_items_features_order_idx" ON "payload"."services_page_items_features" USING btree ("_order");
  CREATE INDEX "services_page_items_features_parent_id_idx" ON "payload"."services_page_items_features" USING btree ("_parent_id");
  CREATE INDEX "services_page_items_order_idx" ON "payload"."services_page_items" USING btree ("_order");
  CREATE INDEX "services_page_items_parent_id_idx" ON "payload"."services_page_items" USING btree ("_parent_id");
  CREATE INDEX "services_page_items_image_image_media_idx" ON "payload"."services_page_items" USING btree ("image_media_id");
  CREATE INDEX "services_page_cta_buttons_order_idx" ON "payload"."services_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "services_page_cta_buttons_parent_id_idx" ON "payload"."services_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "services_page_seo_seo_og_image_idx" ON "payload"."services_page" USING btree ("seo_og_image_id");
  CREATE INDEX "services_page_texts_order_parent" ON "payload"."services_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_services_page_v_version_items_features_order_idx" ON "payload"."_services_page_v_version_items_features" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_items_features_parent_id_idx" ON "payload"."_services_page_v_version_items_features" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_items_order_idx" ON "payload"."_services_page_v_version_items" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_items_parent_id_idx" ON "payload"."_services_page_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_items_image_image_media_idx" ON "payload"."_services_page_v_version_items" USING btree ("image_media_id");
  CREATE INDEX "_services_page_v_version_cta_buttons_order_idx" ON "payload"."_services_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_services_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_services_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_page_v_created_at_idx" ON "payload"."_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "payload"."_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_texts_order_parent" ON "payload"."_services_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "rpp_overview_para_order_idx" ON "payload"."rpp_overview_para" USING btree ("_order");
  CREATE INDEX "rpp_overview_para_parent_id_idx" ON "payload"."rpp_overview_para" USING btree ("_parent_id");
  CREATE INDEX "reformer_pilates_page_overview_stats_order_idx" ON "payload"."reformer_pilates_page_overview_stats" USING btree ("_order");
  CREATE INDEX "reformer_pilates_page_overview_stats_parent_id_idx" ON "payload"."reformer_pilates_page_overview_stats" USING btree ("_parent_id");
  CREATE INDEX "rpp_overview_card_bul_order_idx" ON "payload"."rpp_overview_card_bul" USING btree ("_order");
  CREATE INDEX "rpp_overview_card_bul_parent_id_idx" ON "payload"."rpp_overview_card_bul" USING btree ("_parent_id");
  CREATE INDEX "reformer_pilates_page_cta_buttons_order_idx" ON "payload"."reformer_pilates_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "reformer_pilates_page_cta_buttons_parent_id_idx" ON "payload"."reformer_pilates_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "reformer_pilates_page_hero_image_hero_image_media_idx" ON "payload"."reformer_pilates_page" USING btree ("hero_image_media_id");
  CREATE INDEX "reformer_pilates_page_overview_card_image_overview_card__idx" ON "payload"."reformer_pilates_page" USING btree ("overview_card_image_media_id");
  CREATE INDEX "reformer_pilates_page_seo_seo_og_image_idx" ON "payload"."reformer_pilates_page" USING btree ("seo_og_image_id");
  CREATE INDEX "reformer_pilates_page_texts_order_parent" ON "payload"."reformer_pilates_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_rpp_overview_para_v_order_idx" ON "payload"."_rpp_overview_para_v" USING btree ("_order");
  CREATE INDEX "_rpp_overview_para_v_parent_id_idx" ON "payload"."_rpp_overview_para_v" USING btree ("_parent_id");
  CREATE INDEX "_reformer_pilates_page_v_version_overview_stats_order_idx" ON "payload"."_reformer_pilates_page_v_version_overview_stats" USING btree ("_order");
  CREATE INDEX "_reformer_pilates_page_v_version_overview_stats_parent_id_idx" ON "payload"."_reformer_pilates_page_v_version_overview_stats" USING btree ("_parent_id");
  CREATE INDEX "_rpp_overview_card_bul_v_order_idx" ON "payload"."_rpp_overview_card_bul_v" USING btree ("_order");
  CREATE INDEX "_rpp_overview_card_bul_v_parent_id_idx" ON "payload"."_rpp_overview_card_bul_v" USING btree ("_parent_id");
  CREATE INDEX "_reformer_pilates_page_v_version_cta_buttons_order_idx" ON "payload"."_reformer_pilates_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_reformer_pilates_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_reformer_pilates_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_reformer_pilates_page_v_version_hero_image_version_hero_idx" ON "payload"."_reformer_pilates_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_reformer_pilates_page_v_version_overview_card_image_ver_idx" ON "payload"."_reformer_pilates_page_v" USING btree ("version_overview_card_image_media_id");
  CREATE INDEX "_reformer_pilates_page_v_version_seo_version_seo_og_imag_idx" ON "payload"."_reformer_pilates_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_reformer_pilates_page_v_created_at_idx" ON "payload"."_reformer_pilates_page_v" USING btree ("created_at");
  CREATE INDEX "_reformer_pilates_page_v_updated_at_idx" ON "payload"."_reformer_pilates_page_v" USING btree ("updated_at");
  CREATE INDEX "_reformer_pilates_page_v_texts_order_parent" ON "payload"."_reformer_pilates_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "brp_overview_para_order_idx" ON "payload"."brp_overview_para" USING btree ("_order");
  CREATE INDEX "brp_overview_para_parent_id_idx" ON "payload"."brp_overview_para" USING btree ("_parent_id");
  CREATE INDEX "breathing_room_page_overview_stats_order_idx" ON "payload"."breathing_room_page_overview_stats" USING btree ("_order");
  CREATE INDEX "breathing_room_page_overview_stats_parent_id_idx" ON "payload"."breathing_room_page_overview_stats" USING btree ("_parent_id");
  CREATE INDEX "brp_overview_card_bul_order_idx" ON "payload"."brp_overview_card_bul" USING btree ("_order");
  CREATE INDEX "brp_overview_card_bul_parent_id_idx" ON "payload"."brp_overview_card_bul" USING btree ("_parent_id");
  CREATE INDEX "breathing_room_page_cta_buttons_order_idx" ON "payload"."breathing_room_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "breathing_room_page_cta_buttons_parent_id_idx" ON "payload"."breathing_room_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "breathing_room_page_hero_image_hero_image_media_idx" ON "payload"."breathing_room_page" USING btree ("hero_image_media_id");
  CREATE INDEX "breathing_room_page_overview_card_image_overview_card_im_idx" ON "payload"."breathing_room_page" USING btree ("overview_card_image_media_id");
  CREATE INDEX "breathing_room_page_seo_seo_og_image_idx" ON "payload"."breathing_room_page" USING btree ("seo_og_image_id");
  CREATE INDEX "breathing_room_page_texts_order_parent" ON "payload"."breathing_room_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_brp_overview_para_v_order_idx" ON "payload"."_brp_overview_para_v" USING btree ("_order");
  CREATE INDEX "_brp_overview_para_v_parent_id_idx" ON "payload"."_brp_overview_para_v" USING btree ("_parent_id");
  CREATE INDEX "_breathing_room_page_v_version_overview_stats_order_idx" ON "payload"."_breathing_room_page_v_version_overview_stats" USING btree ("_order");
  CREATE INDEX "_breathing_room_page_v_version_overview_stats_parent_id_idx" ON "payload"."_breathing_room_page_v_version_overview_stats" USING btree ("_parent_id");
  CREATE INDEX "_brp_overview_card_bul_v_order_idx" ON "payload"."_brp_overview_card_bul_v" USING btree ("_order");
  CREATE INDEX "_brp_overview_card_bul_v_parent_id_idx" ON "payload"."_brp_overview_card_bul_v" USING btree ("_parent_id");
  CREATE INDEX "_breathing_room_page_v_version_cta_buttons_order_idx" ON "payload"."_breathing_room_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_breathing_room_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_breathing_room_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_breathing_room_page_v_version_hero_image_version_hero_i_idx" ON "payload"."_breathing_room_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_breathing_room_page_v_version_overview_card_image_versi_idx" ON "payload"."_breathing_room_page_v" USING btree ("version_overview_card_image_media_id");
  CREATE INDEX "_breathing_room_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_breathing_room_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_breathing_room_page_v_created_at_idx" ON "payload"."_breathing_room_page_v" USING btree ("created_at");
  CREATE INDEX "_breathing_room_page_v_updated_at_idx" ON "payload"."_breathing_room_page_v" USING btree ("updated_at");
  CREATE INDEX "_breathing_room_page_v_texts_order_parent" ON "payload"."_breathing_room_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "ctp_overview_para_order_idx" ON "payload"."ctp_overview_para" USING btree ("_order");
  CREATE INDEX "ctp_overview_para_parent_id_idx" ON "payload"."ctp_overview_para" USING btree ("_parent_id");
  CREATE INDEX "ctp_overview_card_bul_order_idx" ON "payload"."ctp_overview_card_bul" USING btree ("_order");
  CREATE INDEX "ctp_overview_card_bul_parent_id_idx" ON "payload"."ctp_overview_card_bul" USING btree ("_parent_id");
  CREATE INDEX "contrast_therapy_page_benefits_items_order_idx" ON "payload"."contrast_therapy_page_benefits_items" USING btree ("_order");
  CREATE INDEX "contrast_therapy_page_benefits_items_parent_id_idx" ON "payload"."contrast_therapy_page_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "contrast_therapy_page_cta_buttons_order_idx" ON "payload"."contrast_therapy_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "contrast_therapy_page_cta_buttons_parent_id_idx" ON "payload"."contrast_therapy_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "contrast_therapy_page_hero_image_hero_image_media_idx" ON "payload"."contrast_therapy_page" USING btree ("hero_image_media_id");
  CREATE INDEX "contrast_therapy_page_overview_card_image_overview_card__idx" ON "payload"."contrast_therapy_page" USING btree ("overview_card_image_media_id");
  CREATE INDEX "contrast_therapy_page_seo_seo_og_image_idx" ON "payload"."contrast_therapy_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contrast_therapy_page_texts_order_parent" ON "payload"."contrast_therapy_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_ctp_overview_para_v_order_idx" ON "payload"."_ctp_overview_para_v" USING btree ("_order");
  CREATE INDEX "_ctp_overview_para_v_parent_id_idx" ON "payload"."_ctp_overview_para_v" USING btree ("_parent_id");
  CREATE INDEX "_ctp_overview_card_bul_v_order_idx" ON "payload"."_ctp_overview_card_bul_v" USING btree ("_order");
  CREATE INDEX "_ctp_overview_card_bul_v_parent_id_idx" ON "payload"."_ctp_overview_card_bul_v" USING btree ("_parent_id");
  CREATE INDEX "_contrast_therapy_page_v_version_benefits_items_order_idx" ON "payload"."_contrast_therapy_page_v_version_benefits_items" USING btree ("_order");
  CREATE INDEX "_contrast_therapy_page_v_version_benefits_items_parent_id_idx" ON "payload"."_contrast_therapy_page_v_version_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "_contrast_therapy_page_v_version_cta_buttons_order_idx" ON "payload"."_contrast_therapy_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_contrast_therapy_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_contrast_therapy_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_contrast_therapy_page_v_version_hero_image_version_hero_idx" ON "payload"."_contrast_therapy_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_contrast_therapy_page_v_version_overview_card_image_ver_idx" ON "payload"."_contrast_therapy_page_v" USING btree ("version_overview_card_image_media_id");
  CREATE INDEX "_contrast_therapy_page_v_version_seo_version_seo_og_imag_idx" ON "payload"."_contrast_therapy_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_contrast_therapy_page_v_created_at_idx" ON "payload"."_contrast_therapy_page_v" USING btree ("created_at");
  CREATE INDEX "_contrast_therapy_page_v_updated_at_idx" ON "payload"."_contrast_therapy_page_v" USING btree ("updated_at");
  CREATE INDEX "_contrast_therapy_page_v_texts_order_parent" ON "payload"."_contrast_therapy_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "cmp_overview_para_order_idx" ON "payload"."cmp_overview_para" USING btree ("_order");
  CREATE INDEX "cmp_overview_para_parent_id_idx" ON "payload"."cmp_overview_para" USING btree ("_parent_id");
  CREATE INDEX "cmp_overview_card_bul_order_idx" ON "payload"."cmp_overview_card_bul" USING btree ("_order");
  CREATE INDEX "cmp_overview_card_bul_parent_id_idx" ON "payload"."cmp_overview_card_bul" USING btree ("_parent_id");
  CREATE INDEX "compression_therapy_page_cta_buttons_order_idx" ON "payload"."compression_therapy_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "compression_therapy_page_cta_buttons_parent_id_idx" ON "payload"."compression_therapy_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "compression_therapy_page_hero_image_hero_image_media_idx" ON "payload"."compression_therapy_page" USING btree ("hero_image_media_id");
  CREATE INDEX "compression_therapy_page_overview_card_image_overview_ca_idx" ON "payload"."compression_therapy_page" USING btree ("overview_card_image_media_id");
  CREATE INDEX "compression_therapy_page_seo_seo_og_image_idx" ON "payload"."compression_therapy_page" USING btree ("seo_og_image_id");
  CREATE INDEX "compression_therapy_page_texts_order_parent" ON "payload"."compression_therapy_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_cmp_overview_para_v_order_idx" ON "payload"."_cmp_overview_para_v" USING btree ("_order");
  CREATE INDEX "_cmp_overview_para_v_parent_id_idx" ON "payload"."_cmp_overview_para_v" USING btree ("_parent_id");
  CREATE INDEX "_cmp_overview_card_bul_v_order_idx" ON "payload"."_cmp_overview_card_bul_v" USING btree ("_order");
  CREATE INDEX "_cmp_overview_card_bul_v_parent_id_idx" ON "payload"."_cmp_overview_card_bul_v" USING btree ("_parent_id");
  CREATE INDEX "_compression_therapy_page_v_version_cta_buttons_order_idx" ON "payload"."_compression_therapy_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_compression_therapy_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_compression_therapy_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_compression_therapy_page_v_version_hero_image_version_h_idx" ON "payload"."_compression_therapy_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_compression_therapy_page_v_version_overview_card_image__idx" ON "payload"."_compression_therapy_page_v" USING btree ("version_overview_card_image_media_id");
  CREATE INDEX "_compression_therapy_page_v_version_seo_version_seo_og_i_idx" ON "payload"."_compression_therapy_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_compression_therapy_page_v_created_at_idx" ON "payload"."_compression_therapy_page_v" USING btree ("created_at");
  CREATE INDEX "_compression_therapy_page_v_updated_at_idx" ON "payload"."_compression_therapy_page_v" USING btree ("updated_at");
  CREATE INDEX "_compression_therapy_page_v_texts_order_parent" ON "payload"."_compression_therapy_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "massage_page_overview_paragraphs_order_idx" ON "payload"."massage_page_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "massage_page_overview_paragraphs_parent_id_idx" ON "payload"."massage_page_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "massage_page_overview_card_bullets_order_idx" ON "payload"."massage_page_overview_card_bullets" USING btree ("_order");
  CREATE INDEX "massage_page_overview_card_bullets_parent_id_idx" ON "payload"."massage_page_overview_card_bullets" USING btree ("_parent_id");
  CREATE INDEX "massage_page_cta_buttons_order_idx" ON "payload"."massage_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "massage_page_cta_buttons_parent_id_idx" ON "payload"."massage_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "massage_page_hero_image_hero_image_media_idx" ON "payload"."massage_page" USING btree ("hero_image_media_id");
  CREATE INDEX "massage_page_overview_card_image_overview_card_image_med_idx" ON "payload"."massage_page" USING btree ("overview_card_image_media_id");
  CREATE INDEX "massage_page_seo_seo_og_image_idx" ON "payload"."massage_page" USING btree ("seo_og_image_id");
  CREATE INDEX "massage_page_texts_order_parent" ON "payload"."massage_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_massage_page_v_version_overview_paragraphs_order_idx" ON "payload"."_massage_page_v_version_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "_massage_page_v_version_overview_paragraphs_parent_id_idx" ON "payload"."_massage_page_v_version_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_massage_page_v_version_overview_card_bullets_order_idx" ON "payload"."_massage_page_v_version_overview_card_bullets" USING btree ("_order");
  CREATE INDEX "_massage_page_v_version_overview_card_bullets_parent_id_idx" ON "payload"."_massage_page_v_version_overview_card_bullets" USING btree ("_parent_id");
  CREATE INDEX "_massage_page_v_version_cta_buttons_order_idx" ON "payload"."_massage_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_massage_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_massage_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_massage_page_v_version_hero_image_version_hero_image_me_idx" ON "payload"."_massage_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_massage_page_v_version_overview_card_image_version_over_idx" ON "payload"."_massage_page_v" USING btree ("version_overview_card_image_media_id");
  CREATE INDEX "_massage_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_massage_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_massage_page_v_created_at_idx" ON "payload"."_massage_page_v" USING btree ("created_at");
  CREATE INDEX "_massage_page_v_updated_at_idx" ON "payload"."_massage_page_v" USING btree ("updated_at");
  CREATE INDEX "_massage_page_v_texts_order_parent" ON "payload"."_massage_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "events_page_event_types_items_order_idx" ON "payload"."events_page_event_types_items" USING btree ("_order");
  CREATE INDEX "events_page_event_types_items_parent_id_idx" ON "payload"."events_page_event_types_items" USING btree ("_parent_id");
  CREATE INDEX "events_page_cta_buttons_order_idx" ON "payload"."events_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "events_page_cta_buttons_parent_id_idx" ON "payload"."events_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "events_page_hero_image_hero_image_media_idx" ON "payload"."events_page" USING btree ("hero_image_media_id");
  CREATE INDEX "events_page_seo_seo_og_image_idx" ON "payload"."events_page" USING btree ("seo_og_image_id");
  CREATE INDEX "events_page_texts_order_parent" ON "payload"."events_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_events_page_v_version_event_types_items_order_idx" ON "payload"."_events_page_v_version_event_types_items" USING btree ("_order");
  CREATE INDEX "_events_page_v_version_event_types_items_parent_id_idx" ON "payload"."_events_page_v_version_event_types_items" USING btree ("_parent_id");
  CREATE INDEX "_events_page_v_version_cta_buttons_order_idx" ON "payload"."_events_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_events_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_events_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_events_page_v_version_hero_image_version_hero_image_med_idx" ON "payload"."_events_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_events_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_events_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_events_page_v_created_at_idx" ON "payload"."_events_page_v" USING btree ("created_at");
  CREATE INDEX "_events_page_v_updated_at_idx" ON "payload"."_events_page_v" USING btree ("updated_at");
  CREATE INDEX "_events_page_v_texts_order_parent" ON "payload"."_events_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "partnerships_page_types_items_features_order_idx" ON "payload"."partnerships_page_types_items_features" USING btree ("_order");
  CREATE INDEX "partnerships_page_types_items_features_parent_id_idx" ON "payload"."partnerships_page_types_items_features" USING btree ("_parent_id");
  CREATE INDEX "partnerships_page_types_items_order_idx" ON "payload"."partnerships_page_types_items" USING btree ("_order");
  CREATE INDEX "partnerships_page_types_items_parent_id_idx" ON "payload"."partnerships_page_types_items" USING btree ("_parent_id");
  CREATE INDEX "partnerships_page_why_partner_items_order_idx" ON "payload"."partnerships_page_why_partner_items" USING btree ("_order");
  CREATE INDEX "partnerships_page_why_partner_items_parent_id_idx" ON "payload"."partnerships_page_why_partner_items" USING btree ("_parent_id");
  CREATE INDEX "partnerships_page_cta_buttons_order_idx" ON "payload"."partnerships_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "partnerships_page_cta_buttons_parent_id_idx" ON "payload"."partnerships_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "partnerships_page_hero_image_hero_image_media_idx" ON "payload"."partnerships_page" USING btree ("hero_image_media_id");
  CREATE INDEX "partnerships_page_why_partner_image_why_partner_image_me_idx" ON "payload"."partnerships_page" USING btree ("why_partner_image_media_id");
  CREATE INDEX "partnerships_page_seo_seo_og_image_idx" ON "payload"."partnerships_page" USING btree ("seo_og_image_id");
  CREATE INDEX "partnerships_page_texts_order_parent" ON "payload"."partnerships_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_partnerships_page_v_version_types_items_features_order_idx" ON "payload"."_partnerships_page_v_version_types_items_features" USING btree ("_order");
  CREATE INDEX "_partnerships_page_v_version_types_items_features_parent_id_idx" ON "payload"."_partnerships_page_v_version_types_items_features" USING btree ("_parent_id");
  CREATE INDEX "_partnerships_page_v_version_types_items_order_idx" ON "payload"."_partnerships_page_v_version_types_items" USING btree ("_order");
  CREATE INDEX "_partnerships_page_v_version_types_items_parent_id_idx" ON "payload"."_partnerships_page_v_version_types_items" USING btree ("_parent_id");
  CREATE INDEX "_partnerships_page_v_version_why_partner_items_order_idx" ON "payload"."_partnerships_page_v_version_why_partner_items" USING btree ("_order");
  CREATE INDEX "_partnerships_page_v_version_why_partner_items_parent_id_idx" ON "payload"."_partnerships_page_v_version_why_partner_items" USING btree ("_parent_id");
  CREATE INDEX "_partnerships_page_v_version_cta_buttons_order_idx" ON "payload"."_partnerships_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_partnerships_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_partnerships_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_partnerships_page_v_version_hero_image_version_hero_ima_idx" ON "payload"."_partnerships_page_v" USING btree ("version_hero_image_media_id");
  CREATE INDEX "_partnerships_page_v_version_why_partner_image_version_w_idx" ON "payload"."_partnerships_page_v" USING btree ("version_why_partner_image_media_id");
  CREATE INDEX "_partnerships_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_partnerships_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_partnerships_page_v_created_at_idx" ON "payload"."_partnerships_page_v" USING btree ("created_at");
  CREATE INDEX "_partnerships_page_v_updated_at_idx" ON "payload"."_partnerships_page_v" USING btree ("updated_at");
  CREATE INDEX "_partnerships_page_v_texts_order_parent" ON "payload"."_partnerships_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "contact_page_image_card_image_image_card_image_media_idx" ON "payload"."contact_page" USING btree ("image_card_image_media_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "payload"."contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_texts_order_parent" ON "payload"."contact_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_contact_page_v_version_image_card_image_version_image_c_idx" ON "payload"."_contact_page_v" USING btree ("version_image_card_image_media_id");
  CREATE INDEX "_contact_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_contact_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "payload"."_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "payload"."_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_texts_order_parent" ON "payload"."_contact_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "register_page_benefits_items_order_idx" ON "payload"."register_page_benefits_items" USING btree ("_order");
  CREATE INDEX "register_page_benefits_items_parent_id_idx" ON "payload"."register_page_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "register_page_perks_items_order_idx" ON "payload"."register_page_perks_items" USING btree ("_order");
  CREATE INDEX "register_page_perks_items_parent_id_idx" ON "payload"."register_page_perks_items" USING btree ("_parent_id");
  CREATE INDEX "register_page_trust_badges_items_order_idx" ON "payload"."register_page_trust_badges_items" USING btree ("_order");
  CREATE INDEX "register_page_trust_badges_items_parent_id_idx" ON "payload"."register_page_trust_badges_items" USING btree ("_parent_id");
  CREATE INDEX "register_page_cta_buttons_order_idx" ON "payload"."register_page_cta_buttons" USING btree ("_order");
  CREATE INDEX "register_page_cta_buttons_parent_id_idx" ON "payload"."register_page_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "register_page_quick_links_items_order_idx" ON "payload"."register_page_quick_links_items" USING btree ("_order");
  CREATE INDEX "register_page_quick_links_items_parent_id_idx" ON "payload"."register_page_quick_links_items" USING btree ("_parent_id");
  CREATE INDEX "register_page_seo_seo_og_image_idx" ON "payload"."register_page" USING btree ("seo_og_image_id");
  CREATE INDEX "register_page_texts_order_parent" ON "payload"."register_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_register_page_v_version_benefits_items_order_idx" ON "payload"."_register_page_v_version_benefits_items" USING btree ("_order");
  CREATE INDEX "_register_page_v_version_benefits_items_parent_id_idx" ON "payload"."_register_page_v_version_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "_register_page_v_version_perks_items_order_idx" ON "payload"."_register_page_v_version_perks_items" USING btree ("_order");
  CREATE INDEX "_register_page_v_version_perks_items_parent_id_idx" ON "payload"."_register_page_v_version_perks_items" USING btree ("_parent_id");
  CREATE INDEX "_register_page_v_version_trust_badges_items_order_idx" ON "payload"."_register_page_v_version_trust_badges_items" USING btree ("_order");
  CREATE INDEX "_register_page_v_version_trust_badges_items_parent_id_idx" ON "payload"."_register_page_v_version_trust_badges_items" USING btree ("_parent_id");
  CREATE INDEX "_register_page_v_version_cta_buttons_order_idx" ON "payload"."_register_page_v_version_cta_buttons" USING btree ("_order");
  CREATE INDEX "_register_page_v_version_cta_buttons_parent_id_idx" ON "payload"."_register_page_v_version_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_register_page_v_version_quick_links_items_order_idx" ON "payload"."_register_page_v_version_quick_links_items" USING btree ("_order");
  CREATE INDEX "_register_page_v_version_quick_links_items_parent_id_idx" ON "payload"."_register_page_v_version_quick_links_items" USING btree ("_parent_id");
  CREATE INDEX "_register_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_register_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_register_page_v_created_at_idx" ON "payload"."_register_page_v" USING btree ("created_at");
  CREATE INDEX "_register_page_v_updated_at_idx" ON "payload"."_register_page_v" USING btree ("updated_at");
  CREATE INDEX "_register_page_v_texts_order_parent" ON "payload"."_register_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "account_page_features_items_order_idx" ON "payload"."account_page_features_items" USING btree ("_order");
  CREATE INDEX "account_page_features_items_parent_id_idx" ON "payload"."account_page_features_items" USING btree ("_parent_id");
  CREATE INDEX "account_page_quick_actions_buttons_order_idx" ON "payload"."account_page_quick_actions_buttons" USING btree ("_order");
  CREATE INDEX "account_page_quick_actions_buttons_parent_id_idx" ON "payload"."account_page_quick_actions_buttons" USING btree ("_parent_id");
  CREATE INDEX "account_page_trust_badges_items_order_idx" ON "payload"."account_page_trust_badges_items" USING btree ("_order");
  CREATE INDEX "account_page_trust_badges_items_parent_id_idx" ON "payload"."account_page_trust_badges_items" USING btree ("_parent_id");
  CREATE INDEX "account_page_seo_seo_og_image_idx" ON "payload"."account_page" USING btree ("seo_og_image_id");
  CREATE INDEX "account_page_texts_order_parent" ON "payload"."account_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_account_page_v_version_features_items_order_idx" ON "payload"."_account_page_v_version_features_items" USING btree ("_order");
  CREATE INDEX "_account_page_v_version_features_items_parent_id_idx" ON "payload"."_account_page_v_version_features_items" USING btree ("_parent_id");
  CREATE INDEX "_account_page_v_version_quick_actions_buttons_order_idx" ON "payload"."_account_page_v_version_quick_actions_buttons" USING btree ("_order");
  CREATE INDEX "_account_page_v_version_quick_actions_buttons_parent_id_idx" ON "payload"."_account_page_v_version_quick_actions_buttons" USING btree ("_parent_id");
  CREATE INDEX "_account_page_v_version_trust_badges_items_order_idx" ON "payload"."_account_page_v_version_trust_badges_items" USING btree ("_order");
  CREATE INDEX "_account_page_v_version_trust_badges_items_parent_id_idx" ON "payload"."_account_page_v_version_trust_badges_items" USING btree ("_parent_id");
  CREATE INDEX "_account_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_account_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_account_page_v_created_at_idx" ON "payload"."_account_page_v" USING btree ("created_at");
  CREATE INDEX "_account_page_v_updated_at_idx" ON "payload"."_account_page_v" USING btree ("updated_at");
  CREATE INDEX "_account_page_v_texts_order_parent" ON "payload"."_account_page_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "email_cf_team_recipients_order_idx" ON "payload"."email_cf_team_recipients" USING btree ("_order");
  CREATE INDEX "email_cf_team_recipients_parent_id_idx" ON "payload"."email_cf_team_recipients" USING btree ("_parent_id");
  CREATE INDEX "_email_cf_team_recipients_v_order_idx" ON "payload"."_email_cf_team_recipients_v" USING btree ("_order");
  CREATE INDEX "_email_cf_team_recipients_v_parent_id_idx" ON "payload"."_email_cf_team_recipients_v" USING btree ("_parent_id");
  CREATE INDEX "_email_settings_v_created_at_idx" ON "payload"."_email_settings_v" USING btree ("created_at");
  CREATE INDEX "_email_settings_v_updated_at_idx" ON "payload"."_email_settings_v" USING btree ("updated_at");
  CREATE INDEX "blog_page_seo_seo_og_image_idx" ON "payload"."blog_page" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_page_texts_order_parent" ON "payload"."blog_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "_blog_page_v_version_seo_version_seo_og_image_idx" ON "payload"."_blog_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blog_page_v_created_at_idx" ON "payload"."_blog_page_v" USING btree ("created_at");
  CREATE INDEX "_blog_page_v_updated_at_idx" ON "payload"."_blog_page_v" USING btree ("updated_at");
  CREATE INDEX "_blog_page_v_texts_order_parent" ON "payload"."_blog_page_v_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_massage_rituals_fk" FOREIGN KEY ("massage_rituals_id") REFERENCES "payload"."massage_rituals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "payload"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policies_fk" FOREIGN KEY ("policies_id") REFERENCES "payload"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "payload"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "payload"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "payload"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "payload"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_issues_fk" FOREIGN KEY ("newsletter_issues_id") REFERENCES "payload"."newsletter_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "payload"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_submissions_status_idx" ON "payload"."contact_submissions" USING btree ("status");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_massage_rituals_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("massage_rituals_id");
  CREATE INDEX "payload_locked_documents_rels_classes_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("classes_id");
  CREATE INDEX "payload_locked_documents_rels_policies_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("policies_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_issues_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("newsletter_issues_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("faqs_id");`)

  // DB-05: index parent_id on every hasMany-text child table (drizzle only creates the
  // composite (order, parent_id) index). Names stay within Postgres's 63-character limit.
  await db.execute(sql`
  DO $$
  DECLARE r record; idx text;
  BEGIN
    FOR r IN SELECT table_name FROM information_schema.tables
             WHERE table_schema = 'payload' AND right(table_name, 6) = '_texts' AND table_type = 'BASE TABLE'
    LOOP
      idx := CASE WHEN length(r.table_name) <= 52 THEN r.table_name || '_parent_idx'
                  ELSE left(r.table_name, 44) || '_' || left(md5(r.table_name), 7) || '_pidx' END;
      EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I.%I (parent_id)', idx, 'payload', r.table_name);
    END LOOP;
  END $$;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."offers_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."offers_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."offers_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."offers_recommended_for" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_offers_v_version_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_offers_v_version_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_offers_v_version_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_offers_v_version_recommended_for" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_offers_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_rituals_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_rituals_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_rituals_salt_blends" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_rituals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_rituals_v_version_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_rituals_v_version_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_rituals_v_version_salt_blends" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_rituals_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."classes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_classes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."policies_show_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."policies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_policies_v_version_show_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_policies_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_v_version_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_testimonials_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."legal_pages_contact_card_address_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."legal_pages_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_legal_pages_v_version_contact_card_address_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_legal_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_legal_pages_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."newsletter_subscribers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."newsletter_issues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_newsletter_issues_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_posts_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_posts_v_version_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_posts_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."categories_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_categories_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."authors_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_authors_v_version_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_authors_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_faqs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."payload_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_location_address_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."ss_addr_short_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_hours_display_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_hours_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_price_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."ss_struct_data_agg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_llms_key_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_llms_section_headings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."ss_llms_massage_intros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."site_settings_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_location_address_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_ss_addr_short_lines_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_hours_display_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_hours_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_price_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_ss_struct_data_agg_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_llms_key_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_version_llms_section_headings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_ss_llms_massage_intros_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_site_settings_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."header_dropdowns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."header_dropdowns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_header_v_version_dropdowns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_header_v_version_dropdowns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_header_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."footer_tagline_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_footer_v_version_tagline_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_footer_v_version_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_footer_v_version_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_footer_v_version_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_footer_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."system_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_system_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."svc_explorer_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_services_explorer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_about_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_method_pillars_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_method_pillars_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_method_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_social_feed_fallback_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."home_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_svc_explorer_highlights_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_services_explorer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_about_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_method_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_version_social_feed_fallback_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_home_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page_philosophy_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page_philosophy_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."about_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v_version_philosophy_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v_version_philosophy_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v_version_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_about_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."method_page_levels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."method_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."method_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_method_page_v_version_levels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_method_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_method_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."classes_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."classes_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."classes_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_classes_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_classes_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_classes_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."schedule_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."schedule_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_schedule_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_schedule_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."appointments_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."appointments_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_appointments_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_appointments_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pricing_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pricing_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."pricing_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pricing_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pricing_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_pricing_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."memberships_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."memberships_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."memberships_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_memberships_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_memberships_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_memberships_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."recovery_page_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."recovery_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."recovery_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_recovery_page_v_version_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_recovery_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_recovery_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."services_page_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."services_page_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."services_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."services_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."services_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_services_page_v_version_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_services_page_v_version_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_services_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_services_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_services_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."rpp_overview_para" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."reformer_pilates_page_overview_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."rpp_overview_card_bul" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."reformer_pilates_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."reformer_pilates_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."reformer_pilates_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_rpp_overview_para_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_reformer_pilates_page_v_version_overview_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_rpp_overview_card_bul_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_reformer_pilates_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_reformer_pilates_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_reformer_pilates_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."brp_overview_para" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."breathing_room_page_overview_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."brp_overview_card_bul" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."breathing_room_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."breathing_room_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."breathing_room_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_brp_overview_para_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_breathing_room_page_v_version_overview_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_brp_overview_card_bul_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_breathing_room_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_breathing_room_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_breathing_room_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."ctp_overview_para" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."ctp_overview_card_bul" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contrast_therapy_page_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contrast_therapy_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contrast_therapy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contrast_therapy_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_ctp_overview_para_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_ctp_overview_card_bul_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contrast_therapy_page_v_version_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contrast_therapy_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contrast_therapy_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contrast_therapy_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."cmp_overview_para" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."cmp_overview_card_bul" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."compression_therapy_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."compression_therapy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."compression_therapy_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_cmp_overview_para_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_cmp_overview_card_bul_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_compression_therapy_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_compression_therapy_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_compression_therapy_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_page_overview_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_page_overview_card_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."massage_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_page_v_version_overview_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_page_v_version_overview_card_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_massage_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events_page_event_types_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."events_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_page_v_version_event_types_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_events_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page_types_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page_types_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page_why_partner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."partnerships_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v_version_types_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v_version_types_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v_version_why_partner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_partnerships_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."contact_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contact_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_contact_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_perks_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_trust_badges_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_quick_links_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."register_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_version_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_version_perks_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_version_trust_badges_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_version_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_version_quick_links_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_register_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."account_page_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."account_page_quick_actions_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."account_page_trust_badges_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."account_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."account_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_account_page_v_version_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_account_page_v_version_quick_actions_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_account_page_v_version_trust_badges_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_account_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_account_page_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."email_cf_team_recipients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."email_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_email_cf_team_recipients_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_email_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."blog_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."blog_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_page_v_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."offers_includes" CASCADE;
  DROP TABLE "payload"."offers_notes" CASCADE;
  DROP TABLE "payload"."offers_benefits" CASCADE;
  DROP TABLE "payload"."offers_recommended_for" CASCADE;
  DROP TABLE "payload"."offers" CASCADE;
  DROP TABLE "payload"."_offers_v_version_includes" CASCADE;
  DROP TABLE "payload"."_offers_v_version_notes" CASCADE;
  DROP TABLE "payload"."_offers_v_version_benefits" CASCADE;
  DROP TABLE "payload"."_offers_v_version_recommended_for" CASCADE;
  DROP TABLE "payload"."_offers_v" CASCADE;
  DROP TABLE "payload"."massage_rituals_benefits" CASCADE;
  DROP TABLE "payload"."massage_rituals_includes" CASCADE;
  DROP TABLE "payload"."massage_rituals_salt_blends" CASCADE;
  DROP TABLE "payload"."massage_rituals" CASCADE;
  DROP TABLE "payload"."_massage_rituals_v_version_benefits" CASCADE;
  DROP TABLE "payload"."_massage_rituals_v_version_includes" CASCADE;
  DROP TABLE "payload"."_massage_rituals_v_version_salt_blends" CASCADE;
  DROP TABLE "payload"."_massage_rituals_v" CASCADE;
  DROP TABLE "payload"."classes" CASCADE;
  DROP TABLE "payload"."_classes_v" CASCADE;
  DROP TABLE "payload"."policies_show_on" CASCADE;
  DROP TABLE "payload"."policies" CASCADE;
  DROP TABLE "payload"."_policies_v_version_show_on" CASCADE;
  DROP TABLE "payload"."_policies_v" CASCADE;
  DROP TABLE "payload"."events_images" CASCADE;
  DROP TABLE "payload"."events" CASCADE;
  DROP TABLE "payload"."_events_v_version_images" CASCADE;
  DROP TABLE "payload"."_events_v" CASCADE;
  DROP TABLE "payload"."testimonials" CASCADE;
  DROP TABLE "payload"."_testimonials_v" CASCADE;
  DROP TABLE "payload"."legal_pages_contact_card_address_lines" CASCADE;
  DROP TABLE "payload"."legal_pages" CASCADE;
  DROP TABLE "payload"."legal_pages_texts" CASCADE;
  DROP TABLE "payload"."_legal_pages_v_version_contact_card_address_lines" CASCADE;
  DROP TABLE "payload"."_legal_pages_v" CASCADE;
  DROP TABLE "payload"."_legal_pages_v_texts" CASCADE;
  DROP TABLE "payload"."newsletter_subscribers" CASCADE;
  DROP TABLE "payload"."newsletter_issues" CASCADE;
  DROP TABLE "payload"."_newsletter_issues_v" CASCADE;
  DROP TABLE "payload"."posts_faq" CASCADE;
  DROP TABLE "payload"."posts_sources" CASCADE;
  DROP TABLE "payload"."posts" CASCADE;
  DROP TABLE "payload"."posts_texts" CASCADE;
  DROP TABLE "payload"."posts_rels" CASCADE;
  DROP TABLE "payload"."_posts_v_version_faq" CASCADE;
  DROP TABLE "payload"."_posts_v_version_sources" CASCADE;
  DROP TABLE "payload"."_posts_v" CASCADE;
  DROP TABLE "payload"."_posts_v_texts" CASCADE;
  DROP TABLE "payload"."_posts_v_rels" CASCADE;
  DROP TABLE "payload"."categories" CASCADE;
  DROP TABLE "payload"."categories_texts" CASCADE;
  DROP TABLE "payload"."_categories_v" CASCADE;
  DROP TABLE "payload"."_categories_v_texts" CASCADE;
  DROP TABLE "payload"."authors_same_as" CASCADE;
  DROP TABLE "payload"."authors" CASCADE;
  DROP TABLE "payload"."_authors_v_version_same_as" CASCADE;
  DROP TABLE "payload"."_authors_v" CASCADE;
  DROP TABLE "payload"."faqs" CASCADE;
  DROP TABLE "payload"."_faqs_v" CASCADE;
  DROP TABLE "payload"."payload_jobs_log" CASCADE;
  DROP TABLE "payload"."payload_jobs" CASCADE;
  DROP TABLE "payload"."site_settings_location_address_lines" CASCADE;
  DROP TABLE "payload"."ss_addr_short_lines" CASCADE;
  DROP TABLE "payload"."site_settings_hours_display_lines" CASCADE;
  DROP TABLE "payload"."site_settings_hours_days" CASCADE;
  DROP TABLE "payload"."site_settings_price_cards" CASCADE;
  DROP TABLE "payload"."site_settings_facts" CASCADE;
  DROP TABLE "payload"."ss_struct_data_agg" CASCADE;
  DROP TABLE "payload"."site_settings_llms_key_pages" CASCADE;
  DROP TABLE "payload"."site_settings_llms_section_headings" CASCADE;
  DROP TABLE "payload"."ss_llms_massage_intros" CASCADE;
  DROP TABLE "payload"."site_settings" CASCADE;
  DROP TABLE "payload"."site_settings_texts" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_location_address_lines" CASCADE;
  DROP TABLE "payload"."_ss_addr_short_lines_v" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_hours_display_lines" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_hours_days" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_price_cards" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_facts" CASCADE;
  DROP TABLE "payload"."_ss_struct_data_agg_v" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_llms_key_pages" CASCADE;
  DROP TABLE "payload"."_site_settings_v_version_llms_section_headings" CASCADE;
  DROP TABLE "payload"."_ss_llms_massage_intros_v" CASCADE;
  DROP TABLE "payload"."_site_settings_v" CASCADE;
  DROP TABLE "payload"."_site_settings_v_texts" CASCADE;
  DROP TABLE "payload"."header_dropdowns_items" CASCADE;
  DROP TABLE "payload"."header_dropdowns" CASCADE;
  DROP TABLE "payload"."header" CASCADE;
  DROP TABLE "payload"."_header_v_version_dropdowns_items" CASCADE;
  DROP TABLE "payload"."_header_v_version_dropdowns" CASCADE;
  DROP TABLE "payload"."_header_v" CASCADE;
  DROP TABLE "payload"."footer_tagline_lines" CASCADE;
  DROP TABLE "payload"."footer_columns_links" CASCADE;
  DROP TABLE "payload"."footer_columns" CASCADE;
  DROP TABLE "payload"."footer_legal_links" CASCADE;
  DROP TABLE "payload"."footer" CASCADE;
  DROP TABLE "payload"."_footer_v_version_tagline_lines" CASCADE;
  DROP TABLE "payload"."_footer_v_version_columns_links" CASCADE;
  DROP TABLE "payload"."_footer_v_version_columns" CASCADE;
  DROP TABLE "payload"."_footer_v_version_legal_links" CASCADE;
  DROP TABLE "payload"."_footer_v" CASCADE;
  DROP TABLE "payload"."system_pages" CASCADE;
  DROP TABLE "payload"."_system_pages_v" CASCADE;
  DROP TABLE "payload"."home_page_hero_slides" CASCADE;
  DROP TABLE "payload"."svc_explorer_highlights" CASCADE;
  DROP TABLE "payload"."home_page_services_explorer_items" CASCADE;
  DROP TABLE "payload"."home_page_about_images" CASCADE;
  DROP TABLE "payload"."home_page_method_pillars_benefits" CASCADE;
  DROP TABLE "payload"."home_page_method_pillars_stats" CASCADE;
  DROP TABLE "payload"."home_page_method_pillars" CASCADE;
  DROP TABLE "payload"."home_page_social_feed_fallback_images" CASCADE;
  DROP TABLE "payload"."home_page" CASCADE;
  DROP TABLE "payload"."home_page_texts" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_hero_slides" CASCADE;
  DROP TABLE "payload"."_svc_explorer_highlights_v" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_services_explorer_items" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_about_images" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_method_pillars_benefits" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_method_pillars_stats" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_method_pillars" CASCADE;
  DROP TABLE "payload"."_home_page_v_version_social_feed_fallback_images" CASCADE;
  DROP TABLE "payload"."_home_page_v" CASCADE;
  DROP TABLE "payload"."_home_page_v_texts" CASCADE;
  DROP TABLE "payload"."about_page_philosophy_lines" CASCADE;
  DROP TABLE "payload"."about_page_philosophy_panels" CASCADE;
  DROP TABLE "payload"."about_page_gallery_images" CASCADE;
  DROP TABLE "payload"."about_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."about_page" CASCADE;
  DROP TABLE "payload"."about_page_texts" CASCADE;
  DROP TABLE "payload"."_about_page_v_version_philosophy_lines" CASCADE;
  DROP TABLE "payload"."_about_page_v_version_philosophy_panels" CASCADE;
  DROP TABLE "payload"."_about_page_v_version_gallery_images" CASCADE;
  DROP TABLE "payload"."_about_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_about_page_v" CASCADE;
  DROP TABLE "payload"."_about_page_v_texts" CASCADE;
  DROP TABLE "payload"."method_page_levels" CASCADE;
  DROP TABLE "payload"."method_page" CASCADE;
  DROP TABLE "payload"."method_page_texts" CASCADE;
  DROP TABLE "payload"."_method_page_v_version_levels" CASCADE;
  DROP TABLE "payload"."_method_page_v" CASCADE;
  DROP TABLE "payload"."_method_page_v_texts" CASCADE;
  DROP TABLE "payload"."classes_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."classes_page" CASCADE;
  DROP TABLE "payload"."classes_page_texts" CASCADE;
  DROP TABLE "payload"."_classes_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_classes_page_v" CASCADE;
  DROP TABLE "payload"."_classes_page_v_texts" CASCADE;
  DROP TABLE "payload"."schedule_page" CASCADE;
  DROP TABLE "payload"."schedule_page_texts" CASCADE;
  DROP TABLE "payload"."_schedule_page_v" CASCADE;
  DROP TABLE "payload"."_schedule_page_v_texts" CASCADE;
  DROP TABLE "payload"."appointments_page" CASCADE;
  DROP TABLE "payload"."appointments_page_texts" CASCADE;
  DROP TABLE "payload"."_appointments_page_v" CASCADE;
  DROP TABLE "payload"."_appointments_page_v_texts" CASCADE;
  DROP TABLE "payload"."pricing_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."pricing_page" CASCADE;
  DROP TABLE "payload"."pricing_page_texts" CASCADE;
  DROP TABLE "payload"."_pricing_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_pricing_page_v" CASCADE;
  DROP TABLE "payload"."_pricing_page_v_texts" CASCADE;
  DROP TABLE "payload"."memberships_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."memberships_page" CASCADE;
  DROP TABLE "payload"."memberships_page_texts" CASCADE;
  DROP TABLE "payload"."_memberships_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_memberships_page_v" CASCADE;
  DROP TABLE "payload"."_memberships_page_v_texts" CASCADE;
  DROP TABLE "payload"."recovery_page_cards" CASCADE;
  DROP TABLE "payload"."recovery_page" CASCADE;
  DROP TABLE "payload"."recovery_page_texts" CASCADE;
  DROP TABLE "payload"."_recovery_page_v_version_cards" CASCADE;
  DROP TABLE "payload"."_recovery_page_v" CASCADE;
  DROP TABLE "payload"."_recovery_page_v_texts" CASCADE;
  DROP TABLE "payload"."services_page_items_features" CASCADE;
  DROP TABLE "payload"."services_page_items" CASCADE;
  DROP TABLE "payload"."services_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."services_page" CASCADE;
  DROP TABLE "payload"."services_page_texts" CASCADE;
  DROP TABLE "payload"."_services_page_v_version_items_features" CASCADE;
  DROP TABLE "payload"."_services_page_v_version_items" CASCADE;
  DROP TABLE "payload"."_services_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_services_page_v" CASCADE;
  DROP TABLE "payload"."_services_page_v_texts" CASCADE;
  DROP TABLE "payload"."rpp_overview_para" CASCADE;
  DROP TABLE "payload"."reformer_pilates_page_overview_stats" CASCADE;
  DROP TABLE "payload"."rpp_overview_card_bul" CASCADE;
  DROP TABLE "payload"."reformer_pilates_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."reformer_pilates_page" CASCADE;
  DROP TABLE "payload"."reformer_pilates_page_texts" CASCADE;
  DROP TABLE "payload"."_rpp_overview_para_v" CASCADE;
  DROP TABLE "payload"."_reformer_pilates_page_v_version_overview_stats" CASCADE;
  DROP TABLE "payload"."_rpp_overview_card_bul_v" CASCADE;
  DROP TABLE "payload"."_reformer_pilates_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_reformer_pilates_page_v" CASCADE;
  DROP TABLE "payload"."_reformer_pilates_page_v_texts" CASCADE;
  DROP TABLE "payload"."brp_overview_para" CASCADE;
  DROP TABLE "payload"."breathing_room_page_overview_stats" CASCADE;
  DROP TABLE "payload"."brp_overview_card_bul" CASCADE;
  DROP TABLE "payload"."breathing_room_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."breathing_room_page" CASCADE;
  DROP TABLE "payload"."breathing_room_page_texts" CASCADE;
  DROP TABLE "payload"."_brp_overview_para_v" CASCADE;
  DROP TABLE "payload"."_breathing_room_page_v_version_overview_stats" CASCADE;
  DROP TABLE "payload"."_brp_overview_card_bul_v" CASCADE;
  DROP TABLE "payload"."_breathing_room_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_breathing_room_page_v" CASCADE;
  DROP TABLE "payload"."_breathing_room_page_v_texts" CASCADE;
  DROP TABLE "payload"."ctp_overview_para" CASCADE;
  DROP TABLE "payload"."ctp_overview_card_bul" CASCADE;
  DROP TABLE "payload"."contrast_therapy_page_benefits_items" CASCADE;
  DROP TABLE "payload"."contrast_therapy_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."contrast_therapy_page" CASCADE;
  DROP TABLE "payload"."contrast_therapy_page_texts" CASCADE;
  DROP TABLE "payload"."_ctp_overview_para_v" CASCADE;
  DROP TABLE "payload"."_ctp_overview_card_bul_v" CASCADE;
  DROP TABLE "payload"."_contrast_therapy_page_v_version_benefits_items" CASCADE;
  DROP TABLE "payload"."_contrast_therapy_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_contrast_therapy_page_v" CASCADE;
  DROP TABLE "payload"."_contrast_therapy_page_v_texts" CASCADE;
  DROP TABLE "payload"."cmp_overview_para" CASCADE;
  DROP TABLE "payload"."cmp_overview_card_bul" CASCADE;
  DROP TABLE "payload"."compression_therapy_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."compression_therapy_page" CASCADE;
  DROP TABLE "payload"."compression_therapy_page_texts" CASCADE;
  DROP TABLE "payload"."_cmp_overview_para_v" CASCADE;
  DROP TABLE "payload"."_cmp_overview_card_bul_v" CASCADE;
  DROP TABLE "payload"."_compression_therapy_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_compression_therapy_page_v" CASCADE;
  DROP TABLE "payload"."_compression_therapy_page_v_texts" CASCADE;
  DROP TABLE "payload"."massage_page_overview_paragraphs" CASCADE;
  DROP TABLE "payload"."massage_page_overview_card_bullets" CASCADE;
  DROP TABLE "payload"."massage_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."massage_page" CASCADE;
  DROP TABLE "payload"."massage_page_texts" CASCADE;
  DROP TABLE "payload"."_massage_page_v_version_overview_paragraphs" CASCADE;
  DROP TABLE "payload"."_massage_page_v_version_overview_card_bullets" CASCADE;
  DROP TABLE "payload"."_massage_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_massage_page_v" CASCADE;
  DROP TABLE "payload"."_massage_page_v_texts" CASCADE;
  DROP TABLE "payload"."events_page_event_types_items" CASCADE;
  DROP TABLE "payload"."events_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."events_page" CASCADE;
  DROP TABLE "payload"."events_page_texts" CASCADE;
  DROP TABLE "payload"."_events_page_v_version_event_types_items" CASCADE;
  DROP TABLE "payload"."_events_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_events_page_v" CASCADE;
  DROP TABLE "payload"."_events_page_v_texts" CASCADE;
  DROP TABLE "payload"."partnerships_page_types_items_features" CASCADE;
  DROP TABLE "payload"."partnerships_page_types_items" CASCADE;
  DROP TABLE "payload"."partnerships_page_why_partner_items" CASCADE;
  DROP TABLE "payload"."partnerships_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."partnerships_page" CASCADE;
  DROP TABLE "payload"."partnerships_page_texts" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v_version_types_items_features" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v_version_types_items" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v_version_why_partner_items" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v" CASCADE;
  DROP TABLE "payload"."_partnerships_page_v_texts" CASCADE;
  DROP TABLE "payload"."contact_page" CASCADE;
  DROP TABLE "payload"."contact_page_texts" CASCADE;
  DROP TABLE "payload"."_contact_page_v" CASCADE;
  DROP TABLE "payload"."_contact_page_v_texts" CASCADE;
  DROP TABLE "payload"."register_page_benefits_items" CASCADE;
  DROP TABLE "payload"."register_page_perks_items" CASCADE;
  DROP TABLE "payload"."register_page_trust_badges_items" CASCADE;
  DROP TABLE "payload"."register_page_cta_buttons" CASCADE;
  DROP TABLE "payload"."register_page_quick_links_items" CASCADE;
  DROP TABLE "payload"."register_page" CASCADE;
  DROP TABLE "payload"."register_page_texts" CASCADE;
  DROP TABLE "payload"."_register_page_v_version_benefits_items" CASCADE;
  DROP TABLE "payload"."_register_page_v_version_perks_items" CASCADE;
  DROP TABLE "payload"."_register_page_v_version_trust_badges_items" CASCADE;
  DROP TABLE "payload"."_register_page_v_version_cta_buttons" CASCADE;
  DROP TABLE "payload"."_register_page_v_version_quick_links_items" CASCADE;
  DROP TABLE "payload"."_register_page_v" CASCADE;
  DROP TABLE "payload"."_register_page_v_texts" CASCADE;
  DROP TABLE "payload"."account_page_features_items" CASCADE;
  DROP TABLE "payload"."account_page_quick_actions_buttons" CASCADE;
  DROP TABLE "payload"."account_page_trust_badges_items" CASCADE;
  DROP TABLE "payload"."account_page" CASCADE;
  DROP TABLE "payload"."account_page_texts" CASCADE;
  DROP TABLE "payload"."_account_page_v_version_features_items" CASCADE;
  DROP TABLE "payload"."_account_page_v_version_quick_actions_buttons" CASCADE;
  DROP TABLE "payload"."_account_page_v_version_trust_badges_items" CASCADE;
  DROP TABLE "payload"."_account_page_v" CASCADE;
  DROP TABLE "payload"."_account_page_v_texts" CASCADE;
  DROP TABLE "payload"."email_cf_team_recipients" CASCADE;
  DROP TABLE "payload"."email_settings" CASCADE;
  DROP TABLE "payload"."_email_cf_team_recipients_v" CASCADE;
  DROP TABLE "payload"."_email_settings_v" CASCADE;
  DROP TABLE "payload"."blog_page" CASCADE;
  DROP TABLE "payload"."blog_page_texts" CASCADE;
  DROP TABLE "payload"."_blog_page_v" CASCADE;
  DROP TABLE "payload"."_blog_page_v_texts" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_offers_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_massage_rituals_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_classes_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policies_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_issues_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  DROP INDEX "payload"."contact_submissions_status_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_offers_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_massage_rituals_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_classes_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_policies_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_legal_pages_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_newsletter_subscribers_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_newsletter_issues_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_categories_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_authors_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_faqs_id_idx";
  ALTER TABLE "payload"."media" DROP COLUMN "prefix";
  ALTER TABLE "payload"."contact_submissions" DROP COLUMN "email_status";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "offers_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "massage_rituals_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "classes_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "policies_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "newsletter_subscribers_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "newsletter_issues_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "categories_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "authors_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "faqs_id";
  DROP TYPE "payload"."enum_offers_category";
  DROP TYPE "payload"."enum_offers_kind";
  DROP TYPE "payload"."enum_offers_structured_data_mode";
  DROP TYPE "payload"."enum__offers_v_version_category";
  DROP TYPE "payload"."enum__offers_v_version_kind";
  DROP TYPE "payload"."enum__offers_v_version_structured_data_mode";
  DROP TYPE "payload"."enum_massage_rituals_group";
  DROP TYPE "payload"."enum__massage_rituals_v_version_group";
  DROP TYPE "payload"."enum_classes_type";
  DROP TYPE "payload"."enum_classes_family";
  DROP TYPE "payload"."enum_classes_level";
  DROP TYPE "payload"."enum__classes_v_version_type";
  DROP TYPE "payload"."enum__classes_v_version_family";
  DROP TYPE "payload"."enum__classes_v_version_level";
  DROP TYPE "payload"."enum_policies_show_on";
  DROP TYPE "payload"."enum__policies_v_version_show_on";
  DROP TYPE "payload"."enum_events_kind";
  DROP TYPE "payload"."enum__events_v_version_kind";
  DROP TYPE "payload"."enum_legal_pages_slug";
  DROP TYPE "payload"."enum_legal_pages_seo_robots";
  DROP TYPE "payload"."enum__legal_pages_v_version_slug";
  DROP TYPE "payload"."enum__legal_pages_v_version_seo_robots";
  DROP TYPE "payload"."enum_contact_submissions_email_status";
  DROP TYPE "payload"."enum_newsletter_subscribers_status";
  DROP TYPE "payload"."enum_newsletter_issues_action";
  DROP TYPE "payload"."enum_newsletter_issues_status";
  DROP TYPE "payload"."enum__newsletter_issues_v_version_action";
  DROP TYPE "payload"."enum__newsletter_issues_v_version_status";
  DROP TYPE "payload"."enum_posts_seo_robots";
  DROP TYPE "payload"."enum_posts_status";
  DROP TYPE "payload"."enum__posts_v_version_seo_robots";
  DROP TYPE "payload"."enum__posts_v_version_status";
  DROP TYPE "payload"."enum_categories_seo_robots";
  DROP TYPE "payload"."enum__categories_v_version_seo_robots";
  DROP TYPE "payload"."enum_faqs_topic";
  DROP TYPE "payload"."enum__faqs_v_version_topic";
  DROP TYPE "payload"."enum_payload_jobs_log_task_slug";
  DROP TYPE "payload"."enum_payload_jobs_log_state";
  DROP TYPE "payload"."enum_payload_jobs_task_slug";
  DROP TYPE "payload"."enum_site_settings_hours_days";
  DROP TYPE "payload"."enum_site_settings_price_cards_category";
  DROP TYPE "payload"."enum_ss_struct_data_agg_source";
  DROP TYPE "payload"."ssd_agg_cat";
  DROP TYPE "payload"."enum__site_settings_v_version_hours_days";
  DROP TYPE "payload"."enum__site_settings_v_version_price_cards_category";
  DROP TYPE "payload"."enum__ss_struct_data_agg_v_source";
  DROP TYPE "payload"."enum_header_dropdowns_items_icon";
  DROP TYPE "payload"."enum__header_v_version_dropdowns_items_icon";
  DROP TYPE "payload"."enum_home_page_hero_slides_accent";
  DROP TYPE "payload"."svc_explorer_img_pos";
  DROP TYPE "payload"."enum_home_page_method_pillars_icon";
  DROP TYPE "payload"."enum_home_page_method_pillars_accent";
  DROP TYPE "payload"."enum_home_page_seo_robots";
  DROP TYPE "payload"."enum__home_page_v_version_hero_slides_accent";
  DROP TYPE "payload"."enum__home_page_v_version_method_pillars_icon";
  DROP TYPE "payload"."enum__home_page_v_version_method_pillars_accent";
  DROP TYPE "payload"."enum__home_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_about_page_cta_buttons_style";
  DROP TYPE "payload"."enum_about_page_seo_robots";
  DROP TYPE "payload"."enum__about_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__about_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_method_page_seo_robots";
  DROP TYPE "payload"."enum__method_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_classes_page_cta_buttons_style";
  DROP TYPE "payload"."enum_classes_page_seo_robots";
  DROP TYPE "payload"."enum__classes_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__classes_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_schedule_page_seo_robots";
  DROP TYPE "payload"."enum__schedule_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_appointments_page_seo_robots";
  DROP TYPE "payload"."enum__appointments_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_pricing_page_cta_buttons_style";
  DROP TYPE "payload"."enum_pricing_page_seo_robots";
  DROP TYPE "payload"."enum__pricing_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__pricing_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_memberships_page_cta_buttons_style";
  DROP TYPE "payload"."enum_memberships_page_seo_robots";
  DROP TYPE "payload"."enum__memberships_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__memberships_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_recovery_page_seo_robots";
  DROP TYPE "payload"."enum__recovery_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_services_page_items_image_position";
  DROP TYPE "payload"."enum_services_page_items_accent";
  DROP TYPE "payload"."enum_services_page_cta_buttons_style";
  DROP TYPE "payload"."enum_services_page_seo_robots";
  DROP TYPE "payload"."enum__services_page_v_version_items_image_position";
  DROP TYPE "payload"."enum__services_page_v_version_items_accent";
  DROP TYPE "payload"."enum__services_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__services_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_reformer_pilates_page_cta_buttons_style";
  DROP TYPE "payload"."enum_reformer_pilates_page_hero_image_position";
  DROP TYPE "payload"."enum_reformer_pilates_page_seo_robots";
  DROP TYPE "payload"."enum__reformer_pilates_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__reformer_pilates_page_v_version_hero_image_position";
  DROP TYPE "payload"."enum__reformer_pilates_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_breathing_room_page_cta_buttons_style";
  DROP TYPE "payload"."enum_breathing_room_page_hero_image_position";
  DROP TYPE "payload"."enum_breathing_room_page_seo_robots";
  DROP TYPE "payload"."enum__breathing_room_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__breathing_room_page_v_version_hero_image_position";
  DROP TYPE "payload"."enum__breathing_room_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_contrast_therapy_page_benefits_items_icon";
  DROP TYPE "payload"."enum_contrast_therapy_page_cta_buttons_style";
  DROP TYPE "payload"."enum_contrast_therapy_page_hero_image_position";
  DROP TYPE "payload"."enum_contrast_therapy_page_seo_robots";
  DROP TYPE "payload"."enum__contrast_therapy_page_v_version_benefits_items_icon";
  DROP TYPE "payload"."enum__contrast_therapy_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__contrast_therapy_page_v_version_hero_image_position";
  DROP TYPE "payload"."enum__contrast_therapy_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_compression_therapy_page_cta_buttons_style";
  DROP TYPE "payload"."enum_compression_therapy_page_hero_image_position";
  DROP TYPE "payload"."enum_compression_therapy_page_seo_robots";
  DROP TYPE "payload"."enum__compression_therapy_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__compression_therapy_page_v_version_hero_image_position";
  DROP TYPE "payload"."enum__compression_therapy_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_massage_page_cta_buttons_style";
  DROP TYPE "payload"."enum_massage_page_hero_image_position";
  DROP TYPE "payload"."enum_massage_page_seo_robots";
  DROP TYPE "payload"."enum__massage_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__massage_page_v_version_hero_image_position";
  DROP TYPE "payload"."enum__massage_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_events_page_event_types_items_icon";
  DROP TYPE "payload"."enum_events_page_cta_buttons_style";
  DROP TYPE "payload"."enum_events_page_seo_robots";
  DROP TYPE "payload"."enum__events_page_v_version_event_types_items_icon";
  DROP TYPE "payload"."enum__events_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__events_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_partnerships_page_types_items_icon";
  DROP TYPE "payload"."enum_partnerships_page_cta_buttons_style";
  DROP TYPE "payload"."enum_partnerships_page_seo_robots";
  DROP TYPE "payload"."enum__partnerships_page_v_version_types_items_icon";
  DROP TYPE "payload"."enum__partnerships_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__partnerships_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_contact_page_seo_robots";
  DROP TYPE "payload"."enum__contact_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_register_page_benefits_items_icon";
  DROP TYPE "payload"."enum_register_page_trust_badges_items_icon";
  DROP TYPE "payload"."enum_register_page_cta_buttons_style";
  DROP TYPE "payload"."enum_register_page_quick_links_items_icon";
  DROP TYPE "payload"."enum_register_page_seo_robots";
  DROP TYPE "payload"."enum__register_page_v_version_benefits_items_icon";
  DROP TYPE "payload"."enum__register_page_v_version_trust_badges_items_icon";
  DROP TYPE "payload"."enum__register_page_v_version_cta_buttons_style";
  DROP TYPE "payload"."enum__register_page_v_version_quick_links_items_icon";
  DROP TYPE "payload"."enum__register_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_account_page_features_items_icon";
  DROP TYPE "payload"."enum_account_page_quick_actions_buttons_icon";
  DROP TYPE "payload"."enum_account_page_trust_badges_items_icon";
  DROP TYPE "payload"."enum_account_page_seo_robots";
  DROP TYPE "payload"."enum__account_page_v_version_features_items_icon";
  DROP TYPE "payload"."enum__account_page_v_version_quick_actions_buttons_icon";
  DROP TYPE "payload"."enum__account_page_v_version_trust_badges_items_icon";
  DROP TYPE "payload"."enum__account_page_v_version_seo_robots";
  DROP TYPE "payload"."enum_blog_page_seo_robots";
  DROP TYPE "payload"."enum__blog_page_v_version_seo_robots";`)
}
