const db = require("../models");
const Verification = db.verification;
const { Op } = require("sequelize");
const { response } = require("express");
const randtoken = require("rand-token");
const nodemailer = require("nodemailer");

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
      if(data){
        var token = randtoken.generate(20);
        console.log(token);
        console.log(data.dataValues);
        if(data.dataValues.verify == '0'){
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
  
  };
  
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
  };


function sendEmail(email, token){
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'maquialpha@gmail.com',
            pass:'Zolly140899'
        }
    });
    var mailOptions = {
        from: 'maquialpha@gmail.com',
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