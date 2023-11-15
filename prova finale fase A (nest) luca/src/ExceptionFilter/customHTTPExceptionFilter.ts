import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogDto } from 'src/logger/dto/log.dto';
import { LoggerService } from 'src/logger/logger.service';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const message = exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      ora: new Date().getHours() + ':' + new Date().getMinutes(),
      path: request.url,
    });
  }
}
