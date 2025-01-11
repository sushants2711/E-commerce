import express from "express";
import { signinUser, loginUser, adminLogin } from "../controllers/userController.js";
import { signinMiddleWare } from "../middleware/signinMiddleWare.js";
import { loginMiddleWare } from "../middleware/loginMiddleWare.js";

const userRouter = express.Router();

userRouter.route("/register").post(signinMiddleWare, signinUser)
userRouter.route("/login").post(loginMiddleWare, loginUser)
userRouter.route("/admin").post(adminLogin)

export default userRouter