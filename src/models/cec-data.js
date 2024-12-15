const mongoose = require('mongoose');

const CECDataSchema = new mongoose.Schema({
  creator_pid: Number,
  game_id: Number,
  data: String,
  data_hash: String,
  size: Number,
  created: BigInt
});

const CECData = mongoose.model('CECData', CECDataSchema);

module.exports = CECData;