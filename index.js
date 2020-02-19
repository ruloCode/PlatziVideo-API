/* eslint-disable no-console */
const express = require('express');
const app = express()

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const usersApi = require('./routes/users');
const userMoviesApi = require('./routes/userMovies');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

// body parser
app.use(express.json());

// routes
authApi(app)
moviesApi(app)
usersApi(app)
userMoviesApi(app)
//not found 404
app.use(notFoundHandler)

//error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);



app.listen(config.port, ()=> {
  console.log(`Server running on http://localhost:${config.port}`)
})