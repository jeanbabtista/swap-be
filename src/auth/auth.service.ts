import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '@app/firebase-admin/firebase-admin.service';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly userService: UserService,
  ) {}

  async register(token: string) {
    const decodedIdToken = await this.firebaseAdminService.verifyToken(token);
    await this.userService.create({
      firebaseId: decodedIdToken.user_id,
      email: decodedIdToken.email,
    });
  }
}
