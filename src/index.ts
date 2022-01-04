import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

const app = express();
app.use(express.json());

createConnection()
  .then(async () => {
    console.log("Connected to database...");
    app.listen(5000, () => console.log("Server is running on port 5000.."));
  })
  .catch((error) => console.log(error));
