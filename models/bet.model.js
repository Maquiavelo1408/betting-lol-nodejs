module.exports = (sequelize, Sequelize)=>{
    const Bet = sequelize.define("bets",{
        match_id: {
            type: Sequelize.INTEGER
        },
        bet_amount: {
            type: Sequelize.DECIMAL(15,2),
            defaultValue: 0.0
        },
        selected_winner: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });
    return Bet;
}