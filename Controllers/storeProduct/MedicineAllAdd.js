const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const StoreMedicines = require("../../Models/storeProduct/medicineModel");

const MedicineAllAdd = async (req, res, next) => {
  try {
    // Object destructuring
    let { store_id, medicines } = req.body;
    medicines = await medicines.map((data) => {
      data.store_id = store_id;
      return data;
    });

    // Check store is available in database
    Store.exists({ _id: store_id }, (err, result) => {
      if (result) {
        // Add all medicine in database
        StoreMedicines.insertMany(medicines, (err, medicineData) => {
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
    next(error);
  }
};

module.exports = MedicineAllAdd;
