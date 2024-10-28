import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userServices";
import { registerUserSchema, loginUserSchema } from "../schemas/userSchemas";

import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
	try {
		const { firstName, email, password } = registerUserSchema.parse(req.body);
		const newUser = await registerUser({ firstName, email, password });
		if (!newUser) {
			return res
				.status(StatusCodes.CONFLICT)
				.json({ error: "User already exists in database" });
		}
		return res
			.status(StatusCodes.CREATED)
			.json({ message: "User has been created", newUser });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Unexpected error occurred" });
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = loginUserSchema.parse(req.body);

		const user = await loginUser({ email, password });
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ error: "Invalid email or password" });
		}

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1h" },
		);

		return res
			.status(StatusCodes.OK)
			.json({ message: "Login successful", token });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Unexpected error occurred" });
	}
};
