import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UpdateDefaultDto } from './default.dto';
import { Default } from './default.entity';
import { DefaultErrorMessage } from './default.error';
import {
  ISuccessResponse,
  Response,
} from '../utils/interface/response.interface';

@Injectable()
export class DefaultService {
  constructor(
    @InjectRepository(Default)
    private defaultRepository: Repository<Default>,
  ) {}

  async get(userId: number): Promise<ISuccessResponse> {
    const defaultSetting = await this.defaultRepository.findOne({
      user: { id: userId },
    });
    return Response.success(defaultSetting);
  }

  async create(user: User, queryRunner: QueryRunner): Promise<void> {
    const defaultSetting = this.defaultRepository.create({ user });
    await queryRunner.manager.save(defaultSetting);
  }

  async update(
    userId: number,
    updateDefaultDto: UpdateDefaultDto,
  ): Promise<ISuccessResponse> {
    const defaultSetting = await this.defaultRepository.findOne({
      user: { id: userId },
    });
    if (!defaultSetting) {
      throw Response.error(DefaultErrorMessage.defaultSettingNotFound());
    }
    const update = { ...defaultSetting, ...updateDefaultDto };
    if (update.activeSensorBrightness <= update.deactivateSensorBrightness) {
      throw Response.error(
        DefaultErrorMessage.activeBrightnessValueMustLargerThanDeactivate(),
      );
    }

    await this.defaultRepository.update(
      { user: { id: userId } },
      updateDefaultDto,
    );
    return Response.success();
  }
}
