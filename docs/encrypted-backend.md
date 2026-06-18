# 關西旅遊 APP：加密後台資料設定

這次調整後，每日行程不再由頁面直接 `import src/data/day0~day8` 載入，而是從 Supabase 的 `encrypted_trip_data` 資料表讀取加密資料。

## 1. 建立後台資料表

到 Supabase Dashboard → SQL Editor，執行：

```sql
supabase/encrypted_trip_data.sql
```

## 2. 準備未加密 JSON

建立一個本機檔案，例如 `day-plans.json`，內容是一個 `DayPlan[]` 陣列。格式需要符合 `src/data/types.ts`。

## 3. 產生加密 SQL

在本機專案資料夾執行：

```bash
TRIP_DATA_PASSPHRASE="你的旅遊資料密碼" npm run encrypt:trip-data -- ./day-plans.json ./encrypted-day-plans.sql
```

這會產生一份 `encrypted-day-plans.sql`。

## 4. 匯入 Supabase

到 Supabase Dashboard → SQL Editor，貼上 `encrypted-day-plans.sql` 並執行。

## 5. 前台解鎖

打開 APP 後，首頁與每日行程會出現密碼解鎖畫面。輸入第 3 步設定的密碼後，資料會在瀏覽器端解密顯示。

## 重要提醒

- 前端顯示出來的內容，使用者仍然可能從瀏覽器看到「已解密後的結果」。
- 這套做法主要保護的是：不要把完整未加密行程資料直接打包進前端 JS。
- Supabase `anon` 可以讀到的是 ciphertext 加密字串，不是明文行程。
- 真正不想公開的資料，不要放在任何公開頁面顯示。
