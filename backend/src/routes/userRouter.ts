export const userRouter = require("express").Router();
import { signUp } from "../controllers/userControllers";

userRouter.post("/signup", signUp);
