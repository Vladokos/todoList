const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema(
  {
    order: Number,
    task: String,
    status: Boolean,
    userId: { type: schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("tasks", taskSchema);
