import bcrypt from "bcryptjs"
import {prisma} from "../databases/db";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";


export const AuthService = {
    register : async ({name,email, password}: any) => {

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
            // throw 409 conflict error
            throw new Error("Email already exists");
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({ data: { name, email, password: hashed } });

        const { password: _, ...safeUser } = user;

        return safeUser;
    },

    login: async ({ email, password }: any) => {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ id: user.id });

        return { accessToken, refreshToken,  };
    }
}