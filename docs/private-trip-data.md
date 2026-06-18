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

## Protected recovery flow

1. Work locally on a private machine, not in a public PR branch.
2. Recover the historical files from the commit above.
3. Convert the recovered `dayPlans` array to a local JSON file such as `recovered-day-plans.json`.
4. Set a private passphrase locally. Do not commit it and do not paste it into chat.
5. Encrypt the JSON into SQL:

```bash
TRIP_DATA_PASSPHRASE="your-private-passphrase" npm run encrypt:trip-data -- ./recovered-day-plans.json ./encrypted-day-plans.sql
```

6. Run the generated SQL in Supabase to upsert `encrypted_trip_data` for:

- `trip_id`: `kansai-2026`
- `data_key`: `day_plans`

7. Delete the local plaintext JSON and SQL export after confirming the app unlocks.

## App protection rules

- The app should only fetch `salt`, `iv`, and `ciphertext` from Supabase.
- The passphrase must never be hardcoded in frontend code.
- The full trip plan must not be committed as frontend TypeScript, JSON, or public assets.
- The passphrase is stored only in `sessionStorage`, so closing the browser tab clears the unlocked session.

## If the old data was already pushed publicly

Git history can remain visible even after files are removed from the latest branch. If the historical route files contain information that must be treated as leaked, rotate or change affected booking references where possible, change the trip data passphrase, and consider repository history cleanup with GitHub support or a private repository migration.
