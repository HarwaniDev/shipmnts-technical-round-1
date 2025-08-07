import express from "express";
import cors from "cors";
import { router } from "./routes/storeRouter";
import { planRouter } from "./routes/planRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/store", router);
app.use("/plan", planRouter);
app.listen(3000);
