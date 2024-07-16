import { Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { schema } from './env'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config) => schema.parse(config),
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
