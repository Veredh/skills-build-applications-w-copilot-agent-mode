import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Mona Octavio', email: 'mona.octavio@example.com', role: 'captain' },
      { name: 'Devon Miles', email: 'devon.miles@example.com', role: 'member' },
      { name: 'Aisha Chen', email: 'aisha.chen@example.com', role: 'member' },
      { name: 'Rafael Singh', email: 'rafael.singh@example.com', role: 'coach' },
    ]);

    await Team.insertMany([
      { name: 'Morning Circuit Crew', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Tempo Squad', members: [users[2]._id, users[3]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Cycling', durationMinutes: 45, date: new Date('2026-07-27T07:30:00Z') },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 50, date: new Date('2026-07-28T18:15:00Z') },
      { user: users[2]._id, type: 'Trail running', durationMinutes: 38, date: new Date('2026-07-29T06:45:00Z') },
      { user: users[3]._id, type: 'Yoga mobility', durationMinutes: 30, date: new Date('2026-07-30T12:00:00Z') },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, score: 1280 },
      { user: users[2]._id, score: 1175 },
      { user: users[1]._id, score: 1090 },
      { user: users[3]._id, score: 980 },
    ]);

    await Workout.insertMany([
      {
        title: 'Beginner Core Reset',
        description: 'Low-impact core and mobility session for active recovery days.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Tempo Ride Builder',
        description: 'Interval cycling workout focused on steady threshold efforts.',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        title: 'Summit Strength Circuit',
        description: 'Full-body strength circuit with squats, hinges, presses, and carries.',
        difficulty: 'advanced',
        durationMinutes: 55,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
