import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '@app/user/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/user/entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
