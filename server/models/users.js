const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
    {
        login: String,
        password: String,
        tasks: [
            {
              type: schema.Types.ObjectId,
              ref: "tasks",
            },
          ],
    },
    {versionKey: false}
);

module.exports = mongoose.model("users", userSchema);