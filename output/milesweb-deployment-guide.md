# Deploy FK Furniture & Interior on MilesWeb

The TanStack Start build generates HTML, CSS, JavaScript, and public assets. MilesWeb serves these files through the domain's cPanel document root. The deployed site requires no Node app or database.

## Build the public site

Use the Bun version pinned in the root `package.json` and run these commands from the repository root.

```bash
bun install --frozen-lockfile
bun run --cwd apps/web build
```

The public artifact is `apps/web/.output/public/`. It includes the homepage, route directories such as `about/index.html`, project detail pages, assets, and generated `sitemap.xml`, `robots.txt`, and `404.html` files. The SEO metadata and sitemap use the approved production origin `https://fkfurnitureinterior.com`.

## Automatic deployment from GitHub

The [Deploy static site workflow](../.github/workflows/deploy.yml) runs on pushes to `main`. It builds and zips the static site, uploads the ZIP over SSH, and extracts it in a temporary directory under the hosting account's home directory. It then copies the files into the domain's document root. The hosting account needs Bash, `unzip`, `rsync`, and write access to that directory.

1. In cPanel **Domains**, confirm the site's document root. Back up the current site and confirm the existing `.htaccess` includes the site's 404 rules. The workflow keeps any existing `.htaccess` and copies the generated one if the document root has none.
2. Generate a dedicated deployment key locally with `ssh-keygen -t ed25519 -N '' -f ~/.ssh/fk-furniture-deploy`. Import the `.pub` file in cPanel **SSH Access → Manage SSH Keys** and authorize it. Keep the private key local until you add it to GitHub as a secret. [cPanel SSH Access documentation](https://docs.cpanel.net/cpanel/security/ssh-access/)
3. In GitHub **Settings → Secrets and variables → Actions**, add the values below. Use the hosting server's SSH endpoint from cPanel or MilesWeb. [GitHub Actions secrets documentation](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)

| Kind | Name | Value |
| --- | --- | --- |
| Variable | `DEPLOY_HOST` | MilesWeb SSH hostname or IP address. |
| Variable | `DEPLOY_USER` | Hosting account SSH username. |
| Variable | `DEPLOY_PORT` | Hosting SSH port. Optional if it uses `22`. |
| Variable | `DEPLOY_PATH` | Absolute cPanel document root. Optional if it is `$HOME/public_html` on the host. |
| Secret | `DEPLOY_SSH_KEY` | Full contents of the dedicated private key, including its header and footer. |
| Secret | `DEPLOY_KNOWN_HOSTS` | Verified OpenSSH `known_hosts` entries for the endpoint and port. |

For `DEPLOY_KNOWN_HOSTS`, get the entry with `ssh-keyscan -p PORT HOST > /tmp/fk-milesweb-known-hosts` and display its fingerprint with `ssh-keygen -lf /tmp/fk-milesweb-known-hosts`. Compare the fingerprint with the one supplied by MilesWeb or a previously trusted SSH connection before copying the matching entry into the secret.

Push to `main` or select **Run workflow** on `main` in GitHub Actions. After the deploy succeeds, check the homepage and a direct route. Deploys overwrite site files present in the ZIP. They preserve `.well-known` and leave files omitted from the ZIP in place, so remove retired pages manually.

For a local ZIP, run `bash scripts/deploy-milesweb.sh package`. It writes `apps/web/.output/fk-furniture-interior-milesweb.zip` with `index.html` and `.htaccess` at the archive root.

## Staging and branch promotion

1. Develop on `dev`. Pushes to `dev` have no deployment trigger.
2. Merge `dev` into `staging` when changes are ready for preview. The [staging workflow](../.github/workflows/deploy-staging.yml) deploys each push to `staging` to [the MilesWeb preview site](https://fkfurniture-preview.herositepro.com).
3. Verify the preview, then merge `staging` into `main` to deploy to production.

The `staging` GitHub environment allows deployments from the `staging` branch. It uses a dedicated SSH key for the preview account and the same deployment script as production. Configure the variables and secrets listed above under the `staging` environment with a `STAGING_` prefix, for example `STAGING_DEPLOY_HOST` and `STAGING_DEPLOY_SSH_KEY`. The preview account uses SSH port `22` and `$HOME/public_html`.

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
