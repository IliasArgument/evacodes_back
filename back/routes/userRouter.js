const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')
const userController = require('../controller/userController')

router
    .route('/user')
    .post(authController.protect, userController.postUserData)

router
    .route('/users')
    .get(userController.getUserData)

router
    .route('/users/:id')
    .delete(userController.deleteUserData)

router
    .route('/upload/:cv')
    .get(userController.getUserCv)

module.exports = router