const mongoose = require("mongoose");

const expireDate = new Date();
expireDate.setMonth(expireDate.getMonth() + 2);

const SignedTokensSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.ObjectId,
    },
    user_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    store_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
    updatedTime: {
      type: Date,
      default: Date.now(),
    },
    expiresTime: {
      type: Date,
      default: expireDate,
    },
  },
  {
    versionKey: false,
  }
);

const SignedTokens = mongoose.model("signedTokens", SignedTokensSchema);

module.exports = SignedTokens;
