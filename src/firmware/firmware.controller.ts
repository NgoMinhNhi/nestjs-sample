import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { AuthRoles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/user/user.entity';
import { IRequest } from 'src/utils/interface/request.interface';
import { ISuccessResponse } from 'src/utils/interface/response.interface';
import {
  CreateFirmwareDto,
  GetFirmwaresDto,
  UpdateFirmwareDto,
} from './firmware.dto';
import { FirmwareService } from './firmware.service';

@Controller('firmware')
export class FirmwareController {
  constructor(private readonly firmwareService: FirmwareService) {}

  @AuthRoles(UserRole.Any)
  @Get('/newest')
  newest(): Promise<ISuccessResponse> {
    return this.firmwareService.newest();
  }

  @AuthRoles(UserRole.Admin)
  @Get(':firmwareId')
  detail(
    @Param('firmwareId', ParseIntPipe) firmwareId: number,
  ): Promise<ISuccessResponse> {
    return this.firmwareService.detail(firmwareId);
  }

  @AuthRoles(UserRole.Admin)
  @Get()
  get(@Query() getFirmwaresDto: GetFirmwaresDto): Promise<ISuccessResponse> {
    return this.firmwareService.get(getFirmwaresDto);
  }

  @AuthRoles(UserRole.Admin)
  @Post()
  create(
    @Body() createFirmwareDto: CreateFirmwareDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.firmwareService.create(createFirmwareDto, req.user);
  }

  @AuthRoles(UserRole.Admin)
  @Put(':firmwareId')
  update(
    @Body() updateFirmwareDto: UpdateFirmwareDto,
    @Param('firmwareId', ParseIntPipe) firmwareId: number,
  ): Promise<ISuccessResponse> {
    return this.firmwareService.update(firmwareId, updateFirmwareDto);
  }
}
