import { Router } from "express";
import authRoute from "./auth.route";
import postRouter from "./post.route";
import followRouter from "./follw.route";
import postLike from "../features/postLike/postLike.route";

const router = Router();

router.use('/auth',authRoute)
router.use('/post', postRouter)
router.use('/follow', followRouter)
router.use('/feed', postLike)

export default router;