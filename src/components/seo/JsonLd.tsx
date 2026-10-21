// Server component — the one place JSON-LD is serialized to HTML (security audit SEC-02,
// `TAVU-Brain/03-Architecture/Security-DB-Egress-Audit-2026-10-21.md`). `JSON.stringify` alone
// would let a `</script>` (or any `<`) inside CMS text break out of the `<script>` tag; escaping
// every `<` to `<` neutralises that without changing the parsed JSON value.

export type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
