import { PrimaryKey } from '@mikro-orm/postgresql'

export abstract class UuidEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string
}
