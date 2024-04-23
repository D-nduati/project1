const express = require('express');
const { makeprofile, myaccount } = require('../controllers/profilecontroller');
const profileroute = express.Router();


profileroute.post('/profile/:username', makeprofile);
profileroute.post('/myaccount/:username', myaccount);

module.exports = { profileroute };
