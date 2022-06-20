const express = require('express')
const { JobController } = require('../controllers/jobController')
const router = express.Router()
const { authN } = require('../middlewares/authN.js')

router.get('/',JobController.readAllJob)
router.get('/:id',JobController.findOneJob)
router.use(authN)
router.put('/:id',JobController.updateJob)
router.post('/',JobController.createJob)
router.delete('/:id',JobController.deleteJob)
module.exports = router