const mongoose = require("mongoose");

const MedicineStockSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Stores",
    },
    medicine_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "StoreMedicines",
    },
    stock: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
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

const MedicinesStock = mongoose.model("MedicineStock", MedicineStockSchema);

module.exports = MedicinesStock;
