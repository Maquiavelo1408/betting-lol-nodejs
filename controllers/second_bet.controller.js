const db = require("../models");
const SecondBet = db.secondbet;
const User = db.user;
const { Op } = require("sequelize");


exports.createSecondBet = async (req, res) =>{
    betBody = req.body;
    newBalance = 0.0;
    try{
        const bet = await SecondBet.findOne({
            where:{
                [Op.and]:[
                    {id_match: betBody.matchId},
                    {id_user: betBody.userId}
                ]
            }
        }).catch((err)=>{
            throw { message: "Error finding the secondary bet: "+ err.message};
        });
        if(bet){
            throw { message: "Secondary bet already made for this match."};
        }
        const user = await User.findOne({
            where: {
                id: betBody.userId
            }
        }).catch((err)=>{
            throw { message: "Error finding the user: "+ err.message};
        });
        let totalBet=0;
        for(let i = 0; i<betBody.games.length;i++){
            let gameBet = betBody.games[i].gameDurationBet+betBody.games[i].topKill1Bet+betBody.games[i].topKill2Bet+betBody.games[i].dragonSoulBet+betBody.games[i].topDeath1Bet+betBody.games[i].topDeath2Bet+betBody.games[i].gameWinnerBet;
            totalBet = totalBet + gameBet;
        }
        if(user.balance < totalBet){
            throw { message: "Not enough balance to make this secondary bet."};
        }
        for(let i = 0; i< betBody.games.length; i++){
            if(!betBody.games[i].gameWinner){
                continue;
            }
            await SecondBet.create({
            id_match: betBody.matchId,
            id_user: betBody.userId,
            game_number: betBody.games[i].gameNumber,
            game_duration: betBody.games[i].gameDuration,
            game_duration_bet: betBody.games[i].gameDurationBet,
            top_kill_1: betBody.games[i].topKill1,
            tpo_kill_1_bet: betBody.games[i].topKill1Bet,
            top_kill_2: betBody.games[i].topKill2,
            tpo_kill_2_bet: betBody.games[i].topKill2Bet,
            top_death_1: betBody.games[i].topDeath1,
            top_death_1_bet: betBody.games[i].topDeath1Bet,
            top_death_2: betBody.games[i].topDeath2Bet,
            dragon_soul: betBody.games[i].dragonSoul,
            dragon_soul_bet: betBody.games[i].dragonSoulBet,
            game_winner: betBody.games[i].gameWinner,
            game_winner_bet: betBody.games[i].gameWinnerBet

            }).catch((err)=>{
                throw { message: "Error creating the bet: " + err.message};
            });
        }
        
        const balance = user.balance - betBody.betAmount;
        User.update(
            { balance: balance},
            { where: {id: betBody.userId}}
        )
        .catch(err=>{
            res.status(500).send({ message: "Error getting user: " + err.message})
        });
        res.status(200).send({ message: "Secondary bet created successfully."});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};