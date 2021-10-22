const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    task: String,
  },
  { timestamps: true }
);
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    profile_url: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    password: { type: String, required: true },
    task: [taskSchema],
  })
);

module.exports = User;
