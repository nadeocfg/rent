import { SHA256 } from "crypto-js";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../schemas/userSchema";

// @desc   user registration
// @route  GET /api/user/registration
// @access Public
const userRegistration = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { fullName, password, email } = request.body;

    const cryptedPass = password ? SHA256(password).toString() : "";

    const user = new User({
      fullName,
      email,
      password: cryptedPass,
    });

    await user.save((err: any, res: any) => {
      if (err) {
        return response.status(400).json({
          message: err.message,
        });
      }

      return response.json({
        message: "User created succesfully",
      });
    });
  } catch (error: any) {
    response.status(400).json({
      message: error.message,
    });
    next(`Error: ${error.message}`);
  }
};

export { userRegistration };
