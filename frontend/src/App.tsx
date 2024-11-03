import { Router } from "./router/router";
import { match } from "ts-pattern";

import { Home } from "./pages/Home";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignupForm";

import "./App.css";

function App() {
	const route = Router.useRoute(["Home", "Login", "Signup"]);
	return (
		<>
			{match(route)
				.with({ name: "Home" }, () => <Home />)
				.with({ name: "Login" }, () => <LoginForm />)
				.with({ name: "Signup" }, () => <SignUpForm />)
				.otherwise(() => (
					<h1 className="">Oops! Not found!</h1>
				))}
		</>
	);
}

export default App;
