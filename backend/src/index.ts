import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { db } from "./db";
import { sendOTPEmail } from "./mail";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let otpStore: any = {};

/* ======================
   REGISTER
====================== */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter email & password" });
  }

  const existing = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (existing.rows.length > 0) {
    return res.json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users(email, password) VALUES($1, $2)",
    [email, hashed]
  );

  res.json({ message: "User registered successfully ✅" });
});

/* ======================
   LOGIN + SEND OTP
====================== */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const cleanEmail = email.trim().toLowerCase();

otpStore[cleanEmail] = {
  otp,
  expiry: Date.now() + 5 * 60 * 1000,
};

  setTimeout(() => {
    delete otpStore[cleanEmail];
  }, 5 * 60 * 1000);

  try {
    await sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to email 📧" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email error" });
  }
});

/* ======================
   VERIFY OTP
====================== */
app.post("/verify-otp", (req, res) => {
  let { email, token } = req.body;

  const cleanEmail = email.trim().toLowerCase();

  console.log("OTP STORE:", otpStore);
  console.log("EMAIL:", cleanEmail);
  console.log("TOKEN:", token);

  const record = otpStore[cleanEmail];

  if (!record) {
    return res.status(400).json({ message: "No OTP found" });
  }

  if (record.expiry < Date.now()) {
    return res.status(401).json({ message: "OTP expired" });
  }

  if (record.otp !== Number(token)) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  delete otpStore[cleanEmail];

  res.json({ message: "Login Successful ✅" });
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});