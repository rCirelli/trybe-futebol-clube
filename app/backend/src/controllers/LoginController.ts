import { Request, Response } from 'express';
import LoginService from '../domain/services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const credentials = req.body;
    const token = await LoginService.verify(credentials);
    res.status(200).send({ token });
  }
}
