const express = require('express')
const { CompanyController } = require('../controllers/companyController')
const router = express.Router()
const { authN } = require('../middlewares/authN.js')

router.get('/',CompanyController.readAllCompany)
router.use(authN)
router.post('/',CompanyController.createCompany)
router.delete('/:id',CompanyController.deleteCompany)
module.exports = router