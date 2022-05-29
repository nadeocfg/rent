import express from "express";
import { authUser, userRegistration } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/registration").post(userRegistration);
userRoutes.route("/auth").post(authUser);

export default userRoutes;
