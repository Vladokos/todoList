const express = require("express");
const app = express();

const jsonParser = express.json();

require("./config/database").connect();
const users = require("./models/users");

app.post("/enter", (req,res) => {

})

app.listen(5000, () => {
    console.log("Server is running")
})