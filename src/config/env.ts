import { config } from 'dotenv'
import { z } from 'zod'

config()

export const schema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10)),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
  FIREBASE_MEASUREMENT_ID: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z
    .string()
    .default('5432')
    .transform((val) => parseInt(val, 10)),
})

export const env = schema.parse(process.env)
