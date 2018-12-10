const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../user/user.model');
const APIError = require('../../helpers/APIError');
const config = require('../../config');
const nodemailer = require('nodemailer');

/**
 * Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
function login(req, res, next) {
  User.getByEmailAndClientId(req.body.email,req.body.ClientId)
    .then((foundUser) => {
      if (!foundUser) {
        const err = new APIError('User not found', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
      if(foundUser.isActive === 0){
        const err = new APIError('User not verified', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
      if (!foundUser.validPassword(req.body.password)) {
        const err = new APIError('User email and password combination do not match', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
      const token = jwt.sign(foundUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });
      return res.json({
        token,
        user: foundUser.safeModel(),
      });
    })
    .catch(err => next(new APIError(err.message, httpStatus.NOT_FOUND)));
}

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {User}
 */
function register(req, res, next) {
  const user = new User(req.body);
  User.getEmailAndRole(req.body.email)
    .then((foundUser) => {
      if (foundUser) {
        return Promise.reject(new APIError('Email must be unique', httpStatus.CONFLICT, true));
      }
      user.password = 'WrongPassword';
      user.salt = 'WrongPassword';
      return user.save();
    })
    .then((savedUser) => {
      const token = jwt.sign(savedUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });
      sendMail(req,'Verify your account',token);
      return res.json({
          token,
          message:'Mail Sent'
       });
    })
    .catch(e => next(e));
}

function createLinkfornewPassword(req,res,next){
  debugger;
  User.getByEmailAndClientId(req.body.email,req.body.ClientId)
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject(new APIError('Email not found', httpStatus.CONFLICT, true));
      }
      const token = jwt.sign(foundUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });
      sendMail(req,'Create new password',token);
      return res.json({
        token,
        message:'Email Sent'
      });
    })
    .catch(e => next(e));
}

function createNewPassword(req, res, next){
  const user = jwt.verify(req.body.token, config.jwtSecret);
  User.getByEmailAndClientId(user.email,user.id).then((foundUser)=>{
    const userObj = new User(foundUser);
    const genPass = userObj.generatePassword(req.body.newPassword)
    foundUser.password = genPass.hashPassword;
    foundUser.salt = genPass.salt;
    return foundUser.save();
  }).then(savedUser => res.json(savedUser.safeModel()))
  .catch(e => next(e));  
} 

function sendMail(req,subject,secret){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'suhagtest@gmail.com',
      pass: 'SuhagTest88'
    }
  });  

  const mailOptions = {
    from: 'suhagTest@gmail.com',
    to: req.body.email,
    subject: subject,
    html: `<a href='http://localhost:4200/forgotpassword/${secret}'>http://localhost:4200/forgotpassword/${secret}+</a>`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { login, register , createNewPassword ,createLinkfornewPassword };
