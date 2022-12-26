import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    // TODO: export these constants so that they can be used in config/database.config.ts
    type: "postgres",
    host: process.env["DATABASE.HOST"] ?? "localhost",
    port: +process.env["DATABASE.PORT"] ?? 5432,
    username: process.env["DATABASE.USER"] ?? "admin",
    password: process.env["DATABASE.PASSWORD"] ?? "password",
    database: process.env["DATABASE.NAME"] ?? "dyson-admin-backend-db",
    entities: ["dist/src/**/*.entity.js"],
    migrations: ["dist/database/migrations/**/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;