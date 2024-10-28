import Express from "express";
import "reflect-metadata";
import cors from "cors";
import { initializeDataSource } from "./config/db";
import { catchValidationErrors } from "./middlewares/inputValidation";
import { userRouter } from "./routes/userRouter";

const app = Express();
const PORT = 3000;

app.use(cors());
app.use(Express.json());
app.use(catchValidationErrors);
app.use("/api", userRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, async () => {
	await initializeDataSource();
	console.log(`App listening on: http://localhost:${PORT}`);
});
