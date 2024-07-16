import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@app/config/config.module';
import { UserModule } from '@app/user/user.module';
import { PgModule } from '@app/pg/pg.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { AuthModule } from '@app/auth/auth.module';
import { ProductModule } from './product/product.module';
import { MediaModule } from '@app/media/media.module';
import { CategoryModule } from '@app/category/category.module';

@Module({
  imports: [
    ConfigModule,
    PgModule,
    FirebaseAdminModule,
    AuthModule,
    UserModule,
    MediaModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useValue: AuthGuard,
    },
  ],
})
export class AppModule {}
