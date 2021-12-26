const db = require("../models");
const Team = db.team;
const Player = db.player;
exports.getTeams = (req, res)=>{
    Team.findAll()
    .then(team =>{
        if(!team){
            return res.status(404).send({message: "Teams not founded"});
        }
        res.json(team);

    })
    .catch(err=>{
        res.status(500).send({
            message: "Error getting teams: " + err.message
        });
    });
};

exports.getPlayerByTeam = (req, res)=>{
    const idTeam = req.params.id;
    Player.findAll({
        where: {
            id_team: idTeam
        }
    })
    .then(data => {
      if(!data){
          return res.status(404).send({ message: "Players not found with given IdTeam"});
      } 
      res.json(data);
    })
    .catch(err=> {
        res.status(500).send({message: "Error while executing Get Players Team " + err.message})
    });
};

exports.getTeamsByRegion = (req, res) =>{
    const region = req.params.region;
    Team.findAll({
        where: {
            region: region
        }
    })
    .then(data => {
        if(!data){
            return res.status(404).send({ message: "Teams not founded with the given Region"});
        }
        res.json(data);
    })
    .catch(err=> {
        res.status(500).send({message: "Error while executing GetTeamsByRegion " + err.message})
    });
};

exports.getTeamById = (req, res) => {
    Team.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(function(data){
        res.json(data)
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error getting team by id: " +err.message
        })
    });
};
