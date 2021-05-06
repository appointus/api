const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
  email: { type: String, trim: true },
  password: { type: String, trim: true },
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  phone: { type: String, trim: true, default: 'null' },
  isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model('clients', clientSchema)
