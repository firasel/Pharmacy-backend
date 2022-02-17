const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const MedicinesStock = require("../../Models/StoreProduct/MedicineStockModel");

const StockMedicineCount = (req, res, next) => {
  try {
    MedicinesStock.find({ store_id: req?.body?.store_id }).count(
      (err, countData) => {
        if (!err) {
          res
            .status(200)
            .send(
              SendResponse(true, "Total stock count successful", { countData })
            );
        } else {
          BackendError(res);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = StockMedicineCount;
