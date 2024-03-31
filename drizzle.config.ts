import type { Config } from 'drizzle-kit'

export default {
  schema: './src/core/services/db/schema.ts',
  out: './drizzle',
  driver: 'expo',
} satisfies Config
