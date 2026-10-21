'use client';

import { useEffect, type ReactNode } from 'react';

// Show / hide button for every password box in the CMS: sign in, reset password, create user,
// change password. Payload 3.91 has no built-in toggle and its auth fields cannot be customised,
// so this admin provider (it wraps every admin screen, the sign-in page included) adds a button
// next to each `input[type=password]` as it appears. Passwords are hidden again whenever a form
// is submitted, so the browser never stores one as plain text.

const EYE =
  '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
  '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7c1.9 0 3.6-.6 5-1.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';

const BUTTON_CLASS = 'tavu-reveal';
const INPUT_CLASS = 'tavu-reveal-input';

function setState(input: HTMLInputElement, button: HTMLButtonElement, visible: boolean): void {
  input.type = visible ? 'text' : 'password';
  button.innerHTML = visible ? EYE_OFF : EYE;
  button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  button.setAttribute('aria-pressed', String(visible));
  button.title = visible ? 'Hide password' : 'Show password';
}

function enhance(input: HTMLInputElement): void {
  const parent = input.parentElement;
  if (!parent || parent.querySelector(`:scope > .${BUTTON_CLASS}`)) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = BUTTON_CLASS;
  setState(input, button, false);
  button.addEventListener('click', () => {
    setState(input, button, input.type === 'password');
    input.focus();
  });
  parent.classList.add('tavu-reveal-wrap');
  input.classList.add(INPUT_CLASS);
  input.insertAdjacentElement('afterend', button);
}

function hideAll(): void {
  document.querySelectorAll<HTMLInputElement>(`input.${INPUT_CLASS}`).forEach((input) => {
    const button = input.parentElement?.querySelector<HTMLButtonElement>(`:scope > .${BUTTON_CLASS}`);
    if (button && input.type !== 'password') setState(input, button, false);
  });
}

export default function PasswordReveal({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const scan = () => document.querySelectorAll<HTMLInputElement>('input[type="password"]').forEach(enhance);
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('submit', hideAll, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('submit', hideAll, true);
    };
  }, []);
  return <>{children}</>;
}
