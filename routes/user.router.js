const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller')
const { userDataSchema } = require('../validation/user.validation');

router.post('/login', loginUser);
router.delete('/logout', logoutUser)
router.post('/register', userDataSchema, registerUser);

module.exports = router;
