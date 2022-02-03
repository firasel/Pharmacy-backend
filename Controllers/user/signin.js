const validator = require("validator");
const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (validator.isEmail(email) && validator.isLength(password, { min: 6 })) {
      console.log(email, password);

      const userData =await User.findOne({email:email},{password:1,active:1});
      console.log(userData);

      res.status(200).send(SendResponse(true, "Signin successful"));
    } else {
      res.status(400).send(SendResponse(false, "Provided data is not valid!"));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = signin;
