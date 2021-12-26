const db = require("../models");
const Player = db.player;
const { Op } = require("sequelize");

exports.createPlayer = (req, res)=>{
    Player.create({
        name: req.body.name,
        role: req.body.role,
        id_team: req.body.idTeam
    })
    .then(data=>{
        if(!data){
            return res.status(404);
        }
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error while creating a player " + err.message})
    });
}