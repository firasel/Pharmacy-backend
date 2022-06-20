const { NotFoundError, BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const StoreCustomer = require("../../Models/storeCustomer/customerModel");

const CustomerGet = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { store_id } = req.body;

    // Check user provided data
    if (limit <= 100 && page > 0) {
      // Calculate for pagination
      const modifyLimit = parseInt(limit);
      const modifyPage = parseInt(page) - 1;

      // Get the medicine stocks with pagination
      const customerData = await StoreCustomer.find({ store_id })
        .sort({ _id: -1 })
        .skip(modifyPage * modifyLimit)
        .limit(modifyLimit);

      if (customerData?.length > 0) {
        res
          .status(200)
          .send(
            SendResponse(true, "Customer data get successfully.", customerData)
          );
      } else {
        NotFoundError(res, "Data not found.");
      }
    } else {
      BadReqError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = CustomerGet;
