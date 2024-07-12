import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {

  const mongoUri = process.env.MONGO_URI || ''
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected...');
  } catch (err : any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
