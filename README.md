# Wysetech Technologies — MSP Portfolio Site

Next.js 14 marketing and managed-services portal with a built-in file-based CMS and Docker-ready production setup.

---

## Prerequisites (server)

| Tool | Min version |
|------|-------------|
| Docker | 24+ |
| Docker Compose | v2 (`docker compose`) |
| Git | any |

---

## Deployment (first time)

### 1. Clone the repo

```bash
git clone https://github.com/muneeebasad/wysetech.git
cd wysetech
```

### 2. Set your admin password

The admin CMS panel is protected by a password stored in an environment variable.
Create a `.env` file in the project root:

```bash
echo "ADMIN_PASSWORD=your-secure-password" > .env
```

> **Never commit `.env` to git.** It is listed in `.gitignore`.

### 3. Build and start

```bash
docker compose up -d --build
```

The site will be available at `http://<your-server-ip>:3000`.

### 4. (Optional) Put it behind a reverse proxy

If you want HTTPS and a domain name, point Nginx or Caddy at `localhost:3000`.

**Caddy example (`/etc/caddy/Caddyfile`):**
```
wysetech.com.pk {
    reverse_proxy localhost:3000
}
```

**Nginx example:**
```nginx
server {
    listen 80;
    server_name wysetech.com.pk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Updating the site (code changes)

```bash
git pull
docker compose up -d --build
```

The old container is replaced with zero manual steps. CMS content and uploaded photos are preserved via Docker volumes.

---

## CMS

Access the admin panel at `http://<your-server-ip>:3000/admin`.

Login with the password set in `ADMIN_PASSWORD`.

Editable sections:
- **Hero** — headline, stats, CTAs
- **Services** — service cards and tool lists
- **Pricing** — package tiers and features
- **Why Us** — value proposition cards
- **Team** — member profiles and photos
- **Company** — contact info, social links
- **Visibility** — show/hide any section site-wide

CMS changes are reflected on the next page load — **no restart or redeploy required**.

---

## Data persistence

Two directories are bind-mounted from the host into the container:

| Host path | Container path | Purpose |
|-----------|----------------|---------|
| `./content/` | `/app/content/` | CMS JSON files |
| `./public/team/` | `/app/public/team/` | Uploaded team photos |

These directories are created automatically on first run and survive container restarts and rebuilds.

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # or create manually: ADMIN_PASSWORD=anything
npm run dev
```

Site: `http://localhost:3000`  
Admin: `http://localhost:3000/admin`

### Useful PowerShell commands

```powershell
# Kill all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill process on port 3000 specifically
$pid = (netstat -ano | Select-String ":3000 .*LISTENING").ToString().Trim().Split()[-1]
Stop-Process -Id $pid -Force

# Kill and restart dev server
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force; Start-Sleep 1; npm run dev
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | Password for the `/admin` CMS panel |

---

## Tech stack

- **Framework:** Next.js 14 (App Router, standalone output)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** File-based (JSON in `/content/`), API routes handle writes
- **Auth:** Cookie-based session, middleware-protected admin routes
- **Container:** Docker + Docker Compose
