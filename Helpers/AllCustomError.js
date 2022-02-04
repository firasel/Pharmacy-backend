const SendResponse = require("./SendResponse");

const BadReqError = async (res) => {
  await res
    .status(400)
    .send(SendResponse(false, "Provided data is not valid!"));
};

const BackendError = async (res) => {
  await res
    .status(500)
    .send(SendResponse(false, "Found an error from the backend!"));
};

module.exports = { BadReqError, BackendError };
