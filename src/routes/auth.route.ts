import { Router } from "express";
import { validate } from "../middlewares/valide";
import { registerSchema } from "../schema/register.schema";
import { AuthController } from "../controller/auth.controller";


const authRoute = Router()

authRoute.post("/register", validate(registerSchema), AuthController.register)


export default authRoute