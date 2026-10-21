// Pure utility — estimates reading time from a Lexical JSON tree by summing every text node's
// word count (brief §A: article byline shows "reading time").

type LexicalNode = { type?: string; text?: string; children?: LexicalNode[]; [key: string]: unknown };

function collectWords(node: LexicalNode | undefined, acc: { count: number }): void {
  if (!node) return;
  if (typeof node.text === 'string') {
    acc.count += node.text.trim().split(/\s+/).filter(Boolean).length;
  }
  (node.children ?? []).forEach((child) => collectWords(child, acc));
}

const WORDS_PER_MINUTE = 200;

/** Returns a whole number of minutes, minimum 1. */
export function estimateReadingMinutes(body: { root?: LexicalNode } | null | undefined): number {
  if (!body?.root) return 1;
  const acc = { count: 0 };
  collectWords(body.root, acc);
  return Math.max(1, Math.round(acc.count / WORDS_PER_MINUTE));
}
