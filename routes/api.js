import Router from "express";
import companiesRouter from "./api/companies.js";

const router = Router();

router.use("/companies", companiesRouter);

export default router;