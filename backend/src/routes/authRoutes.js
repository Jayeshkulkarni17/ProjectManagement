const { Router } = require('express');
const { registerController, loginController, logoutController } = require('../controllers/authController');
const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);

module.exports = router;
