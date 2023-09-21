const User = require('../models/users/user')
const Role = require('../models/users/role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const jwt = require('jsonwebtoken');
const generateAccessToken = (id,roles) => {
const payload = {
    id,
    roles
}
return jwt.sign(payload,secret, {expiresIn:"1h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Error Registration", errors })
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username }, { projection: { value: 1 } })
            if (candidate && candidate.value && candidate.value.username === username) {
                return res.status(400).json({ message: "User already exists" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "ADMIN" })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: "Great Registration" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }
    async login(req, res) {
        try {
             const {username,password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message:'User ${username} not find'})
            }
            const validPasssword = bcrypt.compareSync(password, user.password)
            if (!validPasssword){
                return res.status(400).json({message:'Password is required'})
            }
            const token = generateAccessToken(user.id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration Error' })
        }
    }
    async getUsers(req, res) {
        try {
             const users =  await User.find()
            res.json(users)
        } catch (e) {

        }
    }
}

module.exports = new authController()