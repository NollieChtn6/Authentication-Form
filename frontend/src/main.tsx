import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./reset.css";

// https://www.codingdeft.com/posts/react-18-typescript-error/
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
