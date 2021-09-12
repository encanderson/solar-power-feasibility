/* eslint-disable @typescript-eslint/no-var-requires */
import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

export default app;