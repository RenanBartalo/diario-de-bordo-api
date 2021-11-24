class DaysRepository {
  constructor(model) {
    this.dayModel = model;
  }

  async getDaysByTravelId(travelId) {
    const days = await this.dayModel.find({ travel: travelId });

    return days;
  }

  async createNewTask(newDay) {
    const savedDay = await this.dayModel.create(newDay);

    return savedDay;
  }
}

export default DaysRepository;
