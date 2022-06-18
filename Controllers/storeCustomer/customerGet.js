const { BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreCustomer = require("../../Models/storeCustomer/customerModel");
const validator = require("validator");

const CustomerGet = (req, res, next) => {
  try {
    const { store_id } = req.body;

    if (validator.isMongoId(store_id))
      // Add customer in database
      StoreCustomer.find(
        {
          store_id,
        },
        (err, customerData) => {
          if (!err && customerData) {
            res
              .status(201)
              .send(
                SendResponse(true, "Customer get successfully.", customerData)
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

module.exports = CustomerGet;
