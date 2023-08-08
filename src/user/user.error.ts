import { ErrorResponse } from '../utils/interface/common.interface';
import { UserErrLang } from '../utils/language/error.language';

class UserError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  userNotFound() {
    return this.response(UserErrLang.userNotFound());
  }

  accountNotExist() {
    return this.response(UserErrLang.accountNotExist(), true);
  }

  accountNotActive() {
    return this.response(UserErrLang.accountNotActive(), true);
  }

  incorrectPassword() {
    return this.response(UserErrLang.incorrectPassword(), true);
  }

  activeSessionExist() {
    return this.response(UserErrLang.activeSessionExist(), true);
  }

  passwordCannotSame() {
    return this.response(UserErrLang.passwordCannotSame(), true);
  }

  emailAlreadyExist() {
    return this.response(UserErrLang.emailAlreadyExist(), true);
  }

  phoneNumberAlreadyExist() {
    return this.response(UserErrLang.phoneNumberAlreadyExist(), true);
  }

  oneOfAddressOrAddressDetailRequired() {
    return this.response(UserErrLang.oneOfAddressOrAddressDetailRequired());
  }
}

export const UserErrorMessage = new UserError({});
