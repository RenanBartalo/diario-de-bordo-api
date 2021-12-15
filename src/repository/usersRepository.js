class UsersRepository {
  constructor(model) {
    this.userModel = model;
  }

  async getUserById(userId) {
    const users = await this.userModel.findById(userId);

    return users;
  }

  async update(body, userId) {
    const updateUser = await this.userModel.findByIdAndUpdate(userId, body, { new: true });
    return updateUser;
  }
}

export default UsersRepository;
