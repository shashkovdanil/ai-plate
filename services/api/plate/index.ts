import { eq, sql } from 'drizzle-orm'

import { db, plate as plateTable } from '~/services/db'
import { countCalories } from '~/services/openai'

import type { CreatePlate, UpdatePlate } from './entities'

export const plate = {
  async getById(id: number) {
    try {
      const [plate] = await db
        .select()
        .from(plateTable)
        .where(eq(plateTable.id, id))

      return plate
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async getByDate(date: string) {
    try {
      const plates = await db
        .select()
        .from(plateTable)
        .where(sql`date(${plateTable.date}) = date(${date})`)

      return plates
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async createManually(data: CreatePlate) {
    try {
      await db.insert(plateTable).values(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async create(prompt: string, date: string) {
    try {
      if (!prompt) return

      const { data } = await countCalories(prompt)

      await db
        .insert(plateTable)
        .values(data.map(plate => ({ ...plate, date })))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async update(id: number, data: UpdatePlate) {
    try {
      await db.update(plateTable).set(data).where(eq(plateTable.id, id))
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
