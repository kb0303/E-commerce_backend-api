// routes/paths to ProductController
import express from "express";
import UserController from "./user.controller.js";

const UserRouter = express.Router();

const userController = new UserController();

// Paths to controller methods
UserRouter.post('/signUp', userController.signUp);
UserRouter.post('/signIn', userController.signIn);

export default UserRouter;