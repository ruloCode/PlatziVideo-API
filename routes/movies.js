const express = require('express');

const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router)

  // GET ALL MOVIES
  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock)
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch(err) {
      next(err)
    }
  })

  // GET ONE MOVIE
  router.get('/:movieId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0])
      res.status(200).json({
        data: movies,
        message: 'movie retrieve'
      })
    } catch(err) {
      next(err)
    }
  })

  // CREATE ONE MOVIE
  router.post('/', async (req, res, next) => {
    try {
      const createdMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch(err) {
      next(err)
    }
  })

  // UPDATE ONE MOVIE
  router.put('/:movieId', async (req, res, next) => {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      })
    } catch(err) {
      next(err)
    }
  })

  // DELETE ONE MOVIE
  router.delete('/:movieId', async (req, res, next) => {
    try {
      const deletedMovieId = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch(err) {
      next(err)
    }
  })


}

module.exports = moviesApi;
