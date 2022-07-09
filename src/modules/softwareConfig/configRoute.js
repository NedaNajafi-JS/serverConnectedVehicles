const router = require('express').Router();
const configController = require('./configController');

router
    .route('/')
    .post(configController.setGeographicScale)
    .get(configController.getConfig);

module.exports = router;