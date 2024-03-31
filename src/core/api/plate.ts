import { eq, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { db, plate as plateTable } from '../services/db'
import { countCalories } from '../services/openai'

const insertPlateSchema = createInsertSchema(plateTable)
const selectPlateSchema = createSelectSchema(plateTable)

export type InsertPlate = z.infer<typeof insertPlateSchema>
export type Plate = z.infer<typeof selectPlateSchema>

export const plate = {
  async getByDate(date: string) {
    try {
      const plates = await db
        .select()
        .from(plateTable)
        .where(sql`date(${plateTable.createdAt}) = date(${date})`)

      return plates
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async create(prompt: string) {
    try {
      if (!prompt) return

      const { data } = await countCalories(prompt)

      console.log(data)

      await db.insert(plateTable).values(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async remove(id: number) {
    try {
      await db.delete(plateTable).where(eq(plateTable.id, id))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
