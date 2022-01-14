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
  const Verification = db.verification;
  const randtoken = require('rand-token')
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

exports.sendEmail = (req, res) =>{
  const email = req.body.email;
  Verification.findOne({
    where: {
      email: email
    }
  })
  .then(function(data){
    var type = 'success';
    var msg = 'Email already verified';
    if(data > 0){
      var token = randtoken.generate(20);
      if(data.verify == 0){
        var sent = sendEmail(email, token);
        if(sent != '0'){
          Verification.update(
            {
              token: token
            },
            {
              where: {email: email}
            }
          );
        }
      }
    }
    res.json(data);
  });

}

exports.verifyEmail = (req, res) =>{
  Verification.findOne({
    where: {
      token: req.query.token
    }
  }).then((data)=>{
    Verification.update({
      verify: '1'
    },{
    where: {
      email: data.email
    }
  })
  res.json(data);
  });
}
function sendEmail(email, token){
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user:'rraygoza1408@gmail.com',
          pass:'Zolly140899@'
      }
  });
  var mailOptions = {
      from: 'rraygoza1408@gmail.com',
      to: email,
      subject: 'Email verification - Team Diff',
      html:'<p>You requested for email verificaton, kindly use this <a href="http://localhost:3000/verify-email?token=' + token + '">link</a> to verify your email address</p>'
  };
  mail.sendMail(mailOptions, function(error, info){
      if(error){
          return 1;
      } else{
          return 0;
      }
  });
}