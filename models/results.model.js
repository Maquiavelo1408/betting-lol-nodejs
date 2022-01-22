const { sequelize, Sequelize} = require(".");

module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("results",{
        match_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        winner: {
            type: Sequelize.INTEGER
        },
        kill_red_team: {
            type: Sequelize.STRING
        },
        kill_blue_team:{
            type: Sequelize.STRING
        },
        death_red_team:{
            type: Sequelize.STRING
        },
        death_blue_team:{
            type: Sequelize.STRING
        },
        game_number: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        game_duration:{
            type: Sequelize.STRING
        },
        dragon_soul:{
            type: Sequelize.STRING
        }
    });
    return Result;
}