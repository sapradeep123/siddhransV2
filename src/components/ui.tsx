import Link from '@/components/Link';
import type { ReactNode } from 'react';
import { photoAlt, photoCaption, photoDims, type PhotoName } from '@/content/images';
import { illustration, type IllustrationKind } from './svgart';
import { site } from '@/content/site';

export const Arrow = () => (
  <svg className="ar" viewBox="0 0 18 10" aria-hidden="true"><path d="M0 5h16M12 1l4 4-4 4" /></svg>
);

/** Official logo, exactly as supplied. The PNG is never altered; CSS hides only its transparent margin. */
export function Logo({ width, eager = true }: { width?: number | string; eager?: boolean }) {
  return (
    <Link className="logo" href="/" aria-label="Siddhrans InfoTech — home" style={width ? ({ ['--lw' as string]: typeof width === 'number' ? `${width}px` : width } as React.CSSProperties) : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/Siddhrans_Logo.png" width={2200} height={1109} alt="Siddhrans InfoTech — Easy Success with Excellent Consulting" decoding="async" loading={eager ? 'eager' : 'lazy'} />
    </Link>
  );
}

/** Responsive licensed stock photograph (WebP, 480/960/1600). */
export function Photo({ name, sizes = '100vw', priority = false, pos, className, alt }: { name: PhotoName; sizes?: string; priority?: boolean; pos?: string; className?: string; alt?: string }) {
  const [w, h] = photoDims[name];
  const W = 960;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/img/${name}-960.webp`}
      srcSet={`/img/${name}-480.webp 480w, /img/${name}-960.webp 960w, /img/${name}-1600.webp 1600w`}
      sizes={sizes}
      width={W}
      height={Math.round((W * h) / w)}
      alt={alt ?? photoAlt[name]}
      style={pos ? { objectPosition: pos } : undefined}
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}
    />
  );
}

/** Original line illustration (static markup built from string literals only). */
export function Art({ kind, light = false, label }: { kind: IllustrationKind; light?: boolean; label?: string }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: illustration(kind, light, label) }} />;
}

export function RawSvg({ html }: { html: string }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Caption that marks a photograph as illustrative stock, never a project photo. */
export const Fig = ({ name }: { name: PhotoName }) => (
  <div className="cap-fig"><b>Illustrative image</b> · {photoCaption[name]} (stock photograph)</div>
);

export const Sheet = ({ n, a, b }: { n: string; a: string; b: string }) => (
  <div className="sheet-head mono"><b>§ {n}</b><span>{a}</span><i></i><span>{b}</span></div>
);

type TagKind = 'delivered' | 'cap' | 'eng' | 'design' | 'prop' | '';
export const Tag = ({ kind = '', children }: { kind?: TagKind; children: ReactNode }) => (
  <span className={`tag ${kind}`.trim()}>{children}</span>
);

export const Cta = ({ title, label = 'Talk to an engineer' }: { title: string; label?: string }) => (
  <section className="cta-band" style={{ padding: 0 }}>
    <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,104px)', paddingBottom: 'clamp(56px,8vw,104px)' }}>
      <div><h2>{title}</h2></div>
      <div className="acts">
        <Link className="btn solid" href="/contact/">{label} <Arrow /></Link>
        <a className="btn" href={`tel:${site.phone.tel}`}>Call {site.phone.display}</a>
      </div>
    </div>
  </section>
);

export const Crumbs = ({ items }: { items: { href?: string; label: string }[] }) => (
  <nav className="crumbs mono" aria-label="Breadcrumb">
    {items.map((c, i) => (
      <span key={c.label}>
        {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        {i < items.length - 1 ? ' / ' : ''}
      </span>
    ))}
  </nav>
);

/** Inner-page hero with photograph. */
export function PageHero({ photo, pos, crumbs, children, eager = true }: { photo: PhotoName; pos?: string; crumbs: { href?: string; label: string }[]; children: ReactNode; eager?: boolean }) {
  return (
    <div className="page-photo">
      <div className="bg"><Photo name={photo} priority={eager} pos={pos} alt="" /></div>
      <div className="wrap">
        <Crumbs items={crumbs} />
        {children}
      </div>
      <Fig name={photo} />
    </div>
  );
}

export const Ruler = ({ items }: { items: readonly (readonly [string, string])[] }) => (
  <ol className="ruler rv" style={{ ['--cols' as string]: Math.min(items.length, 8) } as React.CSSProperties}>
    {items.map(([t, d], i) => (
      <li key={t}><small>{String(i + 1).padStart(2, '0')}</small><h3>{t}</h3><p>{d}</p></li>
    ))}
  </ol>
);
