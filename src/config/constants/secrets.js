const env = process.env;

export const API_SECRET = "YXV0aC1hcGktc2VjcmV0LWNvbnRhaW5lci0xMjM0NTY=";

export const DB_HOST = env.DB_HOST ? env.DB_HOST : "localhost";
export const DB_PORT = env.DB_PORT ? env.DB_PORT : "5432";

export const DB_NAME = env.DB_NAME ? env.DB_NAME : "db-banca";
export const DB_USER = env.DB_USER ? env.DB_USER : "admin";

export const DB_PASSWORD = env.DB_PASSWORD ? env.DB_PASSWORD : "123456";
