import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';
import { allowedOrigins, apiBaseUrl } from './utils/apiUrl';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl} on port ${port}`);
});
