/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import * as yup from 'yup';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

class TravelsService {
  constructor(repository) {
    this.travelsRepository = repository;
  }

  async getAllByFilter(title = '', userId) {
    const travels = await this.travelsRepository.getAll(title, userId);

    return travels;
  }

  async getOne(id) {
    // CONTRATO: PRECISO DE UM METODO QUE RECEBA UM ID E RETORNE UM PROJETO
    const travel = await this.travelsRepository.getOne(id);

    return travel;
  }

  async create(body, userId) {
    // Validar title e description
    const schema = yup.object().shape({
      cidade: yup.string().required('Required field').min(3, 'Mimimum of 3 charracters').max(50, 'Maximum of 50 charracters'),
      description: yup.string().required('Required field').min(15, 'Mimimum of 15 charracters').max(250, 'Maximum of 150 charracters'),
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

    const newTravel = await this.travelsRepository.create(body, userId);

    return newTravel;
  }
}

export default TravelsService;
