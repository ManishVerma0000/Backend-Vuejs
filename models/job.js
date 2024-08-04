const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  jobName: {
    type: String,
    default: "",
  },
  jobDescription: {
    type: String,
    default: "",
  },
});

const Jobs = mongoose.model("Jobs", messageSchema);

module.exports = Jobs;
