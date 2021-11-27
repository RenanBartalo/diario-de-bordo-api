import mongoose from 'mongoose';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

import InvalidIdException from '../exceptions/InvalidIdException';

class TravelsRepository {
  constructor(model) {
    this.travelModel = model;
  }

  async getAll(title, userId) {
    const travels = await this.travelModel.find({
      title: { $regex: new RegExp(title, 'i') },
      owner: userId,
    });

    return travels;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const travel = await this.travelModel.findById(id).populate('days');

    return travel;
  }

  async create(body, userId) {
    const newTravel = await this.travelModel.create({ ...body, owner: userId });

    return newTravel;
  }

  async insertDayId(travelId, dayId) {
    await this.travelModel.findByIdAndUpdate(travelId, {
      $push: { days: dayId },
    });
  }

  async update(body, travelId) {
    const response = await this.travelModel.findByIdAndUpdate(
      travelId,
      { $set: { ...body } },
      { new: true },
    );
    console.log(response);
  }
}

export default TravelsRepository;
