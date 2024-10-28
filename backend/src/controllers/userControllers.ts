import type { Request, Response } from "express";
import { registerUser } from "../services/userServices";
import { registerUserSchema } from "../schemas/userSchemas";

import { StatusCodes } from "http-status-codes";

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
