const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        }
    });
    return User;
};