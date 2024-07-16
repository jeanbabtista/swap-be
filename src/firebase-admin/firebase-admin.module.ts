import { Global, Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { FIREBASE_ADMIN_PROVIDER_TOKEN } from './constant/firebase-admin-provider-token';
import { getFirebaseClient } from './config/get-firebase-client';

@Global()
@Module({
  providers: [
    FirebaseAdminService,
    {
      provide: FIREBASE_ADMIN_PROVIDER_TOKEN,
      useFactory: () => getFirebaseClient(),
    },
  ],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {}
