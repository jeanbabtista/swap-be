import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '@app/common/type/request';

export const RequestUserSub = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExtendedRequest>();
  return request.userFirebaseSub;
});
