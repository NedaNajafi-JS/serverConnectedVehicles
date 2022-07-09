const router = require('express').Router();
const passport = require('passport')
const { validate } = require('./../../shared/middlewares/validation');

const reserveController = require('./reserveController');

router
    .route('/')
    .post(validate('reserve'), passport.authenticate("jwt", { session: false }), reserveController.reserve);

router
    .route('/freeTimes')
    .post(reserveController.freeTimesGet)

router
    .route('/freeTimes/agnecy')
    .post(reserveController.freeTimesGetByAgencyId)

module.exports = router;