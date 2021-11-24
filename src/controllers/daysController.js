import { Router } from 'express';

import DayService from '../service/daysService';

import Travel from '../models/Travel';
import Day from '../models/Day';

import DaysRepository from '../repository/daysRepository';
import TravelRepository from '../repository/travelsRepository';

// Injeção de Dependencias
const dayRepository = new DaysRepository(Day);
const travelRepository = new TravelRepository(Travel);
const dayService = new DayService(dayRepository, travelRepository);

const router = Router();

router.get('/:travelId', async (req, res, next) => {
  try {
    const { travelId } = req.params;

    const days = await dayService.getDaysByTravelId(travelId);

    res.json(days);
  } catch (error) {
    next(error);
  }
});

router.post('/:travelId', async (req, res, next) => {
  try {
    const { body } = req;
    const { travelId } = req.params;

    const savedDay = await dayService.create(body, travelId);
    // Podemos movê-lo para o projectepository

    res.status(201).json(savedDay);
  } catch (error) {
    next(error);
  }
});

export default router;
