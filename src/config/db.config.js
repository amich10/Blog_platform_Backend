import mongoose from "mongoose";
import { mongoDbConfig } from "./constants.js";

const dbInit = async () => {
  try {
    console.log(process.env.MONGODB_URL)
    await mongoose.connect("mongodb+srv://amich:amich@cluster0.cff3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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