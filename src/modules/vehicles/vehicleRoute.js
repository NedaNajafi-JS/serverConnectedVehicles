const router = require('express').Router();
const vehicleController = require('./vehicleCon');
const { validate } = require('./../../shared/middlewares/validation')

router
    .route('/')
    .post(validate('vehicle'), vehicleController.insertOrUpdate)
    .get(vehicleController.getAll);

router
    .route('/:id')
    .get(validate('id'), vehicleController.get)

module.exports = router;