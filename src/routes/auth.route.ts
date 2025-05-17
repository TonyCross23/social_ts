import { Router } from "express";
import { validate } from "../middlewares/valide";
import { registerSchema } from "../schema/register.schema";
import { AuthController } from "../controller/auth.controller";
import { loginSchema } from "../schema/loginSchema";


const authRoute = Router()

authRoute.post("/register", validate(registerSchema), AuthController.register)
authRoute.post('/login', validate(loginSchema), AuthController.login);

export default authRoute