import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthapp';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
