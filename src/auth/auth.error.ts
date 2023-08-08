import { ErrorResponse } from '../utils/interface/common.interface';
import { Language as Lang } from '../session/session.entity';
import { AuthErrLang } from '../utils/language/error.language';

class AuthError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  sessionExpired() {
    return this.response(AuthErrLang.sessionExpired(), true);
  }

  invalidTokenType(type: string) {
    return this.response(AuthErrLang.invalidTokenType(type));
  }

  unauthorized() {
    return this.response(AuthErrLang.unauthorized());
  }

  forbidden() {
    return this.response(AuthErrLang.forbidden());
  }
}

export const AuthErrorMessage = new AuthError({});
