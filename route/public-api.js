import express from "express";
import {
  registerController,
  loginController,
} from "../controller/user-controller.js";

export const publicRouter = express.Router();

publicRouter.post("/users/register", registerController);
publicRouter.post("/users/login", loginController);
