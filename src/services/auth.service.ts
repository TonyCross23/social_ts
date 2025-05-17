import bcrypt from "bcryptjs"
import {prisma} from "../databases/db";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";


export const AuthService = {
    register : async ({name,email, password}: any) => {
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