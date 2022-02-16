const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.ObjectId,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    account: {
      type: Boolean,
      required: true,
      default: false,
    },
    sales: {
      type: Boolean,
      required: true,
      default: true,
    },
    purchase: {
      type: Boolean,
      required: true,
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
    _id: false,
    versionKey: false,
  }
);

const UserRole = mongoose.model("UserRole", UserRoleSchema);

module.exports = UserRole;
