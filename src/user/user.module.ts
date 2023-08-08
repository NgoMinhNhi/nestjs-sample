import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SessionModule } from '../session/session.module';
import { DefaultModule } from 'src/default/default.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SessionModule,
    forwardRef(() => DefaultModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
