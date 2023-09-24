const Router = require('express');
const router = new Router()
const controller = require('../controller/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
  check('username', "Field cannot be empty").notEmpty(),
    check('password', "Password size is 4 or 10 symbol").isLength({min:4 , max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)


module.exports = router