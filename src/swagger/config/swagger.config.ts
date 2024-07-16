import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static setup(app: INestApplication, prefix: string = 'api') {
    const config = new DocumentBuilder()
      .setTitle('Official Style Swap API')
      .setDescription('API for Style Swap application to exchange clothes built with NestJS')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('clothing')
      .addTag('tinder')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(prefix, app, document);
  }
}
