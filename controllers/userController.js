const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @swagger
 * /registerUser:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Invalid input
 */
const registerUser = async (req, res) => {
    try {
        if (String(req.body.password).length <= 8 || String(req.body.password).length > 16) {
            res.status(403).json({
                "msg": "Password length must be between 8 to 16 charecters"
            })
        }
        if (req.body.password == undefined || req.body.username == undefined) {
            res.status(403).json({
                "msg": "Username or Password not defined"
            })
        }
        const body = {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        }
        const user = new User(body);
        await user.save();
        res.status(201).json({
            "msg": "User is registered"
        })
    } catch (error) {
        res.status(400).json({
            "msg": "User registration has some problem"
        })
    }
}

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized
 */
const loginUser = async (req, res) => {
    try {
        if (req.body.password == undefined || req.body.username == undefined) {
            res.status(403).json({
                "msg": "Username or Password must not be blank"
            })
        }

        const user = await User.findOne({ username: req.body.username })

        if (user == null) {
            res.status(404).json({
                "msg": "Username is not found"
            })
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log(process.env.ACCESS_TOKEN_SECRET)
            const accessToken = jwt.sign({ user_id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h"
            });
            res.status(200).json({ accessToken: accessToken, expiresIn: 3599 });
        } else {
            res.status(401).json({
                "msg": "Password is not correct"
            });
        }

    } catch (error) {
        res.status(400).json({
            "msg": "User login has some problem"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}