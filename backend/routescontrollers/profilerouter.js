const express = require('express')
const {makeprofile,myaccount}=require('../controllers/profilecontroller')
const profileroute = express.Router()

//get all profiles 

profileroute.post('/profile',makeprofile)
profileroute.post('/myaccount',myaccount)

module.exports = {profileroute}