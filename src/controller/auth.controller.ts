import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export const AuthController = {
    register: async (req: Request, res: Response) => {
      try {
        const { name, email, password } = req.body;
        
        const user = await AuthService.register({ name, email, password });
        res.status(200).json(user);
      } catch (err) {
        res.status(409).json({ message: err.message });
      }
    },

    login: async (req: Request, res: Response) => {
       try {
          const { email, password } = req.body;

          const { accessToken, refreshToken } = await AuthService.login({ email, password });

          res.cookie("accessToken", accessToken, {
            httpOnly: false, // true if you don't want client-side JS to access
            secure: false,   // true if using HTTPS
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.status(200).json({ message: "Login successful" });
        } catch (err: any) {
          console.error(err);
          res.status(401).json({ message: err.message });
        }
    }
}