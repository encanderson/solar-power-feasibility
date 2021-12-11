import express from "express";

import { pvSizing } from "@src/controllers/sizing.controllers";

const router = express.Router();

router.post("/pv-system", pvSizing);

module.exports = (app: express.Application) => app.use("/api/v1/solar", router);
