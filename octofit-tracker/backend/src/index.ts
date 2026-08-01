import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
