import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISuccessResponse,
  Response,
} from '../utils/interface/common.interface';
import { Repository } from 'typeorm';
import { Statistic, StatisticKey, StatisticDefault } from './statistic.entity';
import {
  UpdateCompanyInfoDto,
  UpdateForgotPasswordPhoneNumberDto,
} from './statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepository: Repository<Statistic>,
  ) {}

  async getForgotPasswordPhoneNumber(): Promise<ISuccessResponse> {
    const statistic = await this.statisticRepository.findOne({
      key: StatisticKey.forgotPasswordPhoneNumber,
    });
    return Response.success(
      statistic ? statistic.value : StatisticDefault.forgotPasswordPhoneNumber,
    );
  }

  async updateForgotPasswordPhoneNumber(
    updateForgotPasswordPhoneNumberDto: UpdateForgotPasswordPhoneNumberDto,
  ): Promise<ISuccessResponse> {
    const statistic = await this.statisticRepository.findOne({
      key: StatisticKey.forgotPasswordPhoneNumber,
    });

    if (!statistic) {
      await this.statisticRepository.save({
        key: StatisticKey.forgotPasswordPhoneNumber,
        value: updateForgotPasswordPhoneNumberDto,
      });
    } else {
      await this.statisticRepository.update(
        {
          key: StatisticKey.forgotPasswordPhoneNumber,
        },
        { value: updateForgotPasswordPhoneNumberDto },
      );
    }

    return Response.success();
  }

  async getCompanyInfo(): Promise<ISuccessResponse> {
    const statistic = await this.statisticRepository.findOne({
      key: StatisticKey.companyInfo,
    });
    return Response.success(
      statistic ? statistic.value : StatisticDefault.companyInfo,
    );
  }

  async updateCompanyInfo(
    updateCompanyInfoDto: UpdateCompanyInfoDto,
  ): Promise<ISuccessResponse> {
    const companyInfo = await this.statisticRepository.findOne({
      key: StatisticKey.companyInfo,
    });

    if (!companyInfo) {
      await this.statisticRepository.save({
        key: StatisticKey.companyInfo,
        value: updateCompanyInfoDto,
      });
    } else {
      await this.statisticRepository.update(
        {
          key: StatisticKey.companyInfo,
        },
        { value: updateCompanyInfoDto },
      );
    }

    return Response.success();
  }
}
