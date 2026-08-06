import express from "express";
import dotenv from "dotenv";

dotenv.config();
import { MongoClient } from "mongodb";
import path from "path";

const app = express();

const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_URL = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@${MONGO_HOST}:27017`;

const client = new MongoClient(MONGO_URL);

const dbName = "docker-test-db";

// CONNECT DATABASE ONCE
await client.connect();

console.log("MongoDB Connected");

const db = client.db(dbName);

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// GET ALL USERS
app.get("/getUsers", async (req, res) => {
  try {
    const users = await db.collection("users").find({}).toArray();

    res.json(users);
  } catch (err) {
    console.log(err);

    res.status(500).send("Error fetching users");
  }
});

// ADD USER
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;

    await db.collection("users").insertOne(userObj);

    res.send("User Added Successfully");
  } catch (err) {
    console.log(err);
    res.send("Error adding user");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
