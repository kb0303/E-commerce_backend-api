// routes/paths to ProductController
import express from "express";
import UserController from "./user.controller.js";

const UserRouter = express.Router();

const userController = new UserController();

// Paths to controller methods
UserRouter.post('/signUp', (req, res) => {
	userController.signUp(req, res);
});
UserRouter.post('/signIn', (req, res) => {
	userController.signIn(req, res);
});

export default UserRouter;