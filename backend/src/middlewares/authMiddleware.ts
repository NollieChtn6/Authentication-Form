import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Useful resource on how to create custom request interface and prevent typing errors:
export interface CustomRequest extends Request {
	token?: string | JwtPayload;
}

// Code snippet: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
export const authenticateJWT = (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	// const authHeader = req.headers.authorization;
	// const token = authHeader?.split(" ")[1];
	const token = req.cookies.token;

	if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.token = decoded;
		next();
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ error: "Invalid or expired token" });
	}
};
