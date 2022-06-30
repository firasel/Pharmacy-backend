const { BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const MedicinesStock = require("../../Models/storeProduct/medicineStockModel");

const StockMedicineGet = async (req, res, next) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    const { store_id } = req.body;

    // Check user provided data
    if (limit <= 100 && page > 0) {
      // Calculate for pagination
      let modifyLimit = parseInt(limit);
      let modifyPage = parseInt(page) - 1;

      // Get the medicine stocks with specific store and pagination
      let stockData = await MedicinesStock.find({ store_id })
        .sort({ _id: -1 })
        .skip(modifyPage * modifyLimit)
        .limit(modifyLimit)
        .populate({
          path: "medicine_id",
          select: "name dosage strength medicineShelf qtyOfPacket qtyOfMedicine",
        });

      // Filter if medicine details not found then remove it.
      let stockMedicineData = await stockData.filter(
        (data) => data?.medicine_id !== null
      );

      if (stockMedicineData?.length > 0) {
        res
          .status(200)
          .send(
            SendResponse(
              true,
              "Medicine data get successfully.",
              stockMedicineData
            )
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

module.exports = StockMedicineGet;
