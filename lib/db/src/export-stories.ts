import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { storiesTable } from "./schema";
import { asc } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL required");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const stories = await db
  .select({
    level: storiesTable.level,
    orderIndex: storiesTable.orderIndex,
    title: storiesTable.title,
    titleArabic: storiesTable.titleArabic,
    content: storiesTable.content,
    contentArabic: storiesTable.contentArabic,
  })
  .from(storiesTable)
  .orderBy(asc(storiesTable.level), asc(storiesTable.orderIndex));

const outPath = path.join(__dirname, "../../../artifacts/api-server/src/stories-seed.json");
fs.writeFileSync(outPath, JSON.stringify(stories, null, 2));
console.log(`Exported ${stories.length} stories to ${outPath}`);
await pool.end();
