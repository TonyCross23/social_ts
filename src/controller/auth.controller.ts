import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export const AuthController = {
    register: async (req: Request, res: Response) => {
        const user = await AuthService.register(req.body)
        res.status(200).json(user)
    }
}