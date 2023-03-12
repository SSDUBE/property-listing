import mongoose from 'mongoose';
import { AgentModel } from '../models/agent';
import { OrganisationModel } from '../models/organisation';
import { PropertyModel } from '../models/property';
import { API } from '../utils/globals';
import Logger from '../utils/logger';
import properties from './properties.json';

(async () => {
  Logger.log('1 Starting seeding of data');
  const seedProperties: any = [];
  const seedAgents: any = [];
  const seedOrganisations: any = [];

  return mongoose
    .connect(API.DB_STRING, { autoIndex: false })
    .then(() => {
      Logger.log('2 Create all properties');
      properties.forEach((item) => {
        seedProperties.push(
          PropertyModel.findOneAndUpdate(
            { _id: item._id },
            { $set: { ...item } },
            { upsert: true }
          )
        );
      });
    })
    .then(() => {
      Logger.log('3 Create all agents');
      properties.forEach((item) => {
        seedAgents.push(
          AgentModel.findOneAndUpdate(
            { _id: item._id },
            { $set: { ...item } },
            { upsert: true }
          )
        );
      });
    })
    .then(() => {
      Logger.log('4 Create all organisations');
      properties.forEach((item) => {
        seedOrganisations.push(
          OrganisationModel.findOneAndUpdate(
            { _id: item._id },
            { $set: { ...item } },
            { upsert: true }
          )
        );
      });
    })
    .then(async () => {
      Logger.log('5 Populate the database');
      await Promise.all([
        ...seedAgents,
        ...seedOrganisations,
        ...seedProperties,
      ]);
      Logger.log('6 Seeding complete');
    })
    .catch((err) => {
      Logger.error(`7 Something whent wrong please try again Error:  ${err}`);
    });
})();
