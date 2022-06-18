const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const StoreCustomer = require("../../Models/storeCustomer/customerModel");

const CustomerAdd = (req, res, next) => {
  try {
    // Object destructuring
    const { store_id, name, phone, address, note } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, (err, result) => {
      if (result) {
        // Add customer in database
        StoreCustomer.create(
          {
            store_id,
            name,
            phone,
            address,
            note,
          },
          (err, customerData) => {
            if (!err && customerData) {
              res
                .status(201)
                .send(
                  SendResponse(
                    true,
                    "Customer added successfully.",
                    customerData
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

module.exports = CustomerAdd;