import mongoose from "mongoose";
import { dbConfig } from "./constants.js";

const dbInit = async () => {
  try {
    await mongoose.connect(dbConfig.mongoDB_url, {
      dbName: dbConfig.dbName,
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