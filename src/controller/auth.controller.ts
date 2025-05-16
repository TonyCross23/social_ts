import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export const AuthController = {
    register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await AuthService.register({ name, email, password });
    res.status(200).json(user);
  },
}