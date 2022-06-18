const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Stores",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "N/A",
    },
    note: {
      type: String,
      default: "",
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

const StoreCustomer = mongoose.model("StoreCustomer", CustomerSchema);

module.exports = StoreCustomer;
