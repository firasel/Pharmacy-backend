const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Medicine = require("../../Models/publicProduct/publicMedicineModel");

const publicMedicineAdd = async (req, res, next) => {
  try {
    const { manufacturer, name, genericName, strength, dosage, ref_id } =
      req.body;
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

module.exports = publicMedicineAdd;
