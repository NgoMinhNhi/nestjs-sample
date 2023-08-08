import { Module } from '@nestjs/common';
import { FirmwareService } from './firmware.service';
import { FirmwareController } from './firmware.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Firmware } from './firmware.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firmware]), UserModule],
  providers: [FirmwareService],
  controllers: [FirmwareController],
  exports: [FirmwareService],
})
export class FirmwareModule {}
