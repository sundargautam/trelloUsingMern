const db = require("../model/index");
const User = db.user;
const { body } = require('express-validator');
const signUpBodyValidator = [body('username').isLength({
    min:6,max:12
}).not().isEmpty(),body('email').isEmail().not().isEmpty(),body('password').isLength({min:6,max:25}).not().isEmpty()];

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  signUpBodyValidator
};

module.exports = verifySignUp;