import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MotionProvider, RevealInit } from '@/components/motion';
import { site } from '@/content/site';

// Fonts are downloaded at build time and self-hosted: no runtime request to Google.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700', '800'] });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.short} — ${site.tagline}`, template: `%s — ${site.short}` },
  keywords: ['AI engineering', 'AI agents', 'enterprise copilots', 'RAG', 'intelligent automation', 'document intelligence', 'computer vision', 'custom software', 'enterprise applications', 'cloud', 'cybersecurity', 'industrial IoT', 'edge AI', 'embedded systems', 'PCB design', 'VLSI design support', 'Bengaluru'],
  description: site.description,
  applicationName: site.short,
  alternates: { canonical: './' },
  // No favicon has been approved yet; an empty data icon avoids a 404 until one is supplied.
  icons: { icon: 'data:,' },
  openGraph: {
    type: 'website', siteName: site.short, locale: 'en_IN', url: site.url,
    title: `${site.short} — ${site.tagline}`, description: site.description,
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: 'Siddhrans InfoTech: AI-led engineering from software to smart machines, over an illustrative image of an industrial pump installation' }],
  },
  twitter: { card: 'summary_large_image', title: `${site.short} — ${site.tagline}`, description: site.description, images: ['/og/og-default.jpg'] },
};

export const viewport: Viewport = { themeColor: '#050A14', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/Siddhrans_Logo.png`,
  description: site.description,
  foundingDate: String(site.founded),
  telephone: site.phones.map((p) => p.tel),
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IN' },
  founder: { '@type': 'Person', name: 'Gururaj N' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <RevealInit />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
