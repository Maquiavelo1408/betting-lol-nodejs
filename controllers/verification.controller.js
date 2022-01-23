const db = require("../models");
const Verification = db.verification;
const { Op } = require("sequelize");
const { response } = require("express");
const randtoken = require("rand-token");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const veri = await Verification.findOne({
      where: {
        email: email
      }
    }).catch((err) => {
      throw { message: "Error finding the Verification record: " + err.message };
    });
    if (!veri) {
      throw { message: "Error, not a verification." };
    }
    var type = 'success';
    var msg = 'Email already verified';
      var token = randtoken.generate(20);
      console.log(token);
      console.log(veri);
      if (veri.dataValues.verify == '0') {
        var sent = sendEmail(email, token);
        if (sent != '0') {
          Verification.update(
            {
              token: token
            },
            {
              where: { email: email }
            }
          );
        }
    }
    res.json(veri);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyEmail = (req, res) => {
  Verification.findOne({
    where: {
      token: req.query.token
    }
  }).then((data) => {
    Verification.update({
      verify: '1'
    }, {
      where: {
        email: data.email
      }
    })
    res.json(data);
  });
};

exports.createVerification = (req, res) => {
  Verification.create({
    email: req.body.email
  }).catch((err) => {
    throw { message: "Error creating the verification: " + err.message };
  });
  res.status(200).send({ message: "Verification creation" });
};

function sendEmail(email, token) {
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teamdifftest@gmail.com',
      pass: 'Zolly140899@'
    }
  });
  var mailOptions = {
    from: 'teamdifftest@gmail.com',
    to: email,
    subject: 'Email verification - Team Diff',
    html: '<p>You requested for email verificaton, kindly use this <a href="http://localhost:8080/api/auth/verifyEmail?token=' + token + '">link</a> to verify your email address</p>'
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      return 1;
    } else {
      return 0;
    }
  });
}