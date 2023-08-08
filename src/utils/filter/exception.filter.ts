import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { IErrorResponse } from '../interface/common.interface';
import { IRequest } from '../interface/common.interface';
import { Language } from '../../session/session.entity';
import * as fs from 'fs';

const logger = fs.createWriteStream('log.txt', {
  flags: 'a',
});

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request: IRequest = host.switchToHttp().getRequest();
    const { body, route }: any = request;
    const reqUser = request.user;
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;

    if (reqUser) {
      message = error?.response?.message[reqUser.language];
    } else {
      message = error?.response?.message[body?.language || Language.Kor];
    }

    if (!message) {
      message =
        error?.response?.message ||
        JSON.stringify(error?.response) ||
        JSON.stringify(error);

      if (Array.isArray(message)) {
        message = message.join(', ');
      }
    }

    logger.write(
      `\n${new Date().toISOString()}: ${status} | ${message} | ${
        route?.stack[0].method || 'null route'
      } ${route?.path || 'null path'}`,
    );

    const errorResponse: IErrorResponse = {
      message,
      isShow: error?.response?.isShow || false,
    };

    response.status(status).json({ error: errorResponse });
  }
}
