const express = require('express')
const router = express.Router()

const companyRoute = require('./companyRoute.js')
const jobRoute = require('./jobRoute.js')
const userRoute = require('./userRoute.js')

router.use('/users',userRoute)

// router.use(authN)

router.use('/jobs',jobRoute)
router.use('/companies',companyRoute)


module.exports = router