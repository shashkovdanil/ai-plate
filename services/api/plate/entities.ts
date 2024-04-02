import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { plate } from '~/services/db'

const selectPlateSchema = createSelectSchema(plate)
const insertPlateSchema = createInsertSchema(plate)

export type Plate = z.infer<typeof selectPlateSchema>
export type CreatePlate = z.infer<typeof insertPlateSchema>
export type UpdatePlate = z.infer<typeof insertPlateSchema>
