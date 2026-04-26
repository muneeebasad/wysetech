#!/bin/sh
set -e
# The content/ and public/team/ directories are bind-mounted from the host.
# Host files are owned by the Ubuntu user (UID 1000), but the app runs as
# nextjs (UID 1001). Fix ownership as root before dropping privileges.
chown -R nextjs:nodejs /app/content /app/public/team 2>/dev/null || true
exec su-exec nextjs node server.js
