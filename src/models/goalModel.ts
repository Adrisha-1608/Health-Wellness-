import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  deadline: { type: Date },
}, { timestamps: true });

export const Goal = mongoose.model('Goal', goalSchema);
