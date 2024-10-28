import type { Request, Response } from "express";
import { registerUser } from "../services/userServices";
import { registerUserSchema } from "../schemas/userSchemas";

export const signUp = async (req: Request, res: Response) => {
	const { firstName, email, password } = registerUserSchema.parse(req.body);
	const newUser = await registerUser({ firstName, email, password });
	if (!newUser) {
		return res.status(409).json({ error: "User already exists in database" });
	}
	return res.status(201).json({ message: "User has been created", newUser });
};
