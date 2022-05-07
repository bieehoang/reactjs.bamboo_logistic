import data from './data.js';
import express from 'express';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`see me http://localhost:${port}`);
});