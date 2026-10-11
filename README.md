# Altalaya Legal

Public privacy policy and terms of use for the Altalaya mobile app.

## Pages

- `/` — home
- `/privacy` — Privacy Policy
- `/terms` — Terms of Use

Source markdown lives in `content/PRIVACY.md` and `content/TERMS.md`.

## APK download

Set URLs in `.env.local`:

```bash
cp .env.example .env.local
# edit NEXT_PUBLIC_APK_DRIVE_URL
# edit NEXT_PUBLIC_VIRUSTOTAL_URL
```

The home button opens a short notice (not on Play Store yet), then links to Drive + VirusTotal.

## PostHog

Set your project API key in `.env.local` (Project Settings → Project API Key):

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxx
# optional — defaults to EU Cloud
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Page views + custom events (`apk_menu_open`, `apk_download`, `virustotal_view`, `navigate`, `contact_email`, …) show up in PostHog → Activity / Insights. Leave the key empty to disable.

PostHog loads **only after** the visitor accepts the cookie banner (consent stored in `localStorage`). Reject = no PostHog init / no events.

## Dev

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
