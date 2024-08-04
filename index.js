const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const conn = require("./db/conn");
const User = require("./models/user");
const Jobs = require("./models/job");

conn();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const createuser = await User.create(req.body);
      await res.status(201).send({
        data: createuser,
        message: "created",
      });
    } else {
      res.status(400).send("Please enter all the details");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (password && email) {
      const checkuser = await User.findOne({ email });
      if (checkuser && checkuser.password === password) {
        res.status(200).send("User is logged in");
      } else {
        res.status(400).send("Invalid user");
      }
    } else {
      res.status(400).send("Please enter both email and password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/all-job", async (req, res) => {
  try {
    const allJobs = await Jobs.find();
    await res.status(200).send({ data: allJobs });
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
});

app.post("/create-message", async (req, res) => {
  try {
    const { jobName, jobDescription } = req.body;
    if (!jobName && !jobDescription) {
      await res.status(400).send({ message: "please enter all the details" });
    } else {
      const createPost = await Jobs.create(req.body);
      await res
        .status(200)
        
        .send({ message: "job is created", result: createPost });
    }
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
