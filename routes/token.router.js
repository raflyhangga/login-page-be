require('dotenv').config();

const router = require('express').Router();
const { newAccesToken } = require('../controllers/token/token.controller');
const { getAllRefreshToken } = require('../controllers/token/lib/token.query');

router.post('/',newAccesToken);
router.get('/tokens', async (req,res) => {
    try {
        console.log('Getting all token...');
        const data = await getAllRefreshToken();
        res.json({tokens:data});
    } catch (err) {
        res.sendStatus(404);
    }
})

module.exports = router;