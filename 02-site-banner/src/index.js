import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());
const redis = new Redis('redis://localhost:6379');

const bannerKey = 'site:banner';

app.post('/banner', async (req, res) => {
  const { message } = req.query;
  await redis.set(bannerKey, message || 'Welcome to our site!');
  res.send('Banner message set');
});

app.get('/banner', async (req, res) => {
  const message = await redis.get(bannerKey);
  res.send(`Current banner message: ${message}`);
});

app.delete('/banner', async (req, res) => {
  await redis.del(bannerKey);
  res.send('Banner message deleted');
});

app.get('/banner/exists', async (req, res) => {
  const exists = await redis.exists(bannerKey);
  res.send(`Banner message exists: ${exists}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});