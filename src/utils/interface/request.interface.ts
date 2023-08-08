import { Language } from '../../session/session.entity';
import { UserRole } from '../../user/user.entity';

export interface IReqUser {
  userId: number;
  sessionId: number;
  role: UserRole;
  language: Language;
}

export interface IRequest {
  user: IReqUser;
}

export interface IQuery {
  page: number;
  limit: number;
  order: any;
}
