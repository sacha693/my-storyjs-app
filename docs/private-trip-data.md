# Private trip data recovery and protection

The last known version with detailed transit routes is commit:

- `b9df62c13176faac2da0477a42234d6763f96114` (`Use router links for home navigation cards`)

That commit stores the route-rich plans in these historical files:

- `src/data/day0.ts`
- `src/data/day1.ts`
- `src/data/day2.ts`
- `src/data/day3.ts`
- `src/data/day4.ts`
- `src/data/day5.ts`
- `src/data/day6.ts`
- `src/data/day7.ts`
- `src/data/day8.ts`
- `src/data/days.ts`

These files include sensitive travel details such as flights, bookings, lodging, and exact routes. Do not restore them as normal frontend source files on `main`, because Vite would publish them in the built JavaScript bundle.

## Current protection model

The mobile app asks for a 4-digit travel password the first time it is opened on a phone, then remembers that phone in `localStorage`.

Trip data is kept out of GitHub and loaded from Supabase. This protects against people browsing the GitHub repository and seeing itinerary documents in source files. It is not strong backend authentication; if you need to prevent access by anyone who knows the deployed app URL, add real login or a server-side access check.

## One-command Supabase recovery

Work locally on a private machine:

```bash
npm run recover:trip-data-sql
```

The command will:

- recover the old route-rich TypeScript data from commit `b9df62c13176faac2da0477a42234d6763f96114`
- compile it in `private/recovered-route-data-work/`
- generate `private/trip-data-documents.sql`
- clean up temporary recovered source files

Run `private/trip-data-documents.sql` in Supabase. It creates or updates:

- table: `public.trip_data_documents`
- `trip_id`: `kansai-2026`
- `data_key`: `day_plans`

The generated SQL also enables row level security and adds a public read policy for active rows. This is required for the phone app to read data after the lightweight access screen.

## App protection rules

- The full trip plan must not be committed as frontend TypeScript, JSON, or public assets.
- Files under `private/` must stay local.
- The app should load trip data from Supabase, not from source files.
- The plaintext travel password must not be committed.
- If you later want stronger protection, add real user authentication.

## If the old data was already pushed publicly

Git history can remain visible even after files are removed from the latest branch. If the historical route files contain information that must be treated as leaked, rotate or change affected booking references where possible, and consider repository history cleanup with GitHub support or a private repository migration.
