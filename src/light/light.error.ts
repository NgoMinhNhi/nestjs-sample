import { ErrorResponse } from '../utils/interface/common.interface';
import { LightErrLang } from '../utils/language/error.language';

class LightError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  lightNotFound() {
    return this.response(LightErrLang.lightNotFound());
  }

  macAddressDuplicate() {
    return this.response(LightErrLang.macAddressDuplicate());
  }

  groupNumMustBeTheSame() {
    return this.response(LightErrLang.groupNumMustBeTheSame());
  }

  lightNameDuplicate() {
    return this.response(LightErrLang.lightNameDuplicate());
  }

  lightNumDuplicate() {
    return this.response(LightErrLang.lightNumDuplicate());
  }

  macAddressAlreadyExist(macAddressDuplicate: string = '') {
    return this.response(
      LightErrLang.macAddressAlreadyExist(macAddressDuplicate),
    );
  }

  lightNameAlreadyExist(lightNameDuplicate: string = '') {
    return this.response(
      LightErrLang.lightNameAlreadyExist(lightNameDuplicate),
    );
  }

  lightNumAlreadyExist(lightNumDuplicate: string = '') {
    return this.response(LightErrLang.lightNumAlreadyExist(lightNumDuplicate));
  }
}

export const LightErrorMessage = new LightError({});
