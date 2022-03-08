const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineAdd = (req, res, next) => {
  try {
    const medicineObj = req.body;

    // Check store is available in database
    Store.exists({ _id: medicineObj?.store_id }, (err, result) => {
      if (result) {
        // Add medicine in database
        StoreMedicines.insertMany(medicineObj, (err, medicineData) => {
          if (!err && medicineData) {
            res
              .status(201)
              .send(
                SendResponse(true, "Medicine added successfully.", medicineData)
              );
          } else {
            BackendError(res);
          }
        });
      } else {
        NotFoundError(res);
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = MedicineAdd;
