const {
  BackendError,
  UnauthorizedError,
} = require("../../Helpers/AllCustomError");
const jwt = require("jsonwebtoken");
const User = require("../../Models/User/UserModel");
const SendResponse = require("../../Helpers/SendResponse");
const SignedTokens = require("../../Models/User/SignedTokens");

const VerifyToken = async (req, res, next) => {
  try {
    const { Auth_token = undefined } = req.cookies;
    // Check token is available or not
    if (Auth_token) {
      // Verify JWT token
      jwt.verify(Auth_token, process.env.JWT_SECRET, (err, { email, id }) => {
        if (err) {
          UnauthorizedError(res);
        } else {
          // Find token data from database
          SignedTokens.findById(
            id,
            { createdTime: 0, updatedTime: 0, store_id: 0, token: 0 },
            (err, tokenData) => {
              if (tokenData?.active && tokenData?.expiresTime >= Date.now()) {
                // Check user is active or not
                User.findById(
                  tokenData?.user_id,
                  { email: 1, active: 1 },
                  (err, userData) => {
                    // Check user active and database email with token email
                    if (userData?.active && email === userData?.email) {
                      // Verify complete and user is valid
                      res
                        .status(200)
                        .send(
                          SendResponse(true, "User verification successful")
                        );
                    } else {
                      UnauthorizedError(res);
                    }
                  }
                );
              } else {
                UnauthorizedError(res);
              }
            }
          );
        }
      });
    } else {
      UnauthorizedError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = VerifyToken;
