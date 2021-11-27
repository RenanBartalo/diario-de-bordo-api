import { Router } from 'express';

import DayService from '../service/daysService';

import Travel from '../models/Travel';
import Day from '../models/Day';

import DaysRepository from '../repository/daysRepository';
import TravelRepository from '../repository/travelsRepository';

// Injeção de Dependencias
const daysRepository = new DaysRepository(Day);
const travelRepository = new TravelRepository(Travel);
const daysService = new DayService(daysRepository, travelRepository);

const router = Router();

router.get('/:travelId', async (req, res, next) => {
  try {
    const { travelId } = req.params;

    const days = await daysService.getDaysByTravelId(travelId);
    console.log(days);
    res.json(days);
  } catch (error) {
    next(error);
  }
});

router.get('/detail/:dayId', async (req, res, next) => {
  try {
    console.log(req.params);
    const { dayId } = req.params;

    const day = await daysService.getOneDay(dayId);
    console.log(day);
    res.json(day);
  } catch (error) {
    next(error);
  }
});

router.post('/:travelId', async (req, res, next) => {
  try {
    const { body } = req;
    const { travelId } = req.params;

    const savedDay = await daysService.create(body, travelId);
    // Podemos movê-lo para o projectepository

    res.status(201).json(savedDay);
  } catch (error) {
    next(error);
  }
});

router.put('/detail/:dayId', async (req, res, next) => {
  try {
    const { body } = req;
    const { dayId } = req.params;

    const updateDay = await daysService.update(body, dayId);
    res.json(updateDay);
  } catch (error) {
    next(error);
  }
});

router.delete('/detail/:dayId', async (req, res, next) => {
  try {
    const { dayId } = req.params;

    const deleteDay = await daysService.delete(dayId);
    deleteDay.remove();
    res.json(deleteDay);
  } catch (error) {
    next(error);
  }
});

export default router;
