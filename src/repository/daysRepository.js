class DaysRepository {
  constructor(model) {
    this.dayModel = model;
  }

  async getDaysByTravelId(travelId) {
    const days = await this.dayModel.find({ travel: travelId });

    return days;
  }

  async getOneDay(dayId) {
    const day = await this.dayModel.findById(dayId);
    return day;
  }

  async createNewDay(newDay) {
    const savedDay = await this.dayModel.create(newDay);

    return savedDay;
  }

  async update(body, travelId) {
    const updateDay = await this.dayModel.findByIdAndUpdate(travelId, body, { new: true });
    return updateDay;
  }

  async delete(travelId) {
    const deleteDay = await this.dayModel.findById(travelId);
    return deleteDay;
  }
}

export default DaysRepository;
