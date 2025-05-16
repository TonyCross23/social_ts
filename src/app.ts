import express, { Request, Response } from "express"
import dotenv from "dotenv"
import log from "./logger/log"
import { connectDatabase } from "./databases/db";
import authRoute from "./routes/auth.route";

dotenv.config()

connectDatabase();
const PORT = process.env.PORT || 4321
const app = express()

app.use(express.json())

app.use("/api/v1", authRoute)

app.listen(PORT, () => {
    log.info(`App is running on port http://localhot:${PORT}`);
    
})