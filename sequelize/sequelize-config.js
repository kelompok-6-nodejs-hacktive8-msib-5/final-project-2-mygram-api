import { Sequelize } from "sequelize";

const db = process.env.DB_URL + "?sslmode=require";

export const sequelize = new Sequelize(
  "postgresql://postgres:123@localhost:5432/db_mygram"
);
