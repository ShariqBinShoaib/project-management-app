import "reflect-metadata";
import express from "express";
import { inititalizeRoutes } from "./startup/routes";
import { dataSource } from "./startup/db";

dataSource
  .initialize()
  .then(() => {
    const app = express();
    console.log("Connected to database...");
    inititalizeRoutes(app);
    app.listen(5000, () => console.log("Server is running on port 5000.."));
  })
  .catch((error) => console.log(error));
