const express = require('express')
const bodyParser = require('body-parser')
const searchRoutes = require('./api/routes/search-routes.js')
const { logError, returnError, logErrorMiddleware } = require('./api/errors/error-handler')
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors())

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/v1/search', searchRoutes);
const server = app.listen(PORT);
console.log(`listeing on port: ${PORT}...`)

app.use(logErrorMiddleware);
app.use(returnError);

module.exports = server;