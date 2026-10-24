import type { CSSProperties, ReactNode } from 'react';
import { photoAlt, photoCaption, photoDims, isProcessed, type PhotoName } from '@/content/images';
import { processedMeta } from '@/content/images.generated';
import { illustration, type IllustrationKind } from './svgart';
import { site } from '@/content/site';

export const Arrow = () => (
  <svg viewBox="0 0 18 12" aria-hidden="true" focusable="false"><path d="M0 6h16M11 1l5 5-5 5" /></svg>
);

type Variant = 'yellow' | 'green' | 'ghost' | 'ghost-dark' | 'dark';
export function Button({ href, variant = 'yellow', children, small = false, className = '' }: { href: string; variant?: Variant; children: ReactNode; small?: boolean; className?: string }) {
  const arrow = variant === 'ghost' || variant === 'ghost-dark' ? null : <span className="arr"><Arrow /></span>;
  return (
    <a className={`btn btn--${variant}${small ? ' btn--sm' : ''} ${className}`.trim()} href={href}>
      {children}{arrow}
    </a>
  );
}

/** Official logo, exactly as supplied. The PNG is never altered; CSS hides only its transparent margin. */
export function Logo({ width, eager = true, link = true }: { width?: number | string; eager?: boolean; link?: boolean }) {
  const style = width ? ({ ['--lw' as string]: typeof width === 'number' ? `${width}px` : width } as CSSProperties) : undefined;
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/Siddhrans_Logo.png" width={2200} height={1109} alt="Siddhrans InfoTech — Easy Success with Excellent Consulting" decoding="async" {...(eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })} />
  );
  return link ? <a className="logo" href="/" aria-label="Siddhrans InfoTech — home" style={style}>{img}</a> : <span className="logo" style={style}>{img}</span>;
}

/** Responsive photograph. Processed images are AVIF + WebP with a JPEG fallback; older stock images are WebP (480/720/960/1600). */
export function Photo({ name, sizes = '100vw', priority = false, pos, className, alt }: { name: PhotoName; sizes?: string; priority?: boolean; pos?: string; className?: string; alt?: string }) {
  const [w, h] = photoDims[name];
  const W = 960;
  const common = {
    className, sizes, width: W, height: Math.round((W * h) / w), alt: alt ?? photoAlt[name],
    style: pos ? { objectPosition: pos } : undefined,
    ...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const }),
  };
  if (isProcessed(name)) {
    const ws = processedMeta[name].widths;
    // content-hash query string: a replaced source gets new URLs, so the 30-day /img/ cache cannot serve the old file
    const q = 'v' in processedMeta[name] ? `?v=${(processedMeta[name] as { v: string }).v}` : '';
    const set = (e: string) => ws.map((x) => `/img/${name}-${x}.${e}${q} ${x}w`).join(', ');
    const mid = ws[Math.min(1, ws.length - 1)];
    return (
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/img/${name}-${mid}.jpg${q}`} srcSet={set('jpg')} {...common} />
      </picture>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/img/${name}-960.webp`}
      srcSet={`/img/${name}-480.webp 480w, /img/${name}-720.webp 720w, /img/${name}-960.webp 960w, /img/${name}-1600.webp 1600w`}
      {...common}
    />
  );
}

/** Framed photograph with the mandatory "illustrative image" caption (never a Siddhrans project photo). */
export function PhotoCard({ name, sizes, priority, pos, className = '', style, cap = true, alt, shade = false }: { name: PhotoName; sizes?: string; priority?: boolean; pos?: string; className?: string; style?: CSSProperties; cap?: boolean; alt?: string; shade?: boolean }) {
  return (
    <div className={`photo ${shade ? 'shade' : ''} ${className}`.trim()} style={style}>
      <Photo name={name} sizes={sizes} priority={priority} pos={pos} alt={alt} />
      {cap && <span className="photo__cap"><b>Illustrative image</b> · {photoCaption[name]}</span>}
    </div>
  );
}

/** Original line illustration (static markup built from string literals only). */
export function Art({ kind, light = false, label }: { kind: IllustrationKind; light?: boolean; label?: string }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: illustration(kind, light, label) }} />;
}
export function RawSvg({ html }: { html: string }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />;
}

type PillKind = 'built' | 'cap' | 'eng' | 'design' | 'prop' | 'concept';
export const Pill = ({ kind = 'cap', children }: { kind?: PillKind; children: ReactNode }) => (
  <span className={`pill pill--${kind}`}>{children}</span>
);

export const Eyebrow = ({ children }: { children: ReactNode }) => <span className="eyebrow">{children}</span>;

export const Crumbs = ({ items }: { items: { href?: string; label: string }[] }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    {items.map((c, i) => (
      <span key={c.label}>
        {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
        {i < items.length - 1 ? ' / ' : ''}
      </span>
    ))}
  </nav>
);

/** Inner-page hero with a full-bleed photograph. */
export function PageHero({ photo, pos, crumbs, children }: { photo: PhotoName; pos?: string; crumbs: { href?: string; label: string }[]; children: ReactNode }) {
  return (
    <header className="phero">
      <PhotoCard name={photo} priority pos={pos} sizes="100vw" alt="" cap={false} />
      <span className="photo__cap hero-cap"><b>Illustrative image</b> · {photoCaption[photo]}</span>
      <div className="container">
        <Crumbs items={crumbs} />
        {children}
      </div>
    </header>
  );
}

export const SecHead = ({ eyebrow, title, lede, row = false }: { eyebrow: string; title: ReactNode; lede?: ReactNode; row?: boolean }) => (
  <div className={`sec-head${row ? ' sec-head--row' : ''}`}>
    <div style={{ display: 'grid', gap: 18 }}><Eyebrow>{eyebrow}</Eyebrow><h2 className="h-xl">{title}</h2></div>
    {lede && <p className="lede">{lede}</p>}
  </div>
);
