const db = require("../models");
const Match = db.match;
const Team = db.team;
const { Op } = require("sequelize");

exports.createMatch = (req, res) => {
    Match.create({
        blue_team: req.body.blue_team,
        red_team: req.body.red_team,
        date: req.body.date
    })
    .then(data=>{
        if(!data){
            return res.status(404);
        }
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error while creating a match " + err.message})
    });
};

exports.getMatchByDate = (req, res) => {
    endDate = req.query.end_date;
    startDate = req.query.start_date;
    Match.findAll({
        where:
        {
            date: {[Op.between]: [startDate, endDate]}
        },
        include: [{
            required: true,
            model: Team,
            as: "team1"
        },
        {
            required: true,
            model: Team,
            as: "team2"
        }]
    })
    .then(data =>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send({ message: "Error getting matches " + err.message})
    });
};

exports.getMatchById = (req, res) =>{
    Match.findOne({
        where:{
            id: req.params.id
        },
        include: [{
            required: true,
            model: Team,
            as: "team1"
        },
        {
            required: true,
            model: Team,
            as: "team2"
        }]
    })
    .then(function(data){
        res.json(data)
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error getting match by id: " +res.message
        })
    });
};