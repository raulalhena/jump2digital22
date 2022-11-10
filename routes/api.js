import Router from "express";
import companiesRouter from "./api/companies.js";
import * as dotenv from "dotenv";

/**
 *  Setting enviorenment and server router
 */

dotenv.config();
const router = Router();

/**
 *  Disabling X-POWERED-BY for security reasons
 */

router.disable("x-powered-by");

/**
 *  API root route, to check api online
 */

 router.get('/', (req, res) => {
    res.status(200).json({
        code: 200,
        message: `Api ${process.env.API_VERSION} online`
    });
});

/**
 *  Setting route '/companies'
 */

router.use("/companies", companiesRouter);

export default router;