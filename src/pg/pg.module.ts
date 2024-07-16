import { Module } from '@nestjs/common';
import { PgService } from './pg.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './config/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  providers: [PgService],
})
export class PgModule {}
