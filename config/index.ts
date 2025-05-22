import { PrismaClient } from '../generated/prisma/client'

const connectionString = process.env.DATABASE_URL

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
})

export default prismaClient;
