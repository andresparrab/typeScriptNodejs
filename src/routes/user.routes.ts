// import { application } from "express";
import UserController from "../controllers/User.controller";
import { Application } from "express";

const routes = (app: Application): void => {
  console.log("This is inside soutes UserController.js", app.mountpath);
  app.post("/user", UserController.createUser);
  app.get("/user/getUsers", UserController.getUsers);
  app.get("/user/:id", UserController.getUserByID);
  app.get("/searchUser", UserController.getUserbyNameQuery);
  app.delete("/searchUserAndDelete", UserController.DeleteUserbyNameQuery);
};

export default {
  routes,
};
