/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

class UsersService {
  constructor(repository) {
    this.usersRepository = repository;
  }

  async getOne(id) {
    const user = await this.usersRepository.getUserById(id);

    return user;
  }

  async update(body, userId) {
    const updateUser = await this.usersRepository.update(body, userId);

    return updateUser;
  }
}

export default UsersService;
