export function SignUpForm() {
	return (
		<form className="form signup-form">
			<div className="form-item">
				<label htmlFor="firstName">Your Name</label>
				<input type="text" id="firstName" name="firstName" placeholder="John" />
				<p className="validation-error firstName-error" />
			</div>
			<div className="form-item">
				<label htmlFor="email">Your Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="email@example.com"
				/>
				<p className="validation-error email-error" />
			</div>
			<div className="form-item">
				<label htmlFor="password">Your Password</label>
				<input type="password" id="password" name="password" />
				<p className="validation-error password-error" />
			</div>
			<div className="form-item">
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input type="password" id="password" name="password" />
				<p className="validation-error confirmPssword-error" />
			</div>
			<div className="form-item">
				<div className="checkbox-container">
					<input type="checkbox" id="password" name="password" />
					<label htmlFor="password">I agree and I want to sign in!</label>
				</div>
				<p className="validation-error password-error" />
			</div>
			<div className="btn-container">
				<button className="btn" type="submit">
					Sign Up
				</button>
			</div>
		</form>
	);
}
