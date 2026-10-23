import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <header className="shero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <p className="mono" style={{ color: 'var(--green-b)' }}>Error 404</p>
        <h1 className="h-display" style={{ margin: '14px 0 22px', maxWidth: '12ch' }}>Page not <span className="hl">found</span>.</h1>
        <p className="lede">This page could not be found. It may have moved, or the address may be mistyped.</p>
        <div className="phero__actions"><Button href="/">Back to home</Button><Button href="/contact/" variant="ghost">Contact us</Button></div>
      </div>
    </header>
  );
}
