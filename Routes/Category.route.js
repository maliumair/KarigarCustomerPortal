const express = require('express')
const router = express.Router()
const {getAllCategories} = require('../Controllers/Category.controller')

router.route('/')
.get(getAllCategories)

module.exports = router