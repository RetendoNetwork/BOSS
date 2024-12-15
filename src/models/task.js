const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  deleted: {
    type: Boolean,
    default: false
  },
  id: String,
  in_game_id: String,
  boss_app_id: String,
  creator_pid: Number,
  status: {
    type: String,
    enum: ['open']
  },
  title_id: String,
  description: Number,
  created: BigInt,
  updated: BigInt
}, { id: false });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;