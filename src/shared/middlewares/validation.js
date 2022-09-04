const { check, param } = require('express-validator');

exports.validate = (method) => {
    switch (method) {

        case 'id':
            return [
                param('id', 'Input error').exists().isLength({ min: 20 })
            ]

        case 'spn':
            return [
                check('EV', 'Select vehicle type').exists(),
                check('spn', 'Input error, SPN').exists().isInt(),
                check('source', 'Input error, Source').exists(),
                check('topic', 'Input error, Topic').exists().isIn(['Location', 'Signal', 'Alarm']),
                check('name', 'Input error, spn name').exists().isString(),
                check('description', 'Input error, description').exists().isLength({ min: 6 }),
                check('dimenssion', 'Input error, dimenssion').exists()
            ]

        case 'agency':
            return [
                check('uniqueId', 'Input error, agency unique identification number').exists(),
                check('code', 'Input error, agency unique code').exists(),
                check('name', 'Input error, agency name').exists(),
                check('address.province')
                    .exists()
                    .withMessage('Input error, agency province'),
                check('address.city')
                    .exists()
                    .withMessage('Input error, agency city'),
                check('address.coordinate')
                    .exists()
                    .withMessage('Input error, agency geographic coordinates'),
                check('phone', 'Input error, agency phone number').exists(),
                check('services', 'Select at least one service provided by the agency').exists().isLength({ min: 1 }),
                check('vehicles', 'Select at least one vehicle which the agency serves').exists().exists().isLength({ min: 1 }),
                check('status', 'Input error, agency status').exists().isIn([true, false]),
                check('manager.name')
                    .exists()
                    .withMessage('Input error, agency manager name'),
                check('manager.phone')
                    .exists()
                    .withMessage('Input error, agency manager phone number')
            ]

        case 'vehicle':
            return [
                check('type', 'Input error, vehicle type').exists().isIn(['EV', 'EBUS', 'EBike']),
                check('system', 'Input error, vehicle infrastructure type').exists(),
                check('model', 'Input error, vehicle model').exists(),
                check('capacity', 'Input error, vehicle capacity').exists(),
                check('charger', 'Input error, vehicle charger type').exists(),
                check('color', 'Input error, vehicle color').exists().exists(),
                check('engine', 'Input error, vehicle engine').exists(),
                check('engine_type', 'Input error, vehicle engine type').exists(),
                check('VIN', 'Input error, vehicle VIN').exists(),
                check('profileId', 'Input error, vehicle owner').exists(),
                check('car_tag', 'Input error, vehicle car tag').exists().isLength({ min: 5 }),
                check('agency', 'Input error, vehicle agency').exists(),
                check('coordinate', 'Input error, vehicle geographic coordinate').exists().isObject(),
            ]
        case 'reserve':
            return [
                check('agencyUniqueId')
                    .exists()
                    .withMessage('agencyUniqueId error'),

                check('profilePhone')
                    .exists()
                    .withMessage('profilePhone error'),

                check('reservedDate')
                    .exists()
                    .withMessage('reservedDate error'),

                check('doReserveDate.year')
                    .exists()
                    .withMessage('year error')
                    .isNumeric()
                    .withMessage('year type error'),

                check('doReserveDate.month')
                    .exists()
                    .withMessage('month error')
                    .isNumeric()
                    .withMessage('month type error'),

                check('doReserveDate.day')
                    .exists()
                    .withMessage('day error')
                    .isNumeric()
                    .withMessage('day type error'),

                check('doReserveDate.timeSection')
                    .exists()
                    .withMessage('timeSection error')
                    .isNumeric()
                    .withMessage('timeSection type error'),

                check('demandedServices')
                    .exists()
                    .withMessage('demandedServices error')
                    .isArray()
                    .withMessage('demandedServices type error')
            ]

    }
}