import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../../helpers/JwtUtils';

const tokenAuthentication = (req:Request, _res:Response, next:NextFunction) => {
  const token = req.get('authorization');
  jwtUtils.decodeToken(token as string);
  next();
};

export default tokenAuthentication;
