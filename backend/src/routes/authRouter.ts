import type { Request, Response } from "express";
export const authRouter = require("express").Router();
import { StatusCodes } from "http-status-codes";

import {
	handleGoogleCallback,
	redirectToGoogleOAuth,
} from "../controllers/authController";

authRouter.get("/google", redirectToGoogleOAuth);
authRouter.get("/google/callback", handleGoogleCallback);
