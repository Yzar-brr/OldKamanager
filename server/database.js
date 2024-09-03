import dotenv from 'dotenv';

/**
 * This file provides all the data we need to Database Access
 * based on the info provided by the.env file
 */
dotenv.config();

const params = {
  host: process.env.HOST,
  databaseName: process.env.DATABASENAME,
};
export const url = `mongodb://${params.host}/${params.databaseName}?retryWrites=true&w=majority`;