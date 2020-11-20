import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import Middlewares from "./middlewares/Middlewares";
import morgan from "morgan";
import Configuration from "./configuration/configuration";
import userRoutes from "./routes/user.routes";
//import mongoose from "mongoose";

// Boot express
const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Application requierements
app.use(helmet()); // Add security to the app
app.use(morgan("common")); // Add logger to the app

// Application routing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use("/recipe", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from  Andres Parra THE BEST");
});

userRoutes.routes(app);

//This have to come after the  routing !important

app.use(Middlewares.notFound);
app.use(Middlewares.errHandler);

//Start server
Configuration.connectToDatabase();
Configuration.connectToPort(app);

export default app;
