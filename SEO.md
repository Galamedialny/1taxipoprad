# SEO — 1 Taxi Poprad

Implemented: 52 static localized pages (13 languages × 4 pages), localized titles/descriptions, one canonical per page, reciprocal hreflang including x-default, language-specific URLs, localized content available without JS, JSON-LD LocalBusiness/TaxiService/WebSite/WebPage/BreadcrumbList, Open Graph, Twitter large cards, four 1200×630 JPEG sharing cards, favicon/app icons, manifest, image dimensions, lazy gallery images, and sitemap with all languages and vehicle image URLs.

Production origin: https://1taxipoprad.sk . Existing root .html addresses are retained. Duplicate index.html addresses redirect permanently to directory roots.

The uploaded logo assets/logo.png is unchanged. OG layouts composite this original artwork without redrawing it. Prices and ratings have not been invented; schema contains no fabricated review ratings or fixed-price offers.

## Preview / launch

Current deployment intentionally has noindex,nofollow in HTML, X-Robots-Tag noindex and robots.txt Disallow. DNS and current public website are unchanged. Final-domain OG images and sitemap become available on the new site only after launch. Social bots cannot preview a Vercel deployment protected by authentication.

After Martin approves launch: regenerate with python scripts/build_seo.py --live (development dependencies in scripts/requirements.txt), verify canonical origin, commit generated output, deploy, connect final domain and change DNS only when authorized. Check root and all localized URLs, images, redirects, robots and sitemap on the final domain. Then submit https://1taxipoprad.sk/sitemap.xml through the verified Search Console property. Search Console submission is not yet performed.

For later content edits change seo-source/*.html and translations.js, then regenerate all pages. Do not run the generator against generated pages as templates.
