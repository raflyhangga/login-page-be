require('dotenv').config();

const router = require('express').Router();
const { newAccesToken } = require('../controllers/token/token.controller');

router.post('/',newAccesToken);

module.exports = router;