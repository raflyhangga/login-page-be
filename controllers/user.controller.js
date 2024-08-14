const bcrypt = require('bcrypt');
const { generateAccesToken, generateRefreshToken } = require('./token.controller');
const { validationResult } = require('express-validator');

let users = [
    {
        id: 1,
        name: "James Bush",
        username: "jbush",
        password: "$2b$10$FLOaLPNpIAqPr4vN2aohUOs21cw27mVebpyTkbfkteJMxe3LMQcSe"
    }
];

const logoutUser = (req,res,next) => {
    // TODO: Apus refreshTokens-nya dari databse
    res.sendStatus(204);
}

const loginUser = (req,res,next) => {
    const username = req.body.username;
    const profile = {username};

    const accessToken = generateAccesToken(profile);
    const refreshToken = generateRefreshToken(profile);
    // TODO: Push refreshToken-nya ke databse

    res.json({accessToken,refreshToken});
}

const registerUser = async (req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              success: false,
              errors: errors.array(),
            });
        }

        const hashedPassword = await bcrypt.hash(req.body['password'],10);
        if (users.find((user) => user.username === req.body['username'])) {
            throw Error("Username already exist.");
        } else {
            users.push({
                id: users.length + 1,
                name: req.body['name'],
                username: req.body['username'],
                password: hashedPassword
            })
            res.json({success: true});
            // TODO: Push user ke database
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { registerUser, loginUser, logoutUser }
