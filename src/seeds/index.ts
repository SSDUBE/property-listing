import mongoose from 'mongoose';
import { AgentModel } from '../models/agent';
import { OrganisationModel } from '../models/organisation';
import { ListingModel } from '../models/listing';
import { API } from '../utils/globals';
import Logger from '../utils/logger';
import listings from './listings.json';
import agents from './agents.json';
import organisations from './organisations.json';
import admin from './admin.json';
import { UserModel } from '../models/user';
import PasswordBycrpt from '../utils/passwordBcrypt';

(async () => {
  Logger.log('1 Starting seeding of data');
  const seedProperties: any = [];
  const seedAgents: any = [];
  const seedOrganisations: any = [];

  return mongoose
    .connect(API.DB_STRING, { autoIndex: false })
    .then(() => {
      Logger.log('2 Create all listings');
      listings.forEach((item) => {
        seedProperties.push(
          ListingModel.findOneAndUpdate(
            { _id: item._id },
            { $set: { ...item } },
            { upsert: true }
          )
        );
      });
    })
    .then(() => {
      Logger.log('3 Create all agents');
      agents.forEach((item) => {
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
      organisations.forEach((item) => {
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
      Logger.log('5 Create admin');
      admin.password = await PasswordBycrpt.encrypt(admin.password)

      await UserModel.findOneAndUpdate(
        { username: admin.username },
        { $set: { ...admin } },
        { upsert: true }
      )
    })
    .then(async () => {
      Logger.log('6 Populate the database');
      await Promise.all([
        ...seedAgents,
        ...seedOrganisations,
        ...seedProperties,
      ]);
      Logger.log('7 Seeding complete');
    })
    .catch((err) => {
      Logger.error(`7 Something whent wrong please try again Error:  ${err}`);
    });
})();
