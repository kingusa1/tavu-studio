// TAVÚ mark for the CMS navigation (replaces the Payload icon): the square navy tile, which stays
// legible at the breadcrumb's small size where the wide wordmark does not.
export default function Icon() {
  // eslint-disable-next-line @next/next/no-img-element -- static brand asset, admin only
  return <img className="tavu-admin-icon" src="/apple-touch-icon.png" alt="TAVÚ" width={28} height={28} />;
}
