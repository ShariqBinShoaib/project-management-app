import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
// import { initializeDB } from "./startup/db";
import { inititalizeRoutes } from "./startup/routes";

createConnection()
  .then(() => {
    const app = express();
    console.log("Connected to database...");
    inititalizeRoutes(app);
    app.listen(5000, () => console.log("Server is running on port 5000.."));
  })
  .catch((error) => console.log(error));
