const controller = require("../controllers/collection.controller");
const { authJwt } = require("../middleware");
module.exports = function (app){
    const router = require("express").Router();
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers"
        );
        next();
    });
    app.post("/api/collection/team",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createTeam);

    app.get("/api/collection/team",
    controller.getTeams);

    app.get("/api/collection/competition",
    controller.getCompetitions);

    app.post("/api/collection/competition",
    controller.createCompetition);
    app.put("/api/collection/team",
    controller.updateTeam);
}