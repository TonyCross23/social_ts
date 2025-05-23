import { Router } from "express";
import authRoute from "./auth.route";
import postRouter from "./post.route";

const router = Router();

router.use('/auth',authRoute)
router.use('/post', postRouter)

export default router;