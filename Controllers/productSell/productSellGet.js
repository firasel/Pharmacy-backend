const { BadReqError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const ProductSell = require("../../Models/productSell/productSellModel");

const productSellGet = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { store_id } = req.body;

    // Check user provided data
    if (limit <= 100 && page > 0) {
      // Calculate for pagination
      const modifyLimit = parseInt(limit);
      const modifyPage = parseInt(page) - 1;

      // Get the sell history with pagination
      const sellData = await ProductSell.find({ store_id })
        .sort({ _id: -1 })
        .skip(modifyPage * modifyLimit)
        .limit(modifyLimit)
        .populate({ path: "customer_id", select: "name" });

      if (sellData?.length > 0) {
        res
          .status(200)
          .send(SendResponse(true, "Sell data get successfully.", sellData));
      } else {
        BadReqError(res, "Data not found.");
      }
    } else {
      BadReqError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = productSellGet;
