const controller = require("../controllers/team.controller");
module.exports = function(app){
    const router = require("express").Router();
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers"
        );
        next();
    });
    app.get("/api/team", controller.getTeams);
    app.get("/api/team/player/:id", controller.getPlayerByTeam);
    app.get("/api/team/:id", controller.getTeamById);
    app.get("/api/team/:region", controller.getTeamsByRegion);
}