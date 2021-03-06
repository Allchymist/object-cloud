import { v4 as Uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { sendConfirmEmail } from '../../Utils/Email/Sendings/ConfirmationEmail-Email';
import { IUserRegister, IUserLogin } from '../../Interfaces/User';
import { DataBase } from '../../Database';

const { users } = DataBase;

class AuthService {
  async register({ name, username, email, password }: IUserRegister) {
    const data = {
      checkEmail: await users.findOne({ email }),
      checkUsername: await users.findOne({ username }),
    };

    if (data.checkEmail) throw new Error('Já existe um usuário com este email.');
    if (data.checkUsername) throw new Error('Já existe um usuário com este apelido.');

    const user = {
      _id: Uuidv4(),
      name,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      'EmailSecretToken',
      { expiresIn: '15m' },
    );

    new users({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    }).save();

    await sendConfirmEmail({ id: user._id, email, name, token });

    return {
      message: 'Usuário cadastrado com sucesso, verifique seu email.',
      user,
    };
  }

  async login({ username, email, password }: IUserLogin) {
    const CheckUsernameOrEmail = await users.findOne({ $or: [{ username }, { email }] });
    const CheckPassword = CheckUsernameOrEmail && bcrypt.compareSync(password, CheckUsernameOrEmail.password);

    if (!CheckUsernameOrEmail) throw new Error('Usuário ou Email inválido.');
    if (!CheckPassword) throw new Error('Senha inválida.');

    if (!CheckUsernameOrEmail.verifyEmail) {
      const token = jwt.sign(
        {
          id: CheckUsernameOrEmail._id,
          email: CheckUsernameOrEmail.email,
        },
        'EmailSecretToken',
        { expiresIn: '15m' },
      );

      await sendConfirmEmail({
        id: CheckUsernameOrEmail._id,
        email: CheckUsernameOrEmail.email,
        name: CheckUsernameOrEmail.name,
        token,
      });

      throw new Error('Verifique seu Email antes de efetuar Login.');
    }

    const token = jwt.sign({ id: CheckUsernameOrEmail._id }, 'LoginSecToken', { expiresIn: '1d' });

    return {
      message: 'Login efetuado.',
      user: CheckUsernameOrEmail,
      token,
    };
  }

  async profile(userID: string) {
    const user = await users.findOne({ _id: userID });

    if (!user) throw new Error('Usuário não encontrado.');

    return {
      message: 'Perfil encontrado.',
      user,
    };
  }
}

export const authService = new AuthService();
