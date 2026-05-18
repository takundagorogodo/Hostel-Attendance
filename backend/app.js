import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb  from "./config/db";


dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("api",mainRoutes);


export default app;