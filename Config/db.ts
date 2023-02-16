import mongoose from "mongoose";

const localUrl: string = "mongodb://localhost/auth2";
const cloudUrl: string = "";

export const dbFunction = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(localUrl);
    console.log("connected to", connect.connection.host);
  } catch (error) {
    console.log("An error occured in DB", error);
  }
};

// export default dbFunction;
