import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      strim: true,
      maxLength: 32,
      required: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
    },
    hashed_password: {
      type: String,
      required: true,
      maxlength: 32,
    },
    salt: {
      required: true,
      type: String,
    },
    about: {
      type: Array,
    },
    role: {
      type: Number,
      default: 0,
    },

    history: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
