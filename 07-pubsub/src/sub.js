import Redis from "ioredis";

const subscriber = new Redis("redis://localhost:6379");

subscriber.subscribe("notification", (err) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  }
  console.log(
    "Subscribed successfully! Listening for updates on the 'notification' channel.",
  );
});

subscriber.on("message", (channel, message) => {
  const jsonMessage = JSON.parse(message);
  console.log(
    `Received message from ${channel}: ${JSON.stringify(jsonMessage)}`,
  );
});
