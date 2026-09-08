const express = require("express");
const sendResponse = require("../../utils/response");

const router = express.Router();

router.get("/", (req, res) => {
  return sendResponse(res, { statusCode:200, success:true, message: "SmartCart API is healthy and running!" }); 

});

module.exports = router;