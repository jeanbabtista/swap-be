import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiResponse } from '@nestjs/swagger';
import { DatabaseException } from '@app/pg/exception/database.exception';

export function ApiDatabaseErrorResponse() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'field is required' }),
    ApiResponse({ type: DatabaseException, status: 500, description: 'database error' }),
    ApiConflictResponse({ description: 'record already exists' }),
  );
}
