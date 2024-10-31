import jwt from "jsonwebtoken";

export const generateJWT = (userId: number, secret: string): string => {
	return jwt.sign({ userId }, secret, { expiresIn: "1h" });
};
