import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').sort({ score: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (req, res, next) => {
  try {
    const leaderboardEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(leaderboardEntry);
  } catch (error) {
    next(error);
  }
});