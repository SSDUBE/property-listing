import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ListingModel } from '../models/listing';
import { HTTP_CODES } from '../utils/globals';
import Logger from '../utils/logger';
import { AgentModel } from '../models/agent';

exports.getAgents = (req: Request, res: Response) => {
  const { organisationID } = req.params;

  if (!organisationID) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      data: 'Please specify an organisationID on params',
      success: false,
    });
  }

  if (!mongoose.isValidObjectId(organisationID)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      data: 'Please enter a valid organisationID',
      success: false,
    });
  }

  Logger.log('1) Find all property listing');
  return ListingModel.find({ organisation: organisationID }, { agent: 1 })
    .then((orgs) => {
      if (!orgs.length) {
        return Promise.reject({
          code: HTTP_CODES.NOT_FOUND,
          message: 'Organisation not found',
        });
      }

      return Promise.resolve(orgs);
    })
    .then(async (orgs) => {
      Logger.log('2) Find all agents linked to the organisation');
      const agentId: mongoose.Types.ObjectId[] = [];

      orgs.forEach((org) => agentId.push(org.agent));

      const agents = await AgentModel.find(
        { _id: { $in: agentId } },
        { __v: 0 }
      );

      return Promise.resolve(agents);
    })
    .then((agents) => {
      Logger.log('3) Return list of agents');
      return res.status(HTTP_CODES.OK).json({
        success: true,
        data: agents,
      });
    })
    .catch((err) => {
      Logger.error(`4 Something went wrong Error: ${err.message}`);
      res.status(err.code || HTTP_CODES.SERVER_ERROR).json({
        success: false,
        error: { message: err.message },
      });
    });
};
