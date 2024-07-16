import { Catch } from '@app/common/decorator/catch.decorator';
import {
  FirebaseError,
  PrefixedFirebaseError,
} from '@app/common/type/firebase-error';
import { FirebaseAuthErrorCodeEnum } from '@app/firebase-admin/enum/firebase-auth-error-code.enum';
import { UnauthorizedException } from '@nestjs/common';

function isFirebaseException(
  error: unknown,
): error is FirebaseError | PrefixedFirebaseError {
  const instance = Object.getPrototypeOf(error.constructor).name;
  return instance === 'PrefixedFirebaseError' || instance === 'FirebaseError';
}

export const FirebaseExceptionCatch = () =>
  Catch(Error, (error: Error) => {
    if (!isFirebaseException(error)) throw error;
    console.log(FirebaseExceptionCatch.name, error.toJSON());

    const { code } = error.toJSON();
    switch (code) {
      case FirebaseAuthErrorCodeEnum.ID_TOKEN_EXPIRED:
        throw new UnauthorizedException('token has expired');
      case FirebaseAuthErrorCodeEnum.ARGUMENT_ERROR:
        throw new UnauthorizedException('invalid token');
      default:
        throw error;
    }
  });
