const express = require('express')
const notify = express.Router()
const{notifydateexpectant,notifydevelopmentMilestones} =require('../controllers/notify') //notifyclinicsNotify

notify.get('/profile:username',notifydateexpectant)
notify.get('/devMilestones:',notifydevelopmentMilestones)
// notify.get('/clinicsNotifications:',notifyclinicsNotify)

module.exports = {notify}