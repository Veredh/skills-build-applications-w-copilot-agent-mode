import { Router } from 'express';
import { Workout } from '../models/workout';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});