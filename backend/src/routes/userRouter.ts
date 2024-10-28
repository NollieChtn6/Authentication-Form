export const userRouter = require("express").Router();
import { authenticateJWT } from "../middlewares/authMiddleware";
import { getUserProfile, signUp, signIn } from "../controllers/userControllers";

userRouter.get("/users/:id", authenticateJWT, getUserProfile);
userRouter.post("/signup", signUp);
userRouter.post("/login", signIn);
