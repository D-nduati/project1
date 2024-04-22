const express = require('express')
const adminroute = express.Router()

const {recentUsers,generateReport} = require('../controllers/admincontroller')

adminroute.get('/recentUsers',recentUsers)
adminroute.get('/generateReport',generateReport)

module.exports = {adminroute}