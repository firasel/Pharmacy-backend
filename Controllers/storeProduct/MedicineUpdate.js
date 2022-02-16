const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineUpdate = (req, res, next) => {
  try {
    // Object destructuring
    const {
      _id,
      manufacturer,
      name,
      genericName,
      strength,
      dosage,
      qtyOfPacket,
      qtyOfMedicine,
      medicineShelf,
    } = req.body;

    // Medicine data update in database
    StoreMedicines.findByIdAndUpdate(
      _id,
      {
        manufacturer,
        name,
        genericName,
        strength,
        dosage,
        qtyOfPacket,
        qtyOfMedicine,
        medicineShelf,
        updatedTime: Date.now(),
      },
      { new: true },
      (err, result) => {
        if (!err && result) {
          res
            .status(200)
            .send(SendResponse(true, "Data updated successfull.", result));
        } else {
          BackendError(res);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = MedicineUpdate;
