require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

//TODO: TypeError- mongoose.connect is not a function
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = {
  Event: Event,
  connection: mongoose.connection
};