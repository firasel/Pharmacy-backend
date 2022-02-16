const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.ObjectId,
    },
    type: {
      type: String,
      required: true,
      enum: ["free", "basic", "pro"],
      default: "free",
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
    updatedTime: {
      type: Date,
      default: Date.now(),
    },
    expiredTime: {
      type: Date,
      default: Date.now(),
    },
    payments: [
      {
        _id: {
          type: mongoose.ObjectId,
          required: true,
        },
        method: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
