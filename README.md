# Munasinghe Ceylon Biscuits & Cake

A responsive React + Tailwind CSS website for the bakery in Maggona. Built with Vite, reusable React components, self-hosted fonts, and optimized local images. Enquiries continue on WhatsApp; there is no checkout or payment system.

## Run locally

Use Node.js 22.12+ (or 20.19+) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`). On Windows PowerShell, use `npm.cmd` if your execution policy blocks `npm.ps1`.

## Build and preview

```sh
npm run check
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. The Sites identity is stored in `.openai/hosting.json`; preserve that ID when updating this Site. The initial hosted Site is private to its owner. Public access is a separate decision.

## Edit the bakery information

`src/data/business.js` is the source of truth for the business name, address, contact details, services, products, reviews, rating, imagery, and SEO metadata. Vite generates the HTML title, description, social tags, canonical URL, and Bakery structured data from this configuration. Rebuild after editing it. Update `seo.siteUrl` when changing domains.

The supplied business details are:

- Munasinghe Ceylon Biscuits & Cake, a bakery in Maggona, Sri Lanka.
- Susiri Niwasa, Elagawatta, Maggona, Sri Lanka.
- Phone: 072 400 9414. Telephone and WhatsApp: +94 72 400 9414.
- Takeaway and delivery.
- Butter Cookies, Pineapple Cake, and Cupcakes.
- Supplied Google listing rating: 5.0 / 5 from 6 reviews. The two provided excerpts are used verbatim. The rating is not fetched live.

No product prices, stock status, ingredients, delivery areas, hours, history, or additional products have been invented. The incomplete closing-time information is intentionally omitted.

## Confirm before a public launch

1. Confirm the business spelling, address, phone/WhatsApp destination, takeaway and delivery arrangements, and current product range with the bakery.
2. Verify the Google listing rating, count, reviewer attribution, and exact review excerpts. Adjust the configuration as the rating changes.
3. Replace the illustrative images with approved photographs of the bakery’s actual products. Confirm product appearance and photo usage permission. Until then, keep the visible disclosure and illustrative alt text.
4. Confirm the Maps business search finds the intended location. This site uses the supplied business name and address and does not guess coordinates or embed an unverified map.
5. Confirm the final domain in `seo.siteUrl`, preview the social sharing image, and review the site on the devices your customers use.

## Images and fonts

All four images were created for this project with the built-in image-generation tool. They are clearly identified as illustrative placeholders on the website, not actual product or premises photographs. No third-party stock photography is used.

- Original generated PNGs: `assets/originals/`.
- Full prompt set: `assets/IMAGE-PROMPTS.md`.
- Responsive WebP images and JPEG social sharing image: `public/images/`.
- Regenerate optimized files with `node scripts/prepare-assets.mjs` after replacing the original files. The script also copies local fonts from their npm packages.
- Font families: Cormorant Garamond and DM Sans, distributed under the SIL Open Font License. License files are included in `public/fonts/`.

When using actual bakery photos, also update the alt text, dimensions, disclosure, and credits in the configuration. No image in this site implies a confirmed recipe, ingredient list, or available decoration option.

## Structure

```text
src/data/business.js       Editable content and contact helpers
src/components/Header.jsx Sticky header and accessible mobile menu
src/components/ui.jsx     Brand, buttons, imagery, stars, and text links
src/App.jsx               Reusable page sections and scroll reveal
src/styles.css            Tailwind entry, theme, and responsive styling
scripts/check-content.mjs Content, asset, and link validation
scripts/check-render.mjs  Actual component markup and destination checks
scripts/prepare-assets.mjs Image optimization and font preparation
vite.config.js            Build configuration and generated metadata
```

Accessibility includes semantic landmarks, visible focus states, a skip link, descriptive image alternatives, reduced-motion support, Escape-to-close mobile navigation, and accessible link labels. Images below the hero lazy-load. Fonts and images are self-hosted, and no analytics, cookies, or external scripts are added.
