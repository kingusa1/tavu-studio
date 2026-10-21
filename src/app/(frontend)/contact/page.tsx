import ContactView from '@/components/pages/ContactView';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import type { ImageFieldValue } from '@/lib/cms/media';
import type { SeoFieldValue } from '@/lib/cms/metadata';

export type ContactPageGlobal = {
  hero: {
    eyebrow?: string | null;
    headingLead?: string | null;
    headingEmphasis?: string | null;
    intro?: string | null;
  };
  imageCard: { image?: ImageFieldValue; caption?: string | null };
  tiles: {
    locationLabel?: string | null;
    hoursLabel?: string | null;
    phoneLabel?: string | null;
    emailLabel?: string | null;
    whatsappLabel?: string | null;
  };
  form: {
    nameLabel?: string | null;
    namePlaceholder?: string | null;
    emailLabel?: string | null;
    emailPlaceholder?: string | null;
    messageLabel?: string | null;
    messagePlaceholder?: string | null;
    submitLabel?: string | null;
    submittingLabel?: string | null;
    footnote?: string | null;
    whatsappTemplate?: string | null;
    errors?: { name?: string | null; email?: string | null; message?: string | null } | null;
  };
  map: { title?: string | null };
  seo: SeoFieldValue;
};

export default async function ContactPage() {
  const data = await getGlobal<ContactPageGlobal>('contact-page');
  const imageCardImage = resolveImage(data.imageCard.image);

  return <ContactView data={data} imageCardImage={imageCardImage} />;
}
