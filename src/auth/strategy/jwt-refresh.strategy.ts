import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IReqUser, ICache } from '../../utils/interface/common.interface';
import { ETokenType, IToken } from '../auth.interface';
import { AuthErrorMessage } from '../auth.error';
import { Cache } from 'cache-manager';
import { Response } from '../../utils/interface/common.interface';
import { SessionService } from '../../session/session.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private configService: ConfigService,
    private sessionService: SessionService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(token: IToken): Promise<IReqUser> {
    if (token.tokenType !== ETokenType.refresh) {
      throw Response.unauthorized(
        AuthErrorMessage.invalidTokenType(ETokenType.refresh),
      );
    }
    const cache: ICache = await this.cacheManager.get(String(token.sessionId));
    let language = cache;
    if (!cache) {
      const session = await this.sessionService.findBySessionId(
        token.sessionId,
      );

      if (!session) {
        throw Response.unauthorized(AuthErrorMessage.sessionExpired());
      }

      await this.cacheManager.set(String(session.id), session.language, {
        ttl: 300,
      });

      language = session.language;
    }

    return {
      userId: token.userId,
      sessionId: token.sessionId,
      role: token.role,
      language,
    };
  }
}
