import { Request, Response, Router } from "express";
import { validate } from "../middlewares/valide";
import { registerSchema } from "../schema/register.schema";
import { AuthController } from "../controller/auth.controller";
import { loginSchema } from "../schema/loginSchema";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schema/forgotPasswordSchema";
import { Authenticate } from "../middlewares/auth.middleware";

const authRoute = Router();

authRoute.post("/register", validate(registerSchema), AuthController.register);
authRoute.post("/login", validate(loginSchema), AuthController.login);
authRoute.post(
  "/forgot",
  validate(forgotPasswordSchema),
  AuthController.forgotPassword
);
authRoute.post(
  "/reset",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);
authRoute.post("/refresh", AuthController.handleRefreshToken);
authRoute.delete('/logout', Authenticate, AuthController.logout);

authRoute.get("/home", Authenticate, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).json({ message: "hello", user });
});

export default authRoute;
