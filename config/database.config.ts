import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG = registerAs("DATABASE", () => {
    // TODO: export these constants so that they can be used in database/data-source.ts
    return {
        USER: process.env["DATABASE.USER"] ?? "admin",
        PASSWORD: process.env["DATABASE.PASSWORD"] ?? "password",
        HOST: process.env["DATABASE.HOST"] ?? "localhost",
        NAME: process.env["DATABASE.NAME"] ?? "dyson-admin-backend-db",
        PORT: process.env["DATABASE.PORT"] ?? 5432
    }
});