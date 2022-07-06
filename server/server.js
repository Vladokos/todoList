const express = require("express");
const app = express();

const jsonParser = express.json();

require("./config/database").connect();
const users = require("./models/users");

app.post("/login", async (req, res) => {
    try {
        const {login, password} = req.body;

        if (!login || !password) res.status(400).send("No data");

        const user = await userSchema.find({login});

        if (!user) res.status(404).send("User does not exist");



    } catch (e) {
        console.log(e);

        return res.status(400).send("Error");
    }
});

app.post("/register", async (req, res) => {
    try {
        const {login, password} = req.body;

        if (!login || !password) res.status(400).send("No data");

        const oldUser = await userSchema.find({login});

        if (oldUser){
            return res.status(400).send("user already exist")
        }

        const user = await new userSchema({
            login: login,
            password: password
        });

        return res.status(200)
        // .send()

    } catch (e) {
        console.log(e);

        return res.status(400).send("Error");
    }
});



app.listen(5000, () => {
    console.log("Server is running")
});