const express = require('express')
const devmilesroute = express.Router()
const {devmilestones,updateChecklistItem} = require('../controllers/devmilescontroller')

devmilesroute.get('/devmilestones',devmilestones)
devmilesroute.put('/devmilestones/updateChecklistItem/:itemId', updateChecklistItem)



module.exports = {devmilesroute}