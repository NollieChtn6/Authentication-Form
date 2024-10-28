import { UserEntity } from "../entities/User";
import type { RegisterUserData, LoginUserData } from "../schemas/userSchemas";

const bcrypt = require("bcrypt");

export const getUserById = async (
	userId: number,
): Promise<UserEntity | null> => {
	const user = await UserEntity.findOne({
		where: { id: userId },
		select: ["id", "firstName", "email", "createdAt"],
	});
	if (!user) return user;
	return user;
};

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

export const loginUser = async ({ email, password }: LoginUserData) => {
	const user = await UserEntity.findOne({ where: { email: email } });
	if (!user) return null;

	const passwordIsValid = await bcrypt.compare(password, user.password);
	if (!passwordIsValid) return null;

	return user;
};
