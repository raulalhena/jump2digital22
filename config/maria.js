import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import CompaniesModel from "../models/companies.js";

/**
 *  Setting enviorenment and server
 */

dotenv.config();

/**
 *  Setting Sequelize parameters
 */

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSW, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false
});

/**
 *  Instantiating Companies Model
 */

const Companies = CompaniesModel(sequelize, Sequelize);

/**
 *  Creating table 'companies'
 */

await sequelize.sync({ force: false});
console.log("#Jump2digital22: => Table 'companies' syncronized");

export { Companies, sequelize, dotenv };