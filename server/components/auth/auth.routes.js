const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const authCtrl = require('./auth.controller');

const router = express.Router(); // eslint-disable-line new-cap
const paramValidation = {
  login: {
    body: {
      ClientId: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
  registerUser: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role : Joi.number().required()
    },
  },
  createNewPassword : {
    body :{ 
      newPassword: Joi.string().required(),
    },
  },
  createLinkfornewPassword : { 
    body : { 
      email: Joi.string().email().required()
    }
  }
};

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** POST /api/auth/register - Register a new user */
router.route('/register')
  .post(validate(paramValidation.registerUser), authCtrl.register);

router.route('/createNewPassword')
  /** PUT /api/auth/createNewPassword - Create new password for user*/
  .put(validate(paramValidation.createNewPassword),authCtrl.createNewPassword)

router.route('/createLinkfornewPassword')
  /** PUT /api/auth/createLinkfornewPassword - Create link new password for user*/
  .post(validate(paramValidation.createLinkfornewPassword),authCtrl.createLinkfornewPassword)

module.exports = router;
