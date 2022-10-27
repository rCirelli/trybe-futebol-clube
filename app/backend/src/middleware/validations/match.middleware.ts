import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Match from '../../domain/entities/Match';
import TeamModel from '../../database/models/TeamModel';
import HttpException from '../../helpers/HttpException';

const matchValidation = (req:Request, res:Response, next:NextFunction) => {
  const matchData: Match = req.body;

  if (matchData.awayTeam === matchData.homeTeam) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  Promise.all([
    TeamModel.findOne({ where: { id: matchData.awayTeam } }),
    TeamModel.findOne({ where: { id: matchData.homeTeam } }),
  ]).then((teams) => {
    const isValid = teams.every((team) => team !== null);
    if (!isValid) {
      return next(new HttpException(StatusCodes.NOT_FOUND, 'There is no team with such id!'));
    }
  });

  next();
};

export default matchValidation;
