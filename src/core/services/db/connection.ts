import { drizzle } from 'drizzle-orm/expo-sqlite'
// import { migrate } from 'drizzle-orm/expo-sqlite/migrator'
import { openDatabaseSync } from 'expo-sqlite/next'

// import m from '../../../../drizzle/migrations'

export const dbName = 'aiplate.db'

const expoDb = openDatabaseSync(dbName)

export const db = drizzle(expoDb)

// migrate(db, m)
