import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api.js";

dotenv.config();
const appexp = express();

appexp.use(bodyParser.json());
appexp.use(bodyParser.urlencoded({ extended: false }));
appexp.use('/api', api);

appexp.get('/', (req, res) => {
    res.send("Server Running");
});

appexp.listen(process.env.SRV_PORT, () => {
    console.log(`Listening on port ${process.env.SRV_PORT}`);
});