const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../Helpers/AllCustomError");

const tokenVerify = (req, res, next) => {
  try {
    const { Auth_token } = req.cookies;
    if (Auth_token) {
      jwt.verify(Auth_token, process.env.JWT_SECRET, (error, { email, id }) => {
        if (!error && email) {
          next();
        } else {
          UnauthorizedError(res);
        }
      });
    } else {
      UnauthorizedError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = tokenVerify;
