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

## Dev

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
