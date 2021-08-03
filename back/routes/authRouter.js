const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')
// const { check } = require("express-validator")
// const roleMiddleware = require('./middleware/roleMiddleware')

router
    .route('/autorization')
    .post(authController.login)

module.exports = router