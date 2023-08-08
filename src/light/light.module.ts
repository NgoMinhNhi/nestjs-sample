import { forwardRef, Module } from '@nestjs/common';
import { LightService } from './light.service';
import { LightController } from './light.controller';
import { Light } from './light.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Light]), forwardRef(() => GroupModule), UserModule],
  controllers: [LightController],
  providers: [LightService],
  exports: [LightService],
})
export class LightModule {}
