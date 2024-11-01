import { Router } from "express";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/auth", authRouter);

export { appRouter };
