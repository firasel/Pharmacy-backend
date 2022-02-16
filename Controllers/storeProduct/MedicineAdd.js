const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineAdd = (req, res, next) => {
  try {
    // Object destructuring
    const {
      store_id,
      manufacturer,
      name,
      genericName,
      strength,
      dosage,
      qtyOfPacket,
      qtyOfMedicine,
      medicineShelf,
    } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, (err, result) => {
      if (result) {
        // Add medicine in database
        StoreMedicines.create(
          {
            store_id,
            manufacturer,
            name,
            genericName,
            strength,
            dosage,
            qtyOfPacket,
            qtyOfMedicine,
            medicineShelf,
          },
          (err, medicineData) => {
            if (!err && medicineData) {
              res
                .status(201)
                .send(
                  SendResponse(
                    true,
                    "Medicine added successfully.",
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
  } catch (error) {
    next(error);
  }
};

module.exports = MedicineAdd;
