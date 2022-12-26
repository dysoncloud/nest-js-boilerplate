import { registerAs } from "@nestjs/config";

export const MAIL_CONFIG = registerAs("MAIL", () => {
    return {
        HOST: process.env["MAIL.HOST"] ?? "localhost",
        USER: process.env["MAIL.USER"],
        PASSWORD: process.env["MAIL.PASSWORD"],
        NOREPLY: process.env["NOREPLY"] ?? "no-reply@dysoncloud.io",
        SECURE: process.env["MAIL.SECURE"] ?? false,
    }
});