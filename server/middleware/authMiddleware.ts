import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRequestModel } from "../models/UserModel";

dotenv.config();

const protect = async (
  request: UserRequestModel,
  response: Response,
  next: NextFunction
) => {
  let token = null;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = request.headers.authorization.slice(7);

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

      request.user = {
        ...decoded,
      };
    } catch {
      response.status(401);
      next(new Error("Invalid or expired token"));
    }
  }

  if (!request.headers.authorization) {
    response.status(401);
    next(new Error("No token"));
  }

  next();
};

export { protect };
