import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import dotenv from "dotenv";
dotenv.config();

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

      const { accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: false, // true if you don't want client-side JS to access
        secure: false, // true if using HTTPS
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({ message: "Login successful" });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const result = await AuthService.forgotPassword(email);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      const result = await AuthService.resetPassword(token, newPassword);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  handleRefreshToken: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies["refreshToken"];

      if (!refreshToken) {
        res.status(401).json({ message: "No refresh token provided" });
        return;
      }

      const newAccessToken = await AuthService.handleRefreshToken(refreshToken);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 1000,
      });

      res.json({ accessToken: newAccessToken });
    } catch {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
     await AuthService.logout(res);
     res.status(200).json({message: "Logout successfull"});
  }
};
