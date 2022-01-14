module.exports = (sequelize, Sequelize)=>{
    const Verification = sequelize.define("verifications",{
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        verify: {
            type: Sequelize.STRING,
            defaultValue: '0'
        }
    })
}