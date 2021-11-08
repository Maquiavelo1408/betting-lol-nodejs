const { bet } = require("../models");
const db = require("../models");
const User = db.user;
const Bet = db.bet;
const { Op } = require("sequelize");

exports.createBet = async (req, res)=>{
    betBody = req.body;
    newBalance = 0.0;
    Bet.findOne({
        where: {
            [Op.and]: [
                {match_id: betBody.matchId},
                {user_id: betBody.userId}
            ]
        }
    }).then(data=>{
        if(data){
            return res.status(500).send({message: "Bet already made for this match"});
        }
    });
    balnce = await User.findOne({
        where:{
            id: betBody.userId
        }
    })
    .then(data=>{
        if(data.balance < betBody.betAmount){
            return res.status(500).send({ message: "Not enough balance to make that bet."});
        }
        return data.balance;
    })
    .catch(err=>{
        return res.status(500).send({ message : "Error getting the user in the bet creation: " + err.message})
    });
    Bet.create({
        match_id: betBody.matchId,
        bet_amount: betBody.betAmount,
        selected_winner: betBody.teamSelect,
        user_id: betBody.userId
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        return res.status(500).send({ message: "Error creating the bet: " + err.message})
    });
    newBalance = balnce - betBody.betAmount;
    User.update(
        { balance: newBalance},
        { where: {id: betBody.userId}}
    )
    .catch(err=>{
        res.status(500).send({ message: "Error getting user: " + err.message})
    });
};

exports.getBetRate = async (req, res)=>{
    redMoney = 0;
    blueMoney = 0;
    redMoney = await Bet.sum('bet_amount',
    {
        where:{
            selected_winner: 0
        }
    }).then(sum=>{
        return sum;
    });
    blueMoney = await Bet.sum('bet_amount',
    {
        where:{
            selected_winner: 1
        }
    }).then(sum=>{
        return sum;
    });
    total = blueMoney + redMoney;
    redRate = total / redMoney;
    blueRate = total / blueMoney;
    var response = {};
    response['bet_rate'] = [];
    data = {
        red_rate: redRate,
        blue_rate: blueRate,
        total: total
    };
    res.json(data);
};