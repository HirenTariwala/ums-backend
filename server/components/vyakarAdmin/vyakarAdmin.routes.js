const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const vyakarCntrl = require('./vyakarAdmin.controller');

const router = express.Router();

const paramValidation = {
    createNewVyakar: {
      body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
      },
    },
    login: {
      body: {
        email: Joi.string().required(),
        password : Joi.string().required()
      },
    },
    updateVyakar : {
      body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        id: Joi.number().required(),
      }
    },
    deleteVyakar:{
      body: {
        id: Joi.number().required(),
      }
    },
    updatePassword : {
      body: {
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
      },
    }
};

router.route('/profile')
    /** GET /api/secret/vyakarAdmin/profile - get vyakar admin profile */
    .get(vyakarCntrl.getProfile)

router.route('/createNewVyakar')
    /** POST /api/secret/vyakarAdmin/createNewVyakar - create New vyakar admin */
    .post(validate(paramValidation.createNewVyakar),vyakarCntrl.createNewVyakar)
    
router.route('/updateVyakar')
    /** PUT /api/secret/vyakarAdmin/updateVyakar - Update vyakar admin */
    .put(validate(paramValidation.updateVyakar),vyakarCntrl.updateVyakar)  
    
router.route('/deleteVyakar')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .delete(validate(paramValidation.deleteVyakar),vyakarCntrl.deleteVyakar)

router.route('/getAllClient')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllClient)

router.route('/getAllClientAdmin/:ClientId')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllClientAdminByClientId)
  
router.route('/getAllUser/:ClientId')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllUserByClientId)   

router.route('/getAllCleintUser/:ClientId')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllClientUserByClientId)

router.route('/getAllClientUser')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllClientUser)

router.route('/getAllClientAdmin')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllClientAdmin)

router.route('/getAllVyakar')
    /** POST /api/secret/vyakarAdmin/deleteVykar - Delete vyakar admin */
    .get(vyakarCntrl.getAllVyakar)

router.route('/updatePassword')
    /** PUT /api/secret/vyakarAdmin/updatePassword - Update Password vyakar admin */
    .put(validate(paramValidation.updatePassword),vyakarCntrl.updatePassword)

module.exports = router