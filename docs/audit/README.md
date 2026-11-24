# Performance, SEO and Accessibility Audit

- **Date:** 2026-11-24
- **Commit:** `250f7aa`
- **Scope:** all 10 prerendered routes, plus shared chrome, forms, image assets, fonts, build output and deployment config.
- **Tooling:** production build served locally, Lighthouse 13.6 (mobile, default simulated Slow 4G + 4× CPU), DOM/network inspection, source review.
- **No code changes were made as part of this audit.**

## Method

The dev server on port 3001 was not used for measurements: it does not serve the prerendered production build and would misreport bundle sizes, CSS payload and Core Web Vitals.

```bash
cd apps/web
bunx vite build
python3 -m http.server 4173 -d .output/public
CHROME_PATH=/usr/bin/google-chrome-stable bunx lighthouse \
  http://127.0.0.1:4173/ \
  --quiet --chrome-flags="--headless=new --no-sandbox" \
  --output=json --output-path=/tmp/lh/home.json \
  --only-categories=performance,accessibility,best-practices,seo
```

Lighthouse ran against each of:

`/`, `/about`, `/services`, `/projects`, `/projects/resort-de-coracao`, `/gallery`, `/faq`, `/contact`, `/privacy-policy`, `/terms-and-conditions`.

## Scores

| Page | Weight | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 1,979 KiB | 96 | 100 | 100 | 100 | 2.3 s | 0.001 | 10 ms |
| `/about` | 1,351 KiB | 72 | 100 | 96 | 100 | 8.1 s | 0 | 0 ms |
| `/services` | 1,205 KiB | 74 | 96 | 100 | 100 | 7.2 s | 0.001 | 0 ms |
| `/projects` | 1,182 KiB | 74 | 100 | 100 | 100 | 7.1 s | 0.018 | 0 ms |
| `/projects/resort-de-coracao` | 1,606 KiB | 74 | 100 | 100 | 100 | 8.3 s | 0.001 | 0 ms |
| `/gallery` | 1,540 KiB | 97 | 100 | 100 | 100 | 2.1 s | 0.002 | 0 ms |
| `/faq` | 1,316 KiB | 96 | 100 | 100 | 100 | 2.3 s | 0.001 | 0 ms |
| `/contact` | 1,208 KiB | 96 | 100 | 100 | 100 | 2.3 s | 0.01 | 0 ms |
| `/privacy-policy` | 894 KiB | 97 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| `/terms-and-conditions` | 905 KiB | 97 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |

LCP values are Lighthouse's simulated mobile values. Observed localhost LCP is 0.2–0.4 s. The simulation tracks total payload: 1.2–1.6 MB uncompressed is roughly 7–8 s at 1.6 Mbps.

The SEO score of 100 does **not** mean SEO is complete. Lighthouse checks crawlability, not canonical URLs, Open Graph, sitemaps or structured data. All four are missing.

## Verdict

The site is structurally sound:

- all routes are prerendered with full content;
- every page has one `h1` and a sequential heading outline;
- every image has `alt`, `width` and `height`;
- CLS is ≤ 0.018 and TBT is ≈ 0;
- JavaScript and CSS are route-split;
- reduced-motion handling exists;
- asset filenames are content-hashed.

The real problems are delivery weight, brand-image assets, missing SEO infrastructure, and a dead-end home enquiry form.

## P0 — fix first

| # | Issue | Evidence | Fix | Estimated saving |
|---|---|---|---|---|
| 1 | No compression and no cache policy on the Docker path | `apps/web/nginx.conf` has six lines: no `gzip`, no `Cache-Control`. CSS 190,989 B → 32,275 B gzip; JS 352,566 B → 112,227 B; HTML 62,966 B → 13,912 B | Add gzip and immutable caching for `/assets`. If the real target is cPanel, add equivalent `.htaccess` rules. Host config is unverified | ~480 KiB on home, ~250–350 KiB on other pages |
| 2 | 208 KiB of decorative logos preloaded on all 10 routes | `logo-mark.webp` is 130,380 B (729×694) displayed 44 px tall; `logo-wordmark.png` is 78,182 B (1441×138) displayed 144–192 px. Both have `alt=""` and both are in every prerendered `<head>` | Export an 88×84 mark and a 384×37 wordmark as WebP (~6 KiB total), replace the PNG wordmark, remove both preloads | ~202 KiB on every page |
| 3 | Hero and card images are 2000 px originals with missing variants | Home hero has no `srcSet`. Project hero uses `variants:false` and ships 215,206 B. Gallery `corridor.webp` is 177,640 B; `office-building.webp` is 146,626 B. About requests `corridor-1280.webp`, which returns **404** | Generate `-720` and `-1280` variants for `guest-bath`, `corridor`, `meeting` and `office-building`; enable `bandSrcSet`; add `sizes` and `srcSet` to the home hero | 90–215 KiB off the LCP path; fixes the 404 |
| 4 | Unnecessary image preloads compete with LCP | Home preloads `meeting.webp` (158,438 B, furniture autoplay backdrop) and the full `guest-bath.webp`. The footer `logo-full.webp` (214,562 B) loads on contact and FAQ | Preload only the true LCP asset; lazy-load furniture backdrops; downscale the footer logo to its displayed size | 150–210 KiB |
| 5 | SEO infrastructure is absent | 0/10 canonical, 0/10 Open Graph/Twitter, 0/10 JSON-LD. No `sitemap.xml`; robots has no `Sitemap:`; no `404.html`; client 404 renders `<div>Not Found</div>`; every `/about`-style link gets a 301 to `/about/` | Add per-route canonical and OG tags, `sitemap.xml`, robots directive, LocalBusiness/FAQPage/Breadcrumb JSON-LD, a branded 404, and `trailingSlash: "always"` | Rich results, share cards, no redirect hops |
| 6 | Home enquiry form is a dead end | `home/enquiry.tsx:41-48` only sets local feedback. The button text is **“Send enquiry · preview”**. Reused on `/`, `/about` and `/faq` | Wire `buildEnquiryMailto` like the contact form, or link to `/contact`. Remove “preview” | Conversions |
| 7 | Unapproved legal pages are indexable as drafts | Privacy hero says “Draft for business and legal review”; an unresolved instruction says “Draft commitment. Confirm who…”. Terms meta starts “Draft terms…” | Finalize the copy, or add `noindex` to both routes until sign-off. Rewrite the meta descriptions | Legal and brand risk |

## P1

| Issue | Evidence | Fix | Estimated saving |
|---|---|---|---|
| Every route loads 190,989 B of global CSS; 55–60 KiB is unused | `index.css` imports the 3,218-line `home.css`; it loads on privacy and terms too. Three render-blocking CSS requests | Split shared nav/footer/base rules from home-section rules; import home CSS only in `/` | ~60–100 KiB, ~1.3 s blocking |
| Main JS bundle is 352,566 B on every route; 148–166 KiB unused at load | Home adds 207,631 B and 109,678 B. Privacy still loads 386 KiB raw JS | The floor is React/TanStack. Remove Lenis, lazy-load Motion sections, defer the enquiry chunk | 100–200 KiB realistic |
| Fonts: 16 faces, 542,796 B shipped, 122,368 B loaded, no preload | Only three latin files are used. The heading font paints in fallback serif until the font fetch completes | Declare local `@font-face` rules pointing at the three latin files; preload the heading font on text-LCP pages; drop unused subsets | 420 KiB deployment, ~8 KiB CSS |
| Services step numbers fail contrast | `project-process.tsx:20` uses `text-primary` `#eaaa00` on `#dde3e8` = **1.58:1**; WCAG needs 4.5 | Use `text-foreground` (12.5:1) or dark gold `#7a5c00` (4.83:1) | WCAG AA |
| Gallery button accessible name mismatch | `gallery-grid.tsx:67` sets `aria-label`, which overrides the visible label; axe reports `label-content-name-mismatch` | Remove `aria-label`; add `sr-only` “Open full view” inside the button | WCAG 2.5.3 |
| Mobile menu cannot close with Escape | Native `<details>`; `closeMenu()` only runs on link click and `hashchange` | Add an Escape handler that closes the menu and focuses the summary | Keyboard UX |
| Contact and gallery forms leak PII when JavaScript is off | No `action` or `method`; native submit becomes `GET /contact?name=…&email=…` | Add a mailto fallback action, or block submit and show direct email/phone links | Privacy |
| Five meta descriptions exceed 160 characters | Home 188, services 219, FAQ 166, privacy 161, terms 179 | Trim to ~155 characters | SERP CTR |

## Page-specific notes

| Page | Notes |
|---|---|
| `/` | The glass layer renders a second `<img>` with the same 215 KiB source. Hero text entrance uses a 1.1 s `clip-path` animation. The process runway height is set only after hydration; CLS stayed 0, so this is low risk |
| `/about` | `corridor-1280.webp` 404 is the only console error. Factory-visit copy lands in the generic form with no “Factory visit” option. The team section shows a guest room, not a team |
| `/services` | The hero image is marked `fetchPriority=high` although it sits below the header copy. Meta description is 219 characters |
| `/projects` | Only one project exists. `<dl>` is nested inside `<span>` (invalid HTML). The project name is not a heading |
| `/projects/resort-de-coracao` | No lightbox for the gallery. No Project or Breadcrumb JSON-LD. The branded 404 only works on client-side navigation |
| `/gallery` | Four photos, all from the same property. Two of four have no `srcSet`. No per-item headings |
| `/faq` | Ten Q&As are prerendered but have no FAQPage schema. Question IDs are used only as React keys and never emitted to the DOM |
| `/contact` | Office column labels are `aria-hidden`, so Address and Telephone have no programmatic labels. No map embed, which is fine |
| `/privacy-policy` | Email and phone are plain text, not links. Draft copy remains |
| `/terms-and-conditions` | The skip link lands on the nine-link table of contents, not the first clause. Draft copy remains |

## Repairs

### Delivery (`apps/web/nginx.conf`)

```nginx
gzip on;
gzip_vary on;
gzip_comp_level 5;
gzip_min_length 1024;
gzip_types text/css application/javascript application/json application/manifest+json image/svg+xml application/xml;

location ~* ^/assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    try_files $uri =404;
}

location ~* \.html$ {
    add_header Cache-Control "public, max-age=0, must-revalidate" always;
}
```

For cPanel, add equivalent `mod_deflate` and `mod_expires` rules. Verify the live host with:

```bash
curl -sI -H 'Accept-Encoding: gzip, br' https://<domain>/assets/<file>.css
```

### Missing image variants

```bash
for img in guest-bath corridor meeting office-building; do
  cwebp -q 78 -resize 720 0 "apps/web/public/home/$img.webp" \
    -o "apps/web/public/home/$img-720.webp"
  cwebp -q 78 -resize 1280 0 "apps/web/public/home/$img.webp" \
    -o "apps/web/public/home/$img-1280.webp"
done
```

Then remove `variants:false` from the corresponding entries and add `srcSet`/`sizes` to the home hero.

### SEO head pattern

```ts
const SITE = "https://<real-domain>"; // required before canonical and sitemap work

head: () => ({
  meta: [
    { title: "…" },
    { name: "description", content: "… ≤155 characters" },
    { property: "og:title", content: "…" },
    { property: "og:description", content: "…" },
    { property: "og:image", content: `${SITE}/og/home.jpg` },
    { property: "og:url", content: `${SITE}/about/` },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: `${SITE}/about/` }],
})
```

- Sitemap: 10 URLs, trailing slash on directory routes.
- Schema: `FurnitureStore` in the root head (name, address, telephone, email, `foundingDate: 1986`, `areaServed: IN`), `FAQPage` from `faqGroups`, `BreadcrumbList` on the project detail route.
- 404: generate a `404.html` and configure the host to serve it without losing the 404 status code.
- Routing: enable `trailingSlash: "always"` so internal links match the canonical form and avoid 301 hops.

## Codebase findings

- **Stack:** TanStack Start 1.169, React 19, Vite 8, Nitro static preset, Tailwind CSS 4.
- **Prerender:** 10 routes, `failOnError: true`.
- **Splitting:** route-level JS and CSS split correctly. Sourcemaps are absent. Asset names are content-hashed, so immutable caching is safe.
- **Images:** centralized in `home/content.ts` and `project-images.ts`, which is the right seam for variants.
- **Dependencies:** no unused dependency found. `@base-ui/react`, lucide, Motion and Lenis are all used.
- **Deployment:** two paths exist. Docker/nginx has no compression or caching. MilesWeb/cPanel may handle that outside the repository and must be verified separately.
- **404:** `defaultNotFoundComponent` renders a bare `<div>Not Found</div>`; no static `404.html` is generated.

## Not measured / risks

- No CrUX or field data; the origin is not deployed. INP was not measured, but TBT ≈ 0 suggests it is healthy.
- cPanel Apache compression and cache behavior could not be tested from the repository. Only the Docker nginx config was measured.
- LCP savings are model estimates. Re-run Lighthouse after deployment.
- Canonical URLs, Open Graph and the sitemap need the production domain. No domain appears in the repository or brief.
- No fixes were implemented. The largest launch risks are 7–8 s simulated LCP on four pages and the missing canonical/sitemap/Open Graph infrastructure.
