const express = require('express')
const {getServiceById, getAllServices, getServicesByCategory} = require("../Controllers/Service.controller")
const router = express.Router()

router.route('/')
.get(getAllServices)

router
.route('/:id')
.get(getServiceById)
router.get('/category/:category', getServicesByCategory)


module.exports = router