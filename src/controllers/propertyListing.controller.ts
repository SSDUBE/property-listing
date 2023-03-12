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
    .then((listings) => {
      if (!listings.length) {
        return Promise.reject({
          code: HTTP_CODES.NOT_FOUND,
          message: 'Organisation not found',
        });
      }

      return Promise.resolve(listings);
    })
    .then(async (listings) => {
      Logger.log('2) Find all agents linked to the organisation');
      const agentId: mongoose.Types.ObjectId[] = [];

      listings.forEach((listing) => agentId.push(listing.agent));

      const agents = await AgentModel.find({ _id: { $in: agentId } });

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

exports.getProperties = (req: Request, res: Response) => {
  const { agentID } = req.params;

  if (!agentID) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      data: 'Please specify an agentID on params',
      success: false,
    });
  }

  if (!mongoose.isValidObjectId(agentID)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      data: 'Please enter a valid agentID',
      success: false,
    });
  }

  Logger.log('1) Find all property listing for an agent');
  return ListingModel.find({ agent: agentID })
    .then((listings) => {
      if (!listings.length) {
        return Promise.reject({
          code: HTTP_CODES.NOT_FOUND,
          message: 'Organisation not found',
        });
      }

      return Promise.resolve(listings);
    })
    .then(async (listings) => {
      Logger.log('2) Return all the property listings');

      return res.status(HTTP_CODES.OK).json({
        success: true,
        data: listings,
      });
    })
    .catch((err) => {
      Logger.error(`3 Something went wrong Error: ${err.message}`);
      res.status(err.code || HTTP_CODES.SERVER_ERROR).json({
        success: false,
        error: { message: err.message },
      });
    });
};

exports.getOrganisationalProperties = (req: Request, res: Response) => {
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

  Logger.log('1) Find all property listing for the organisation');
  return ListingModel.find({ organisation: organisationID })
    .then((listings) => {
      if (!listings.length) {
        return Promise.reject({
          code: HTTP_CODES.NOT_FOUND,
          message: 'Organisation not found',
        });
      }

      return Promise.resolve(listings);
    })
    .then(async (listings) => {
      Logger.log('2) Return the property listing');
      return res.status(HTTP_CODES.OK).json({
        success: true,
        data: listings,
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
