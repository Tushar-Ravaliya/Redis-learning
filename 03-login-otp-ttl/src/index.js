import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");

const otpKey = (phone) => `otp:${phone}`;

app.post("/otp", async (req, res) => {
  const { phone } = req.query;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(otpKey(phone), otp, "EX", 300); // OTP valid for 5 minutes
  res.send(`OTP sent to ${phone}: ${otp}`);
});

app.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.query;
  const storedOtp = await redis.get(otpKey(phone));
  if (storedOtp === otp) {
    await redis.del(otpKey(phone));
    res.send("OTP verified successfully");
  } else {
    res.send("Invalid OTP");
  }
});

app.get("/otp/:phone/ttl", async (req, res) => {
  const { phone } = req.params;
  const ttl = await redis.ttl(otpKey(phone));
  res.send(`TTL for OTP of ${phone}: ${ttl} seconds`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
