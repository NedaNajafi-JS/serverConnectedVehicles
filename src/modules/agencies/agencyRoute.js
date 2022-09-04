const router = require('express').Router();
const passport = require('passport');
const agencyController = require('./agencyController');
const { validate } = require('./../../shared/middlewares/validation');

router
    .route('/')
    .post(validate('agency'), agencyController.insertOrUpdate)
    .get(agencyController.getAll);

router
    .route('/customized')
    .get(agencyController.categorizedGetAll)

router
    .route('/:id')
    .get(agencyController.get)
    .delete(agencyController.deleteAgencyById)

router
    .route('/:lat/:lon/getNearest')
    .get(agencyController.getNearest);

router
    .route('/setUserPassword')
    .post(passport.authenticate("jwt", {session: false}), agencyController.setUserPassword);

router
    .route('/vehicles')
    .post(agencyController.assignVehicleToAgency);

router
    .route('/:id/vehicles')
    .get(agencyController.getAssignedVehicles);

router
    .route('/pieces')
    .post(/*validate('piece'), */passport.authenticate("jwt", {session: false}), agencyController.pieceInsert);

module.exports = router;
