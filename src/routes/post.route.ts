import {Router} from "express"
import { validate } from "../middlewares/valide"
import { postCreateSchema } from "../schema/postCreate.schema"
import { PostController } from "../controller/post.controller"
import { Authenticate } from "../middlewares/auth.middleware"

const postRouter = Router()

postRouter.post("/create",Authenticate,validate(postCreateSchema), PostController.postCreate)

export default postRouter