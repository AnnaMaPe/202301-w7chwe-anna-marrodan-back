import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

describe("Given a notFoundErrorMiddleware", () => {
  describe("when it receives a response", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error with status 500", () => {
    test("Then it should call its status methos with 500", async () => {
      const statusCode = 500;
      const error = new CustomError(
        "There was an error",
        statusCode,
        "There was an error"
      );
      generalError(error, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
