import { NextFunction, Request, Response } from 'express';
import HttpException from '../helpers/HttpException';

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default errorMiddleware;
