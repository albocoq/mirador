# Altalaya Privacy Policy

**Last updated:** 21 September 2026

Altalaya (“we”, “us”, “the app”) is a community map of viewpoints (miradors). This policy explains what data we collect, why we collect it, and how you can control it.

**Our principle:** we do not sell your data. We do not invent fake statistics. We only use your information to run the app and keep the community safe.

---

## 1. Who this applies to

This policy covers:

- The Altalaya mobile app (iOS and Android) and the related backend services we operate
- This public website (legal pages, APK download links, and related web pages we operate for Altalaya)

If you do not agree with this policy, please do not use the app or the website.

---

## 2. Data we collect

### Account information

When you create an account (email or Google sign-in), we may store:

- Email address
- Display name and username
- Profile photo (if you add one)
- Bio (if you add one)
- Authentication identifiers provided by our auth provider (Supabase / Google)
- Early Founder status (`is_founder`) if you voluntarily support the project via our payment link

### Content you create (UGC)

When you add a spot, photo, or text, we store:

- Spot title, description, and tags
- Photos you upload (selected from your device photo library)
- Location of the spot you choose to publish (coordinates and place info you provide)
- Timestamps and authorship so others can see who shared what

Before upload, photos may be **resized and compressed on your device** (client-side) to reduce size and bandwidth. We do not use your photo library for anything other than the media you explicitly choose to upload.

You can delete your own content at any time from the app. Deleting content removes it from public view; backups may keep residual copies for a short period for security and recovery.

### Saved spots

If you save (bookmark) a mirador, we store that association on your account so your “Guardados” list syncs across sessions. Saved lists are private to your account unless you later publish related content.

### Location of your device

We request **location only while you use the app** (foreground / “when in use”).

We use it strictly to:

- Center the map on your current area
- Calculate sun azimuth / golden-hour helpers for the map

We may **cache the last known location on the device** (secure local storage) so the map can reopen faster. This cache stays on your device and is not sold or used for advertising.

We do **not**:

- Track your location in the background
- Continuously log your movements to our servers
- Sell or share your live position with advertisers

You can refuse or revoke location permission in your device settings. The app will still work, but map centering and sun helpers may be limited.

### On-device preferences and session

Stored locally on your device (e.g. Expo SecureStore), not sold:

- Auth session tokens needed to keep you signed in
- Map type preference (standard / satellite / terrain)
- Last known location cache (see above)

### Technical and usage data

To keep the service reliable and secure, we may process:

- Device type, OS version, and app version
- Crash / error logs
- Basic network connectivity status (e.g. offline banner)
- Session tokens needed to keep you signed in

### Feedback you send

If you use “Enviar comentarios” in Settings, your device opens your email client. Whatever you write and send is processed as ordinary email correspondence. We do not silently scrape your mailbox.

### Maps

Map tiles and related map services are provided by Google Maps (via `react-native-maps`). When the map loads, Google may receive technical data according to [Google’s privacy policy](https://policies.google.com/privacy). We do not control Google’s independent processing.

### This website — cookies and analytics

This website is separate from the mobile app. On the website we may use:

- **Strictly necessary storage** — for example remembering your analytics cookie choice in your browser (`localStorage`). This is required to respect your decision and does not track you across sites.
- **Google Analytics 4 (GA4)** — **only if you accept** via the cookie banner. If you reject (or before you choose), we do **not** load Google Analytics scripts and we do **not** send analytics events.

When analytics is accepted, Google may process data such as:

- Pages viewed and approximate navigation paths on this site
- Events we configure (for example opening the APK download menu, clicking the Drive or VirusTotal links, navigating to Privacy/Terms, or contacting us)
- Approximate location derived from IP (country / region level), device / browser technical info, and referral source
- Online identifiers (including cookie or similar client identifiers used by Google Analytics)

**Purpose:** understand how visitors use this website (traffic, engagement, which links are useful) so we can improve it. We do **not** use Google Analytics on this site for personalized advertising.

**Legal basis (EU/EEA/UK where applicable):** consent. You can withdraw consent at any time via **Cookie settings** in the website footer (or by clearing site data in your browser). Withdrawal does not affect the lawfulness of processing before withdrawal.

**Retention:** Google Analytics retention follows the retention setting configured in our GA4 property (typically measured in months). Our consent choice is stored locally in your browser until you change or clear it.

**International transfers:** Google may process analytics data on servers outside the EU/EEA (including the United States). Google’s processing is described in [Google’s privacy policy](https://policies.google.com/privacy) and Google Analytics terms. Where required, such transfers rely on appropriate safeguards offered by Google (for example Standard Contractual Clauses).

**Your choices:** Accept or Reject in the banner; change later via Cookie settings; also use browser controls / opt-out extensions. Blocking analytics will not break core access to Privacy, Terms, or download links.

### Voluntary support (Early Founder)

Optional support payments are processed by **Stripe** on Stripe’s hosted checkout. Stripe handles payment card data under its own privacy policy. We may receive confirmation that a payment succeeded and store a founder badge flag on your profile. We do not store full card numbers in Altalaya.

---

## 3. How we use your data

We use your data to:

- Authenticate you and maintain your account
- Show the community map, your profile, and your saved spots
- Host photos and spot information you publish
- Calculate on-device / in-app solar helpers from location
- Apply Early Founder status when you support the project
- Moderate harmful or illegal content
- Fix bugs and improve reliability
- Comply with law when required

We do **not** use your data for targeted advertising resale, and we do not sell personal data.

---

## 4. Where data is stored and who processes it

We use **Supabase** for authentication, database storage, and photo hosting. Data is processed on Supabase infrastructure under their terms and security practices.

We may also rely on:

- **Google** — Google sign-in and Google Maps (app); Google Analytics 4 on this website **only with your consent**
- **Stripe** — optional Early Founder support payments
- **Apple / Google** — app distribution, crash reporting, and store services, as configured by those platforms
- **Website hosting** — our web host (for example Vercel) may process technical connection logs (IP, user-agent, timestamps) as part of serving the site and securing infrastructure

These providers process data only as needed to provide their services to us.

OAuth sign-in may return to the app via deep links (e.g. custom URL schemes such as `altalaya://`). Those redirects carry auth tokens only as needed to complete login.

---

## 5. Sharing

We share personal data only when:

- You publish content that is meant to be public (spots, photos, profile fields you choose to show)
- A service provider needs it to run Altalaya (e.g. Supabase hosting, Stripe for voluntary payments)
- The law requires it (valid legal request)
- Needed to protect users, the public, or the integrity of the service (fraud, abuse, safety)

We do **not** sell your personal information.

---

## 6. Retention and account deletion

- Account data: kept while your account is active
- Public spots / photos: kept until you delete them, or until we remove them for policy violations
- Saved-spot associations: kept until you unsaved them or delete your account
- Auth sessions / tokens: kept until you sign out or they expire
- Logs: kept only as long as reasonably needed for security and debugging

**In-app account deletion:** from Settings you can permanently delete your account. That process removes your profile, your spots, associated photos in storage (best effort), and signs you out. Residual backups may exist briefly for security and recovery. Some records may be retained where required for legal, security, or dispute reasons.

You can also email us (see below) to request deletion or other data rights.

---

## 7. Your choices and rights

Depending on where you live (for example EU/EEA, UK, California), you may have rights to:

- Access your personal data
- Correct inaccurate data
- Delete your data
- Export data you provided
- Object to or restrict certain processing
- Withdraw consent (e.g. location or photo-library permission, or website analytics cookies)

In the app you can already:

- Edit your profile (including avatar from the photo library)
- Delete spots and photos you uploaded
- Save / unsave spots
- Sign out
- Delete your account from Settings
- Revoke location or media permissions in system settings

On this website you can:

- Accept or reject Google Analytics via the cookie banner
- Change that choice anytime via **Cookie settings** in the footer
- Read this Privacy Policy and the Terms of Use without accepting analytics

To exercise other rights, email us at the contact address below. We may need to verify your identity first.

---

## 8. Children

Altalaya is not directed at children under 13 (or the minimum age required in your country). We do not knowingly collect personal data from children. If you believe a child has created an account, contact us and we will take appropriate action.

---

## 9. Security

We use industry-standard protections provided by our hosting and auth stack (encrypted transport, access controls, authenticated APIs, secure on-device session storage where available). No method of transmission or storage is 100% secure. Please use a strong password and protect your device.

---

## 10. Nature and outdoor responsibility (data context)

Altalaya helps people discover real places in nature. Publishing a spot does not grant permission to enter private land, ignore local rules, or harm the environment. Location data you share about places should be accurate and respectful. See our Terms of Use for conduct rules at real-world sites.

---

## 11. Changes

We may update this policy. When we do, we will change the “Last updated” date and, when appropriate, notify you in the app or by other reasonable means. Continued use after an update means you accept the revised policy.

Full documents are also mirrored in the project as `PRIVACY.md` / `TERMS.md` and linked from Settings → Legal once public Notion (or web) URLs are published for App Store and Google Play.

---

## 12. Contact

Questions about privacy or data requests:

**Email:** privacy@altalaya.app  
**App:** Altalaya  
**In-app:** Profile → Privacidad y Términos, and Settings → Legal

Replace the email above with your real contact address before store submission if different.

---

*This document is provided to help you ship transparently. It is not formal legal advice for every jurisdiction. Have a qualified lawyer review it for your country of establishment and your App Store / Play Console listings.*
