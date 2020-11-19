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

// app.use(Middlewares.notFound);
// app.use(Middlewares.errHandler);

// //THIS IS WORKING TO CONNECT TO MONGODB ATLAS!!!!!!!!!!!!!!!!!
// try {
//   mongoose.connect(
//     "mongodb+srv://dbUser:dbUserPassword@cluster0.vxgyt.mongodb.net/megaDATA?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     }
//   );
//   console.log("welcome to ATLAS ATLAS ATLAS!!!!!");
// } catch {
//   // .then(() => console.log("welcome to ATLAS"))
//   (error: string) => console.log("Denied to ATLAS", error);
// }
userRoutes.routes(app);
//console.log("this in in index.ts app", app.mountpath);
//userRoutes.getUsers(app);
//userRoutes.getUsersByID(app);
// const connect = mongoose.connection;
// connect.once("open", () => {
//   console.log("Finally open");
// });

//This have to come after the  routing !important

app.use(Middlewares.notFound);
app.use(Middlewares.errHandler);

//THIS IS WORKING TO CONNECT TO MONGODB ATLAS!!!!!!!!!!!!!!!!!
// const connectToDatabase = async (): Promise<any> => {
//   try {
//     const DB_URL: any = process.env.ATLAS_URI;
//     await mongoose.connect(
//       DB_URL,
//       // mongoose.connect(
//       //   "mongodb+srv://dbUser:dbUserPassword@cluster0.vxgyt.mongodb.net/megaDATA?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//       }
//     );
//     console.log("welcome to ATLAS ATLAS !!!!!");
//   } catch {
//     // .then(() => console.log("welcome to ATLAS"))
//     (error: string) => console.log("Denied to ATLAS", error);
//   }
// };

//connectToDatabase();

//Start server
Configuration.connectToDatabase();
Configuration.connectToPort(app);
// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server is running! on port!!!!!!!: ${port}`);
// });
