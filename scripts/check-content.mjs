import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { business, whatsappUrl, directionsUrl } from '../src/data/business.js';

// Validate editable content and outgoing customer journeys before a build.
assert.deepEqual(business.products.map((product) => product.name), ['Butter Cookies', 'Pineapple Cake', 'Cupcakes', 'Chocolate Cake', 'Butter Cake', 'Ribbon Cake'], 'Keep the requested display order.');
assert.equal(new Set(business.products.map((product) => product.id)).size, business.products.length, 'Product IDs must be unique.');
assert.match(business.phoneHref, /^tel:\+\d{10,15}$/);
const number = business.phoneHref.replace('tel:+', '');
assert.equal(new URL(business.whatsapp).pathname, `/${number}`, 'Phone and WhatsApp must point to the same number.');
for (const product of business.products) {
  const enquiry = new URL(whatsappUrl(product.name));
  assert.equal(enquiry.hostname, 'wa.me');
  assert.equal(enquiry.searchParams.get('text'), `Hello! I’m interested in your ${product.name}. Could you please share the price, available sizes or quantities, and availability?`);
  assert.equal(enquiry.pathname, '/94724009414');
  assert.ok(product.photo.alt && !product.photo.alt.includes('Illustrative'), 'Actual products need descriptive photo alternatives.');
  const full = await sharp(`public${product.photo.src}`).metadata();
  const small = await sharp(`public${product.photo.smallSrc}`).metadata();
  assert.equal(full.width, product.photo.width);
  assert.equal(full.height, product.photo.height);
  assert.equal(small.width, product.photo.smallWidth);
  assert.ok(full.width <= 388 && full.height <= 504, 'Limit display files to a gentle 2× enlargement.');
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
const originals = JSON.parse(await readFile('assets/product-photos/sources.json', 'utf8'));
assert.equal(originals.images.length, 6);
for (const photo of originals.images) assert.equal(createHash('sha256').update(await readFile(photo.original)).digest('hex'), photo.sha256, 'Original photos must remain unchanged.');
const app = await readFile('src/App.jsx', 'utf8') + await readFile('src/components/Treats.jsx', 'utf8');
for (const { id } of business.navigation) assert.ok(app.includes(`id="${id}"`), `Missing navigation target: ${id}`);
assert.ok(business.imagery.disclosure.includes('Photos of our bakery'));
console.log('Six real product photos, untouched originals, exact enquiry messages, image dimensions, and site links passed.');
