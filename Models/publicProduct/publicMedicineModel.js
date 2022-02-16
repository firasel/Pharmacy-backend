const mongoose = require("mongoose");

const publicMedicineSchema = new mongoose.Schema(
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

const publicMedicine = mongoose.model("Medicine", publicMedicineSchema);
module.exports = publicMedicine;
