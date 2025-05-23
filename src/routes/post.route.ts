import {Router} from "express"
import { validate } from "../middlewares/valide"
import { postCreateSchema } from "../schema/postCreate.schema"
import { PostController } from "../controller/post.controller"
import { Authenticate } from "../middlewares/auth.middleware"
import upload from "../utils/cloudinaryStorage"

const postRouter = Router()

postRouter.post("/create",Authenticate, upload.single('image'), validate(postCreateSchema), PostController.postCreate)
postRouter.get("/feed", Authenticate, PostController.getAllPost)
postRouter.get("/:id", Authenticate, PostController.getPostById)
postRouter.put("/:id", Authenticate, upload.single('image'), validate(postCreateSchema), PostController.postEdit)
postRouter.delete("/:id", Authenticate, PostController.postDelete)

export default postRouter