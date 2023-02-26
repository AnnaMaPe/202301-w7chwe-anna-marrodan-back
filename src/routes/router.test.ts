import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase } from "../database/connectDatabase";
import { User } from "../database/models/User";
import mongoose from "mongoose";
import { type CredentialsUserStructure } from "../types";
import { app } from "../server/app";
import jsw from "jsonwebtoken";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

const mockUser: CredentialsUserStructure = {
  username: "Juairo",
  email: "hola@gmail.com",
  password: "12345678",
  avatar: "guapo.jpeg",
};

describe("Given a POST '/social/create' endpoint", () => {
  describe("When it receives a request to create a new user with username 'Juairo' and password '12345678' and email 'hola@gmail.com' and avatar 'guapo.jpeg' ", () => {
    test("Then it should respond with status 201", async () => {
      const expectedStatus = 201;
      const endpoint = "/social/create";

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "message",
        "User was succesfully created"
      );
    });
  });
});

describe("Given a POST '/social/login' endpoint", () => {
  const endpoint = "/social/login";
  describe("When it receives a request to log an existing user with username 'Juairo' and password '12345678' ", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      const expectedToken = "ThisIsAToken";

      jsw.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });

  describe("When it receives a request to log a non-existing user with username 'Daiana' and password '12345612' ", () => {
    test("Then it should respond with status 401", async () => {
      const endpoint = "/social/login";
      const expectedStatus = 401;
      const nonRegisteredMockUser = {
        username: "Daiana",
        password: "12345612",
      };

      const response = await request(app)
        .post(endpoint)
        .send(nonRegisteredMockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Wrong credentials");
    });
  });
});
