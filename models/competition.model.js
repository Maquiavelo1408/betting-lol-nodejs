const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize)=>{
    const Competition = sequelize.define("competitions",{
        start_date: {
            type: Sequelize.DATE
        },
        end_date:{
            type: Sequelize.DATE
        },
        region:{
            type: Sequelize.STRING
        },
        organizer:{
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Competition
}