var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  phone: { type: String, trim: true }
});

module.exports = mongoose.model('clients', clientSchema);
