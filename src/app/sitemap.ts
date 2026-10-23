import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { services } from '@/content/services';

export const dynamic = 'force-static';

const pages = ['/', '/services/', '/products/', '/industries/', '/engineering-use-cases/', '/case-studies/', '/about/', '/contact/', '/privacy/', '/image-credits/'];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [...pages, ...services.map((s) => `/services/${s.slug}/`)];
  return urls.map((u) => ({ url: `${site.url}${u}`, changeFrequency: u === '/' ? 'monthly' : 'yearly', priority: u === '/' ? 1 : u.startsWith('/services/') ? 0.8 : 0.6 }));
}
