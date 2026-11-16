import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { business } from '../src/data/business.js';

// Server-render the actual components without requiring a browser.
// This checks markup and destinations, not layout or interactive browser behaviour.
const vite = await createServer({ server: { middlewareMode: true, watch: null }, appType: 'custom' });
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(createElement(App));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Rendered IDs must be unique.');
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target), `Broken section link: #${target}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Use one primary heading.');
  assert.ok(html.includes('aria-controls="mobile-navigation"'));
  assert.ok(html.includes('aria-expanded="false"'), 'Mobile navigation should start closed.');
  assert.ok(/id="mobile-navigation"[^>]*hidden/.test(html), 'Closed mobile navigation must not expose focusable links.');
  for (const [, tag] of html.matchAll(/<(img\b[^>]+)>/g)) {
    assert.match(tag, /alt="[^"]+"/, 'All photographs need meaningful alternatives.');
    assert.match(tag, /width="\d+"/);
    assert.match(tag, /height="\d+"/);
    assert.match(tag, /srcSet="[^"]+"/);
  }
  assert.equal((html.match(/loading="eager"/g) || []).length, 1, 'Only the hero should load eagerly.');
  assert.equal((html.match(/loading="lazy"/g) || []).length, 7, 'Six product photographs and the about photograph should lazy-load.');
  const treats = html.match(/<section id="treats"[\s\S]+?<\/section>/)?.[0];
  assert.ok(treats);
  assert.equal((treats.match(/aria-haspopup="dialog"/g) || []).length, 6, 'Every product photograph should open the lightbox.');
  assert.equal((treats.match(/class="product-image-arrow"/g) || []).length, 6, 'Keep six independent WhatsApp arrow links.');
  for (const [, content] of treats.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.ok(!content.includes('<button'), 'Image buttons should not be nested in enquiry links.');
  for (let number = 1; number <= 6; number++) assert.ok(treats.includes(`aria-hidden="true">0${number}</span>`), 'Product badges must follow display order.');
  try {
    const { readFile } = await import('node:fs/promises');
    const baseline = await readFile('.sites-runtime/treats-before.html', 'utf8');
    const withoutTreats = (markup) => markup.replace(/<section id="treats"[\s\S]+?<\/section>/, '');
    assert.equal(withoutTreats(html), withoutTreats(baseline), 'Everything outside #treats must remain unchanged.');
    console.log('Rendered content outside #treats is byte-for-byte unchanged.');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  for (const review of business.reviews) assert.ok(html.includes(review.text), `Review wording changed: ${review.name}`);
  const allAnchors = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
  for (const anchor of allAnchors) {
    if (anchor.includes('target="_blank"')) assert.ok(anchor.includes('rel="noopener noreferrer"'));
    const href = anchor.match(/href="([^"]+)"/)?.[1];
    assert.ok(href && href !== '#', 'Every link needs a real destination.');
    if (href.startsWith('http')) assert.ok(['wa.me', 'www.google.com'].includes(new URL(href.replaceAll('&amp;', '&')).hostname));
  }
  assert.ok(html.includes(`© ${new Date().getFullYear()}`));
  console.log(`Rendered ${ids.length} unique targets and ${allAnchors.length} valid links. Heading, reviews, mobile markup, and image loading checks passed.`);
} finally {
  await vite.close();
}
