const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
var corsOptions ={
    origin: "*"
};

app.use(cors(corsOptions));

const db = require("./models");
console.log(db);
const Role = db.role;
const Team = db.team;
const Player = db.player;

db.sequelize.sync({alter: true}).then(() =>{ //Dont drop existing tables
//db.sequelize.sync({force: true}).then(() =>{  // Delete tables if existing 
    console.log('Drop and Resinc DB');
  //  initial();
    //createTeam();
});

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true}));

app.get("/", (req, res) =>{
    res.json({message: "Welcome"});
});

// routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/team.routes.js')(app);
require('./routes/match.routes.js')(app);
require("./routes/bet.routes.js")(app);
require('./routes/collection.routes')(app);
require('./routes/player.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});






function initial(){
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}

function createTeam(){
    Team.create({
        id: 1,
        name: "T1",
        color: "radial-gradient(circle, rgba(36,0,5,0) 0%, rgba(226,11,75,0.80015756302521) 35%, rgba(226,11,47,1) 100%)",
        region: "KR"
    });
    Team.create({
        id: 2,
        name: "DWG",
        color: "blue",
        region: "KR"
    });
    Team.create({
        id: 3,
        name: "FNATIC",
        color: "rgba(255,87,3,0.1250875350140056) 0%, rgba(255,87,3,0.5956757703081232) 35%, rgba(255,87,3,1) 100%)",
        region: "EUW"
    });
    Player.create({
        id: 1,
        name: "Faker",
        id_team: "1"
    });
    Player.create({
        id: 2,
        name: "Showmaker",
        id_team: 2
    });
    Player.create({
        id: 3,
        name: "Gumayusi",
        id_team: 1
    })
}