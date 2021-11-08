const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const compression = require('compression');
var helmet = require('helmet');

const app = express();
var corsOptions ={
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(compression);
app.use(helmet);

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
        color: "red",
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
        color: "yellow",
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