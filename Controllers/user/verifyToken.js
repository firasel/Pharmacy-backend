const { BadReqError, BackendError } = require("../../Helpers/AllCustomError");
const jwt = require("jsonwebtoken");
const User = require("../../Models/user/userModel");
const SendResponse = require("../../Helpers/SendResponse");
const SignedTokens = require("../../Models/user/signedTokens");
const Store = require("../../Models/store/storeModel");

const verifyToken = async (req, res, next) => {
  try {
    const { JWT_Token = undefined } = req.cookies;
    // Check token is available or not
    if (JWT_Token) {
      // Verify JWT token
      jwt.verify(JWT_Token, process.env.JWT_SECRET, (err, { email, id }) => {
        if (err) {
          BackendError(res);
        } else {
          // Find token data from database
          SignedTokens.findById(
            id,
            { createdTime: 0, updatedTime: 0 },
            (err, tokenData) => {
              if (tokenData?.active) {
                // Check store is active or not
                Store.findById(
                  tokenData?.store_id,
                  { active: 1 },
                  (err, storeData) => {
                    if (storeData?.active) {
                      // Check user is active or not
                      User.findById(
                        tokenData?.user_id,
                        { email: 1, active: 1 },
                        (err, userData) => {
                          // Check user active and database email with token email
                          if (userData?.active && email === userData?.email) {
                            res
                              .status(200)
                              .send(
                                SendResponse(
                                  true,
                                  "User verification successful"
                                )
                              );
                          } else {
                            BackendError(res);
                          }
                        }
                      );
                    } else {
                      BackendError(res);
                    }
                  }
                );
              } else {
                BackendError(res);
              }
            }
          );
        }
      });
    } else {
      BackendError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
