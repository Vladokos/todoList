const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const jsonParser = bodyParser.json();

require("./config/database").connect();
const users = require("./models/users");

app.set("view engine", "hbs");

app.use(express.static("../client"));

app.use("/login", (req, res) => {
  res.render("login.hbs");
});

app.use("/register", (req, res) => {
  res.render("registration.hbs");
});

app.post("/log", jsonParser, async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password)
      return res.status(400).send({ message: "No data" });

    const user = await users.findOne({ login: login });

    if (!user) return res.status(404).send({ message: "User does not exist" });

    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

app.post("/reg", jsonParser, async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password)
      return res.status(400).send({ message: "No data" });

    const oldUser = await users.findOne({ login: login });

    if (oldUser) {
      return res.status(400).send({ message: "user already exist" });
    }

    const user = new users({
      login: login,
      password: password,
    });

    await user.save();

    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running");
});

module.exports = server;
