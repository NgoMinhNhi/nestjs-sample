import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRoles } from '../auth/decorator/role.decorator';
import { ISuccessResponse } from '../utils/interface/common.interface';
import { UserRole } from '../user/user.entity';
import {
  UpdateCompanyInfoDto,
  UpdateForgotPasswordPhoneNumberDto,
} from './statistic.dto';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('forgotPasswordPhoneNumber')
  getForgotPasswordPhoneNumber(): Promise<ISuccessResponse> {
    return this.statisticService.getForgotPasswordPhoneNumber();
  }

  @AuthRoles(UserRole.Admin)
  @Post('forgotPasswordPhoneNumber')
  updateForgotPasswordPhoneNumber(
    @Body()
    updateForgotPasswordPhoneNumberDto: UpdateForgotPasswordPhoneNumberDto,
  ): Promise<ISuccessResponse> {
    return this.statisticService.updateForgotPasswordPhoneNumber(
      updateForgotPasswordPhoneNumberDto,
    );
  }

  @Get('companyInfo')
  getCompanyInfo(): Promise<ISuccessResponse> {
    return this.statisticService.getCompanyInfo();
  }

  @AuthRoles(UserRole.Admin)
  @Post('companyInfo')
  updateCompanyInfo(
    @Body() updateCompanyInfoDto: UpdateCompanyInfoDto,
  ): Promise<ISuccessResponse> {
    return this.statisticService.updateCompanyInfo(updateCompanyInfoDto);
  }
}
