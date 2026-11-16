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
  assert.equal((html.match(/loading="lazy"/g) || []).length, 4, 'Product and about photographs should lazy-load.');
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
