import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '@app/firebase-admin/firebase-admin.service';
import { ExtendedRequest } from '@app/common/type/request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(FirebaseAdminService)
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const { authorization } = request.headers;
    if (!authorization) return false;

    const token = this.extractTokenFromAuthorizationHeader(authorization);
    if (!token) return false;

    // No need to cache, since `verifyToken` method does not make any network request, it's local JWT verification
    const { sub } = await this.firebaseAdminService.verifyToken(token);
    request.userFirebaseSub = sub;
    return true;
  }

  private extractTokenFromAuthorizationHeader(header: string) {
    const [type, token] = header.split(' ');
    if (type !== 'Bearer') return null;
    return token;
  }
}
