const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
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
      default: true,
    },
    ref_id: {
      type: mongoose.ObjectId,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
