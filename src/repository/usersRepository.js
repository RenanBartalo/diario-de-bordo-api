class UsersRepository {
  constructor(model) {
    this.userModel = model;
  }

  async getUserById(userId) {
    const users = await this.userModel.findById(userId);

    return users;
  }
}

export default UsersRepository;
