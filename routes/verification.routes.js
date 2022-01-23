const { authJwt } = require("../middleware");
const controller = require("../controllers/verification.controller");




module.exports = function(app) {
  const router = require("express").Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/send-email",
  controller.sendEmail);
  
  app.get("/api/auth/verifyEmail",
  controller.verifyEmail);

  app.post("/api/auth/createVerification",
  controller.createVerification);
};
