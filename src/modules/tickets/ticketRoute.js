const router = require('express').Router();
const ticketController = require('./ticketCon');
const { validate } = require('./../../shared/middlewares/validation')

router
    .route('/')
    .post(validate('ticket'), ticketController.insertOrUpdate)
    .get(ticketController.getAll);

router
    .route('/:id')
    .get(validate('id'), ticketController.get)

module.exports = router;