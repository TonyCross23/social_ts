import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: "7d" });
};

export const verifyRefreshToken = (payload: string) => {
  return jwt.verify(payload, process.env.REFRESH_SECRET!);
};

export const verifyResetToken = (payload: string) => {
  return jwt.verify(payload, process.env.JWT_SECRET!);
};