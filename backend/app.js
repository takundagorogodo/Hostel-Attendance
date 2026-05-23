import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import mainRoutes from "./routes/mainRoutes.js";
import { notFound, globalErrorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api", mainRoutes);

app.use(notFound);
app.use(globalErrorHandler);

await connectDb();

export default app;
