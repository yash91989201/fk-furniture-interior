#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
public_dir="$repo_root/apps/web/.output/public"
archive="$repo_root/apps/web/.output/fk-furniture-interior-milesweb.zip"

package_site() (
  cd -- "$repo_root"
  bun install --frozen-lockfile
  bun run --cwd apps/web build
  if [[ ! -s "$public_dir/index.html" || ! -f "$public_dir/.htaccess" ]]; then
    printf 'The build is missing index.html or .htaccess.\n' >&2
    exit 1
  fi

  rm -f -- "$archive"
  cd -- "$public_dir"
  zip -qr "$archive" .
  printf 'Created %s\n' "$archive"
)

publish() (
  set -euo pipefail
  web_root=${1:-"$HOME/public_html"}
  if [[ $web_root != /* || ! -d $web_root || ! -w $web_root ||
        $web_root -ef / || $web_root -ef "$HOME" ]]; then
    printf 'Invalid or unwritable document root: %s\n' "$web_root" >&2
    exit 1
  fi

  staging_dir=$(mktemp -d -- "$HOME/.fk-site-deploy.XXXXXXXX")
  trap 'rm -rf -- "$staging_dir"' EXIT
  cat > "$staging_dir/site.zip"
  unzip -q "$staging_dir/site.zip" -d "$staging_dir/public"
  if [[ ! -s "$staging_dir/public/index.html" || ! -f "$staging_dir/public/.htaccess" ]]; then
    printf 'The ZIP is missing index.html or .htaccess.\n' >&2
    exit 1
  fi

  excludes=(--exclude='/.well-known')
  if [[ -e "$web_root/.htaccess" || -L "$web_root/.htaccess" ]]; then
    excludes+=(--exclude='/.htaccess')
  fi
  rsync -r --checksum --delay-updates --chmod=D755,F644 "${excludes[@]}" \
    "$staging_dir/public/" "$web_root/"
  printf 'Published static files to %s\n' "$web_root"
)

shell_quote() {
  printf "'%s'" "${1//\'/\'\\\'\'}"
}

deploy_site() (
  : "${DEPLOY_HOST:?Set DEPLOY_HOST}" "${DEPLOY_USER:?Set DEPLOY_USER}"
  : "${DEPLOY_SSH_KEY:?Set DEPLOY_SSH_KEY}" "${DEPLOY_KNOWN_HOSTS:?Set DEPLOY_KNOWN_HOSTS}"
  if [[ ! -s $archive ]]; then
    printf 'Run scripts/deploy-milesweb.sh package to create the deployment ZIP.\n' >&2
    exit 1
  fi

  umask 077
  ssh_dir=$(mktemp -d)
  trap 'rm -rf -- "$ssh_dir"' EXIT
  printf '%s\n' "$DEPLOY_SSH_KEY" > "$ssh_dir/key"
  printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$ssh_dir/known_hosts"
  unset DEPLOY_SSH_KEY DEPLOY_KNOWN_HOSTS

  remote_script=$(declare -f publish)$'\npublish "$@"'
  remote_command="bash -c $(shell_quote "$remote_script") bash $(shell_quote "${DEPLOY_PATH:-}")"
  ssh -F /dev/null -T -p "${DEPLOY_PORT:-22}" -l "$DEPLOY_USER" -i "$ssh_dir/key" \
    -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes \
    -o "UserKnownHostsFile=$ssh_dir/known_hosts" -o GlobalKnownHostsFile=/dev/null \
    -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=3 \
    -- "$DEPLOY_HOST" "$remote_command" < "$archive"
)

case ${1:-} in
  package) package_site ;;
  deploy) deploy_site ;;
  *) printf 'Usage: %s {package|deploy}\n' "$0" >&2; exit 2 ;;
esac
