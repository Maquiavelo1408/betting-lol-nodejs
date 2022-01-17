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
                    {match_id: betBody.matchId},
                    {user_id: betBody.userId}
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
        if(user.balance < betBody.betBody.betAmount){
            throw { message: "Not enough balance to make this secondary bet."};
        }
        await SecondBet.create({
            match_id: betBody.matchId,
        bet_amount: betBody.betAmount,
        selected_winner: betBody.teamSelect,
        user_id: betBody.userId
        }).catch((err)=>{
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
        res.status(200).send({ message: "Secondary bet created successfully."});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};