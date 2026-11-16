import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { business, whatsappUrl, directionsUrl } from '../src/data/business.js';

// Validate editable content and outgoing customer journeys before a build.
assert.equal(business.products.length, 3, 'The supplied brief lists three products.');
assert.equal(new Set(business.products.map((product) => product.id)).size, business.products.length, 'Product IDs must be unique.');
assert.match(business.phoneHref, /^tel:\+\d{10,15}$/);
const number = business.phoneHref.replace('tel:+', '');
assert.equal(new URL(business.whatsapp).pathname, `/${number}`, 'Phone and WhatsApp must point to the same number.');
for (const product of business.products) {
  const enquiry = new URL(whatsappUrl(product.name));
  assert.equal(enquiry.hostname, 'wa.me');
  assert.ok(enquiry.searchParams.get('text').includes(product.name), 'Each enquiry must name its product.');
  assert.ok(enquiry.searchParams.get('text').includes('prices'), 'Enquiries should request current prices.');
  assert.ok(business.imagery.photos[product.image], `Missing photo config for ${product.name}.`);
  assert.ok(!('price' in product) && !('inStock' in product), 'Do not invent prices or stock availability.');
}
const maps = new URL(directionsUrl());
assert.equal(maps.hostname, 'www.google.com');
assert.equal(maps.searchParams.get('query'), `${business.name}, ${business.address}`);
assert.ok(!maps.searchParams.has('destination'), 'Use a business search without guessed coordinates.');
assert.ok(business.rating.count > 0 && business.rating.value <= 5);
assert.ok(business.reviews.every((review) => review.name && review.text));
for (const photo of Object.values(business.imagery.photos)) {
  assert.match(photo.alt, /[Ii]llustrative/);
  await access(`public${photo.src}`);
  await access(`public${photo.src.replace('.webp', '-640.webp')}`);
}
await access(`public${business.seo.socialImage}`);
for (const file of ['cormorant-latin.woff2', 'cormorant-italic-latin.woff2', 'dm-sans-latin.woff2']) await access(`public/fonts/${file}`);
const app = await readFile('src/App.jsx', 'utf8');
for (const { id } of business.navigation) assert.ok(app.includes(`id="${id}"`), `Missing navigation target: ${id}`);
assert.ok(business.imagery.disclosure.includes('not actual bakery products'));
console.log('Content, enquiry URLs, phone, directions, navigation targets, and local assets passed.');
