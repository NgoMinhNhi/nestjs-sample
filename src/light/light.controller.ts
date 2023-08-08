import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { IRequest } from 'src/utils/interface/request.interface';
import { AuthRoles } from '../auth/decorator/role.decorator';
import { UserRole } from '../user/user.entity';
import { ISuccessResponse } from '../utils/interface/response.interface';
import {
  CreateLightsDto,
  GetLightsDto,
  UpdateLightDto,
  MacAddressDto,
} from './light.dto';
import { LightService } from './light.service';

@Controller('light')
export class LightController {
  constructor(private lightService: LightService) {}

  @AuthRoles(UserRole.User)
  @Get()
  get(
    @Query() getLightsDto: GetLightsDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.lightService.get(getLightsDto, req.user);
  }

  @AuthRoles(UserRole.User)
  @Post()
  create(
    @Body() createLightsDto: CreateLightsDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.lightService.create(createLightsDto, req.user);
  }

  @AuthRoles(UserRole.User)
  @Put(':macAddress')
  update(
    @Body() updateLightDto: UpdateLightDto,
    @Param() macAddressParams: MacAddressDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.lightService.update(
      macAddressParams.macAddress,
      updateLightDto,
      req.user,
    );
  }

  @AuthRoles(UserRole.User)
  @Delete(':macAddress')
  delete(
    @Param() macAddressParams: MacAddressDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.lightService.delete(macAddressParams.macAddress, req.user);
  }
}
