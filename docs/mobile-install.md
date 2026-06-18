# Mobile app usage without a password

The app is configured as a mobile-friendly PWA:

- `manifest.webmanifest` uses `display: standalone`
- `start_url` and `scope` point to `/my-storyjs-app/`
- the phone opens directly into the trip after backend data loads

## Data protection model

The trip data is not committed to GitHub. It is recovered locally from an old commit, converted into SQL, and imported into Supabase.

This protects against someone browsing the GitHub repository and reading the itinerary in source files. It does not protect against someone who can open the deployed app URL, because the phone app intentionally has no password.

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

## Phone setup

1. Open the deployed app on the phone.
2. Add the site to the home screen:
   - iPhone Safari: Share -> Add to Home Screen
   - Android Chrome: menu -> Add to Home screen or Install app
3. Launch the app from the home screen.
4. The app loads the trip directly from Supabase.

## Privacy notes

- No itinerary source files are restored to the frontend bundle.
- No PIN or password is stored in the frontend.
- Supabase allows public read access to the active trip data so the phone can open without login.
- If you later want to prevent other visitors from opening the app URL, add a PIN gate or real user authentication.
