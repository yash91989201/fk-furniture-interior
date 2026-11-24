# Deploy FK Furniture & Interior on MilesWeb

The TanStack Start build generates HTML, CSS, JavaScript, and public assets. MilesWeb serves these files through the domain's cPanel document root. The deployed site requires no Node app or database.

## Build the public site

Use the Bun version pinned in the root `package.json` and run these commands from the repository root.

```bash
bun install --frozen-lockfile
bun run --cwd apps/web build
```

The public artifact is `apps/web/.output/public/`. It includes the homepage, route directories such as `about/index.html`, project detail pages, and assets.

## Publish to the domain

1. Open **Domains** in cPanel and verify the document root for the target hostname. The primary domain often uses `public_html`. A preview hostname can have a different path.
2. Back up any existing site files. Upload the contents of `apps/web/.output/public/` to the document root so `index.html` is at its top level. Leave host-managed files and other sites in place.
3. Enable HTTPS for the hostname. Verify the homepage, a direct project detail URL, and the gallery. Check that missing pages return HTTP 404 and that the contact form opens an email draft.

For push-to-main automation, run the same build in GitHub Actions and publish the same artifact over SSH to the verified document root. Test the first upload on the preview hostname. Keep a previous release available for rollback.

[cPanel domain documentation](https://docs.cpanel.net/cpanel/domains/domains/)
