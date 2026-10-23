import { site } from '@/content/site';
import { services } from '@/content/services';
import { Button, Logo } from './ui';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="logoplate"><Logo width="100%" eager={false} /></div>
            <p style={{ margin: '22px 0 24px', maxWidth: '38ch', fontSize: 17 }}>{site.tagline}. {site.city}, {site.country}.</p>
            <Button href="/contact/" variant="yellow">Start a conversation</Button>
          </div>
          <div>
            <h2>Capabilities</h2>
            <ul>{services.map((s) => (<li key={s.slug}><a href={`/services/${s.slug}/`}>{s.short}</a></li>))}</ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><a href="/services/">Services overview</a></li>
              <li><a href="/products/">Products &amp; solutions</a></li>
              <li><a href="/industries/">Industries</a></li>
              <li><a href="/engineering-use-cases/">Engineering use cases</a></li>
              <li><a href="/case-studies/">Case studies</a></li>
              <li><a href="/about/">About &amp; leadership</a></li>
              <li><a href="/privacy/">Privacy notice</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.city}, {site.country}</li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Photographs are licensed stock images used for illustration, not Siddhrans project photographs. Interface visuals are concept designs. <a href="/image-credits/">Image credits</a></span>
        </div>
      </div>
    </footer>
  );
}
