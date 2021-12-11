import express from "express";

import { pvSizing, getCities } from "@src/controllers/sizing.controllers";

const router = express.Router();

router.post("/pv-system", pvSizing);
router.get("/cities", getCities);

module.exports = (app: express.Application) => app.use("/api/v1/solar", router);
