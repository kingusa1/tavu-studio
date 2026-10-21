// Default copy and addresses for the `email-settings` global. Used as the CMS field defaults and as
// the fallback when a field is left empty, so emails always go out with sensible text.
// Tokens: {name} visitor/subscriber first name · {phone} studio phone · {email} studio email.

export const EMAIL_DEFAULTS = {
  sender: {
    fromName: 'TAVÚ Wellness Studio',
    fromAddress: 'connect@tavustudio.com',
  },
  contactForm: {
    notifyTeam: true,
    teamRecipients: [{ email: 'connect@tavustudio.com' }],
    teamSubject: 'New website message from {name}',
    sendThankYou: true,
    thankYouSubject: 'Thank you for contacting TAVÚ',
    thankYouHeading: 'Thank you, {name}',
    thankYouBody:
      'We have received your message and a member of the TAVÚ team will get back to you as soon as possible.\n\n' +
      'Class and appointment bookings are handled through our online schedule, which is open at any time. ' +
      'For anything urgent, message us on WhatsApp at {phone}.',
    thankYouCtaLabel: 'View the class schedule',
    thankYouCtaUrl: 'https://tavustudio.com/schedule',
  },
  newsletter: {
    segmentName: 'TAVÚ Newsletter',
    signupEyebrow: 'Newsletter',
    signupHeading: 'Notes from the studio',
    signupText: 'New articles, studio news and upcoming events from TAVÚ, straight to your inbox.',
    consentText: 'By subscribing you agree to receive emails from TAVÚ Wellness Studio. You can unsubscribe at any time.',
    successText: 'Almost there. Please check your inbox and confirm your subscription.',
    confirmSubject: 'Please confirm your TAVÚ newsletter subscription',
    confirmHeading: 'Confirm your subscription',
    confirmBody:
      'Thank you for signing up to the TAVÚ newsletter. Please confirm that this is your email address by pressing the button below.\n\n' +
      'If you did not sign up, you can ignore this email and you will not be subscribed.',
    confirmCtaLabel: 'Confirm my subscription',
    welcomeSubject: 'Welcome to the TAVÚ newsletter',
    welcomeHeading: 'Welcome, {name}',
    welcomeBody:
      'Your subscription is confirmed. You will now receive new articles, studio news and upcoming events from TAVÚ.\n\n' +
      'In the meantime, the journal is a good place to start.',
    welcomeCtaLabel: 'Read the journal',
    welcomeCtaUrl: 'https://tavustudio.com/blog',
    confirmedPageHeading: 'You are subscribed',
    confirmedPageText: 'Thank you for confirming. The next TAVÚ newsletter will arrive in your inbox.',
    unsubscribedPageHeading: 'You have been unsubscribed',
    unsubscribedPageText: 'You will no longer receive the TAVÚ newsletter. You can subscribe again at any time from our blog.',
    invalidPageHeading: 'This link is no longer valid',
    invalidPageText: 'The link has expired or was already used. Please subscribe again from our blog.',
  },
  signOff: 'Warm regards,\nThe TAVÚ team',
} as const;

export type EmailSettingsValue = {
  sender: { fromName: string; fromAddress: string };
  contactForm: {
    notifyTeam: boolean;
    teamRecipients: { email: string }[];
    teamSubject: string;
    sendThankYou: boolean;
    thankYouSubject: string;
    thankYouHeading: string;
    thankYouBody: string;
    thankYouCtaLabel: string;
    thankYouCtaUrl: string;
  };
  newsletter: { segmentId?: string | null } & { [K in keyof typeof EMAIL_DEFAULTS.newsletter]: string };
  signOff: string;
};
