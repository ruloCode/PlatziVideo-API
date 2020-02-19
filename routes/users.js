const express = require('express');

const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { createUserSchema, userIdSchema } = require('../utils/schemas/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get(
    '/',
    async function(req, res, next) {
      const { email } = req.query
      try {
        const users = await usersService.getUser({
          email
        });

        res.status(200).json({
          data: users,
          message: 'users listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.post(
    '/',
    validationHandler(createUserSchema),
      async (req, res, next) => {
      const { body: user } = req; 
      try {
        const createdUserId = await usersService.createUser({
          user
        });
        res.status(201).json({
          data: createdUserId,
          message: 'user created'
        })
      } catch (err) {
        next(err)
      }
  });

  router.put('/:userId',validationHandler({ userId: userIdSchema}, 'params'),validationHandler(createUserSchema), async function(req, res, next) {
    const { userId } = req.params;
    const { body: user } = req;

    try {
      const updatedUserId = await usersService.updateUser({
        userId,
        user
      });

      res.status(200).json({
        data: updatedUserId,
        message: 'user updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/:userId',
    validationHandler({ userId: userIdSchema}, 'params'),
      async (req, res, next) => {
          const { userId } = req.params; 
          try {
            const deletedUserId = await usersService.deleteUser({
              userId
            });
            res.status(200).json({
              data: deletedUserId,
              message: 'user deleted'
            })
          } catch (err) {
            next(err)
          }
      })
  
}

module.exports = usersApi