const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/userModel");

const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      active: req.body.active,
      createdTime: req.body.createdTime,
      updatedTime: req.body.updatedTime,
    });

    res.status(201).send(SendResponse(true, "User created succesfull", user));
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
