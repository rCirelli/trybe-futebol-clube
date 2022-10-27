import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Match from '../../domain/entities/Match';

const matchValidation = (req:Request, res:Response, next:NextFunction) => {
  const matchData: Match = req.body;

  if (matchData.awayTeam === matchData.homeTeam) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default matchValidation;
