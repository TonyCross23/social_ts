import {Router} from "express"
import { validate } from "../middlewares/valide"
import { postCreateSchema } from "../schema/postCreate.schema"
import { PostController } from "../controller/post.controller"
import { Authenticate } from "../middlewares/auth.middleware"

const postRouter = Router()

postRouter.post("/create",Authenticate,validate(postCreateSchema), PostController.postCreate)
postRouter.get("/feed", Authenticate, PostController.getAllPost)
postRouter.get("/:id", Authenticate, PostController.getPostById)
postRouter.put("/:id", Authenticate, validate(postCreateSchema), PostController.postEdit)

export default postRouter