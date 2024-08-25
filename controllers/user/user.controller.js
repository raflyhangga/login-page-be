const bcrypt = require('bcrypt');
const { generateAccesToken, generateRefreshToken } = require('../token/token.controller');
const { validationResult } = require('express-validator');
const { addUser, getUser } = require('./lib/user.query');
const { addRefreshToken,removeRefreshToken } = require('../token/lib/token.query');

const logout = (req,res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, return 401
    if(!token) return res.sendStatus(401);
    try {
        removeRefreshToken(token);
        res.sendStatus(204);
    } catch(err){
        console.log(err);
    }
}

const login = async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        const data = await getUser(username);
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                errors: "Invalid username or password"
            })
        }
        const suspectedUser = data[0];
        const isPasswordMatch = await bcrypt.compare(password, suspectedUser.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                success: false,
                errors: "Invalid username or password"
            })
        }
        const accessToken = generateAccesToken({userID: suspectedUser.id});
        const refreshToken = generateRefreshToken({userID: suspectedUser.id});
        
        addRefreshToken(refreshToken);
    
        res.json({accessToken,refreshToken});
    } catch (err){
        next(err);
    }

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
        if ((await getUser(req.body['username'])).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username already exists."
            });
        } else {
            addUser({
                name: req.body['name'],
                username: req.body['username'],
                password: hashedPassword
            })
            res.json({success: true});
        }
    } catch (err) {
        next(err);
    }
}



module.exports = { registerUser, login, logout }
