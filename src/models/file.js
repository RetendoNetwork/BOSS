const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const FileSchema = new mongoose.Schema({
  deleted: {
    type: Boolean,
    default: false
  },
  data_id: Number,
  task_id: String,
  boss_app_id: String,
  supported_countries: [String],
  supported_languages: [String],
  password: String,
  attribute1: String,
  attribute2: String,
  attribute3: String,
  creator_pid: Number,
  name: String,
  type: String,
  hash: String,
  size: BigInt,
  notify_on_new: [String],
  notify_led: Boolean,
  created: BigInt,
  updated: BigInt
}, { id: false });

FileSchema.plugin(AutoIncrementID, {
  startAt: 50000,
  field: 'data_id'
});

const File = mongoose.model('File', FileSchema);

module.exports = File;