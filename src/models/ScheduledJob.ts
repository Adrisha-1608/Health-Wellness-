import mongoose from 'mongoose';

const scheduledJobSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true }, 
});

export default mongoose.model('ScheduledJob', scheduledJobSchema);
