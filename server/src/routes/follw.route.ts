import { Router } from "express";
import { Authenticate } from "../middlewares/auth.middleware";
import { followController } from "../controller/follow.controller";

const followRouter = Router();

followRouter.post("/:followingId", Authenticate, followController.createFollow)
followRouter.delete("/:followingId", Authenticate, followController.unfollowUser)
followRouter.get("/", Authenticate, followController.getFollowers)

export default followRouter;