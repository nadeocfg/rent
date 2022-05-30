import { SHA256 } from "crypto-js";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserRequestModel } from "../models/UserModel";
import User from "../schemas/userSchema";
import { generateJwt } from "../utils/generateJwt";

// @desc   user registration
// @route  POST /api/user/registration
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

// @desc   user authorization
// @route  POST /api/user/auth
// @access Public
const authUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = request.body;

    const cryptedPass = password ? SHA256(password).toString() : "";

    const user = await User.findOne({
      email,
      password: cryptedPass,
    });

    if (!user) {
      return response.status(400).json({
        message: `User not found or wrong password/email`,
      });
    }

    const data: any = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    data.token = generateJwt(data);

    return response.json(data);
  } catch (error: any) {
    response.status(400).json({
      message: error.message,
    });
    next(`Error: ${error.message}`);
  }
};

// @desc   update user
// @route  POST /api/user/update
// @access Public
const updateUser = async (
  request: UserRequestModel,
  response: Response,
  next: NextFunction
) => {
  try {
    const { password, fullName, isAdmin } = request.body;

    const { id } = request.user;

    if (!id) {
      return response.status(400).json({
        message: `No token`,
      });
    }

    const cryptedPass = password ? SHA256(password).toString() : "";

    const user = await User.findById(id);

    if (!user) {
      return response.status(400).json({
        message: `User not found`,
      });
    }

    await user.updateOne({
      fullName: fullName,
      isAdmin: isAdmin,
      password: cryptedPass,
    });

    return response.json({
      message: "User updated succesfully",
    });
  } catch (error: any) {
    response.status(400).json({
      message: error.message,
    });
    next(`Error: ${error.message}`);
  }
};

export { userRegistration, authUser, updateUser };
