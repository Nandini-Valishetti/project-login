import { Pool } from "pg";

export const db = new Pool({
  user: "user",
  host: "localhost",
  database: "mfa_db",
  password: "password",
  port: 5432,
});