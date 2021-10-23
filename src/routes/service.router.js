const { Router } = require('express')

const {servicesGet, servicePost} = require('../controllers/service.controller')

const router = Router()

router.get('/', servicesGet)
router.post('/', servicePost)
module.exports = router