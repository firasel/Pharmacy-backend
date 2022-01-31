const SendResponse = require("./SendResponse");

const ErrorFunction = async(err, req, res, next) => {
  if(err.code === 11000){
    res.status(500).send(SendResponse(false,"Email is already used"))
  }  
  else if (err) {
      res.status(500).send("Found an error from backend!");
    }
  }
module.exports = ErrorFunction;