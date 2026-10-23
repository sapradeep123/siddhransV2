import Link from '@/components/Link';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { Logo } from './ui';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="top">
          <div>
            <Logo width="min(100%, 430px)" eager={false} />
            <p style={{ margin: '18px 0 0', color: 'var(--ink-2)', maxWidth: '40ch' }}>
              {site.tagline}. {site.city}, {site.country}.
            </p>
          </div>
          <div>
            <h2 className="fh">Capabilities</h2>
            <ul>
              {services.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.short}</Link></li>))}
            </ul>
          </div>
          <div>
            <h2 className="fh">Explore</h2>
            <ul>
              <li><Link href="/services/">Services overview</Link></li>
              <li><Link href="/products/">Products &amp; solutions</Link></li>
              <li><Link href="/industries/">Industries</Link></li>
              <li><Link href="/engineering-use-cases/">Engineering use cases</Link></li>
              <li><Link href="/case-studies/">Case studies</Link></li>
              <li><Link href="/about/">About &amp; leadership</Link></li>
              <li><Link href="/privacy/">Privacy notice</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="fh">Contact</h2>
            <ul>
              <li><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.city}, {site.country}</li>
            </ul>
          </div>
        </div>
        <div className="base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Photographs are licensed stock images used for illustration, not Siddhrans project photographs. <Link href="/image-credits/">Image credits</Link></span>
        </div>
      </div>
    </footer>
  );
}
