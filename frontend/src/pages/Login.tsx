import { Link } from "@swan-io/chicane";
import { Router } from "../router/router";
import { LoginForm } from "../components/LoginForm";

import { GoogleLogin } from "@react-oauth/google";

export function LogIn() {
	return (
		<div className="page-container">
			<h2>Login</h2>
			<LoginForm />
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
				text="signin_with"
				locale="en"
			/>
			<p className="option auth-option">
				No account yet?{" "}
				<span className="link">
					<Link to={Router.Signup()}>Sign up!</Link>
				</span>
			</p>
		</div>
	);
}
