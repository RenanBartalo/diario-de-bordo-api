import { Router } from 'express';

import User from '../models/User';
import UsersService from '../service/userService';
import UsersRepository from '../repository/usersRepository';

const router = Router();

const usersRepository = new UsersRepository(User);
const usersService = new UsersService(usersRepository);

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('REQ.USER - ROTA USER', req.user);
    console.log('rota user rolando');
    const user = await usersService.getOne(req.user.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const { body } = req;
    const { userId } = req.params;

    const updateUser = await usersService.update(body, userId);
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
});

export default router;
