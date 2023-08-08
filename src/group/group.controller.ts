import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { IQuery, IRequest } from 'src/utils/interface/request.interface';
import { AuthRoles } from '../auth/decorator/role.decorator';
import { UserRole } from '../user/user.entity';
import { ISuccessResponse } from '../utils/interface/response.interface';
import { CreateGroupDto, UpdateGroupDto } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @AuthRoles(UserRole.User)
  @Post()
  create(
    @Body() createGroupDto: CreateGroupDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.groupService.create(createGroupDto, req.user);
  }

  @AuthRoles(UserRole.User)
  @Get()
  get(
    @Request() req: IRequest,
    @Query() query: IQuery,
  ): Promise<ISuccessResponse> {
    return this.groupService.get(req.user, query);
  }

  @AuthRoles(UserRole.User)
  @Put(':groupNum')
  update(
    @Param('groupNum', ParseIntPipe) groupNum: number,
    @Body() updateGroupDto: UpdateGroupDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.groupService.update(groupNum, updateGroupDto, req.user);
  }

  @AuthRoles(UserRole.User)
  @Delete(':groupNum')
  delete(
    @Param('groupNum', ParseIntPipe) groupNum: number,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.groupService.delete(groupNum, req.user);
  }
}
