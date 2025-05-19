import { Router } from "express";
import { validate } from "../middlewares/valide";
import { registerSchema } from "../schema/register.schema";
import { AuthController } from "../controller/auth.controller";
import { loginSchema } from "../schema/loginSchema";
import { forgotPasswordSchema, resetPasswordSchema } from "../schema/forgotPasswordSchema";


const authRoute = Router()

authRoute.post("/register", validate(registerSchema), AuthController.register)
authRoute.post('/login', validate(loginSchema), AuthController.login);
authRoute.post("/forgot", validate(forgotPasswordSchema), AuthController.forgotPassword)
authRoute.post("/reset", validate(resetPasswordSchema), AuthController.resetPassword);

export default authRoute