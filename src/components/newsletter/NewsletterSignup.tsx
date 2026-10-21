// Server component: loads the signup wording from "Emails & Newsletter" and renders the form.
import { getPayloadClient } from '@/lib/cms/payload';
import { loadEmailContext } from '@/lib/email/context';

import NewsletterSignupForm from './NewsletterSignupForm';

type Props = { source: string; variant?: 'card' | 'inline' };

export default async function NewsletterSignup({ source, variant = 'card' }: Props) {
  const { settings } = await loadEmailContext(await getPayloadClient());
  const nl = settings.newsletter;
  return (
    <NewsletterSignupForm
      source={source}
      variant={variant}
      texts={{ eyebrow: nl.signupEyebrow, heading: nl.signupHeading, text: nl.signupText, consent: nl.consentText, success: nl.successText }}
    />
  );
}
