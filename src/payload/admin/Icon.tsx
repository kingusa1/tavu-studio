// TAVÚ mark for the CMS navigation (replaces the Payload icon): the navy "T" cut from the logo,
// because the breadcrumb slot is 18px wide (measured live) — too narrow for the wordmark.
export default function Icon() {
  // eslint-disable-next-line @next/next/no-img-element -- static brand asset, admin only
  return <img className="tavu-admin-icon" src="/admin-icon-t.png" alt="TAVÚ" width={18} height={18} />;
}
