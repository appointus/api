var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentsSchema = new Schema({
  date: { type: String, trim: true },
  time: { type: String, trim: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'clients' }
});
module.exports = mongoose.model('appointments', appointmentsSchema);
