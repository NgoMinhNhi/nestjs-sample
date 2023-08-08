import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from '../user/user.dto';
import {
  Response,
  ISuccessResponse,
} from '../utils/interface/common.interface';
import { IToken, ETokenType } from '../auth/auth.interface';
import { IReqUser } from '../utils/interface/common.interface';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<ISuccessResponse> {
    const [user, session] = await this.userService.signIn(userLoginDto);

    //Return access and refresh token
    const accessPayload: IToken = {
      userId: user.id,
      sessionId: session.id,
      role: user.role,
      tokenType: ETokenType.access,
    };

    const refreshPayload: IToken = {
      userId: user.id,
      sessionId: session.id,
      role: user.role,
      tokenType: ETokenType.refresh,
    };

    const tokens = {
      accessToken: this.jwtService.sign(accessPayload, { expiresIn: '1d' }),
      refreshToken: this.jwtService.sign(refreshPayload),
    };

    return Response.success({ user, tokens });
  }

  async logout(reqUser: IReqUser): Promise<ISuccessResponse> {
    await this.sessionService.deactivateSession(reqUser.sessionId);
    return Response.success();
  }

  async adminLogoutUser(userId: number): Promise<ISuccessResponse> {
    const user = await this.userService.findActiveUserById(userId);
    await this.sessionService.deactivateAllActiveUserSession(user);
    return Response.success();
  }

  async accessToken(reqUser: IReqUser): Promise<ISuccessResponse> {
    const accessPayload: IToken = {
      userId: reqUser.userId,
      sessionId: reqUser.sessionId,
      role: reqUser.role,
      tokenType: ETokenType.access,
    };
    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: '1d',
    });

    return Response.success({ accessToken });
  }
}
