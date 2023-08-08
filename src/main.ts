import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { RolesGuard } from './auth/guard/role.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AnyExceptionFilter } from './utils/filter/exception.filter';
import { RedisIoAdapter } from './utils/adapter/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors();
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(new Reflector()));
  app.useGlobalFilters(new AnyExceptionFilter());
  await app.listen(port);
}
bootstrap();
