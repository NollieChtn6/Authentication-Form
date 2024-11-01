import crypto from "crypto";
import axios from "axios";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { googleAuthConfig } from "../config/googleAuthConfig";
import { UserEntity } from "../entities/User";
import { generateJWT } from "../utils/generateJWT";

// Useful resource on how to implement Connect With Google: https://developers.google.com/identity/protocols/oauth2/web-server?hl=fr#node.js

export const redirectToGoogleOAuth = (req: Request, res: Response) => {
	const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleAuthConfig.GOOGLE_CLIENT_ID}&redirect_uri=${googleAuthConfig.REDIRECT_URI}&response_type=code&scope=profile email&prompt=consent`;
	res.redirect(googleAuthUrl);
	//console.log("Redirected!");
};

export const handleGoogleCallback = async (req: Request, res: Response) => {
	const code = req.query.code as string;
	// console.log("Code:", code);

	try {
		const tokenResponse = await axios.post(
			"https://oauth2.googleapis.com/token",
			{
				code: code as string,
				client_id: googleAuthConfig.GOOGLE_CLIENT_ID,
				client_secret: googleAuthConfig.GOOGLE_CLIENT_SECRET,
				redirect_uri: googleAuthConfig.REDIRECT_URI,
				grant_type: "authorization_code",
			},
		);
		const accessToken = tokenResponse.data.access_token;
		// console.log("Access Token:", accessToken);

		const userDataResponse = await axios.get(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
		const { email, given_name: firstName } = userDataResponse.data;
		// console.log("Fetched data:", userDataResponse.data);

		let user = await UserEntity.findOne({ where: { email } });
		const randomPassword = crypto.randomBytes(16).toString("hex");
		if (!user) {
			user = UserEntity.create({
				email,
				firstName,
				password: randomPassword,
			});
			await user.save();
		}

		const token = generateJWT(user.id, process.env.JWT_SECRET as string);

		res.cookie("token", token, { httpOnly: true, secure: false });
		res.status(StatusCodes.OK).json({
			// token,
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
			},
			message: "Successfully authenticated with Google",
		});
	} catch (error) {
		console.error("Error while authenticating with Google:", error);
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ error: "Google authentication failed" });
	}
};
