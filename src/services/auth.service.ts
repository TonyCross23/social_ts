import bcrypt from "bcryptjs"
import prisma from "../databases/db";


export const AuthService = {
    register : async ({name,email, password}: any) => {
        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({ data: { name, email, password: hashed } });

        const { password: _, ...safeUser } = user;

        return safeUser;
    }
}