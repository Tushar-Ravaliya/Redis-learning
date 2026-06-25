import express from "express";
import { emailQueue } from "./queues.js";

const app = express();
app.use(express.json());

app.post("/email", async (req, res) => {
  const job = emailQueue.add("welcome-Email", {
    to: req.body.to,
    subject: req.body.subject,
    body: req.body.body,
  },{
    attempts: 3, // Number of retry attempts
    backoff: {
      type: "exponential", // Backoff strategy
      delay: 5000, // Initial delay in milliseconds
    },
  });
  res.json({ id: job.id });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
