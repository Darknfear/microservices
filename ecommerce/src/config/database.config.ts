import dotenv from 'dotenv';
dotenv.config();

export default {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  database: process.env.DB_NAME || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  // dialect: process.env.DB_DIALECT,
};
