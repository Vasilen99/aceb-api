import {
  pgTable,
  bigint,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'user',
  {
    id: bigint('id', {
      mode: 'number',
    })
      .primaryKey()
      .generatedByDefaultAsIdentity(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    authUid: text('auth_uid')
      .notNull(),

    plateNumber: text('plate_number'),

    email: text('email'),
  },
  (table) => [
    unique('user_anon_id_key').on(table.authUid),
  ]
)