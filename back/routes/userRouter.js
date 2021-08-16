const Router = require('express')
const router = new Router()
const authController = require('../controller/authController')
const userController = require('../controller/userController')
const userChangeData = require('../controller/userChangeData')

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

router
    .route('/interview')
    .post(userController.dataUserInterview)

router
    .route('/change/name')
    .post(userChangeData.postChangeNameUser)
router
    .route('/change/skills')
    .post(userChangeData.postChangeSkillsUser)
router
    .route('/change/stack')
    .post(userChangeData.postChangeStackUser)
router
    .route('/change/description')
    .post(userChangeData.postChangeDescriptionUser)

module.exports = router