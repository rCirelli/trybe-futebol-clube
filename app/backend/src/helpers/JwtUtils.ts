import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import IUser from '../domain/entities/IUser';

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
    const decoded = this.jwt.verify(token, this.jwtSecret);

    return decoded as jwt.JwtPayload;
  }
}

export default new JwtUtils();
