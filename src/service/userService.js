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
}

export default UsersService;
