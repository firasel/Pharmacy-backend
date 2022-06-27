const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const ProductSell = require("../../Models/productSell/productSellModel");
const Store = require("../../Models/Store/StoreModel");

const productSellUpdate = async (req, res, next) => {
  try {
    // Object destructuring
    const { store_id, vat, discount, totalPrice, _id } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, async (err) => {
      if (!err) {
        // Check sell history is available in database
        ProductSell.findById({ _id }, async (err2, result) => {
          if (
            !err2 &&
            result.totalPrice === totalPrice &&
            totalPrice - vat - discount >= 0
          ) {
            // Update sell history in database
            const sellUpdateData = await ProductSell.findByIdAndUpdate(
              { _id },
              {
                vat,
                discount,
                totalPrice: totalPrice - vat - discount,
                updatedTime: Date.now(),
              },
              { new: true }
            );

            if (sellUpdateData) {
              res
                .status(200)
                .send(
                  SendResponse(
                    true,
                    "Sell history update successfully.",
                    sellUpdateData
                  )
                );
            } else {
              BackendError(res);
            }
          } else {
            NotFoundError(res, "Something wrong with sell history");
          }
        });
      } else {
        NotFoundError(res, "Store not found");
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = productSellUpdate;
