import { config } from "../config/config.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const connectionString = config.DB_URL;

const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter })