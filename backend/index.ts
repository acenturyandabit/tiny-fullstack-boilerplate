import express from 'express';
import cors from 'cors';
import { getDb } from './db';

const app = express();
const port = 3000;

const db = getDb();

// Middleware to parse JSON body content
app.use(cors());
app.use(express.json());


app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});