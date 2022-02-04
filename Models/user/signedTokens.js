const mongoose = require("mongoose");

const signedTokensSchema = new mongoose.Schema(
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
  },
  {
    versionKey: false,
  }
);

const SignedTokens = mongoose.model("signedTokens", signedTokensSchema);
module.exports = SignedTokens;
