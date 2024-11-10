import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type RegisterUserData = {
	firstName: string;
	email: string;
	password: string;
};

export const registerUser = async (data: RegisterUserData) => {
	try {
		console.log("BASE_URL: ", BASE_URL);
		const response = await axios.post(`${BASE_URL}/api/users/signup`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject({ error: "An unexpected error occurred" });
	}
};
