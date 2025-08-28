import mongoose from "mongoose";
import { mongoDbConfig } from "./constants.js";

const dbInit = async () => {
  try {
    console.log(mongoDbConfig.mongoUri)
    await mongoose.connect(mongoDbConfig.mongoUri, {
      dbName: mongoDbConfig.mongoDbName,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("Connected to Database:", mongoose.connection.db.databaseName);
  } catch (exception) {
    console.log("Error established on connection");
    throw exception;
  }
};

dbInit();