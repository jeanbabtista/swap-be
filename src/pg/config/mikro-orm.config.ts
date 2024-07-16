import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { env } from '@app/config/env';

export default {
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: env.POSTGRES_DB,
  password: env.POSTGRES_PASSWORD,
  user: env.POSTGRES_USER,
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  debug: true,
} as Options;
