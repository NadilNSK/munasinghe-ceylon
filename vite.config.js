import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { business } from './src/data/business.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'bakery-metadata',
      transformIndexHtml() {
        const { title, description, siteUrl, socialImage } = business.seo;
        return [
          { tag: 'title', children: title },
          { tag: 'meta', attrs: { name: 'description', content: description } },
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` } },
          ...Object.entries({
            'og:type': 'website', 'og:locale': 'en_LK', 'og:site_name': business.name,
            'og:title': title, 'og:description': description, 'og:url': `${siteUrl}/`,
            'og:image': `${siteUrl}${socialImage}`,
            'og:image:alt': business.imagery.photos.hero.alt,
          }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
          ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': title,
            'twitter:description': description, 'twitter:image': `${siteUrl}${socialImage}`,
          }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
          {
            tag: 'script', attrs: { type: 'application/ld+json' },
            children: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'Bakery',
              name: business.name, url: siteUrl, telephone: business.phoneHref.slice(4),
              address: { '@type': 'PostalAddress', ...business.structuredAddress },
              hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name}, ${business.address}`)}`,
            }).replaceAll('<', '\\u003c'),
          },
        ];
      },
    },
  ],
});
