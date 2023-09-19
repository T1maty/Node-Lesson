const User = require('../models/users/user')
const Role = require('../models/users/role')
const bcrypt = require('bcryptjs')
class authController {
    async registation(req, res) {
        try {
            const { username, password } = req.body
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: "A user with the same username already exists " })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: "Great registration user!" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration Error' })
        }

    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration Error' })
        }
    }
    async getUsers(req, res) {
        try {

            res.json("server working")
        } catch (e) {

        }
    }
}

module.exports = new authController()