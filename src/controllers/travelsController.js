import { Router } from 'express';

import Travel from '../models/Travel';
import TravelsService from '../service/travelsService';
import TravelsRepository from '../repository/travelsRepository';

const router = Router();

// Injeção de Dependências
const travelsRepository = new TravelsRepository(Travel);
const travelsService = new TravelsService(travelsRepository);

// Inserir rotas de projects

// RECEBER O REQUEST, PEGAR DELE O QUE É UTIL, E MANDAR A RESPOSTA
router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;

    console.log('REQ.USER', req.user);

    const travels = await travelsService.getAllByFilter(title, req.user.id);

    res.json(travels);
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

export default router;
