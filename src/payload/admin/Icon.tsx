// TAVÚ mark for the CMS navigation (replaces the Payload icon).
export default function Icon() {
  // eslint-disable-next-line @next/next/no-img-element -- static brand asset, admin only
  return <img className="tavu-admin-icon" src="/logo-navy.png" alt="TAVÚ" width={64} height={24} />;
}
