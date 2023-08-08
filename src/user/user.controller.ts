import {
  Controller,
  Request,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { IRequest } from '../utils/interface/common.interface';
import { UserRole } from './user.entity';
import { AuthRoles } from '../auth/decorator/role.decorator';
import { ISuccessResponse } from '../utils/interface/common.interface';

import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  GetUsersDto,
} from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthRoles(UserRole.Admin)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<ISuccessResponse> {
    return this.userService.createUser(createUserDto);
  }

  @AuthRoles(UserRole.Any)
  @Get('myProfile')
  myProfile(@Request() req: IRequest): Promise<ISuccessResponse> {
    return this.userService.myProfile(req.user);
  }

  @AuthRoles(UserRole.User)
  @Put('changePassword')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.userService.changePassword(changePasswordDto, req.user);
  }

  @AuthRoles(UserRole.Admin)
  @Get()
  getAllUsers(@Query() getUsersDto: GetUsersDto): Promise<ISuccessResponse> {
    return this.userService.getAllUsers(getUsersDto);
  }

  @AuthRoles(UserRole.Admin)
  @Delete(':userId')
  deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ISuccessResponse> {
    return this.userService.deleteUser(userId);
  }

  @AuthRoles(UserRole.Admin)
  @Put(':userId')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ISuccessResponse> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
