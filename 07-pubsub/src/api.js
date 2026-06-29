import express from "express";
import Redis from "ioredis";

const app = express();
const publisher = new Redis("redis://localhost:6379");

app.post("/publish", (req, res) => {
  const payload = {
    title: req.query.title || "Default Title",
    message: req.query.message || "Default Message",
    createdAt: new Date(),
  };
  publisher.publish("notification", JSON.stringify(payload), (err) => {
    if (err) {
      console.error("Failed to publish message:", err);
      return res.status(500).send("Failed to publish message");
    }
    console.log("Message published successfully");
    res.send("Message published successfully");
  });
});

app.listen(3000, () => {
  console.log("Publisher server is running on http://localhost:3000");
});
