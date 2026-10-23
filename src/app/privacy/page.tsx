import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: `How ${site.name} handles the details you send through the enquiry form.`,
  alternates: { canonical: '/privacy/' },
};

export default function Privacy() {
  return (
    <>
      <header className="shero">
        <div className="container">
          <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Privacy notice' }]} />
          <h1 className="h-xl">Privacy notice</h1>
        </div>
      </header>
      <section className="sec sec--white" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="container prose" style={{ maxWidth: 860 }}>
          <p>This notice explains what {site.name} does with the details you send through the enquiry form on this website.</p>
          <h2>What we collect</h2>
          <p>Only what you type into the form: your name, work email, organisation and phone number (both optional), the area you are interested in, and your message. This website does not use advertising cookies, and it does not set tracking or analytics cookies.</p>
          <h2>Why we collect it</h2>
          <p>To read and reply to your enquiry. We do not use these details for marketing and we do not share them with third parties for their own purposes.</p>
          <h2>How it is handled</h2>
          <p>The form sends your enquiry by email to {site.name}. The website does not store enquiries in a database. Copies exist in the company mailbox that receives them, and may pass through our email provider.</p>
          <h2>Your choices</h2>
          <p>To ask what we hold about you, or to have an enquiry deleted, email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a> or <a href={`tel:${site.phones[1].tel}`}>{site.phones[1].display}</a>.</p>
          <h2>Contact</h2>
          <p>{site.name}, {site.city}, {site.country}.</p>
          <p className="fine">Last updated 23 October 2026. This notice describes the website&apos;s behaviour as built and should be reviewed by the company before launch.</p>
        </div>
      </section>
    </>
  );
}
