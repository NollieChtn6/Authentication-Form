import { Link } from "@swan-io/chicane";
import { Router } from "../router/router";
import { LoginForm } from "../components/LoginForm";

export function LogIn() {
	return (
		<div className="page-container">
			<h2>Login</h2>
			<LoginForm />
			<p>OR</p>
			<div>Log In with Google</div>
			<p className="option auth-option">
				No account yet?{" "}
				<span className="link">
					<Link to={Router.Signup()}>Sign up!</Link>
				</span>
			</p>
		</div>
	);
}
