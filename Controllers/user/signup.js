const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");
const userRoleModel = require("../../Models/user/userRoleModel");

const signup = async (req, res, next) => {
  try {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
      },
      (err, userData) => {
        if (err) {
          if (err.code === 11000) {
            res
              .status(409)
              .send(
                SendResponse(false, "This email address is already exists!")
              );
          } else {
            res
              .status(500)
              .send(SendResponse(false, "Found an error from the backend!"));
          }
        } else {
          // Declare the user role depend on user type
          let roleData =
            userData.role === "admin"
              ? { admin: true, account: true, sales: true, purchase: true }
              : { admin: false, account: false, sales: true, purchase: false };

          // Insert the user role object in database
          userRoleModel.create(
            {
              _id: userData._id,
              ...roleData,
            },
            (err, result) => {
              // Check and send the response
              if (err) {
                res
                  .status(500)
                  .send(
                    SendResponse(false, "Found an error from the backend!")
                  );
              } else {
                res.status(201).send(
                  SendResponse(true, "User created successfully", {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    active: userData.active,
                    role: userData.role,
                  })
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
