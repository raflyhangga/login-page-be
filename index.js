const express = require('express');
const app = express();

const ROUTER = 4000;

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/token.router');

app.use(express.json());
app.use('/user',userRouter);
app.use('/token',authRouter);


app.listen(ROUTER);