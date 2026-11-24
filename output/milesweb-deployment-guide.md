# Deploy FK Furniture & Interior on MilesWeb

The TanStack Start build generates HTML, CSS, JavaScript, and public assets. MilesWeb serves these files through the domain's cPanel document root. The deployed site requires no Node app or database.

## Build the public site

Use the Bun version pinned in the root `package.json` and run these commands from the repository root.

```bash
bun install --frozen-lockfile
bun run --cwd apps/web build
```

The public artifact is `apps/web/.output/public/`. It includes the homepage, route directories such as `about/index.html`, project detail pages, assets, and generated `sitemap.xml`, `robots.txt`, and `404.html` files. The SEO metadata and sitemap use the approved production origin `https://fkfurnitureinterior.com`.

## Publish to the domain

1. Open **Domains** in cPanel and verify the document root for the target hostname. The primary domain often uses `public_html`. A preview hostname can have a different path.
2. Back up any existing site files. Upload the contents of `apps/web/.output/public/` to the document root so `index.html` is at its top level. Enable **Show Hidden Files** in File Manager to include `.htaccess`. If the document root already has an `.htaccess`, merge the generated error rules into it and keep the host’s existing rules. Leave other host-managed files and sites in place.
3. Enable HTTPS for the hostname. Verify the homepage, a direct project detail URL, and the gallery. Check that missing pages return HTTP 404 with the branded error page, that `robots.txt` links to the sitemap, and that the contact form opens an email draft. The draft legal pages carry `noindex` and stay out of the sitemap until approval.

## cPanel/Apache caching (preview first)

Deploy the rules below only after testing them on the preview hostname and confirming which response headers the live host already sends. Merge them into the live host configuration only if that preview check shows the headers are needed or missing. Do not add a catch-all rewrite to `index.html`: unknown paths must return HTTP 404.

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json application/manifest+json image/svg+xml application/xml text/xml text/plain
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/json "access plus 1 year"
  ExpiresByType application/manifest+json "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 week"
  ExpiresByType image/jpeg "access plus 1 week"
  ExpiresByType image/webp "access plus 1 week"
  ExpiresByType image/x-icon "access plus 1 week"
  ExpiresByType font/woff2 "access plus 1 week"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.html?$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
  <If "%{REQUEST_URI} =~ m#^/assets/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
  <FilesMatch "\.(?:png|jpe?g|gif|webp|avif|ico|svg|woff2?|ttf|otf|eot)$">
    Header set Cache-Control "public, max-age=604800, must-revalidate"
  </FilesMatch>
</IfModule>
```

Directory index routes such as `/about/` are served from `about/index.html`, so the HTML rule also covers them. Check the preview headers before and after the change:

```bash
curl -sSI -H 'Accept-Encoding: gzip' https://<preview-domain>/assets/<hashed-file>.css
curl -sSI https://<preview-domain>/about/
curl -sSI https://<preview-domain>/brand/logo-full.webp
```

Expected results: `Content-Encoding: gzip` and `Vary: Accept-Encoding` on compressed files; `Cache-Control: public, max-age=31536000, immutable` for `/assets/`; `Cache-Control: public, max-age=0, must-revalidate` for HTML; `Cache-Control: public, max-age=604800, must-revalidate` for public images and fonts. A missing path must return HTTP 404.

[cPanel domain documentation](https://docs.cpanel.net/cpanel/domains/domains/)
