const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const MedicinesStock = require("../../Models/storeProduct/medicineStockModel");

const StockMedicineUpdate = (req, res, next) => {
  try {
    const { _id, stock, store_id } = req.body;

    // Update stock
    MedicinesStock.findOneAndUpdate(
      { _id, store_id },
      { $inc: { stock } },
      { new: true },
      (err, data) => {
        if (!err && data) {
          res
            .status(200)
            .send(SendResponse(true, "Stock updated successfull.", data));
        } else {
          BackendError(res);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = StockMedicineUpdate;
