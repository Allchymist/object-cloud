import { connect, Model, model } from 'mongoose';

import { userSchema } from './Models/UsersPanel';
import { tokenUser } from './Models/TokenUser';
import { IUser } from './Interfaces/User';
import { ITokenUser } from './Interfaces/Token';

class Mongoose {
  readonly users: Model<IUser>;
  readonly tokens: Model<ITokenUser>;

  constructor() {
    this.users = this.setUserSchema();
    this.tokens = this.setTokenSchema();

    this.Connect();
  }

  private Connect() {
    connect(`${process.env.MONGO_CONNECT}`)
      .then(async (db) => {
        await this.setUserSchema();
        await this.setTokenSchema();

        console.log('[SYSTEM]: Banco de dados Conectada com sucesso: ' + db.connection.name);
        console.log('[SYSTEM]: Models do banco de dados carregados.');
      })
      .catch((e) => {
        const { message } = e as Error;
        console.error(`[SYSTEM]: Ocorreu um erro ao conecta-se a DataBase:\n${message}`);
        return process.exit(1);
      });
  }

  private setUserSchema() {
    return model('users', userSchema);
  }

  private setTokenSchema() {
    return model('tokens', tokenUser);
  }
}

export const DataBase = new Mongoose();
