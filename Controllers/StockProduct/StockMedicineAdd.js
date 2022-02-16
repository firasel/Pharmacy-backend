const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");
const MedicinesStock = require("../../Models/StoreProduct/MedicineStockModel");

const StockMedicineAdd = (req, res, next) => {
  try {
    // Object destructuring
    const {
      store_id,
      medicine_id,
      stock,
      expireDate,
      buyingPrice,
      sellingPrice,
    } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, (err, result) => {
      if (result) {
        // Check medicine is available in database
        StoreMedicines.exists({ _id: medicine_id }, (err, result) => {
          if (result) {
            // Add medicine stock in database
            MedicinesStock.create(
              {
                store_id,
                medicine_id,
                stock,
                expireDate,
                buyingPrice,
                sellingPrice,
              },
              (err, medicineData) => {
                if (!err && medicineData) {
                  res
                    .status(201)
                    .send(
                      SendResponse(
                        true,
                        "Medicine stock added successfully.",
                        medicineData
                      )
                    );
                } else {
                  BackendError(res);
                }
              }
            );
          } else {
            NotFoundError(res);
          }
        });
      } else {
        NotFoundError(res);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = StockMedicineAdd;
