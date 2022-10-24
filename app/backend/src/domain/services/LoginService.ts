import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import { UserCredentials } from '../entities/IUser';
import HttpException from '../../helpers/HttpException';
import jwtUtils from '../../helpers/JwtUtils';

export default class LoginService {
  public static async verify(credentials: UserCredentials) {
    const { email, password } = credentials;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'email or password not found');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'password invalid');
    }

    return jwtUtils.generateToken(user);
  }
}
