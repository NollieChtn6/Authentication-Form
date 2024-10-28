// Useful resources:
// https://blog.treblle.com/egergr/
// https://medium.com/deno-the-complete-reference/node-js-8-best-practices-for-express-middlewares-bb5825ec0844

import Express from "express";
import "reflect-metadata";
import cors from "cors";
import { initializeDataSource } from "./config/db";

const app = Express();
const PORT = 3000;

app.use(cors());
app.use(Express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, async () => {
	await initializeDataSource();
	console.log(`App listening on: http://localhost:${PORT}`);
});
