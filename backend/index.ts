import express from "express";
import cors from "cors";
import * as speakeasy from "speakeasy";
import bcrypt from "bcrypt";
import { db } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   REGISTER USER
========================= */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users(username, password) VALUES($1, $2)",
    [username, hashed]
  );

  res.json({ message: "User registered successfully" });
});

/* =========================
   LOGIN (STEP 1)
========================= */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // generate MFA secret if not exists
  let secret = user.secret;

  if (!secret) {
    const newSecret = speakeasy.generateSecret();

    await db.query(
      "UPDATE users SET secret=$1 WHERE username=$2",
      [newSecret.base32, username]
    );

    secret = newSecret.base32;
  }

  const otp = speakeasy.totp({
    secret,
    encoding: "base32",
  });

  console.log("OTP:", otp);

  res.json({ message: "OTP generated. Check console." });
});

/* =========================
   VERIFY OTP (STEP 2)
========================= */
app.post("/verify-otp", async (req, res) => {
  const { username, token } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }

  const user = result.rows[0];

  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token,
    window: 2,
  });

  if (verified) {
    return res.json({ message: "MFA Login Successful ✅" });
  }

  return res.status(401).json({ message: "Invalid OTP ❌" });
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});