export function LoginForm() {
	return (
		<form className="form login-form">
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
			<div className="btn-container">
				<button className="btn" type="submit">
					Log In
				</button>
			</div>
		</form>
	);
}
