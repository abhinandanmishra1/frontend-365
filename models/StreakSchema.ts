import mongoose from 'mongoose';

const StreakSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Streak || mongoose.model('Streak', StreakSchema);