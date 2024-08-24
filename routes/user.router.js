const router = require('express').Router();
const { registerUser, login, logout } = require('../controllers/user/user.controller')
const { userDataSchema, userLoginSchema } = require('../validation/user.validation');
const { getUsers, getSessionProfile } = require('../controllers/user/lib/user.query');
const { retrievePayload } = require('../controllers/token/token.controller');

// TODO: Login Schema
router.post('/login', userLoginSchema, login);
router.delete('/logout', logout)
router.post('/register', userDataSchema, registerUser);
router.get('/getUsers', async (req,res,next) => {
    try {
        const data = await getUsers();
        res.json({data});
    } catch (err) {
        next(err);
    }
})
router.get('/session/profile', retrievePayload, async (req,res) => {
    try {
        console.log(req.payload.userID);
        const data = await getSessionProfile(req.payload.userID);
        res.json({
            id: data[0].id,
            name: data[0].name,
            username: data[0].username,
            password: data[0].password
        });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
