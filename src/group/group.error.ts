import { GroupErrLang } from 'src/utils/language/error.language';
import { ErrorResponse } from '../utils/interface/common.interface';

class GroupError extends ErrorResponse {
  constructor(error) {
    super(error);
  }

  groupNotFound() {
    return this.response(GroupErrLang.groupNotFound());
  }

  groupNameAlreadyExist() {
    return this.response(GroupErrLang.groupNameAlreadyExist());
  }

  groupNumAlreadyExist() {
    return this.response(GroupErrLang.groupNumAlreadyExist());
  }

  activeBrightnessValueMustLargerThanDeactivate() {
    return this.response(
      GroupErrLang.activeBrightnessValueMustLargerThanDeactivate(),
    );
  }

  lightExistInGroup() {
    return this.response(GroupErrLang.lightExistInGroup());
  }
}

export const GroupErrorMessage = new GroupError({});
