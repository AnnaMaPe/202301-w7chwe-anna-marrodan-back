import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase } from "../database/connectDatabase";
import { User } from "../database/models/User";
import mongoose from "mongoose";
import {
  type CredentialUserStructure,
  type PublicUserStructure,
} from "../types";
import { app } from "../server/app";
import jsw from "jsonwebtoken";
import bcryptsjs from "bcryptjs";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

const mockUser: PublicUserStructure = {
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
  describe("When it receives a request to create a user with username 'Juairo' and password '12345678' and email 'hola@gmail.com' and avatar 'guapo.jpeg' that already exists ", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });
    test("Then it should respond with status 409", async () => {
      const expectedStatus = 409;
      const endpoint = "/social/create";

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "error",
        "There was an issue creating the user"
      );
    });
  });
  describe("When it receives a request to create a user with an empty username and password '12345678' and email 'hola@gmail.com' and avatar 'guapo.jpeg' ", () => {
    const noUsernameMockUser: PublicUserStructure = {
      username: "",
      email: "hola@gmail.com",
      password: "12345678",
      avatar: "guapo.jpeg",
    };

    test("Then it should respond with status 409", async () => {
      const expectedStatus = 409;
      const endpoint = "/social/create";

      const response = await request(app)
        .post(endpoint)
        .send(noUsernameMockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "error",
        "There was an issue creating the user"
      );
    });
  });
});

describe("Given a POST '/social/login' endpoint", () => {
  const endpoint = "/social/login";

  describe("When it receives a request to log an existing user with username 'Juairo' and password '12345678' ", () => {
    test("Then it should respond with status 200", async () => {
      const password = "12345678";
      const hashedPassword = await bcryptsjs.hash(password, 8);
      const expectedStatus = 200;
      const expectedToken = "ThisIsAToken";

      await User.create({
        username: "Juairo",
        password: hashedPassword,
        email: "hola",
        avatar: "guapo.jpeg",
      });

      jsw.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });

  describe("When it receives a request to log an existing user with username 'Juairo' and password '12345678' but wrong credentials in password '12345679'", () => {
    test("Then it should respond with status 401", async () => {
      const password = "12345679";
      const hashedPassword = await bcryptsjs.hash(password, 8);
      const expectedStatus = 401;

      await User.create({
        username: "Juairo",
        password: hashedPassword,
        email: "hola",
        avatar: "guapo.jpeg",
      });

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Wrong credentials");
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
