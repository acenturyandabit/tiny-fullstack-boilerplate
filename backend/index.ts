import express from 'express';
import cors from 'cors';
import { getDb } from './db';

const app = express();
const port = process.env.PORT || 80;

const db = getDb();

// Middleware to parse JSON body content
app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});