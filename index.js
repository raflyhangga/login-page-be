const express = require('express');
const app = express();

const PORT = 4000;

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/token.router');
const initRouter = require('./routes/db.router');

app.use(express.json());
app.use('/user',userRouter);
app.use('/token',authRouter);
app.use('/database', initRouter)

app.listen(PORT, ()=>{console.log("Server listening on port: "+PORT)});