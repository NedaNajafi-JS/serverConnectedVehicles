const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Https = require('https');
const fs = require('fs');
const passport = require('passport');


require('./src/shared/utilities/onLoadCaching');

const app = express()
const port = 5004;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./src/shared/config/passport')(passport);
app.use('/api/spn', express.static(path.dirname(require.main.filename) + '/spns/statics'));

const spnAPIs = require('./src/modules/spns/spnPanelRout');
const agencyAPIs = require('./src/modules/agencies/agencyRoute');
const vehicleAPIs = require('./src/modules/vehicles/vehicleRoute');
const softwareConfigAPIs = require('./src/modules/softwareConfig/configRoute');
const reserveAPIs = require('./src/modules/reserves/reserveRoute');
const profileAPIs = require('./src/modules/profile/profileRoute');

app.use('/api/spn', spnAPIs);
app.use('/api/agency', agencyAPIs);
app.use('/api/vehicle', vehicleAPIs);
app.use('/api/config', softwareConfigAPIs);
app.use('/api/reserve', reserveAPIs);
app.use('/api/profile', profileAPIs);

mongoose
  .connect("mongodb://AS11:27017/electricVehicle", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {

    console.log('MongoDB Connected');

  })
  .catch(err => console.log(err));

// var options = {
//   key: fs.readFileSync('/etc/ssl/private/as11.key'),

//   cert: fs.readFileSync('/etc/ssl/certs/as11.crt')


// }

// Https.createServer(options, app).listen(port, '', null, function() {
//     console.log(`Server listening on port ${port}`);
// });

// const ascendingSort = (a, b) => a - b;
// const not = fn => (...args) => fn(...args) * -1;
// console.log([4,5,9,8,1].sort(not(ascendingSort)));

// const name = "neda";
// const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);
// const demethodizedMap = demethodize(Array.prototype.map);
// const demethodized_toUpperCase = demethodize(String.prototype.toUpperCase);
// const result2 = demethodizedMap(name, demethodized_toUpperCase).join("");

function hero(strength, power, tech) {
  this.strength = strength,
  this.power = power,
  this.tech = tech
}

const hero1 = new hero(10, 2, 11);
const hero2 = new hero(1, 3, 24);
const hero3 = new hero(5, 1, 11);

const compare = (x, y) => x > y ? 1 : 0;

const compareHeros = (hero1, hero2) => {
  const points1 = compare(hero1.strength, hero2.strength) +
                  compare(hero1.power, hero2.power) +
                  compare(hero1.tech, hero2.tech);

  const points2 = compare(hero2.strength, hero1.strength) +
                  compare(hero2.power, hero1.power) +
                  compare(hero2.tech, hero1.tech);    
  return  points1 > points2 ? points1 : points2;
}

const findOptimum = fn =>  input => {
  input.reduce(fn)
};
const winner = findOptimum(compareHeros)([hero1, hero2, hero3]);
console.log(winner);

[hero1, hero2, hero3].reduce(compareHeros)

app.listen(port, () => console.log(`Server Running on port ${port}`))