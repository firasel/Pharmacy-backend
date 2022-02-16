const jwt = require("jsonwebtoken");
const SignToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = SignToken;
