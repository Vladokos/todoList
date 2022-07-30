const mongoose = require("mongoose");

exports.connect = () => {
    mongoose.connect(process.env.LINK_DATABASE, {
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