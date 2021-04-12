const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  date: { type: String, trim: true },
  time: { type: String, trim: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'clients' }
});
module.exports = mongoose.model('appointments', appointmentsSchema);
