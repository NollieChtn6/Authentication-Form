import { Link } from "@swan-io/chicane";
import { Router } from "../router/router";

export function Home() {
	return (
		<div className="home-panel">
			<Link to={Router.Signup()}>
				<button className="btn" type="button">
					I want to sign in!
				</button>
			</Link>
			<Link to={Router.Login()}>
				<button className="btn" type="button">
					I want to log in!
				</button>
			</Link>
		</div>
	);
}
