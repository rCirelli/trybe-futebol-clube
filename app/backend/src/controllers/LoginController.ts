import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../domain/services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const credentials = req.body;
    const token = await LoginService.verify(credentials);
    res.status(StatusCodes.OK).send({ token });
  }

  public static async validate(req: Request, res: Response) {
    const token = req.get('authorization');

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).send({ message: 'Authotization token missing' });
    }
    const { role } = await LoginService.validate(token);

    res.status(StatusCodes.OK).send({ role });
  }
}
