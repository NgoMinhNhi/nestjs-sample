import { Body, Controller, Put, Request } from '@nestjs/common';
import { AuthRoles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/user/user.entity';
import { IRequest } from 'src/utils/interface/request.interface';
import { ISuccessResponse } from 'src/utils/interface/response.interface';
import { ChangeLanguageDto } from './session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @AuthRoles(UserRole.Any)
  @Put('language')
  changeLanguage(
    @Body() changeLanguageDto: ChangeLanguageDto,
    @Request() req: IRequest,
  ): Promise<ISuccessResponse> {
    return this.sessionService.changeLanguage(req.user, changeLanguageDto);
  }
}
