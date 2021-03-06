const { sequelize, Sequelize } = require(".");
const db = require ("../models");
var team  = db.team;

module.exports = (sequelize, Sequelize) => {
    const Match = sequelize.define("matches", {
        blue_team: {
            type: Sequelize.INTEGER
        },
        red_team: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE
        },
        match_type:{
            type: Sequelize.INTEGER
        },
        id_competition:{
            type: Sequelize.INTEGER
        },
        result: {
            type: Sequelize.BOOLEAN
        },
        match_link:{
            type: Sequelize.STRING,
            defaultValue: false
        }
    });
    //Match.hasMany(team);
     /*Match.associate = function(models){
        Match.hasMany(team);
        //Match.hasMany(models.team, { foreignKey: "id", sourceKey: 'red_team'});
    }*/
    return Match;
}