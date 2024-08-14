require('dotenv').config();
const jwt = require('jsonwebtoken')

let refreshTokens = [];

function retrievePayload(req,res,next){
    // Middleware for checking the validity of the token.

    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, return 401
    if(!token) return res.sendStatus(401);

    // Checking validity of the token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function newAccesToken(req,res,next) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        console.log(user);
        const accesToken = generateAccesToken({name: user.name})
        res.json({accesToken});
    })
}

function generateAccesToken(payload){
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30m'});
}

function generateRefreshToken(payload){
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { generateAccesToken, newAccesToken, retrievePayload, generateRefreshToken };
