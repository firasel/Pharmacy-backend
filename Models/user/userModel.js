const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, " Please provide a valid email"],
    },
    store_id: {
      type: mongoose.ObjectId,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide your password confirm"],
      validate: {
        validator: function (el) {
          // "this" works only on create and save
          return el === this.password;
        },
        message: "Your password and confirmation password are not the same",
      },
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    active: {
      type: Boolean,
      default: false,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
    updatedTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

// encrypt the password using 'bcrypt'
// Mongoose -> Document Middleware
userSchema.pre("save", async function (next) {
  // check the password if it is modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
