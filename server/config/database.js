const mongoose = require("mongoose");

export const connect = () => {
    mongoose.connect("mongodb://localhost:27017/todoList", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to database successful");
    }).catch((error) => {
        console.log("database connection failed.");
        console.log(error);
        process.exit(1);
    })
}