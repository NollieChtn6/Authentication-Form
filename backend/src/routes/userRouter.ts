export const userRouter = require("express").Router();
import { signUp, signIn } from "../controllers/userControllers";

userRouter.post("/signup", signUp);
userRouter.post("/login", signIn);
