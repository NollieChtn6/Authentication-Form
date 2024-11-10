import { Link } from "@swan-io/chicane";
import { Router } from "../router/router";
import { SignUpForm } from "../components/SignupForm";

export function SignUp() {
	return (
		<div className="page-container">
			<h2>Sign Up</h2>
			<SignUpForm />
			<p className="option auth-option">
				Already have an account?{" "}
				<span className="link">
					<Link to={Router.Login()}>Login!</Link>
				</span>
			</p>
		</div>
	);
}
