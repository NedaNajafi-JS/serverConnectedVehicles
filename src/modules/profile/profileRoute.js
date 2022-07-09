const router = require('express').Router();
const profileController = require('./profileController');

router
    .route('/login')
    .post(profileController.login);

module.exports = router;