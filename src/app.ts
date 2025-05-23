import express from "express"
import dotenv from "dotenv"
import log from "./logger/log"
import cookieParser from 'cookie-parser';
import { errorHandler } from "./exceptions/errorHandler";
import router from "./routes/ root.route";

dotenv.config()

const PORT = process.env.PORT || 4321

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.use("/api/v1", router)



app.listen(PORT, () => {
    log.info(`App is running on port http://localhsot:${PORT}`);
})

export default app