import data from './data.js';
import express from 'express';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
