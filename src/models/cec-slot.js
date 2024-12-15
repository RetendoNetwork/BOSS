const mongoose = require('mongoose');

const CECSlotSchema = new mongoose.Schema({
  creator_pid: Number,
  game_id: Number,
  latest_data_id: String
});

const CECSlot = mongoose.model('CECSlot', CECSlotSchema);

module.exports = CECSlot;