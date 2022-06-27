const mongoose = require("mongoose");
const { BackendError, NotFoundError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const ProductSell = require("../../Models/productSell/productSellModel");
const Store = require("../../Models/Store/StoreModel");
const StoreCustomer = require("../../Models/storeCustomer/customerModel");
const MedicinesStock = require("../../Models/storeProduct/medicineStockModel");

const checkAndModifyObj = async (store_id, products) => {
  try {
    // Get all product stock id
    let stocksId = await products?.map((data) => data.stock_id);
    // Find stock product for price calculate
    const productStock = await MedicinesStock.find(
      { store_id, _id: { $in: stocksId } },
      { stock: 1, expireDate: 1, buyingPrice: 1, sellingPrice: 1 }
    );
    // All products price
    let totalPrice = 0;
    // Modify products object with price & expireDate
    let modifiedProducts = await products?.filter(async (data) => {
      let exectProduct = await productStock?.filter(
        (stockData) => stockData._id == data.stock_id
      )[0];
      // Add price & expireDate new property
      data.expireDate = exectProduct?.expireDate;
      data.buyingPrice = exectProduct?.buyingPrice;
      data.sellingPrice = exectProduct?.sellingPrice;
      data.totalPrice = exectProduct?.sellingPrice * data?.quantity;
      if (data.totalPrice > 0 && exectProduct?.stock - data?.quantity >= 0) {
        totalPrice += data?.totalPrice;
        return data;
      }
    });
    return { modifiedProducts, totalPrice };
  } catch (error) {
    throw error;
  }
};

const decreaseStock = async (sellData) => {
  try {
    for (const { stock_id, quantity } of sellData?.products) {
      await MedicinesStock.findByIdAndUpdate(
        { _id: stock_id },
        { $inc: { stock: -quantity } }
      );
    }
  } catch (error) {
    throw error;
  }
};

const productSellAdd = async (req, res, next) => {
  try {
    // Object destructuring
    const { store_id, customer_id, vat, discount, products } = req.body;

    // Check store is available in database
    Store.exists({ _id: store_id }, async (err) => {
      if (!err) {
        // Check customer is available in database
        StoreCustomer.exists({ _id: customer_id }, async (err2) => {
          if (!err2) {
            let session = await mongoose.startSession();
            try {
              session.startTransaction();

              let { modifiedProducts, totalPrice } = await checkAndModifyObj(
                store_id,
                products
              );
              if (totalPrice - vat - discount >= 0) {
                const productSellData = await ProductSell.create(
                  [
                    {
                      customer_id,
                      store_id,
                      products: modifiedProducts,
                      totalItem: modifiedProducts?.length,
                      vat,
                      discount,
                      totalPrice: totalPrice - discount - vat,
                    },
                  ],
                  { session }
                );
                if (productSellData[0]) {
                  await decreaseStock(productSellData[0]);
                  await session.commitTransaction();
                  session.endSession();
                  res
                    .status(201)
                    .send(
                      SendResponse(
                        true,
                        "Product sell successful.",
                        productSellData
                      )
                    );
                } else {
                  await session.abortTransaction();
                  session.endSession();
                  BackendError(res);
                }
              } else {
                await session.abortTransaction();
                session.endSession();
                BackendError(res);
              }
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

module.exports = productSellAdd;
