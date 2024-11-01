import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchemas";
import { getUserById, loginUser, registerUser } from "../services/userServices";
import { generateJWT } from "../utils/generateJWT";

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = Number(req.params.id);
		const user = await getUserById(userId);
		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: "User not found" });
		}
		return res.status(StatusCodes.OK).json(user);
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Unexpected error occurred" });
	}
};

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

		const token = generateJWT(user.id, process.env.JWT_SECRET as string);

		return res
			.status(StatusCodes.OK)
			.json({ message: "Login successful", token });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Unexpected error occurred" });
	}
};
