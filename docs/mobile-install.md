# Mobile encrypted app usage

The app is already configured as a mobile-friendly PWA:

- `manifest.webmanifest` uses `display: standalone`
- `start_url` and `scope` point to `/my-storyjs-app/`
- the trip data gate uses a 4-digit numeric PIN field for phone keyboards

## Phone setup

1. Import encrypted trip data into Supabase first.
2. Open the deployed app on the phone.
3. Add the site to the home screen:
   - iPhone Safari: Share -> Add to Home Screen
   - Android Chrome: menu -> Add to Home screen or Install app
4. Launch the app from the home screen.
5. Enter the same 4-digit PIN used when encrypting the trip data.

## Privacy notes

- The PIN is not committed to the repository.
- The plaintext route data is not bundled into the frontend.
- The browser only receives encrypted `salt`, `iv`, and `ciphertext` from Supabase.
- The unlocked session is stored in the current browser tab session only.
- Closing the browser tab or app session requires unlocking again.

## Operational note

A 4-digit PIN is convenient for family phone use, but it is weaker than a long passphrase. Keep the Supabase table access restricted and do not publish generated SQL or plaintext JSON files.
