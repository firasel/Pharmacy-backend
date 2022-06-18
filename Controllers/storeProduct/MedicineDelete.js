const { default: mongoose } = require("mongoose");
const { BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { store_id } = req.body;

    // Check user provided data
    if (mongoose.isObjectIdOrHexString(id)) {
      // Delete the medicine
      const medicineDelete = await StoreMedicines.deleteOne({
        _id: id,
        store_id,
      });

      if (medicineDelete?.deletedCount > 0) {
        res
          .status(200)
          .send(SendResponse(true, "Medicine delete successfully."));
      } else {
        BadReqError(res, "Medicine not found.");
      }
    } else {
      BadReqError(res, "Medicine id is not valid.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = MedicineDelete;
