import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_ADMIN_PROVIDER_TOKEN } from './constant/firebase-admin-provider-token';
import { DecodedIdToken } from 'firebase-admin/auth';
import { app } from 'firebase-admin';
import { FirebaseExceptionCatch } from '@app/firebase-admin/decorator/firebase-exception-catch.decorator';

@Injectable()
export class FirebaseAdminService {
  constructor(
    @Inject(FIREBASE_ADMIN_PROVIDER_TOKEN)
    private readonly firebaseAdmin: app.App,
  ) {}

  @FirebaseExceptionCatch()
  async verifyToken(token: string): Promise<DecodedIdToken> {
    return this.firebaseAdmin.auth().verifyIdToken(token);
  }
}
