const SendResponse = require("../../Helpers/SendResponse");
const Store = require("../../Models/Store/StoreModel");
const Subscription = require("../../Models/Store/SubscriptionModel");
const User = require("../../Models/User/UserModel");

const StoreAdd = async (req, res, next) => {
  try {
    // Check userId is provide or not
    if (req.body?.userId) {
      // Create the store in database
      Store.create(
        {
          storeName: req.body.storeName,
          storeAddress: req.body.storeAddress,
          phone: req.body.phone,
          active: req.body.active,
        },
        async (err, storeData) => {
          if (err) {
            res
              .status(500)
              .send(SendResponse(false, "Found an error from the backend!"));
          } else {
            // Update user object with storeId
            const userUpdate = await User.findByIdAndUpdate(
              req.body?.userId,
              { store_id: storeData._id, active: true },
              { new: true }
            );
            // Check user object update success or not
            if (userUpdate) {
              let expireDate = new Date();
              // Set the expiredate
              expireDate.setMonth(expireDate.getMonth() + 3);

              // Subscription object creating
              await Subscription.create({
                _id: storeData._id,
                expiredTime: expireDate,
              });

              res.status(201).send(
                SendResponse(true, "Store created successfully", {
                  _id: storeData._id,
                  storeName: storeData.storeName,
                  storeAddress: storeData.storeAddress,
                  phone: storeData.phone,
                })
              );
            } else {
              // If the user object not update then delete this store from database
              await Store.findByIdAndDelete({ _id: storeData._id });

              res
                .status(500)
                .send(SendResponse(false, "Found an error from the backend!"));
            }
          }
        }
      );
    } else {
      res.status(400).send(SendResponse(false, "Provided data is not valid!"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = StoreAdd;
