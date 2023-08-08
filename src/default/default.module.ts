import { forwardRef, Module } from '@nestjs/common';
import { DefaultService } from './default.service';
import { DefaultController } from './default.controller';
import { UserModule } from 'src/user/user.module';
import { Default } from './default.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Default]), forwardRef(() => UserModule)],
  providers: [DefaultService],
  controllers: [DefaultController],
  exports: [DefaultService],
})
export class DefaultModule {}
