const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const MedicinesStock = require("../../Models/StoreProduct/MedicineStockModel");

const StockMedicineUpdate = (req, res, next) => {
  try {
    const { _id, stock } = req.body;

    // Update stock
    MedicinesStock.findByIdAndUpdate(
      _id,
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
