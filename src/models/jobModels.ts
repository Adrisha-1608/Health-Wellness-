import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['hydration', 'stretch', 'sleep', 'custom'],
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
