exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  const db = require("../models");
  const User = db.user;
  
  exports.updateUser = (req, res) => {
    const idUser = req.params.id;
    console.log(idUser);
    User.update(req.body, {
        where: { id: idUser }
    })
    .then(function(rowsUpdated){
        res.json(rowsUpdated)
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating" + err.message
        });
    });
};