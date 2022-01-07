const db = require("../models");
const Team = db.team;
const Competition = db.competition;
const { Op } = require("sequelize");
//#region Teams
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
        res.status(500).send({ message: "Error while creating team " + err.message});
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
        res.status(500).send({ message: "Error while getting the teams " + err.message});
    });
};
//#endregion

//#region Competitions
exports.getCompetitions = (req, res) =>{
    Competition.findAll().
    then(data=>{
        if(!data){
            return res.status(404);
        }
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({ message: "Error while gettint the competitions: " + err.message});
    });
};

exports.createCompetition = (req, res) => {
    Competition.create({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        region: req.body.region,
        organizer: req.body.organizer,
        country: req.body.country,
        name: req.body.name
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        return res.status(500).send({message: "Error creation a competition: " + err.message});
    });
};

exports.getCompetitionsByRegion = (req, res) =>{
    region = req.query.region;
    Competition.findAll({
        where:{
            region: {
                [Op.like]: region
            }
        }
    })
    .then(data =>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).send({ message: "Error getting matches: " + err.message})
    });
};

//#endregion


