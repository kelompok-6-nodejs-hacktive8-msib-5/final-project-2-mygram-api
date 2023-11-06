import { Sequelize } from "sequelize";

const db = process.env.DB_URL + "?sslmode=require";

export const sequelize = new Sequelize(db);
