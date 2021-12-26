const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize)=>{
    const Player = sequelize.define("players", {
        name: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        id_team:{
            type: Sequelize.INTEGER
        }
    });
    return Player;
}