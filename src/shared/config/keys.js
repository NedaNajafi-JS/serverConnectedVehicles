const localCache = require('./../utilities/cache');

exports.CACHE = new localCache();

exports.keys = {
  mongoURI:
    "mongodb://as11:27017/dashboard_db",
  secretOrKey: "secret"
};

exports.mapBoxConfig = {
  avgPerMeterConsumption: 1,
  avgPerSecond: 1,
  mapBoxToken: "pk.eyJ1IjoiYmVoc2FtYW5tYXBuYSIsImEiOiJjazBwMG9mbnQwZXdzM3BuenhhZXFtYjR2In0.BLhJoFQnep8wbMS5oa65sQ"
}