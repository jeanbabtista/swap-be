import { Module } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { AuthController } from '@app/auth/auth.controller';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
