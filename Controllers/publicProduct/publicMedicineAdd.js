const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Medicine = require("../../Models/PublicProduct/PublicMedicineModel");

const PublicMedicineAdd = async (req, res, next) => {
  try {
    // Object destructuring
    const {
      manufacturer,
      name,
      genericName,
      strength,
      dosage,
      store_id: ref_id,
    } = req.body;

    Medicine.create(
      {
        manufacturer,
        name,
        genericName,
        strength,
        dosage,
        ref_id,
      },
      (err, medicineData) => {
        if (!err && medicineData) {
          res
            .status(201)
            .send(
              SendResponse(true, "Medicine added successfully.", medicineData)
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

module.exports = PublicMedicineAdd;
