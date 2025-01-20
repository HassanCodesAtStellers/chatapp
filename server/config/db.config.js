import mongoose from "mongoose";
import config from "./env.config.js";

const connectDB = async () => {
  try {
    let connectionInstance = await mongoose.connect(`${config.mongoDb_URI}`);
    mongoose.connection.on("connected", () => {
      console.log(
        `Connected to MongoDB: ${connectionInstance.connection.host}`
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection lost, trying to reconnect...");
      setTimeout(connectDB(), 5000);
    });

    mongoose.connection.on("error", (error) => {
      console.error(`MongoDB connection error: ${error.message}`);
      setTimeout(connectDB(), 5000);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(0);
  }
};

export default connectDB;
