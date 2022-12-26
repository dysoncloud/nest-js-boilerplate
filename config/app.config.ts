export const APP_CONFIG = () => {
    return {
        APP_PORT: process.env["APP_PORT"] ?? 3000,
        APP_ENV: process.env["NODE_ENV"] ?? "dev",
        APP_URL: process.env["APP_URL"] ?? "localhost"
    }
}