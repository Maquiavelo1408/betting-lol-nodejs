const db = require("../models");
const Team = db.team;
exports.createTeam = (req, res)=>{
    Team.create({
        name: req.body.name,
        color: req.body.color,
        region: req.body.region
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({ message: "Error while creating team " + err.message})
    });
};

exports.getTeams = (req, res) => {
    Team.findAll().
    then(data=>{
        if(!data){
            return res.status(404);
        }
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({ message: "Error while getting the teams " + err.message})
    });
}