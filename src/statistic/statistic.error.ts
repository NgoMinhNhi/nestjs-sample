import { ErrorResponse } from '../utils/interface/common.interface';
import { Language as Lang } from '../session/session.entity';
import {} from '../utils/language/error.language';
class StatisticError extends ErrorResponse {
  constructor(error) {
    super(error);
  }
}

export const StatisticErrorMessage = new StatisticError({});
