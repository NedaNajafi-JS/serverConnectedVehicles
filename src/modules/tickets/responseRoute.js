const router = require('express').Router();
const responseController = require('./responseCon');
const { validate } = require('./../../shared/middlewares/validation')

router
    .route('/')
    .post(validate('response'), responseController.insertOrUpdate)
    .get(responseController.getAll);

router
    .route('/:id')
    .get(validate('id'), responseController.get)

module.exports = router;