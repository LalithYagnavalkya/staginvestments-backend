const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
    required: [true, "please Enter a name"],
  },
  email: {
    type: String,
    default: "",
    required: [true, "please enter a email id"],
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  account_type: {
    type: String,
    enum: ["one", "two"],
    default: "one",
  },
});
