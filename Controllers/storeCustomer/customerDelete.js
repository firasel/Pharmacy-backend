const { BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreCustomer = require("../../Models/storeCustomer/customerModel");
const { default: mongoose } = require("mongoose");

const CustomerDelete = async (req, res, next) => {
  try {
    const { store_id } = req.body;
    const { id } = req.params;
    // Check id is valid or not
    if (
      mongoose.isObjectIdOrHexString(store_id) &&
      mongoose.isObjectIdOrHexString(id)
    ) {
      // Delete customer from database
      const customer = await StoreCustomer.deleteOne({ _id: id, store_id });

      if (customer?.deletedCount > 0) {
        res
          .status(200)
          .send(SendResponse(true, "Customer delete successfully."));
      } else {
        BadReqError(res, "Customer not found.");
      }
    } else {
      BadReqError(res, "Customer id is not valid.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = CustomerDelete;
