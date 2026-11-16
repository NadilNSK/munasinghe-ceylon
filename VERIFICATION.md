# Verification

The customer journey is: browse the bakery and its three treats → open a product-specific WhatsApp enquiry → confirm options, prices, availability, and takeaway or delivery with the bakery. Calls and directions are direct links; there is no order submission backend.

## Passed

- Production bundle builds successfully with React, Vite, and Tailwind.
- Local development page returns HTTP 200.
- Content validation confirms product-specific, URL-encoded WhatsApp messages, matching phone/WhatsApp destinations, a Maps business-name/address search, and local image/font assets.
- Actual React components render successfully in a server-side markup check: 14 unique targets, 38 valid links, one primary heading, exact supplied review excerpts, closed mobile navigation, responsive image markup, and lazy loading below the hero.
- Package audit: zero known vulnerabilities after updating the image-optimization dependency.
- Small text colors were checked against their section backgrounds and adjusted for contrast.
- Source review covers keyboard focus styling, Escape-to-close mobile navigation, reduced-motion handling, and reserved space beside the floating WhatsApp control.

## Verification limit

Interactive browser and visual viewport testing could not be completed. The browser connector was unavailable; the native computer-use service then stopped because it could not confidently determine Chrome’s current URL. No substitute browser-control path was used.

Before public launch, manually review 320 px, 390 px, 768 px, and desktop widths. Check menu open/close and Escape, keyboard navigation, reduced motion, scrolling, image crops, and all external destinations. Actual WhatsApp messages were not sent and no calls or orders were placed.
