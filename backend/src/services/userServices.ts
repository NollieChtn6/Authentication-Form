import { UserEntity } from "../entities/User";
import type { RegisterUserData } from "../schemas/userSchemas";

const bcrypt = require("bcrypt");

export const registerUser = async (data: RegisterUserData) => {
	const userExists = await UserEntity.findOne({
		where: { email: data.email },
	});
	if (userExists) return null;
	const newUser = new UserEntity();
	const hashedPassword = await bcrypt.hash(data.password, 10);

	newUser.firstName = data.firstName;
	newUser.email = data.email;
	newUser.password = hashedPassword;

	return await UserEntity.save(newUser);
};
