// TAVÚ logo for the CMS login, forgot-password and reset screens (replaces the Payload logo).
export default function Logo() {
  // eslint-disable-next-line @next/next/no-img-element -- static brand asset, admin only
  return <img className="tavu-admin-logo" src="/logo-navy.png" alt="TAVÚ Wellness Studio" width={220} height={81} />;
}
