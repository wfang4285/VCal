import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const connectionURI = process.env.MONGODB_URI;

await mongoose.connect(connectionURI);

const event = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Event = mongoose.model('Event', event);

export { Event, connectionURI, mongoose };