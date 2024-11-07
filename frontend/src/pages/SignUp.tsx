import { Link } from "@swan-io/chicane";
import { GoogleLogin } from "@react-oauth/google";
import { Router } from "../router/router";
import { SignUpForm } from "../components/SignupForm";

export function SignUp() {
	return (
		<div className="page-container">
			<h2>Sign Up</h2>
			<SignUpForm />
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
			<p className="option auth-option">
				Already have an account?{" "}
				<span className="link">
					<Link to={Router.Login()}>Login!</Link>
				</span>
			</p>
		</div>
	);
}
