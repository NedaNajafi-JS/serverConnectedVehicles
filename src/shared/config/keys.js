const localCache = require('./../utilities/cache');

exports.CACHE = new localCache();

exports.mapBoxConfig = {
  avgPerMeterConsumption: 1,
  avgPerSecond: 1,
  mapBoxToken: process.env.mapBoxToken
}