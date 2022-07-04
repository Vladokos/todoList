const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
    {
        login: String,
        password: String,
        tasks: [
            {
                order: Number,
                task: String,
                status: Boolean,
            },
        ],
    }
);