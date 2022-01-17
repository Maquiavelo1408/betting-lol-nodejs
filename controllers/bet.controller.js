const { bet } = require("../models");
const db = require("../models");
const User = db.user;
const Bet = db.bet;
const { Op } = require("sequelize");

exports.createBet = async (req, res)=>{
    betBody = req.body;
    newBalance = 0.0;
    try{
    const bet = await Bet.findOne({
        where: {
            [Op.and]: [
                {match_id: betBody.matchId},
                {user_id: betBody.userId}
            ]
        }
    }).catch((err)=> {
        throw { message: "Error finding the bet: " + err.message};
    });
    if(bet){
        throw { message: "Bet already made for this match."};
    }
    const user = await User.findOne({
        where: {
            id: betBody.userId
        }
    }).catch((err)=>{
        throw { message: "Error finding the user: " + err.message};
    });
    if(user.balance < betBody.betAmount){
        throw { message: "Not enough balance to make that bet."};
    }
    await Bet.create({
        match_id: betBody.matchId,
        bet_amount: betBody.betAmount,
        selected_winner: betBody.teamSelect,
        user_id: betBody.userId
    })
    .catch((err)=>{
        throw { message: "Error creating the bet: " + err.message};
    });
    const balance = user.balance - betBody.betAmount;
    User.update(
        { balance: balance},
        { where: {id: betBody.userId}}
    )
    .catch(err=>{
        res.status(500).send({ message: "Error getting user: " + err.message})
    });
    res.status(200).send({ message: "Bet created successfully."});
}
catch(errror){
    res.status(500).json({ message: errror.message});
}
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