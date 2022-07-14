const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema(
    {
        order: Number,
        task: String,
        status: Boolean,
    },
    {versionKey:false}
)