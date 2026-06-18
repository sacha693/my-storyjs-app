# Mobile app usage with remembered access

The app is configured as a mobile-friendly PWA:

- `manifest.webmanifest` uses `display: standalone`
- `start_url` and `scope` point to `/my-storyjs-app/`
- the phone asks for the travel password only once per device/browser

## Data protection model

The trip data is not committed to GitHub. It is recovered locally from an old commit, converted into SQL, and imported into Supabase.

The app also has a lightweight access screen. After the correct 4-digit travel password is entered on a phone, that phone stores an unlocked flag in `localStorage`, so future launches open directly.

This protects against people casually browsing the GitHub repository and reading the itinerary in source files. It is not a replacement for real account login: a determined person with the deployed app URL and enough technical skill may still inspect network data.

## Generate the Supabase import SQL

Run this locally:

```bash
npm run recover:trip-data-sql
```

The command creates:

- `private/trip-data-documents.sql`

Do not commit anything under `private/`.

## Import and deploy

1. Open Supabase SQL Editor.
2. Run `private/trip-data-documents.sql`.
3. Deploy the app from this branch.
4. Open the app on the phone.
5. Enter the travel password once.

## Phone setup

1. Open the deployed app on the phone.
2. Add the site to the home screen:
   - iPhone Safari: Share -> Add to Home Screen
   - Android Chrome: menu -> Add to Home screen or Install app
3. Launch the app from the home screen.
4. Enter the 4-digit travel password once.
5. Later launches on the same phone should open directly.

## Privacy notes

- No itinerary source files are restored to the frontend bundle.
- The plaintext travel password is not stored in the repository.
- The remembered unlock state is stored only on the phone/browser that unlocked it.
- Clearing browser website data or using a new browser/device requires entering the password again.
- If you later want stronger protection for the deployed app URL, add real user authentication.
