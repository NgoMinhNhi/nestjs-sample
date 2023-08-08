import { ErrorResponse } from '../utils/interface/common.interface';
import { UserErrLang } from '../utils/language/error.language';

class SessionError extends ErrorResponse {
  constructor(error) {
    super(error);
  }
}

export const SessionErrorMessage = new SessionError({});
