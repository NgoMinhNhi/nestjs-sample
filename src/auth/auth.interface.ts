import { UserRole } from '../user/user.entity';

export enum ETokenType {
  access = 'ACCESS',
  refresh = 'REFRESH',
  anonymous = 'ANONYMOUS',
}

export interface IToken {
  userId: number;
  sessionId: number;
  role: UserRole;
  tokenType: ETokenType;
}
