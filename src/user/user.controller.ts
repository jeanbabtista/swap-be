import { Controller, Get } from '@nestjs/common';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { RequestUserSub } from '@app/auth/decorators/request-user.decorator';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/entity/user.entity';
import { ApiDatabaseErrorResponse } from '@app/pg/decorator/api-database-error-response.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Auth()
  @ApiDatabaseErrorResponse()
  async getMe(@RequestUserSub() sub: string): Promise<User> {
    return await this.userService.findOneByFirebaseSubOrFail(sub);
  }
}
