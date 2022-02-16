const { Error } = require("mongoose");
const User = require("../Models/User/UserModel");

const StoreCheck = async (req, res, next) => {
  try {
    if (req.body?.userId) {
      // Get the store id from user objects
      const userData = await User.findById(req.body?.userId, { store_id: 1 });
      // Check store is created or not
      if (userData?.store_id) {
        next(new Error("The store has already been created."));
      } else {
        next();
      }
    } else {
      res.status(400).send(SendResponse(false, "Provided data is not valid!"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = StoreCheck;
