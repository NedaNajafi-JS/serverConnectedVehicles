const router = require('express').Router();
const spnController = require('./spnPanelCon');
const validation = require('./../../shared/middlewares/validation');

router.route('/')
.post(validation.validate('spn'), spnController.create)
.get(spnController.indexSpn);

router.route('/load')
.get(spnController.fillData);

router.route('/createPanel')
.get(spnController.createPanel);

router.route('/:id')
.get(spnController.get)
.delete(spnController.delete);


module.exports = router;