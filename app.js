import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/api.js";

/**
 *  Setting enviorenment and server
 */

dotenv.config();
const app = express();

/**
 *  Disabling X-POWERED-BY for security reasons
 */

app.disable("x-powered-by");

/**
 *  Set Middlewares
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 *  Root route, to check server connection
 */

 app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server running.."
    });
});

/**
 *  Set API route
 */

app.use('/api', apiRouter);

//**
//  Server listening, by default on port 3000
//*

app.listen(process.env.SRV_PORT || 3000, () => {
    console.log(`#Jump2digital22: => Listening on port ${process.env.SRV_PORT}`);
});