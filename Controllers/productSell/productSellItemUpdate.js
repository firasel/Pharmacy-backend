const mongoose = require("mongoose");
const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const ProductSell = require("../../Models/productSell/productSellModel");
const Store = require("../../Models/Store/StoreModel");
const MedicinesStock = require("../../Models/storeProduct/medicineStockModel");

const updatedObject = async (dbProducts, products) => {
  try {
    let decreasePrice = 0;
    let updatedObj = [];
    for (let data of products) {
      for (let exProduct of dbProducts) {
        if (
          exProduct._id == data._id &&
          exProduct.quantity > data.quantity &&
          data.quantity >= 0
        ) {
          data.totalPrice = exProduct.sellingPrice * data.quantity;
          data.decreaseQuantity = exProduct.quantity - data.quantity;
          decreasePrice += exProduct.totalPrice - data.totalPrice;
          updatedObj.push(data);
        }
      }
    }

    if (updatedObj.length == 0) {
      throw Error("Provided data is not valid");
    } else {
      return { updatedObj, decreasePrice };
    }
  } catch (error) {
    throw error;
  }
};

const updateNewObjOnDB = async (_id, updatedObj, session) => {
  try {
    for (let { _id: productId, totalPrice, quantity } of updatedObj) {
      let result = await ProductSell.updateOne(
        { _id, "products._id": productId },
        {
          $set: {
            "products.$.totalPrice": totalPrice,
            "products.$.quantity": quantity,
          },
        },
        { session }
      );
      if (result?.modifiedCount == 0) {
        throw Error("Product object update failed");
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateProductStock = async (updatedObj, session) => {
  try {
    for (let { stock_id, decreaseQuantity } of updatedObj) {
      let result = await MedicinesStock.findByIdAndUpdate(
        { _id: stock_id },
        { $inc: { stock: decreaseQuantity } },
        { session }
      );
      if (result?.modifiedCount == 0) {
        throw Error("Stock update failed");
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const productSellItemUpdate = async (req, res, next) => {
  try {
    // Object destructuring
    const { store_id, products, _id } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, async (err) => {
      if (!err) {
        // Check product is available in database
        ProductSell.findById({ _id }, async (err2, result) => {
          if (!err2 && result) {
            let session = await mongoose.startSession();
            try {
              session.startTransaction();
              let { updatedObj, decreasePrice } = await updatedObject(
                result?.products,
                products
              );
              // Update all item totalprice
              await ProductSell.findByIdAndUpdate(
                _id,
                {
                  $inc: { totalPrice: -decreasePrice },
                },
                { session }
              );
              // Call a func for item update
              await updateNewObjOnDB(_id, updatedObj, session);
              // call a func for return product add in stock
              await updateProductStock(updatedObj, session);
              // Save all changes
              await session.commitTransaction();
              session.endSession();
              res
                .status(200)
                .send(SendResponse(true, "Product return successful."));
            } catch (error) {
              await session.abortTransaction();
              session.endSession();
              next(error);
            }
          } else {
            NotFoundError(res, "Sell history not found");
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

module.exports = productSellItemUpdate;
