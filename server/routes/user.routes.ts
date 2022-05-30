import express from "express";
import {
  authUser,
  updateUser,
  userRegistration,
} from "../controllers/user.controller";
import { protect } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.route("/registration").post(userRegistration);
userRoutes.route("/auth").post(authUser);
userRoutes.route("/update").post(protect, updateUser);

export default userRoutes;
