const express = require('express')
const {createNewService, getServiceById, getAllServices, updateService, getServicesByCategory} = require("../Controllers/Service.controller")
const router = express.Router()

router.route('/')
.get(getAllServices)
.post(createNewService)

router
.route('/:id')
.get(getServiceById)
.patch(updateService)

router.get('/category/:category', getServicesByCategory)


module.exports = router