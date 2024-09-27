import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 9555,
  username: "theUser",
  password: "thePass",
  database: "rent",
  synchronize: true,
  logging: true,
  entities: [process.cwd() + '/src/Postgres/Entities/index.ts'],
  migrations: [process.cwd() + '/src/Postgres/migrations/*.ts'],
  subscribers: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });