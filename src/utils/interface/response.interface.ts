import { Language } from '../../session/session.entity';

export interface IErrLangRes {
  [Language.Kor]: string;
  [Language.Eng]: string;
}
export interface ISuccessResponse {
  data: any;
}

import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
export interface IErrorResponse {
  message: IErrLangRes;
  isShow: boolean;
}

export class ErrorResponse {
  message: IErrLangRes;
  isShow: boolean;
  constructor(error: IErrorResponse) {
    this.message = error.message;
    this.isShow = error.isShow || false;
  }

  response(errorLangRes: IErrLangRes, isShow: boolean = false) {
    this.message = errorLangRes;
    this.isShow = isShow;
    return this;
  }
}

class ResponseC {
  public success(data: any = {}): ISuccessResponse {
    return { data };
  }
  public error(data: ErrorResponse): BadRequestException {
    return new BadRequestException(data);
  }
  public unauthorized(data: ErrorResponse): UnauthorizedException {
    return new UnauthorizedException(data);
  }
  public forbidden(data: ErrorResponse): ForbiddenException {
    return new ForbiddenException(data);
  }
}

export const Response = new ResponseC();
