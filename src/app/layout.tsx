import type { Metadata, Viewport } from 'next';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { site } from '@/content/site';

// Fonts are downloaded at build time and self-hosted: no runtime request to Google.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.short} — ${site.tagline}`, template: `%s — ${site.short}` },
  description: site.description,
  applicationName: site.short,
  alternates: { canonical: './' },
  // No favicon has been approved yet; an empty data icon avoids a 404 until one is supplied.
  icons: { icon: 'data:,' },
  openGraph: {
    type: 'website', siteName: site.short, locale: 'en_IN', url: site.url,
    title: `${site.short} — ${site.tagline}`, description: site.description,
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: 'A robotic arm in an automation cell (illustrative stock photograph)' }],
  },
  twitter: { card: 'summary_large_image', title: `${site.short} — ${site.tagline}`, description: site.description, images: ['/og/og-default.jpg'] },
};

export const viewport: Viewport = { themeColor: '#14171B', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/Siddhrans_Logo.png`,
  description: site.description,
  foundingDate: String(site.founded),
  telephone: site.phone.tel,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IN' },
  founder: { '@type': 'Person', name: 'Gururaj N' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${hanken.variable} ${plex.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
