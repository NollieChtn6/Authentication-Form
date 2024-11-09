export const userRouter = require("express").Router();
import { authenticateJWT } from "../middlewares/authMiddleware";
import { getUserProfile, signUp, signIn, logout } from "../controllers/userControllers";

userRouter.get("/:id", authenticateJWT, getUserProfile);
userRouter.post("/signup", signUp);
userRouter.post("/login", signIn);
userRouter.post("/logout", logout);
