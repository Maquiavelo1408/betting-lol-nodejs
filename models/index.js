const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: '3307',
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acqure: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.player = require("../models/player.model.js")(sequelize, Sequelize);
db.team = require("../models/team.model.js")(sequelize, Sequelize);
db.match = require("../models/match.model.js")(sequelize, Sequelize);
db.bet = require("../models/bet.model.js")(sequelize, Sequelize);
db.competition = require("../models/competition.model.js")(sequelize, Sequelize);
db.verification = require("../models/verification.model.js")(sequelize, Sequelize);
db.secondbet = require("../models/secondary_bet.model.js")(sequelize, Sequelize);
db.result = require("../models/results.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "userId"
});

db.user.belongsToMany(db.role,{
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.team.hasMany(db.match, {
    foreignKey: 'red_team',
    as: "team1"
});
db.match.belongsTo(db.team,{
    as:"team1",
    foreignKey:"red_team"
});
db.team.hasMany(db.match,{
    as: 'team2',
    foreignKey: 'blue_team'
});
db.match.belongsTo(db.team,{
    as:"team2",
    foreignKey:"blue_team"
});

db.match.belongsTo(db.competition,{
    as: "competition",
    foreignKey:"id_competition"
});
/*
db.match.belongsTo(db.team, {
    foreignKey: "red_team",
});

db.match.belongsTo(db.team, {
    foreignKey: "blue_team",
});

db.team.hasMany(db.match,{
    foreignKey: "id",
    as: "team1"
});
db.team.hasMany(db.match,{
    foreignKey: "id",
    as: "team2"
});*/


/*db.match.hasMany(db.team);
db.team.belongsTo(db.match, { as: 'MatchTeam', contraints: false});*/
/*db.team.hasMany(db.match, {
    foreignKey: "blue_team"
});
db.team.hasMany(db.match, {
    foreignKey: "red_team"
});
db.team.hasMany(db.player, {
    foreignKey: "id_team"
});*/


db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

