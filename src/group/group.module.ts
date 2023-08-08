import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UserModule } from 'src/user/user.module';
import { LightModule } from 'src/light/light.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UserModule,
    forwardRef(() => LightModule),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
