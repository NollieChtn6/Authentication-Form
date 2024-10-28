import { DataSource } from "typeorm";

const dataSource = new DataSource({
	type: "sqlite",
	database: "./authentication-challenge.sqlite",
	entities: [],
	synchronize: true,
});

export const initializeDataSource = () => {
	dataSource
		.initialize()
		.then(() => {
			console.log("Data Source has been initialized successfully");
		})
		.catch((error) => {
			console.log("Error during Data Source initialization", error);
		});
};
