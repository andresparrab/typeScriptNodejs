import UserModel from "../models/User.model";
import * as express from "express";
import "mongoose";
import { error } from "console";
//import * as  Mongoose  from "mongoose";

/// Create new user
const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });

  console.log("This is the new user: ", user);
  try {
    console.log("Waiting for user to save.............", user);
    const response = await user.save();
    console.log("User saved succesfuly");
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get ALL users
const getUsers = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log("Getting users..........: ", req.params.id);
    const users = await UserModel.find();
    res.status(200).send(users);
    // () => {
    //res.json(users);  // this the response will be send as a json document
    console.log(`this is inside /users.get : ${users}`);
    // };
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get user by id
const getUserByID = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Getting user ID..........: ", req.params.id);
    const response = await UserModel.findById(req.params.id);
    console.log("GOT IT..user ID :  ", response);
    res.status(200).send(response);
    console.log(`this is inside getuser id TRY{} : `);
  } catch (error) {
    console.log(`this is inside ERROR : `);
    res.status(500).send({
      message: "Error occured while trying to recieve user with id: ",
      error: error.message,
    });
  }
};
// Get user by name Query
const getUserbyNameQuery = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const response = await UserModel.find({ username: req.query.username });
    response.length !== 0
      ? res.status(200).send(response)
      : res.status(404).send({ message: "Could not find user with username: " + req.query.username });
  } catch (error) {
    res.status(500).send({
      message: "Error occured while trying to retrieve user with username: " + req.query.username,
      error: error.message,
    });
  }
};

// Delete User
const DeleteUserbyNameQuery = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const response = await UserModel.findByIdAndDelete(await UserModel.find({ username: req.query.username }));

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message: "Error occured while trying to retrieve user with username: " + req.query.username,
      error: error.message,
    });
  }
};

export default {
  createUser,
  getUsers,
  getUserByID,
  getUserbyNameQuery,
  DeleteUserbyNameQuery,
};
