import { Response } from 'express';
import { ApplicationException } from './application-exception';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
    .status(status)
    .json({
      message: exception.message,
    });
  }
}
