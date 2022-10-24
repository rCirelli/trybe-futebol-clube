import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../../database/models/UserModel';
import { UserCredentials } from '../entities/IUser';
import HttpException from '../../helpers/HttpException';
import jwtUtils from '../../helpers/JwtUtils';

export default class LoginService {
  public static async verify(credentials: UserCredentials) {
    const exception = new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    const { email, password } = credentials;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw exception;
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw exception;
    }

    return jwtUtils.generateToken(user);
  }

  public static validate(token: string): JwtPayload {
    const payload = jwtUtils.decodeToken(token);
    return payload;
  }
}
