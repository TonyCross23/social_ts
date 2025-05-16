import { PrismaClient } from "@prisma/client";
import log from "../logger/log";

const prisma = new PrismaClient({
  log: ["query"],
})

export function connectDatabase() {
  prisma
    .$connect()
    .then(() => {
      log.info("Connected to database");
    })
    .catch((err) => {
      log.error("Error connecting to database", err);
    });
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export default prisma;