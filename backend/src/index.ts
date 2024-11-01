import Express from "express";
import "reflect-metadata";
import cors from "cors";
import { initializeDataSource } from "./config/db";
import { catchValidationErrors } from "./middlewares/inputValidation";
import { appRouter } from "./routes/router";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = Express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(Express.json());
app.use(catchValidationErrors);
app.use("/api", appRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app
	.listen(PORT, async () => {
		await initializeDataSource();
		console.log(`App listening on: http://localhost:${PORT}`);
	})
	.on("error", (e) => {
		console.log("Error happened: ", e.message);
	});
