import { z } from "zod";

export const registerUserSchema = z.object({
	firstName: z
		.string({ message: "first name must be a string" })
		.min(1, { message: "first name is required" }),
	email: z
		.string()
		.min(1, { message: "email is required" })
		.regex(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
			message: "email must be a valid adress email",
		}),
	password: z
		.string()
		.min(1, { message: "password is required" })
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/, {
			message:
				"password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 12 characters long.",
		}),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
	email: z
		.string()
		.min(1, { message: "email is required" })
		.regex(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
			message: "email must be a valid adress email",
		}),
	password: z
		.string()
		.min(1, { message: "password is required" })
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/, {
			message:
				"password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 12 characters long.",
		}),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
