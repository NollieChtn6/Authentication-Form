import { match } from "ts-pattern";
import { Link } from "@swan-io/chicane";
import { Router } from "./router/router";
import { House } from "lucide-react";

import { Home } from "./pages/Home";
import { LogIn } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

import "./App.css";

function App() {
	const route = Router.useRoute(["Home", "Login", "Signup"]);
	return (
		<main>
			<Link to={Router.Home()}>
				<button className="btn home-btn" type="button">
					<House />
				</button>
			</Link>
			{match(route)
				.with({ name: "Home" }, () => <Home />)
				.with({ name: "Login" }, () => <LogIn />)
				.with({ name: "Signup" }, () => <SignUp />)
				.otherwise(() => (
					<h1 className="">Oops! Not found!</h1>
				))}
			<footer>
				<p>
					Crafted with 💙 by{" "}
					<span>
						<a href="https://github.com/nolliechtn6">NollieChtn6</a>
					</span>
				</p>
			</footer>
		</main>
	);
}

export default App;
