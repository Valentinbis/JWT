const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/session', authController.login_get);
router.post('/session', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;