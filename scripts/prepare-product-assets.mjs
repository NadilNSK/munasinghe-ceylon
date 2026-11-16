import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

// These PNGs have already been retouched with the built-in image-editing tool.
// This script only creates optimized web versions, capped at twice the source size.
const products = ['butter-cookies', 'pineapple-cake', 'cupcakes', 'chocolate-cake', 'butter-cake', 'ribbon-cake'];
await mkdir('public/images/products', { recursive: true });
for (const product of products) {
  const input = `assets/product-photos/enhanced/${product}-enhanced.png`;
  const full = await sharp(input).resize({ width: 388, height: 504, fit: 'inside', withoutEnlargement: true }).webp({ quality: 90, effort: 6 }).toFile(`public/images/products/${product}-enhanced.webp`);
  await sharp(input).resize({ width: 194, height: 252, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(`public/images/products/${product}-enhanced-small.webp`);
  console.log(`${product}: ${full.width} × ${full.height}, ${full.size} bytes`);
}
