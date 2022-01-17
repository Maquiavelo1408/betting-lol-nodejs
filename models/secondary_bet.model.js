const {sequelize, Sequelize} = require(".");

module.exports = (sequelize, Sequelize) => {
    const SecondBet = sequelize.define("second_bets",{
        game_duration: {
            type: Sequelize.STRING
        },
        top_kill_1: {
            type: Sequelize.STRING
        },
        top_kill_2: {
            type: Sequelize.STRING
        },
        dragon_soul: {
            type: Sequelize.STRING
        },
        top_death_1: {
            type: Sequelize.STRING
        },
        top_death_2: {
            type: Sequelize.STRING
        },
        id_user:{
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        },
        game_number:{
            type: Sequelize.INTEGER
        },
        id_match:{
            type: Sequelize.INTEGER
        }
    });
    return SecondBet;
}