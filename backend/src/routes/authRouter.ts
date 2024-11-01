export const authRouter = require("express").Router();

import {
	handleGoogleCallback,
	redirectToGoogleOAuth,
} from "../controllers/authController";

authRouter.get("/google", redirectToGoogleOAuth);
authRouter.get("/google/callback", handleGoogleCallback);
