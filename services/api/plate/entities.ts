import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { plate } from '~/services/db'

const selectPlateSchema = createSelectSchema(plate)

export type Plate = z.infer<typeof selectPlateSchema>
