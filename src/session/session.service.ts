import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { In, Repository } from 'typeorm';
import { Language, Session, SessionStatus } from './session.entity';
import {
  ISuccessResponse,
  Response,
} from 'src/utils/interface/response.interface';
import { ChangeLanguageDto } from './session.dto';
import { IReqUser } from 'src/utils/interface/request.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}
  async findBySessionId(sessionId: number): Promise<Session> {
    return this.sessionRepository.findOne({
      id: sessionId,
      status: SessionStatus.Active,
    });
  }

  async deactivateSession(sessionId: number): Promise<void> {
    await Promise.all([
      this.cacheManager.del(String(sessionId)),
      this.sessionRepository.update(
        { id: sessionId },
        {
          status: SessionStatus.Deactivated,
        },
      ),
    ]);
  }

  async findByUser(user: User): Promise<Session> {
    return this.sessionRepository.findOne({
      user,
      status: SessionStatus.Active,
    });
  }

  async deactivateAllActiveUserSession(user: User): Promise<void> {
    const sessions = await this.sessionRepository.find({
      user,
      status: SessionStatus.Active,
    });

    const sessionIds = sessions.map((session) => session.id);

    await Promise.all([
      this.sessionRepository.update(
        { id: In(sessionIds) },
        { status: SessionStatus.Deactivated },
      ),
      ...sessionIds.map((sessionId) => {
        return this.cacheManager.del(String(sessionId));
      }),
    ]);
  }

  async createSession(user: User, language: Language): Promise<Session> {
    const session = await this.sessionRepository.save({ user, language });

    await this.cacheManager.set(String(session.id), session.language, {
      ttl: 300,
    });

    return session;
  }

  async changeLanguage(
    reqUser: IReqUser,
    changeLanguageDto: ChangeLanguageDto,
  ): Promise<ISuccessResponse> {
    await Promise.all([
      this.cacheManager.set(
        String(reqUser.sessionId),
        changeLanguageDto.language,
        {
          ttl: 300,
        },
      ),
      this.sessionRepository.update(
        {
          id: reqUser.sessionId,
        },
        changeLanguageDto,
      ),
    ]);
    return Response.success();
  }
}
