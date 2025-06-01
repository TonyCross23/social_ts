import { Router } from "express";
import { Authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/valide";
import { postLikeSchema } from "./postLike.schema";
import { PostLikeController } from "./postLike.controller";


const postLike = Router()

postLike.post("/:postId/like", Authenticate, PostLikeController.createLike)
postLike.delete("/:postId/unlike", Authenticate, PostLikeController.unlikePost)
postLike.get("/:postId/likes", Authenticate, PostLikeController.getAllPostLike)

export default postLike