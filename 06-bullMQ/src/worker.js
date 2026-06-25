import { connect } from "./connect.js";
import { Worker } from "bullmq";

const emailWorker = new Worker(
  "email",
  async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Email sent to ${job.data.to} with subject: ${job.data.subject}`);
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});
emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
}