const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");
const signToken = require("./signToken");
const { BadReqError, BackendError } = require("../../Helpers/AllCustomError");
const SignedTokens = require("../../Models/user/signedTokens");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (validator.isEmail(email) && validator.isLength(password, { min: 6 })) {
      // Find the user data from database
      const userData = await User.findOne(
        { email: email },
        { password: 1, active: 1, store_id: 1 }
      );
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
                    res.cookie("JWT_Token", token, {
                      httpOnly: true,
                      sameSite: true,
                      maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    res
                      .status(200)
                      .send(SendResponse(true, "Signin successful", { token }));
                  }
                }
              );
            } else {
              BadReqError(res);
            }
          }
        );
      } else {
        BadReqError(res);
      }
    } else {
      BadReqError(res);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = signin;
