const controller = require("../controllers/second_bet.controller");
const { authJwt } = require("../middleware");
module.exports = function(app){
    const router = require("express").Router();
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/secondBet",
    controller.createSecondBet);
}