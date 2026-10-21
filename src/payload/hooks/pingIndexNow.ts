import { after } from 'next/server';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload';

/**
 * IndexNow (indexnow.org/documentation): tells Bing, Yandex, Seznam, Naver and Yep that a blog URL
 * changed, so a new article is crawled in minutes instead of days. One POST to api.indexnow.org is
 * shared with every participating engine. The key is public by design: it is served at
 * `/<INDEXNOW_KEY>.txt` (public/), and the ping only runs where INDEXNOW_KEY is set (production).
 *
 * Runs through `after()` so it fires once the save has committed and the response has gone out;
 * a failed ping is logged and never affects the save.
 */
const ENDPOINT = 'https://api.indexnow.org/indexnow';

type PostLike = { slug?: string | null; _status?: string | null };

function ping(req: PayloadRequest, slugs: string[]): void {
  const key = process.env.INDEXNOW_KEY;
  if (!key || req.context?.disableRevalidate || slugs.length === 0) return;
  const site = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://tavustudio.com').replace(/\/+$/, '');
  const urlList = [...new Set(slugs)].map((slug) => `${site}/blog/${encodeURIComponent(slug)}`).concat(`${site}/blog`);
  const send = async (): Promise<void> => {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
        signal: AbortSignal.timeout(8_000),
      });
      req.payload.logger.info({ msg: 'IndexNow ping', status: res.status, urls: urlList.length });
    } catch (err) {
      req.payload.logger.warn({ msg: 'IndexNow ping failed', err: String(err) });
    }
  };
  try {
    after(send);
  } catch {
    // Outside a Next request (scripts): nothing to tell search engines about.
  }
}

/** A post that is (or just stopped being) public changed: its URL needs a recrawl. */
export const pingIndexNowAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  const now = doc as PostLike;
  const before = (previousDoc ?? {}) as PostLike;
  const slugs: string[] = [];
  if (now._status === 'published' && now.slug) slugs.push(now.slug);
  if (before._status === 'published' && before.slug && (now._status !== 'published' || before.slug !== now.slug)) {
    slugs.push(before.slug);
  }
  ping(req, slugs);
  return doc;
};

/** A published post was deleted: its URL now answers 404 and should drop out of the index. */
export const pingIndexNowAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  const gone = doc as PostLike;
  if (gone._status === 'published' && gone.slug) ping(req, [gone.slug]);
  return doc;
};
