const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { registerUser, loginUser, logoutUser } = require('../controllers/user/user.controller')
const { userDataSchema } = require('../validation/user.validation');
const { getUsers } = require('../controllers/user/lib/user.query');

router.post('/login', loginUser);
router.delete('/logout', logoutUser)
router.post('/register', userDataSchema, registerUser);
router.get('/getUsers', async (req,res,next) => {
    try {
        const data = await getUsers();
        res.json({data});
    } catch (err) {
        next(err);
    }
})

module.exports = router;
