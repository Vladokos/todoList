const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const jsonParser = bodyParser.json();

require("./config/database").connect();
const users = require("./models/users");
const tasks = require("./models/tasks");

app.set("view engine", "hbs");

app.use(express.static("../client"));

app.use("/login", (req, res) => {
  res.render("login.hbs");
});

app.use("/register", (req, res) => {
  res.render("registration.hbs");
});

app.use("/main", (req, res) => {
  res.render("main.hbs");
});

app.post("/log", jsonParser, async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password)
      return res.status(400).send({ message: "No data" });

    const user = await users.findOne({ login: login });

    if (!user) return res.status(404).send({ message: "User does not exist" });

    const id = user._id;

    return res.status(200).send({ message: "Success", id });
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

    const id = user._id;

    return res.status(200).send({ message: "Success", id });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

app.get("/getCards/:userId", jsonParser, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).send({ message: "No data" });

    const cards = await tasks.find({ userId });

    //...

    return res.status(200).send({ message: "Success", cards });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});
// should send task._id back
app.post("/addCard", jsonParser, async (req, res) => {
  try {
    const { task, userId } = req.body;

    if (!task || !userId) return res.status(400).send({ message: "No data" });

    const user = await users.findById(userId);

    if (!user) return res.status(400).send({ message: "User does not exist" });

    const newTask = new tasks({
      order: user.tasks.length,
      task: task,
      status: false,
      userId: userId,
    });

    await newTask.save();

    user.tasks.push(newTask);

    await user.save();

    const id = newTask._id;

    return res.status(200).send({ message: "Success", id });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

app.post("/removeCard", jsonParser, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).send({ message: "No data" });

    const task = await tasks.findById(id);

    if (!task) return res.status(400).send({ message: "Task does not exist" });

    await task.remove();

    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

app.post("/changeCard", jsonParser, async (req, res) => {
  try {
    const { id, task } = req.body;

    if (!id || !task) return res.status(400).send({ message: "No data" });

    const card = await tasks.findById(id);

    card.task = task;

    await card.save();

    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

app.post("/changeOrder", jsonParser, async (req, res) => {
  try {
    const { tasks } = req.body;
  } catch (e) {
    console.log(e);

    return res.status(400).send({ message: "Error" });
  }
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running");
});

module.exports = server;
