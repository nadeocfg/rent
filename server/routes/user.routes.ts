import express from "express";
import { userRegistration } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/registration").post(userRegistration);

export default userRoutes;
