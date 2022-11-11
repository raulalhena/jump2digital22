import Router from "express";
import { Companies, sequelize, dotenv } from "../../config/maria.js";
import { Sequelize } from "sequelize"; 
import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/**
 * Setting enviorenment and server router
 */

dotenv.config();
const router = Router();

/**
 * Setting access to files and creating URI to file 'companies.json' as DB_FILE 
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fp = path.join(__dirname, process.env.DB_FILE);

/**
 * Disabling X-POWERED-BY for security reasons
 */

router.disable("x-powered-by");

/**
 * Show all the companies on the DB
 */

router.get("/", async (req, res) => {

    let companies;

    try{
        companies = await Companies.findAll();
    }catch(err){
        console.error(`#Jump2digital22: => ERROR: ${err}`);
    }
    
    if(companies){
        manageResult(res, 200, "success", companies);
    }else{
        manageResult(res, 400, "fail", null);
    }

});

/**
 *  Show companies sorted by size
 */

router.get("/bysize", async(req, res) => {

    let companies;

    try{
        companies = await Companies.findAll({
            order: [
                [sequelize.cast(sequelize.col("size"), "unsigned int")],
                ["size", "DESC"]
            ],
            where: {
                size: {
                    [Sequelize.Op.not]: null
                }
            }
        });
    }catch(err){
        console.log(`#Jump2digital22: => ERROR: ${err}`);
    }

    if(companies){
        manageResult(res, 200, "success", companies);
    }else{
        manageResult(res, 400, "fail", null);
    }
});

/**
*   Show companies sorted by date
*/

router.get("/byfoundedyear", async (req, res) => {

    let companies;

    try{
        companies = await Companies.findAll({
            order: [
                ["founded", "DESC"]
            ],
            where: {
                founded: { 
                    [Sequelize.Op.not]: null
                }
            }
        });
    }catch(err){
        console.log(`#Jump2digital22: => ERROR: ${err}`);
    }

    if(companies){
        manageResult(res, 200, "success", companies);
    }else{
        manageResult(res, 400, "fail", null);
    }

});

/**
 *  Show amount of companies by: industry, size range and year of fundation
 */

router.get("/amount", async (req, res) => {
    
    let byIndustry;
    let bySize;
    let byFoundedYear;
    
    try{
        byIndustry = await sequelize.query('SELECT COUNT (industry) AS `amount`, industry FROM `companies` WHERE `industry` IS NOT NULL GROUP BY `industry` ORDER BY COUNT (industry) DESC;');
        bySize = await sequelize.query('SELECT COUNT (size) AS `amount`, size FROM `companies` WHERE `size` IS NOT NULL GROUP BY `size` ORDER BY CAST(size AS UNSIGNED INTEGER) DESC;');
        byFoundedYear = await sequelize.query('SELECT COUNT (founded) AS `amount`, founded FROM `companies` WHERE `founded` IS NOT NULL GROUP BY `founded` ORDER BY founded DESC;');
    }catch(err){
       console.error(`#Jump2digital22: => ERROR: ${err}`);
    }

    if (byIndustry && bySize && byFoundedYear){
        const result = {byIndustry: byIndustry[0], bySize: bySize[0], byFoundedYear: byFoundedYear[0]};
        manageResult(res, 200, "success", result);
    }else{
        manageResult(res, 400, "fail", null);
    }

});

/**
 *  Load all the companies' information to table 'companies'
 */

router.get("/loadall", async (req, res) => {

    try{
        const result = await Companies.bulkCreate(JSON.parse(fs.readFileSync(fp, "utf-8")));
        manageResult(res, 200, "success", result);
    }catch(err){
        console.error(`#Jump2digital22: => ERROR: ${err}`);
        manageResult(res, 400, "fail", null);
    }

});

/**
 *  Showing the results of the 
 */

function manageResult(res, code, message, data) {
    
    res.status(code).json({
        code,
        message,
        data
    });
    
}

export default router;