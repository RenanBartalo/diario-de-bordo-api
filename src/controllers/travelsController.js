import { Router } from 'express';

import Travel from '../models/Travel';
import TravelsService from '../service/travelsService';
import TravelsRepository from '../repository/travelsRepository';

import User from '../models/User';
import UsersService from '../service/userService';
import UsersRepository from '../repository/usersRepository';

const usersRepository = new UsersRepository(User);
const usersService = new UsersService(usersRepository);

const router = Router();

const travelsRepository = new TravelsRepository(Travel);
const travelsService = new TravelsService(travelsRepository);

router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;

    console.log('REQ.USER', req.user);

    const allTravels = await travelsService.getAllByFilter(title, req.user.id);
    console.log(allTravels);
    const theUser = await usersService.getOne(req.user.id);
    res.json({ travels: allTravels, user: theUser });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log('REQ.USER NA ROTA DE DETALHE', req.user);

    const travel = await travelsService.getOne(id);

    res.json(travel);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const newTravel = await travelsService.create(body, req.user.id);

    res.json(newTravel);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { body } = req;
    const { travelId } = req.params;

    const updateTravel = await travelsService.update(body, travelId);
    console.log('caiu aqui no update!', body);
    res.json(updateTravel);
  } catch (error) {
    next(error);
  }
});

export default router;
