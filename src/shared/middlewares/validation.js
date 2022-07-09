const { check, param } = require('express-validator');

exports.validate = (method) => {
    switch (method) {

        case 'id':
            return [
                param('id', 'خطا در پارامترهای ورودی').exists().isLength({ min: 20 })
            ]

        case 'spn':
            return [
                check('EV', 'انتخا نوع خودرو اجباری است').exists(),
                check('spn', 'خطای ورودی SPN').exists().isInt(),
                check('source', 'خطای ورودی Source').exists(),
                check('topic', 'خطای ورودی Topic').exists().isIn(['Location', 'Signal', 'Alarm']),
                check('name', 'خطای ورودی نام spn').exists().isString(),
                check('description', 'خطای ورودی نام توضیحات').exists().isLength({ min: 6 }),
                check('dimenssion', 'خطای ورودی واحد اندزه گیری').exists()
            ]

        case 'agency':
            return [
                check('uniqueId', 'شناسه یکتای نمایندگی را وارد کنید').exists(),
                check('code', 'کد نمایندگی را وارد کنید').exists(),
                check('name', 'نام نمایندگی را وارد کنید').exists(),
                check('address.province')
                    .exists()
                    .withMessage('استان نمایندگی را وارد کنید'),
                check('address.city')
                    .exists()
                    .withMessage('شهر نمایندگی را وارد کنید'),
                check('address.coordinate')
                    .exists()
                    .withMessage('مختصات جغرافیایی نمایندگی را وارد کنید'),
                check('phone', 'شماره تلفن نمایندگی را وارد کنید').exists(),
                check('services', 'سرویس های ارائه شده توسط نمایندگی را وارد کنید').exists().isLength({ min: 1 }),
                check('vehicles', 'خودروهای تحت پوشش نمایندگی را وارد کنید').exists().exists().isLength({ min: 1 }),
                check('status', 'وضعیت نمایندگی را وارد کنید').exists().isIn([true, false]),
                check('manager.name')
                    .exists()
                    .withMessage('نام مسئول نمایندگی را وارد کنید'),
                check('manager.phone')
                    .exists()
                    .withMessage('شماره تلفن همراه مسئول نمایندگی را وارد کنید')
            ]

        case 'vehicle':
            return [
                check('type', 'نوع خودرو را انتخاب کنید').exists().isIn(['EV', 'EBUS', 'EBike']),
                check('system', 'سیستم خودرو را وارد کنید').exists(),
                check('model', 'مدل خودرو را وارد کنید').exists(),
                check('capacity', 'ظرفیت خودرو را وارد کنید').exists(),
                check('charger', 'نوع شارژر خودرو را وارد کنید').exists(),
                check('color', 'رنگ خودرو را انتخاب کنید').exists().exists(),
                check('engine', 'موتور خودرو را وارد کنید').exists(),
                check('engine_type', 'نوع موتور خودرو را وارد کنید').exists(),
                check('VIN', 'شماره شاسی خودرو را وارد کنید').exists(),
                check('profileId', 'مالک خودرو را مشخص کنید').exists(),
                check('car_tag', 'پلاک خودرو را وارد کنید').exists().isLength({ min: 5 }),
                check('agency', 'نمایندگی خودرو را انتخاب کنید').exists(),
                check('coordinate', 'مختصات جغرافیایی خودرو را مشخص کنید').exists().isObject(),
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