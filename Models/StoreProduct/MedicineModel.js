const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Stores",
    },
    ref_id: {
      type: mongoose.ObjectId,
      ref: "medicines",
    },
    manufacturer: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
      required: true,
    },
    strength: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    qtyOfPacket: {
      type: Number,
      required: true,
      min: 1,
    },
    qtyOfMedicine: {
      type: Number,
      required: true,
      min: 1,
    },
    medicineShelf: {
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

const StoreMedicines = mongoose.model("StoreMedicines", MedicineSchema);

module.exports = StoreMedicines;
