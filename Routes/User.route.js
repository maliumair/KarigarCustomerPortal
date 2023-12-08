const express = require('express')
const router = express.Router()
const {createNewUser, getUserById} = require('../Controllers/User.controller')

router.route('/')
.post(createNewUser)

router.get('/:id', getUserById)

module.exports = router