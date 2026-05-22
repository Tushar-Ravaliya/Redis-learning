import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");

const userKey = (userId) => `user:${userId}:json`;

app.post("/user/:id/json", async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  await redis.set(userKey(id), JSON.stringify(userData));
  res.send(`User profile for ${id} saved as JSON`);
});

app.get("/user/:id/json", async (req, res) => {
  const { id } = req.params;
  const userData = await redis.get(userKey(id));
  if (userData) {
    res.json(JSON.parse(userData));
  } else {
    res.send(`User profile for ${id} not found`);
  }
});

app.post("/user/:id/hash", async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  await redis.hmset(`user:${id}:hash`, userData);
  res.send(`User profile for ${id} saved as Hash`);
});

app.get("/user/:id/hash", async (req, res) => {
  const { id } = req.params;
  const userData = await redis.hgetall(`user:${id}:hash`);
  if (Object.keys(userData).length > 0) {
    res.json(userData);
  } else {
    res.send(`User profile for ${id} not found`);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
