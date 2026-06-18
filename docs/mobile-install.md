# Mobile encrypted app usage

The app is configured as a mobile-friendly PWA:

- `manifest.webmanifest` uses `display: standalone`
- `start_url` and `scope` point to `/my-storyjs-app/`
- the trip data gate uses a 4-digit numeric PIN field for phone keyboards

## Generate the encrypted data for phone use

Use the same PIN that the phone will use to unlock the app:

```bash
TRIP_DATA_PASSPHRASE="1020" npm run recover:encrypted-trip-data
```

The command creates two encrypted outputs:

- `private/encrypted-day-plans.sql` for Supabase import
- `public/encrypted-trip-data.json` for static GitHub Pages fallback

The app tries Supabase first. If Supabase is not updated or was encrypted with another PIN, the phone can still unlock from `public/encrypted-trip-data.json` after deployment.

## Deploy

Commit and deploy `public/encrypted-trip-data.json` together with the app build. Do not commit files under `private/`.

## Phone setup

1. Open the deployed app on the phone.
2. Add the site to the home screen:
   - iPhone Safari: Share -> Add to Home Screen
   - Android Chrome: menu -> Add to Home screen or Install app
3. Launch the app from the home screen.
4. Enter the 4-digit PIN.

## Privacy notes

- The PIN is not committed to the repository.
- The plaintext route data is not bundled into the frontend.
- The browser only receives encrypted `salt`, `iv`, and `ciphertext`.
- The unlocked session is stored in the current browser tab session only.
- Closing the browser tab or app session requires unlocking again.

## Operational note

A 4-digit PIN is convenient for family phone use, but it is weaker than a long passphrase. If this repository is public, treat `public/encrypted-trip-data.json` as obfuscated family-use protection rather than high-security secrecy.
