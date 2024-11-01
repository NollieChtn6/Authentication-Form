require("dotenv").config();

export const googleAuthConfig = {
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
	REDIRECT_URI: `${process.env.BASE_URL}auth/google/callback`,
};
