import { APIError, ValidationError } from 'payload';

/**
 * Errors whose message an editor must actually see in the admin.
 *
 * Payload only forwards a thrown error's message when the error carries `data`, or else when it has
 * a class name (payload/dist/utilities/formatErrors.js). Our hooks threw `new APIError(msg, status)`
 * with no `data`, and the production build minifies the class name to "", so every one of those
 * messages reached the admin as "An unknown error occurred." (observed live 2026-10-21 when a user
 * was created with a 9-character password). Both helpers set `data` and an explicit `name`.
 */
export function editorError(message: string, status = 400): APIError {
  const error = new APIError(message, status, { message }, true);
  error.name = 'APIError';
  return error;
}

/** A message shown under one field of the form (e.g. the password box). */
export function fieldError(collection: string, path: string, message: string): ValidationError {
  const error = new ValidationError({ collection, errors: [{ path, message }] });
  error.name = 'ValidationError';
  return error;
}
