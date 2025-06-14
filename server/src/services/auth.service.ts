import bcrypt from "bcryptjs";
import { prisma } from "../databases/db";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import dotenv from "dotenv";
import { sendMail } from "../utils/mail";
import { Response } from "express";
dotenv.config();

export const AuthService = {
  register: async ({ name, email, password }: any) => {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // throw 409 conflict error
      throw new Error("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const { password: _, ...safeUser } = user;

    return safeUser;
  },

  login: async ({ email, password }: any) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      };

    return { accessToken, refreshToken, user: userInfo };
  },

  forgotPassword: async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Email not found");
    }

    const token = generateRefreshToken({ id: user.id });

    const resetLink = `${process.env.FRONTEND_URL}/api/v1/reset?token=${token}`;
    const html = `<h1>Password Reset</h1><p><a href="${resetLink}">Click here</a> to reset your password. This link expires in 15 minutes.</p>`;

    await sendMail(email, "Reset your password", html);
    return { message: "Reset email sent" };
  },

  resetPassword: async (token: string, newPassword: string) => {
    const decode: any = verifyRefreshToken(token);
    const payload: any = decode;

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashed },
    });

    return { message: "Password reset successful" };
  },

  handleRefreshToken: async (refreshToken: string) => {
    const decode = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      id: (decode as any).id,
    });

    return newAccessToken;
  },

  logout: async (res: Response) => {
     res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    return { message: 'Logout successful' };
  }
};
