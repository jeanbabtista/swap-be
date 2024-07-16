import { Catch } from '@app/common/decorator/catch.decorator';
import {
  CheckConstraintViolationException,
  ConstraintViolationException,
  DriverException,
  ForeignKeyConstraintViolationException,
  NotNullConstraintViolationException,
  ServerException,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { DatabaseException } from '@app/pg/exception/database.exception';
import { PgConstraintEnum } from '@app/pg/enum/pg-constraint.enum';

interface PgExceptionCatchOptions {
  uniqueConstraintViolationMessage?: (constraint: PgConstraintEnum) => string;
  notNullConstraintViolationMessage?: (constraint: PgConstraintEnum) => string;
  checkConstraintViolationMessage?: (constraint: PgConstraintEnum) => string;
}

export const PgExceptionCatch = (options?: PgExceptionCatchOptions) =>
  Catch(Error, (error: DriverException) => {
    console.error(PgExceptionCatch.name, error);

    if (error instanceof ServerException) {
      if (error instanceof ConstraintViolationException) {
        const constraint = error['constraint'] as PgConstraintEnum;

        if (error instanceof ForeignKeyConstraintViolationException)
          throw new DatabaseException();

        if (error instanceof CheckConstraintViolationException)
          throw new BadRequestException(
            options?.checkConstraintViolationMessage(constraint) ||
              'field is required',
          );

        if (error instanceof NotNullConstraintViolationException)
          throw new BadRequestException(
            options?.notNullConstraintViolationMessage(constraint) ||
              'field is required',
          );

        if (error instanceof UniqueConstraintViolationException)
          throw new ConflictException(
            options?.uniqueConstraintViolationMessage(constraint) ||
              'record already exists',
          );
      }
    }

    throw new DatabaseException();
  });
