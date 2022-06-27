const mongoose = require("mongoose");

const productSellSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "StoreCustomers",
    },
    store_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Stores",
    },
    products: [
      {
        product_id: {
          type: mongoose.ObjectId,
          ref: "StoreMedicines",
          required: true,
        },
        stock_id: {
          type: mongoose.ObjectId,
          ref: "MedicineStock",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        expireDate: {
          type: Date,
          required: true,
        },
        buyingPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        sellingPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalItem: {
      type: Number,
      required: true,
      min: 1,
    },
    vat: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
    updatedTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const ProductSell = mongoose.model("ProductSell", productSellSchema);

module.exports = ProductSell;
