import Chai from "chai";
import { describe, it as test } from "mocha";
import app from "../index";
import chaiHttp from "chai-http";
import { request, response } from "express";
import StatusCode from "../configuration/StatusCode";
Chai.should();
Chai.use(chaiHttp);

const randomString = Math.random().toString(36).substring(7);
const userID = "5facbba56fb2a932115e8ec7";
const user = {
  username: randomString,
  password: randomString,
};

const testtingNonExistentRoute = () => {
  describe("Testing route does not exist", () => {
    test(" Expecting 404 not found", (done) => {
      Chai.request(app)
        .get(`/${randomString}`)
        .end((request, response) => {
          response.should.have.status(StatusCode.NOT_FOUND); // ASK TEACHER WHY a.status dont work!!!
          done();
        });
    });
  });
};

const createUser = () => {
  describe(" Testing Create(POST) method for user entety", () => {
    test("Expecting a user to be created", (done) => {
      Chai.request(app)
        .post("/user")
        .send(user)
        .end((error, response) => {
          response.should.have.status(StatusCode.CREATED);
          response.body.should.be.a("object");
          response.body.should.have.property("username").eq(user.username);
          response.body.should.have.property("password").eq(user.password);
          done();
        });
    });
  });
};
const getUsers = () => {
  describe(" Fetching all users(GET)", () => {
    test("Expecting to return all the users", (done) => {
      Chai.request(app)
        .get("/user/getUsers")
        .end((error, response) => {
          response.should.have.status(StatusCode.OK);
          response.body.should.be.a("array");
          console.log("Then number os users are: ", response.body.length);
          response.body.length.should.be.eq(response.body.length);
          done();
        });
    });
  });
};
const UpdateUserInfo = () => {
  describe(" Updating(PUT) a user in the database", () => {
    test("Expecting a user to be updated", (done) => {
      Chai.request(app)
        .put(`/user/${userID}`)
        .send(user)
        .end((error, response) => {
          response.should.have.status(StatusCode.OK);
          response.body.should.be.a("object");
          response.body.should.have.property("_id").eq(userID);
          response.body.should.have.property("username").eq(user.username);
          response.body.should.have.property("password").eq(user.password);
          console.log("user after Update", response.body);
        });
      done();
    });
  });
};
const DeleteUserbyNameQuery = () => {
  describe(" Deleting(DELETE) a user from the database", () => {
    test("Expecting a user to be deleted", (done) => {
      Chai.request(app)
        .delete("/searchUserAndDelete?username=Luffisama")
        .end((error, response) => {
          response.should.have.status(StatusCode.OK); /// ASK TEACHER!!!!
          done();
        });
    });
  });
};

describe("Testing the user API route", () => {
  testtingNonExistentRoute();
  // createUser();
  getUsers();
  UpdateUserInfo();
  DeleteUserbyNameQuery();
});
