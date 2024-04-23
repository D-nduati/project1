const express = require('express')
const adminroute = express.Router()

const {recentUsers,generateReport} = require('../controllers/admincontroller')

adminroute.get('/recentUsers',recentUsers)
adminroute.post('/generateReport',generateReport)

module.exports = {adminroute}