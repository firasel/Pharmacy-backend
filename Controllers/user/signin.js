const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");
const signToken = require("./signToken");
const {
  BadReqError,
  BackendError,
  ForbiddenError,
  UnauthorizedError,
} = require("../../Helpers/AllCustomError");
const SignedTokens = require("../../Models/user/signedTokens");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Chech user inputs
    if (validator.isEmail(email) && validator.isLength(password, { min: 6 })) {
      // Find the user data from database
      const userData = await User.findOne(
        { email: email },
        { password: 1, active: 1, store_id: 1 }
      );

      // Check user is available
      if (userData) {
        // Check user is active or not
        if (userData?.active) {
          // Check password is correct or not
          bcrypt.compare(
            password,
            userData?.password,
            async (err, matchResult) => {
              if (matchResult) {
                // Generate Id
                const id = new mongoose.Types.ObjectId();
                // Generate the JWT token
                const token = await signToken({ email, id });
                // Store this token in database
                SignedTokens.create(
                  {
                    _id: id,
                    user_id: userData?._id,
                    store_id: userData?.store_id,
                    token,
                  },
                  async (err, tokenData) => {
                    if (err) {
                      BackendError(res);
                    } else {
                      // Expire date calculate
                      const date = new Date();
                      date.setMonth(date.getMonth() + 2);

                      res.cookie("Auth_token", token, {
                        httpOnly: true,
                        secure: false,
                        expires: date,
                      });

                      res
                        .status(200)
                        .send(SendResponse(true, "Signin successful"));
                    }
                  }
                );
              } else {
                UnauthorizedError(res);
              }
            }
          );
        } else {
          ForbiddenError(res);
        }
      } else {
        UnauthorizedError(res);
      }
    } else {
      BadReqError(res, "Provided data is not valid.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
