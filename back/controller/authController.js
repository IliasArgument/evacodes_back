const UserLogin = require('../models/UserLogin');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require("../config")
const catchAsync = require("../utils/catchAsync");
const { promisify } = require('util');


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "10h" })
}

class authController {

    async registration(req, res) {
        console.log(req.body)
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { username, password } = req.body

            const candidate = await UserLogin.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким именем существует' })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'user' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save()
            return res.json({ message: 'Пользователь успешно зарегестрирован' })
        }
        catch (e) {
            res.status(400).json({ message: 'Registration Error' })
        }
    }

    // user1
    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log(req.body, 'reqauth')
            const user = await UserLogin.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль' })
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })
        } catch (e) {
            res.status(400).json({ message: 'Login Error' })
        }
    }
   

    protect = catchAsync(async (req, res, next) => {
        // 1) Getting token and check of it's there
        try {

            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1];
                console.log(token, 'tokeframe')
            }

            if (!token) {
                return res.status(401).json({
                    error: "unauthorized",
                    message: "please login",
                });
            }

            // 2) Verification token
            const decoded = await promisify(jwt.verify)(token, secret);

            // 3) Check if user still exists
            const currentUser = await UserLogin.findById(decoded.id);
            console.log(currentUser, 'JWT JWT')
            if (!currentUser) {
                return next(
                    new Error(
                        "The user belonging to this token does no longer exist.",
                        401
                    )
                );
            }
            req.user = currentUser;
            next();
        } catch (error) {
            console.log(error)
            return next(
                new Error(
                    "something went wrong",
                    401
                )
            );
        }
    });

    async getUsers(req, res) {
        try {
            const user = await UserLogin.find()
            return res.json(user)
        } catch (e) {
        }
    }
}

module.exports = new authController()