import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, type z } from "zod";

export async function catchValidationErrors(
	_req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMessages = error.errors.map((issue: z.ZodIssue) => ({
				message: `On '${issue.path.join(".")}': ${issue.message}`,
			}));
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: "Invalid data", details: errorMessages });
		} else {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Server Error" });
		}
	}
}
