import { model, Model } from 'mongoose';
import { IUser, userSchema } from '../Models/UsersPanel';

type TEditUser = {
  item: 'name' | 'email' | 'password' | 'panels';
};

class User {
  db: Model<IUser>;
  cache: Promise<Array<IUser>>;

  constructor() {
    this.db = model('users', userSchema);
    this.cache = this.fetchAllUsers();
  }

  private async fetchAllUsers() {
    const fetchAllUsers = await this.db.find();
    return fetchAllUsers;
  }

  async findById(id: string) {
    const users = await this.cache;
    const found = users.find((item) => item._id === id);

    if (!found) return Error('Usuário não encontrado, verifique suas credenciais.');

    return found;
  }

  async findByEmail(email: string) {
    const users = await this.cache;
    const found = users.find((item) => item.email === email);

    if (!found) return Error('Usuário não encontrado, verifique suas credenciais.');

    return found;
  }

  async editUser(item: TEditUser, oldUser: string, newUser: string) {
    const users = await this.cache;
  }
}

export const users = new User();

users.editUser();