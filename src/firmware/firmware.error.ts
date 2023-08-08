import { FirmwareErrLang } from 'src/utils/language/error.language';
import { ErrorResponse } from '../utils/interface/common.interface';

class FirmwareError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  firmwareVersionNotFound() {
    return this.response(FirmwareErrLang.firmwareVersionNotFound());
  }

  firmwareVersionAlreadyExist() {
    return this.response(FirmwareErrLang.firmwareVersionAlreadyExist());
  }
}

export const FirmwareErrorMessage = new FirmwareError({});
