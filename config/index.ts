import { PrismaClient } from '../generated/prisma/client'

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
})

export default prismaClient;
