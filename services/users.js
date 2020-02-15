const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt')

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({email}) {
    const query = email && { email: email }

    const users = await this.mongoDB.getAll(this.collection, query);
    return users;
  }

  async createUser({ user}) {
    const { name, email, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10 );

    const createdUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    })
    return createdUserId;
  }

  async updateUser({userId, user} = {}) {
    const { name, email, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10 );
    const updatedUserId = await this.mongoDB.update(this.collection, userId, {
      name,
      email,
      password: hashedPassword
    })
    return updatedUserId;
  }

  async deleteUser({userId}) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module.exports = UsersService