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

## One-command encrypted recovery

Work locally on a private machine. Choose a private passphrase or 4-digit family PIN and keep it outside GitHub and chat.

```bash
TRIP_DATA_PASSPHRASE="your-private-passphrase-or-pin" npm run recover:encrypted-trip-data
```

The command will:

- recover the old route-rich TypeScript data from commit `b9df62c13176faac2da0477a42234d6763f96114`
- compile it in `private/recovered-route-data-work/`
- write a temporary `private/recovered-day-plans.json`
- encrypt it with AES-GCM using PBKDF2-SHA-256
- write `private/encrypted-day-plans.sql`
- write `public/encrypted-trip-data.json`
- delete the plaintext JSON by default

You can use both encrypted outputs:

- Run `private/encrypted-day-plans.sql` in Supabase to update the backend row.
- Commit and deploy `public/encrypted-trip-data.json` so phones can still unlock even when Supabase has older ciphertext.

The app tries Supabase first, then falls back to the static encrypted JSON file. After importing or deploying, open the app and unlock it with the same passphrase or PIN.

## Optional inspection

If you need to inspect the recovered JSON before encryption cleanup, run:

```bash
TRIP_DATA_PASSPHRASE="your-private-passphrase-or-pin" npm run recover:encrypted-trip-data -- --keep-plaintext
```

Delete `private/recovered-day-plans.json` immediately after checking it.

## App protection rules

- The app fetches only `salt`, `iv`, and `ciphertext` from Supabase or the static encrypted JSON file.
- The passphrase or PIN must never be hardcoded in frontend code.
- The full trip plan must not be committed as frontend TypeScript, JSON, or public assets.
- The passphrase or PIN is stored only in `sessionStorage`, so closing the browser tab clears the unlocked session.
- The mobile gate accepts a 4-digit numeric PIN for easier phone use.

## If the old data was already pushed publicly

Git history can remain visible even after files are removed from the latest branch. If the historical route files contain information that must be treated as leaked, rotate or change affected booking references where possible, change the trip data passphrase, and consider repository history cleanup with GitHub support or a private repository migration.
