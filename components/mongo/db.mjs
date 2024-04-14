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
  index: {type: String, required: true },
});

const model = mongoose.model('Event', event);
export { model, connectionURI};