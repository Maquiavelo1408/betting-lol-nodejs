const {sequelize, Sequelize} = require(".");

module.exports = (sequelize, Sequelize) => {
    const SecondBet = sequelize.define("second_bets",{
        game_duration: {
            type: Sequelize.STRING
        },
        game_duration_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        top_kill_1: {
            type: Sequelize.STRING
        },
        top_kill_1_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        top_kill_2: {
            type: Sequelize.STRING
        },
        top_kill_2_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        dragon_soul: {
            type: Sequelize.STRING
        },
        dragon_soul_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        top_death_1: {
            type: Sequelize.STRING
        },
        top_death_1_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        top_death_2: {
            type: Sequelize.STRING
        },
        top_death_2_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        id_user:{
            type: Sequelize.INTEGER
        },
        game_number:{
            type: Sequelize.INTEGER
        },
        id_match:{
            type: Sequelize.INTEGER
        },
        game_winner: {
            type: Sequelize.INTEGER
        },
        game_winner_bet:{
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        }
    });
    return SecondBet;
}