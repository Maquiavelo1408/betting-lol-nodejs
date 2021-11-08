const { authJwt } = require("../middleware");
const controller = require("../controllers/match.controller");

module.exports = function(app){
    const router = require("express").Router();
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/match",
    controller.createMatch);
    app.get("/api/matches",
    controller.getMatchByDate);
    app.get("/api/match/:id",
    controller.getMatchById);
}