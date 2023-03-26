import { mongoMigrateCli } from "mongo-migrate-ts";
import dotenv from "dotenv";

dotenv.config();

mongoMigrateCli({
  uri: process.env.MONGO_URI,
  database: "resident-register",
  migrationsDir: "build/migrations",
  migrationsCollection: "migrations_collection",
});
