const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Https = require('https');
const fs = require('fs');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();
require('./src/shared/config/passport')(passport);
require('./src/shared/utilities/onLoadCaching');

const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
  .connect(process.env.monoURI)
  .then(() => {

    console.log('MongoDB Connected');

  })
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server Running on port ${port}`))
