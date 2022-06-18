const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const MedicinesStock = require("../../Models/storeProduct/medicineStockModel");

const StockDetailsUpdate = (req, res, next) => {
  try {
    const { _id, stock, store_id, expireDate, buyingPrice, sellingPrice } =
      req.body;

    // Update stock
    MedicinesStock.findOneAndUpdate(
      { _id, store_id },
      {
        stock,
        expireDate,
        buyingPrice,
        sellingPrice,
      },
      { new: true },
      (err, data) => {
        if (!err && data) {
          res
            .status(200)
            .send(
              SendResponse(true, "Stock details updated successfull.", data)
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

module.exports = StockDetailsUpdate;
