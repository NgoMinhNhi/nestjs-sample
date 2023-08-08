import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Request,
} from '@nestjs/common';
import { AuthRoles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/user/user.entity';
import { IRequest } from 'src/utils/interface/request.interface';
import { ISuccessResponse } from 'src/utils/interface/response.interface';
import { UpdateDefaultDto } from './default.dto';
import { DefaultService } from './default.service';

@Controller('default')
export class DefaultController {
  constructor(private readonly defaultService: DefaultService) {}

  @AuthRoles(UserRole.Admin)
  @Get(':userId')
  adminGet(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ISuccessResponse> {
    return this.defaultService.get(userId);
  }

  @AuthRoles(UserRole.User)
  @Get()
  userGet(@Request() req: IRequest): Promise<ISuccessResponse> {
    return this.defaultService.get(req.user.userId);
  }

  @AuthRoles(UserRole.Admin)
  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateDefaultDto: UpdateDefaultDto,
  ): Promise<ISuccessResponse> {
    return this.defaultService.update(userId, updateDefaultDto);
  }
}
