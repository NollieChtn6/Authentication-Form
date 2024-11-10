import { useState } from "react";
import { Link } from "@swan-io/chicane";
import { GoogleLogin } from "@react-oauth/google";
import { Router } from "../router/router";
import { registerUser } from "../services/userServices";

import type { SignUpFormData, SuccessMessage } from "../@types/data.t";

import { SquareArrowOutUpRight } from "lucide-react";

export function SignUpForm() {
	const [formData, setFormData] = useState<SignUpFormData>({
		firstName: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	});

	const [successMessage, setSuccessMessage] = useState<SuccessMessage>("");

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.agreeToTerms) {
			alert("You must agree to the terms to sign up.");
			return;
		}

		try {
			await registerUser({
				firstName: formData.firstName,
				email: formData.email,
				password: formData.password,
			});
			setSuccessMessage("Your account has been created successfully!");
			setFormData({
				firstName: "",
				email: "",
				password: "",
				confirmPassword: "",
				agreeToTerms: false,
			});
		} catch (error) {
			console.log("Unable to create account.", error);
		}
	};

	return (
		<div className="form-container">
			{successMessage ? (
				<div className="success-message-container">
					<p>{successMessage}</p>
					<Link to={Router.Login()}>
						<p className="cta-link">
							Go to Login!{" "}
							<span>
								<SquareArrowOutUpRight />
							</span>
						</p>
					</Link>
				</div>
			) : (
				<>
					<form className="form signup-form" onSubmit={handleFormSubmit}>
						<div className="form-item">
							<label htmlFor="firstName">Your Name</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleFieldChange}
								placeholder="John"
							/>
						</div>
						<div className="form-item">
							<label htmlFor="email">Your Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleFieldChange}
								placeholder="email@example.com"
							/>
						</div>
						<div className="form-item">
							<label htmlFor="password">Your Password</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleFieldChange}
							/>
						</div>
						<div className="form-item">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleFieldChange}
							/>
						</div>
						<div className="form-item">
							<div className="checkbox-container">
								<input
									type="checkbox"
									id="agreeToTerms"
									name="agreeToTerms"
									checked={formData.agreeToTerms}
									onChange={handleFieldChange}
								/>
								<label htmlFor="agreeToTerms">
									I agree and I want to sign up!
								</label>
							</div>
						</div>
						<div className="btn-container">
							<button
								className="btn"
								type="submit"
								disabled={!formData.agreeToTerms}
							>
								Sign Up
							</button>
						</div>
					</form>
					<p>OR</p>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
						}}
						onError={() => {
							console.log("Login Failed");
						}}
						auto_select={true}
						theme="filled_blue"
						text="signup_with"
						locale="en"
					/>
				</>
			)}
		</div>
	);
}
