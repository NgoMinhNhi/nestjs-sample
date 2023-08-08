import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { UserRole } from '../user/user.entity';

import { UserLoginDto } from '../user/user.dto';
import { IRequest } from '../utils/interface/common.interface';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { AuthRoles } from './decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @AuthRoles(UserRole.Any)
  @Put('logout')
  async logout(@Request() req: IRequest) {
    return this.authService.logout(req.user);
  }

  @AuthRoles(UserRole.Admin)
  @Put('adminLogoutUser/:userId')
  async adminLogoutUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.adminLogoutUser(userId);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('accessToken')
  async accessToken(@Request() req: IRequest) {
    return this.authService.accessToken(req.user);
  }
}
