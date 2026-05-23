import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");
const queueKey = "queue:email";

app.post("/email", async (req, res) => {
  const { to, subject, body } = req.body;
  await redis.lpush(queueKey, JSON.stringify({ to, subject, body }));
  res.send("Email added to queue");
});

app.get("/email", async (req, res) => {
  const emailData = await redis.rpop(queueKey);
  if (emailData) {
    res.json(JSON.parse(emailData));
  } else {
    res.send("No emails in queue");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
