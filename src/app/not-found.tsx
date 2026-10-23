import Link from '@/components/Link';
import { Arrow } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="page-head grid-bg" style={{ borderBottom: 0, minHeight: '56vh' }}>
      <div className="wrap">
        <p className="mono" style={{ color: 'var(--mute)' }}>Error 404</p>
        <h1 style={{ fontSize: 'clamp(38px,5.4vw,74px)', maxWidth: '16ch', margin: '12px 0 20px' }}>This page <mark>could not be found</mark>.</h1>
        <p className="lede">It may have moved, or the address may be mistyped.</p>
        <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link className="btn solid" href="/">Back to home <Arrow /></Link>
          <Link className="btn" href="/contact/">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
