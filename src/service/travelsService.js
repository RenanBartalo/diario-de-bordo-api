/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

class TravelsService {
  constructor(repository) {
    this.travelsRepository = repository;
  }

  async getAllByFilter(title = '', userId) {
    const travels = await this.travelsRepository.getAll(title, userId);

    return travels;
  }

  async getAllToSocial() {
    const travels = await this.travelsRepository.getAllSocial();

    return travels;
  }

  async getOne(id) {
    // CONTRATO: PRECISO DE UM METODO QUE RECEBA UM ID E RETORNE UM PROJETO
    const travel = await this.travelsRepository.getOne(id);

    return travel;
  }

  async create(body, userId) {
    const newTravel = await this.travelsRepository.create(body, userId);

    return newTravel;
  }

  async update(body, travelId) {
    const updateTravel = await this.travelsRepository.update(body, travelId);

    return updateTravel;
  }

  async delete(travelId) {
    const deleteTravel = await this.travelsRepository.delete(travelId);

    return deleteTravel;
  }
}

export default TravelsService;
