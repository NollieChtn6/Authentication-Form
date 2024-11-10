export type SignUpFormData = {
	firstName: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
};

export type FormErrors = {
	firstNameError: string;
	emailError: string;
	passwordError: string;
	confirmPasswordError: string;
	formError: string;
};

export type SuccessMessage = string;
