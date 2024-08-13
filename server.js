require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let refreshTokens = [];

let users = [
    {
        id: 1,
        name: "Noordin",
        password: "ceritanya udah ke hash",
    },
    {
        id: 2,
        name: "James",
        password: "ceritanya udah ke hash",
    }
];

app.post('/token',(req,res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        console.log(user);
        const accesToken = generateAccesToken({name: user.name})
        res.json({accesToken});
    })
})

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const profile = {username};

    const accessToken = generateAccesToken(profile);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({accessToken,refreshToken});
})


function generateAccesToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '120s'});
}

app.listen(4000);