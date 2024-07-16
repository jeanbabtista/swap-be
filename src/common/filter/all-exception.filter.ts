import { Response } from 'express'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { ErrorResponse } from '@app/common/type/response'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    this.logException(exception)
    const error = this.getResponse(exception)
    httpAdapter.reply(res, error, error.statusCode)
  }

  private getResponse(exception: unknown): ErrorResponse {
    if (exception instanceof HttpException) {
      return {
        error: exception.name,
        message: exception.message,
        statusCode: exception.getStatus(),
      }
    }

    return {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }
  }

  private logException(exception: unknown): void {
    console.error(exception)
  }
}
