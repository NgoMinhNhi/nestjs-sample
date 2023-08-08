import { DefaultErrLang } from 'src/utils/language/error.language';
import { ErrorResponse } from '../utils/interface/common.interface';

class DefaultError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  defaultSettingNotFound() {
    return this.response(DefaultErrLang.defaultSettingNotFound());
  }

  activeBrightnessValueMustLargerThanDeactivate() {
    return this.response(
      DefaultErrLang.activeBrightnessValueMustLargerThanDeactivate(),
    );
  }
}

export const DefaultErrorMessage = new DefaultError({});
