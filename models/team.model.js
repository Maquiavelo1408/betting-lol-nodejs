const { sequelize, Sequelize } = require(".");
const db = require ("../models");
const match = db.match;
module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("teams", {
        name: {
            type: Sequelize.STRING
        },
        primary_color: {
            type: Sequelize.STRING
        },
        secondary_color: {
            type: Sequelize.STRING,
        },
        region: {
            type: Sequelize.STRING
        }
    });
    /*Team.associate = function(db){
        
    }*/
    /*
    Team.associate = function(models){
        Team.belongTo(match);
    }*/
    //Team.belongsTo(match);
    return Team;
}