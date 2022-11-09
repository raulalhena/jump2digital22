import Router from "express";
import { Companies, sequelize, dotenv } from "../../config/maria.js";
import { Sequelize } from "sequelize"; 
import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fp = path.join(__dirname, process.env.DB_FILE);
const router = Router();
router.disable("x-powered-by");

// Show all the companies on the DB
router.get("/", async (req, res) => {
    const companies = await Companies.findAll();
    res.json(companies);
});

// Show companies sorted by size
router.get("/bysize", async(req, res) => {
    const companies = await Companies.findAll({
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
    res.json(companies);
});

// Show companies sorted by date
router.get("/bydate", async (req, res) => {
    const companies = await Companies.findAll({
        order: [
            ["founded", "DESC"]
        ],
        where: {
            founded: { 
                [Sequelize.Op.not]: null
            }
        }
    });
    res.json(companies);
});

// Show amount of companies by: industry, size range and year of fundation
router.get("/amount", async (req, res) => {
    const byIndustry = await sequelize.query('SELECT COUNT (industry) AS `Amount`, industry FROM `companies` WHERE `industry` IS NOT NULL GROUP BY `industry` ORDER BY COUNT (industry) DESC;');
    const bySize = await sequelize.query('SELECT COUNT (size) AS `Amount`, size FROM `companies` WHERE `size` IS NOT NULL GROUP BY `size` ORDER BY CAST(size AS UNSIGNED INTEGER) DESC;');
    const byFoundedYear = await sequelize.query('SELECT COUNT (founded) AS `Amount`, founded FROM `companies` WHERE `founded` IS NOT NULL GROUP BY `founded` ORDER BY founded DESC;');
    res.json({
        "industries": byIndustry[0],
        "funded": byFoundedYear[0],
        "size": bySize[0]
    });
});

// Load all the companies to DB
router.post("/loadall", (req, res) => {
    let companyRes;
    const companies = Object.entries(JSON.parse(fs.readFileSync(fp, "utf-8")));
    companies.forEach(async (company) => {
       companyRes = await Companies.create(company[1]);
    });
    if(!companyRes){
        res.json({
            "companies":"loaded"
        });
    }
});

export default router;