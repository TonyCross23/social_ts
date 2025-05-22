import express from "express"
import dotenv from "dotenv"
import log from "./logger/log"
import authRoute from "./routes/auth.route";
import cookieParser from 'cookie-parser';
import { errorHandler } from "./exceptions/errorHandler";
import postRouter from "./routes/post.route";

dotenv.config()

const PORT = process.env.PORT || 4321

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.use("/api/v1", authRoute)
app.use("/api/v1/post",postRouter)


app.listen(PORT, () => {
    log.info(`App is running on port http://localhsot:${PORT}`);
})

export default app