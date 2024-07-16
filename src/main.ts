import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from '@app/common/filter/all-exception.filter';
import { SwaggerConfig } from '@app/swagger/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  SwaggerConfig.setup(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port, () => console.log(`[🚀 Server] http://localhost:${port}`));
}

bootstrap().then();
