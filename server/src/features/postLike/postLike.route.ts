import { Router } from "express";
import { Authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/valide";
import { postLikeSchema } from "./postLike.schema";
import { PostLikeController } from "./postLike.controller";


const postLike = Router()

postLike.post("/like", Authenticate, validate(postLikeSchema), PostLikeController.createLike)
postLike.delete("/unlike", Authenticate, validate(postLikeSchema), PostLikeController.unlikePost)
postLike.get("/:postId/likes", Authenticate, PostLikeController.getAllPostLike)

export default postLike