const router = require('express').Router();
const pool = require('../database/db');

router.post('/init', async (req,res) => {
    try {
        await pool.query(
            'CREATE TABLE "user" (id SERIAL PRIMARY KEY, name VARCHAR(255), username VARCHAR(50), password VARCHAR(255))'
        )
        await pool.query(
            'CREATE TABLE refresh_token (refreshToken VARCHAR(255) PRIMARY KEY)'
        )
        res.status(200).send({
            message: "Successfully created table user"
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
