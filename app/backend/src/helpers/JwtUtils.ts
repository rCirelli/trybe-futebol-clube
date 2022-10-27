import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import IUser from '../domain/entities/IUser';
import HttpException from './HttpException';

const secret = process.env.JWT_SECRET as string;

class JwtUtils {
  private jwt = jwt;

  private jwtSecret: jwt.Secret = secret;

  public generateToken(user: IUser): string {
    const { username, email, role } = user;
    const payload: jwt.JwtPayload = { username, email, role };

    return this.jwt.sign(payload, this.jwtSecret);
  }

  public decodeToken(token: string): jwt.JwtPayload {
    let decoded: jwt.JwtPayload | string;
    try {
      decoded = this.jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
    return decoded as jwt.JwtPayload;
  }
}

export default new JwtUtils();
