/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import mongoose from 'mongoose';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
import InvalidIdException from '../exceptions/InvalidIdException';

class DaysService {
  constructor(dayRepository, travelRepository) {
    this.dayRepository = dayRepository;
    this.travelRepository = travelRepository;
  }

  async getDaysByTravelId(travelId) {
    const isIdValid = mongoose.isValidObjectId(travelId);

    if (!isIdValid) {
      throw new InvalidIdException();
    }

    const days = await this.dayRepository.getDaysByTravelId(travelId);

    return days;
  }

  async create(body, travelId) {
    const schema = yup.object().shape({
      dia: yup.string().required('Required Field').min(1, 'Minimum of 1 characters').max(3, 'Maximum of 3 characters'),
      description: yup.string().required('Required Field').min(15, 'Minimum of 15 characters').max(150, 'Maximum of 150 characters'),
    });

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0],
      }));

      throw new InvalidBodyRequestException(errors);
    }

    const isIdValid = mongoose.isValidObjectId(travelId);

    if (!isIdValid) {
      throw new InvalidIdException();
    }

    const savedDay = await this.dayRepository.createNewDay({ ...body, travel: travelId });

    // Aqui em baixo temos acesso ao _id da nova task
    // Precisa pegar o projeto pelo ID e inserir dentro de tasks o ID da tarefa criada acima
    await this.travelRepository.insertDayId(travelId, savedDay._id);

    return savedDay;
  }
}

export default DaysService;
