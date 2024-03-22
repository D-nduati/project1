const express = require('express')
const devmilesroute = express.Router()
const {devmilestones} = require('../controllers/devmilescontroller')

devmilesroute.get('/devmilestones',devmilestones)

module.exports = {devmilesroute}