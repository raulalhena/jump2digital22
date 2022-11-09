import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import CompaniesModel from "../models/companies.js";

dotenv.config();

let sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSW, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});

const Companies = CompaniesModel(sequelize, Sequelize);

await sequelize.sync({ force: false});
console.log("Tabla sincronizada");

export { Companies, sequelize, dotenv };