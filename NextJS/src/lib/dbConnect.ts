import mongoose from "mongoose";

// This is a global variable that will hold the connection status of the database.
type ConnectionObject = {
  isConnected?: number;
};

// This variable will be used to check if the database is already connected or not.
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is connected already");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with an error code
  }
}
