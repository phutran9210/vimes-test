import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "lamgico123",
  database: "quanlykho_db",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
});
