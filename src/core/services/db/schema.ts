import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const plate = sqliteTable(
  'plate',
  {
    id: integer('id').primaryKey(),
    food: text('food').notNull(),
    calories: integer('calories').notNull(),
    proteins: integer('proteins').notNull(),
    fats: integer('fats').notNull(),
    carbs: integer('carbs').notNull(),
    eaten: integer('eaten').notNull(),
    createdAt: text('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text('updated_at'),
  },
  table => {
    return {
      createdAtIdx: index('created_at_idx').on(table.createdAt),
      updatedAtIdx: index('updated_at_idx').on(table.updatedAt),
    }
  },
)
