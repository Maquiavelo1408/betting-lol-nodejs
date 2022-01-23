const db = require("../models");
const Result = db.result;
const User = db.user;
const Match = db.match;
const { Op } = require("sequelize");

exports.setResults = async (req, res)=>{
    resBody = req.body;
    try{
        const match = await Match.findOne({
            where:{
                id: resBody.matchId
            }
        }).catch((err)=>{
            throw { message: "Error finding the match: " + err.message};
        });
        if(!match){
            throw { message: "Error, the given Id doesnt belong to an existing Match"};
        }
        const result = await Result.findOne({
            where: {
                match_id: resBody.matchId
            }
        }).catch((err)=>{
            throw { message: "Error finding if the result is already stored. " + err.message};
        });
        if(result)
        {
            throw { message: "The results for this match is already stored."};
        }
        for(let i = 0; i < resBody.results.length; i++){
            console.log(i);
            if(!resBody.results[i].winner)
            {
                continue;
            }
            await Result.create({
                match_id: resBody.matchId,
                winner: resBody.results[i].winner,
                kill_red_team: resBody.results[i].topKill1,
                kill_blue_team: resBody.results[i].topKill2,
                death_red_team: resBody.results[i].topDeath1,
                death_blue_team: resBody.results[i].topDeath2,
                game_number: resBody.results[i].gameNumber,
                game_duration: resBody.results[i].minutes+ ":" + resBody.results[i].seconds,
                dragon_soul: resBody.results[i].dragonSoul
            }).catch((err)=>{
                throw { message: "Error creatiing the results: " +err.message};
            });

        }
        res.status(200).send({ message: "Results setted."});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
};

exports.processResults = async (req, res) =>{
    
};
