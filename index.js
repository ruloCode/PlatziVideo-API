/* eslint-disable no-console */
const express = require('express');
const app = express()

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers')

// body parser
app.use(express.json());


moviesApi(app)

//error middlewares
app.use(logErrors);
app.use(errorHandler)

app.listen(config.port, ()=> {
  console.log(`Server running on http://localhost:${config.port}`)
})