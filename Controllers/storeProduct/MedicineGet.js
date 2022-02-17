const { BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineGet = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { store_id } = req.body;

    // Check user provided data
    if (limit <= 100 && page > 0) {
      // Calculate for pagination
      const modifyLimit = parseInt(limit);
      const modifyPage = parseInt(page) - 1;

      // Get the medicine stocks with pagination
      const medicineData = await StoreMedicines.find({ store_id })
        .sort({ _id: -1 })
        .skip(modifyPage * modifyLimit)
        .limit(modifyLimit);

      if (medicineData?.length > 0) {
        res
          .status(200)
          .send(
            SendResponse(true, "Medicine data get successfully.", medicineData)
          );
      } else {
        BadReqError(res, "Data not found.");
      }
    } else {
      BadReqError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = MedicineGet;
