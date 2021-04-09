import mongoose from "mongoose";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// vitual field

userSchema
  .virtual("password") // Tạo ra 1 field ảo
  .set(function (password) {
    // aaaaa1
    this.salt = uuidv4(); // unique
    this.hashed_password = this.encrytPassword(password);
  });

userSchema.methods = {
  authenticate: function (plainText) {
    // aaaaa1
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
