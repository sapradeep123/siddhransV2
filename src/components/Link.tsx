import type { AnchorHTMLAttributes } from 'react';

/**
 * Plain anchor used instead of next/link. The site is a static export served by nginx:
 * full-page navigation is fast, needs no server rewrites for client-router payload files,
 * and avoids speculative prefetch requests that would 404 on a plain static host.
 */
export default function Link({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...rest}>{children}</a>;
}
