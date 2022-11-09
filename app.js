import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

app.get('/', (req, res) => {
    res.send("Server Running");
});

app.listen(process.env.SRV_PORT, () => {
    console.log(`Listening on port ${process.env.SRV_PORT}`);
});