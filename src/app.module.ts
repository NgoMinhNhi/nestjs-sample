import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config, configValidationSchema } from './utils/config/config';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { DatabaseConfig } from './utils/config/database.config';
import { AuthModule } from './auth/auth.module';
import { StatisticModule } from './statistic/statistic.module';
import { SessionModule } from './session/session.module';
import { GroupModule } from './group/group.module';
import { LightModule } from './light/light.module';
import { GroupGateway } from './group/group.gateway';
import { LightGateway } from './light/light.gateway';
import { DefaultModule } from './default/default.module';
import { FirmwareModule } from './firmware/firmware.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    CacheModule.register<RedisClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    UserModule,
    AuthModule,
    StatisticModule,
    SessionModule,
    GroupModule,
    LightModule,
    DefaultModule,
    FirmwareModule,
  ],
  providers: [GroupGateway, LightGateway],
})
export class AppModule {}
