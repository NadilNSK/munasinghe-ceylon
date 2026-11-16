import { copyFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

await Promise.all(['public/images', 'public/fonts'].map((directory) => mkdir(directory, { recursive: true })));

await Promise.all(['hero', 'cookies', 'pineapple', 'cupcakes'].map(async (name) => {
  const source = `assets/originals/${name}.png`;
  const width = name === 'hero' ? 1536 : 1024;
  await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(`public/images/${name}.webp`);
  await sharp(source).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(`public/images/${name}-640.webp`);
}));
await sharp('assets/originals/hero.png').resize(1200, 800, { fit: 'inside' }).jpeg({ quality: 85, mozjpeg: true }).toFile('public/images/hero-social.jpg');

const fonts = [
  ['cormorant-garamond', 'cormorant-garamond-latin-wght-normal.woff2', 'cormorant-latin.woff2'],
  ['cormorant-garamond', 'cormorant-garamond-latin-wght-italic.woff2', 'cormorant-italic-latin.woff2'],
  ['dm-sans', 'dm-sans-latin-wght-normal.woff2', 'dm-sans-latin.woff2'],
];
for (const [family, filename, destination] of fonts) {
  await copyFile(`node_modules/@fontsource-variable/${family}/files/${filename}`, `public/fonts/${destination}`);
}
for (const family of ['cormorant-garamond', 'dm-sans']) {
  await copyFile(`node_modules/@fontsource-variable/${family}/LICENSE`, `public/fonts/${family}-LICENSE.txt`);
}
console.log('Prepared responsive WebP images, sharing image, and self-hosted fonts.');
