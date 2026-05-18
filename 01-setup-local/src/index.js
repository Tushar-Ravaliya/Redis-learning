import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redisClient = new Redis("redis://localhost:6379");

app.get("/redis", async (req, res) => {
 const reply = await redisClient.ping();
    res.send(`Redis replied: ${reply}`);
}); 

app.get("/mongo", async (req, res) => {

    const url = "mongodb://localhost:27017/redismongo";
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    res.send("Connected to MongoDB");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});