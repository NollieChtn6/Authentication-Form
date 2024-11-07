import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./reset.css";

// https://www.codingdeft.com/posts/react-18-typescript-error/
const rootElement = document.getElementById("root");
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
	<GoogleOAuthProvider clientId={clientId}>
		<StrictMode>
			<App />
		</StrictMode>
	</GoogleOAuthProvider>,
);
