const router = require('express').Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController')

// Register User
router.post('/register', userController.register)

// Login User
router.post('/login', userController.login)

// Verify token 
router.get('/verify', userController.verifiedToken);
module.exports = router