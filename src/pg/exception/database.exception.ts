import { HttpException } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor() {
    super('database error', 500);
  }
}
