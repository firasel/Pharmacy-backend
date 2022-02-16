const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Medicine = require("../../Models/PublicProduct/PublicMedicineModel");

const MedicineAllDataAdd = async (req, res, next) => {
  try {
    const allMedicineData = req.body;
    await allMedicineData.forEach((data) => {
      delete data._id;
      data.active = true;
    });

    Medicine.insertMany(allMedicineData, (err, data) => {
      if (!err && data) {
        res
          .status(201)
          .send(SendResponse(true, "All data added Successfully", data));
      } else {
        BackendError(res);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = MedicineAllDataAdd;
