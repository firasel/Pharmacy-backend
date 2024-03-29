const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
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

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
