import { Client } from 'pg'
 
export const clientDb = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  })
  await client.connect()

  return client
}
