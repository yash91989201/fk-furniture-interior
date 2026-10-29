# Deploy FK Furniture & Interior on MilesWeb Unlimited Node.js hosting

Researched and checked: 29 October 2026.

## Recommendation

Build this project locally with Bun, upload a prepared runtime package, install its runtime dependencies on MilesWeb, and register it with cPanel’s Node.js application manager. Start with a subdomain such as `preview.yourdomain.com` before moving the main domain.

This is a **conditional deployment path**, not a completed hosting deployment. The application builds and runs locally under Node, but the purchased account’s control panel, Passenger integration, PostgreSQL access, and resource enforcement have not been inspected.

The current checkout serves the Better-T-Stack starter homepage. Deploying it will publish that application, not the separate Editorial homepage prototype from earlier design work.

## 1. What your plan provides—and what needs confirmation

Your screenshot identifies **Unlimited**, with **one Node.js web app** and **50 GB NVMe storage**. “Unlimited websites” does not mean unlimited Node.js applications.

MilesWeb’s public [Node.js hosting page](https://www.milesweb.com/hosting/nodejs-hosting) matches those limits. It also advertises SSH/Git, SSL, 3 GB RAM, 3 CPU cores, 20 Mbps I/O, 700,000 inodes, 350 databases, and 75 MySQL user connections. Treat these as published plan ceilings, not dedicated Node resources or proof of your account’s enforced limits. Its displayed runtime list reaches Node 22.9.0; check the actual selector for available patched versions.

The database figures refer to MySQL. They do **not** establish that PostgreSQL is included. This project requires PostgreSQL.

Before configuring the application, check your welcome email and cPanel for:

- cPanel login and username; server hostname and SSH port.
- **Application Manager** or **Setup Node.js App**.
- A maintained Node 22 release, or another supported release you can test.
- Environment-variable controls, dependency installation, logs, and restart controls.
- PostgreSQL availability, or permission to connect to external PostgreSQL.

If anything is unclear, send this message to MilesWeb support yourself:

> I purchased Unlimited Node.js hosting with one Node.js app. I need to deploy a Bun-workspace project built locally with TanStack Start and Nitro 3. Its production entrypoint is `.output/server/index.mjs`. I can provide a CommonJS `app.js` that dynamically imports it, plus an ordinary npm runtime package.
>
> Please confirm: (1) whether my account uses Application Manager, CloudLinux Setup Node.js App, or another deployment interface; (2) the available patched Node versions, preferably Node 22; (3) whether Passenger supports this dynamic-import startup and Nitro’s HTTP listener, and any required port/socket configuration; (4) whether npm dependencies can be installed through the panel or SSH; (5) whether local PostgreSQL is included, or outbound PostgreSQL/TLS connections are allowed, including any IP restrictions; (6) the Node process memory/CPU/process limits and restart behavior; and (7) where application logs are available.

The steps below assume a cPanel/Passenger account. If support identifies a different service, use that service’s startup mechanism instead.

## 2. How MilesWeb’s documentation says to deploy

MilesWeb’s [cPanel Node.js guide](https://www.milesweb.com/hosting-faqs/how-to-host-a-node-js-application-with-cpanel/) uses this customer workflow:

1. Prepare application files in your account.
2. Open **Software → Application Manager → Register Application**.
3. Select the domain and application path, configure the app, and deploy it.
4. Use **Ensure Dependencies** for packages listed in `package.json`.
5. Add environment variables through the application editor.

The article also contains WHM/root installation instructions and an old Node 10 example. Those are provider administration examples; you should not run them on this shared account. Its plain JavaScript example does not explain this project’s build, PostgreSQL, or ESM integration. The following steps supply the project-specific adaptation.

## 3. Understand the project’s deployment requirements

| Repository component | Deployment consequence |
| --- | --- |
| Bun 1.4.4 workspaces, `catalog:` and `workspace:` dependencies | Install/build from the repository root using Bun. Do not run npm against the original root manifest. |
| `apps/web`: TanStack Start with Nitro `node-server` preset | Run a Node server; uploading only static assets is insufficient. |
| `apps/web/.output/server/index.mjs` | Generated production entrypoint. |
| `apps/web/.env.schema` and Varlock auto-loading | Ship the schema and install the Varlock runtime package. |
| Better Auth and Drizzle’s PostgreSQL driver | Supply a PostgreSQL URL and create the schema before testing accounts. |
| Separate `apps/docs` Astro app | Not included in this web-app deployment. |

The existing Dockerfile starts Node from `apps/web`, but copies the entire workspace. Shared Node hosting should not be assumed to support Docker. The package below avoids needing Bun, Nx, TypeScript, or Docker on the hosting account.

[Nitro’s official Node deployment guide](https://nitro.build/deploy/runtimes/node) documents the `.output/server/index.mjs` entrypoint and `PORT`/`HOST` settings. Although Nitro describes standalone output, **this project’s tested build still needs runtime dependencies outside `.output`**. Do not upload `.output` alone.

## 4. Prepare the domain and database

### Domain

1. Add your domain or preview subdomain in cPanel, if it is not already present.
2. Use the nameservers or server IP supplied for your account. Do not copy nameservers from an unrelated tutorial.
3. If keeping your existing DNS provider, point the intended web hostname to MilesWeb using the records support supplies. Preserve existing mail records.
4. Activate the included SSL certificate through the available cPanel SSL interface or MilesWeb support.
5. Confirm HTTPS works for the exact hostname you will use for authentication.

cPanel’s [SSL guide](https://docs.cpanel.net/knowledge-base/security/guide-to-ssl/) explains provider-enabled AutoSSL. Labels and available controls depend on your account.

### PostgreSQL

Use either PostgreSQL explicitly supplied by MilesWeb or an external PostgreSQL service reachable from the hosting account. A MySQL database cannot replace it without application changes.

Obtain a connection string such as:

```text
postgresql://USER:PASSWORD@DB_HOST:5432/DB_NAME
```

Use the database provider’s exact TLS and certificate settings. URL-encode special characters in credentials. Do not disable certificate verification to work around a connection failure. If the database restricts source IPs, obtain the hosting account’s outbound IP from support and allow it.

For a clean deployment, create a dedicated database and user. Back up any existing database before changing its schema.

## 5. Configure and build locally

Run these commands on your own computer:

```bash
cd /home/yash/Projects/fk-furniture-interior
bun --version
bun install --frozen-lockfile
git check-ignore apps/web/.env.production
```

Use Bun 1.4.4, matching `packageManager`. Confirm the environment file is ignored before storing credentials there. If it is not ignored, add an appropriate ignore rule first.

Create `apps/web/.env.production` locally:

```dotenv
NODE_ENV=production
BETTER_AUTH_SECRET=REPLACE_WITH_A_RANDOM_SECRET_AT_LEAST_32_CHARACTERS_LONG
BETTER_AUTH_URL=https://preview.yourdomain.com
DATABASE_URL=postgresql://USER:PASSWORD@DB_HOST:5432/DB_NAME
```

Generate the secret with:

```bash
openssl rand -hex 32
```

Keep that secret stable between deployments. Set `BETTER_AUTH_URL` to your chosen canonical HTTPS origin. The current authentication configuration trusts that origin; a different hostname is not automatically an equivalent login origin.

Build only the web application:

```bash
cd /home/yash/Projects/fk-furniture-interior/apps/web
NODE_ENV=production bun run build
```

Expected output includes `.output/server/index.mjs` and `.output/public/`. Do not use `bun run dev` or `vite preview` as the production hosting command.

## 6. Create the production database schema

This checkout has Drizzle schema definitions but no generated migration directory. A successful web build does not create database tables.

From your local repository, generate the initial migration, inspect the SQL, and apply it to the intended production database:

```bash
cd /home/yash/Projects/fk-furniture-interior
NODE_ENV=production bun run db:generate
```

Review the generated files under `packages/db/src/migrations/`. Check that the connection string points to the correct database, then run:

```bash
NODE_ENV=production bun run db:migrate
```

These commands use `packages/db/.env.schema`, which imports the web app’s database configuration. Keep that repository structure intact locally. Apply each migration once; do not run schema changes automatically whenever Passenger starts the app. For an existing populated database, establish its migration baseline before applying an initial migration.

If your database only permits access from MilesWeb, run migrations from an approved environment with access and the full repository/toolchain. Do not expect the small runtime package below to contain Drizzle’s migration tools.

## 7. Assemble a hosting package

Create a fresh release folder after every build. The following commands assume it does not already contain an older release:

```bash
cd /home/yash/Projects/fk-furniture-interior
mkdir -p output/milesweb-release
cp -R apps/web/.output output/milesweb-release/.output
cp apps/web/.env.schema output/milesweb-release/.env.schema
```

Create **a new** `output/milesweb-release/package.json`. This is a deployment-only manifest, not a replacement for the repository’s root manifest:

```json
{
  "name": "fk-furniture-runtime",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "pg": "8.23.0",
    "react": "19.3.1",
    "react-dom": "19.3.1",
    "varlock": "1.23.0"
  }
}
```

These versions match the inspected build and successful isolated smoke test. Recheck the runtime manifest after framework or dependency changes; it is not a guarantee that future features need no additional packages.

Create `output/milesweb-release/app.js`:

```js
process.chdir(__dirname);

import('./.output/server/index.mjs').catch((error) => {
  console.error(error);
  process.exit(1);
});
```

The deployment manifest makes this `app.js` CommonJS. The dynamic import loads Nitro’s ESM entrypoint. Setting the working directory lets Varlock find the adjacent `.env.schema`. Do not copy the original root `package.json`, whose module type and workspace dependencies differ.

This wrapper follows the approach in [CloudLinux’s official Passenger ESM workaround](https://cloudlinux.zendesk.com/hc/en-us/articles/6719280681884--ERR-REQUIRE-ESM-Must-use-import-to-load-ES-Module). It was tested under ordinary Node locally, **not under MilesWeb’s Passenger installation**. Support must confirm compatibility if it fails there.

Install dependencies locally to produce a lockfile, then archive the required files:

```bash
cd /home/yash/Projects/fk-furniture-interior/output/milesweb-release
npm install --omit=dev --no-audit --no-fund
zip -r ../fk-milesweb-release.zip .output .env.schema app.js package.json package-lock.json
```

The archive deliberately excludes `node_modules`, source credentials, the repository, and build tools. Install dependencies on the server rather than uploading local dependency binaries or workspace symlinks.

Your release archive should extract to:

```text
fk-furniture/
├── .output/
│   ├── public/
│   └── server/index.mjs
├── .env.schema
├── app.js
├── package.json
└── package-lock.json
```

Do not accidentally nest this entire tree inside another `milesweb-release` directory.

## 8. Upload and register the app

1. In cPanel File Manager, create an application folder outside the public document root, such as `/home/CPANEL_USER/apps/fk-furniture`.
2. Upload `output/fk-milesweb-release.zip` there and extract it.
3. Enable **Show Hidden Files** to verify `.output` and `.env.schema` exist.
4. Confirm `app.js` and `package.json` are directly inside the application folder.
5. Open **Application Manager → Register Application**, following MilesWeb’s documented interface. If your account instead shows **Setup Node.js App**, use its equivalent fields.

Use these settings where the panel exposes them:

| Setting | Value |
| --- | --- |
| Name | `fk-furniture` |
| Domain/application URL | `preview.yourdomain.com`, with base URL `/` |
| Application root/path | `/home/CPANEL_USER/apps/fk-furniture`, or the equivalent home-relative path requested by the field |
| Environment/mode | Production |
| Node version | A supported patched Node 22 release; tested locally with 22.23.4 |
| Startup file | `app.js` |
| Start command, only if the panel asks for one | `npm start` |

Application Manager may use the default `app.js` without showing a startup-file selector. Do not assume all the fields above appear in every cPanel interface.

Install dependencies with **Ensure Dependencies** or the panel’s npm-install control. With SSH, activate the Node environment using the **exact command shown by your panel**, then run:

```bash
cd /home/CPANEL_USER/apps/fk-furniture
node --version
npm ci --omit=dev --no-audit --no-fund
```

No build command is required on the host: the archive contains the local production build.

## 9. Set environment variables and deploy

In the application’s environment-variable editor, add:

| Name | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `BETTER_AUTH_SECRET` | The stable random secret from step 5 |
| `BETTER_AUTH_URL` | `https://preview.yourdomain.com` |
| `DATABASE_URL` | The real PostgreSQL connection string |

Keep `.env.schema` alongside `app.js`; it defines validation rules, not your secret values. Set values through the panel rather than including a credential file in the release ZIP.

Let the hosting integration supply its listener configuration. Do not expose port 3001 publicly or hard-code a development port. If support requires explicit `PORT`, `HOST`, or a socket setting, use its instructions. Nitro accepts port/host variables, but Passenger’s listener interception must be compatible with this Nitro build.

Save/deploy and restart through the panel. Do not leave `node app.js` running manually in an SSH session as your deployment method.

## 10. Verify the deployed application

Check in this order:

1. Open `https://preview.yourdomain.com/`; confirm the page renders.
2. Confirm JavaScript and CSS return HTTP 200 in browser developer tools.
3. Open `/login` directly and refresh it; SSR routes must work without a prior homepage visit.
4. Check the homepage API status becomes connected.
5. Open `/api/auth/get-session` while logged out. A normal empty session is expected, but this alone does not prove database connectivity.
6. Create a test account, sign out, and sign in. These actions verify database tables and writes.
7. Refresh the authenticated dashboard and verify the session persists.
8. Restart the app through the panel, then recheck rendering and sign-in.
9. Review application logs for database, environment-validation, or missing-module errors.

Once preview passes, move the application mapping to the final hostname. Update `BETTER_AUTH_URL`, rebuild for the final environment, upload the new release, and restart. Choose one canonical hostname and configure redirects for alternatives. With only one Node app slot, preview and production cannot be assumed to run as independent simultaneous apps.

## 11. Troubleshooting

| Symptom | Likely check |
| --- | --- |
| `workspace:` / `catalog:` installation error | Original monorepo manifest was uploaded. Use the separate runtime manifest. |
| `ERR_REQUIRE_ESM` | Verify CommonJS `app.js`, the deployment manifest, and the configured startup filename. Ask support to check Passenger compatibility. |
| `Unable to find varlock executable` | Install `varlock` using npm in the application root. `.output` alone was insufficient in testing. |
| Cannot find module `react` | Install the runtime dependencies; uploading only build output does not satisfy this build. |
| Environment validation fails | Check `.env.schema`, working directory, production mode, and all four required variables. |
| Static files work, HTML returns 500 | Inspect SSR logs; dependency resolution, environment validation, and server rendering can fail independently of static serving. |
| PostgreSQL timeout/refused connection | Check host/port, outbound access, source-IP allowlist, credentials, and TLS requirements. |
| Missing database table | Confirm migrations ran against the same database as the hosting `DATABASE_URL`. |
| Login fails on one hostname | Check the exact canonical `BETTER_AUTH_URL`, HTTPS, redirects, and cookie behavior. |
| HTTP 503 or app never starts | Check startup logs, Node selection, dependencies, Passenger listener compatibility, and resource limits. |
| Homepage shows the starter template | That is the current repository homepage. The Editorial prototype has not been integrated here. |

If the wrapper starts under plain Node but fails under Passenger, send support the sanitized error and the Nitro entrypoint details. The local result does not establish that the host’s process manager supports this build.

## 12. Updates, rollback, and optional Git deployment

For each update: build locally, create a fresh release, install any changed runtime dependencies on the host, apply reviewed database migrations, replace the application files, and restart. Keep the previous release and database backup. Replacing files while requests are running can briefly mix old and new chunks; use the panel’s stop/start controls for a simple maintenance deployment, or a support-approved atomic release switch.

Rollback means restoring the previous application release and restarting. Database migrations require a separate compatibility or restore plan; restoring JavaScript does not undo a database change.

MilesWeb’s [Git-to-cPanel guide](https://www.milesweb.com/hosting-faqs/how-to-automatically-deploy-from-github-git-to-cpanel/) describes `.cpanel.yml`, Git Version Control, and **Update from Remote → Deploy HEAD**. Its sample copies files; it does not build or restart a Node application. For this repository, Git automation would additionally need Bun workspace installation, the web build, release packaging, runtime dependency installation, environment configuration, and app restart. Establish a working manual deployment before adding that automation. Do not copy the full repository or secrets into `public_html` using the generic example.

## What was actually tested

- Inspected the current repository’s manifests, Vite/Nitro config, environment schemas, database configuration, authentication setup, and Dockerfile.
- Built `apps/web` successfully with Bun 1.4.4 and synthetic configuration. Build warnings were present; they did not stop the build.
- Started the production server with Node 26.12.1 from the web workspace. The home page, login page, and robots file returned HTTP 200.
- Copied `.output` and `.env.schema` into an isolated directory. It failed without the Varlock executable, then returned SSR errors without React.
- Added the runtime manifest and CommonJS wrapper shown above. Under **Node 22.23.4**, `/`, `/login`, `/robots.txt`, and `/api/auth/get-session` all returned HTTP 200.
- These checks used a synthetic database URL. They did **not** test migrations, live database queries, account creation, real credentials, TLS, or MilesWeb/Passenger.
- No hosting account was accessed, no DNS was changed, and no application source was modified for this guide.

## Sources

- [MilesWeb Node.js hosting plans](https://www.milesweb.com/hosting/nodejs-hosting)
- [MilesWeb: Host a Node.js Application with cPanel](https://www.milesweb.com/hosting-faqs/how-to-host-a-node-js-application-with-cpanel/) — dated 28 April 2026.
- [MilesWeb: Automatically Deploy from GitHub to cPanel](https://www.milesweb.com/hosting-faqs/how-to-automatically-deploy-from-github-git-to-cpanel/) — dated 26 June 2026.
- [Nitro: Node.js deployment](https://nitro.build/deploy/runtimes/node)
- [CloudLinux: Passenger ESM workaround](https://cloudlinux.zendesk.com/hc/en-us/articles/6719280681884--ERR-REQUIRE-ESM-Must-use-import-to-load-ES-Module)
- [cPanel: Guide to SSL](https://docs.cpanel.net/knowledge-base/security/guide-to-ssl/)
