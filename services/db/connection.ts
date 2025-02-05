import { drizzle } from 'drizzle-orm/expo-sqlite'
import { migrate } from 'drizzle-orm/expo-sqlite/migrator'
import { openDatabaseSync } from 'expo-sqlite/next'

import migrations from '../../drizzle/migrations'

export const dbName = 'aiplate2.db'

const expoDb = openDatabaseSync(dbName)

export const db = drizzle(expoDb)

migrate(db, migrations)
