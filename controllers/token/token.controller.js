require('dotenv').config();
const jwt = require('jsonwebtoken')
const { isRefreshTokenExists } = require('./lib/token.query');


function retrievePayload(req,res,next){
    // Middleware for checking the validity of the token.

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, return 401
    if(!token) return res.sendStatus(401);

    // Checking validity of the token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload) => {
        if(err) return res.sendStatus(403);
        req.payload = payload;
        next();
    });
}

function newAccesToken(req,res,next) {
    console.log("Generating new access token..")
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    // TODO: Check token pada databse
    if(!isRefreshTokenExists(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccesToken({name: user.name})
        res.json({accessToken});
    })
}

function generateAccesToken(payload){
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10s'});
}

function generateRefreshToken(payload){
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1h'});
}

module.exports = { generateAccesToken, newAccesToken, retrievePayload, generateRefreshToken };
