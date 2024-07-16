import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@app/user/entity/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { PgExceptionCatch } from '@app/pg/decorator/pg-exception-catch.decorator';
import { PgConstraintEnum } from '@app/pg/enum/pg-constraint.enum';

@Injectable()
export class UserService {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
    this.em = userRepository.getEntityManager();
  }

  @PgExceptionCatch()
  async findOneByFirebaseSubOrFail(sub: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail({ firebaseId: sub });
  }

  @PgExceptionCatch({
    uniqueConstraintViolationMessage(constraint) {
      switch (constraint) {
        case PgConstraintEnum.USER_EMAIL_UNIQUE:
          return 'email already exists';
        case PgConstraintEnum.USER_FIREBASE_UID_UNIQUE:
          return 'user already exists';
      }
    },
    checkConstraintViolationMessage(constraint) {
      switch (constraint) {
        case PgConstraintEnum.USER_EMAIL_CHECK:
        case PgConstraintEnum.USER_EMAIL_NOT_EMPTY_CHECK:
          return 'email is required';
        case PgConstraintEnum.USER_USERNAME_NOT_EMPTY_CHECK:
          return 'username is required';
      }
    },
  })
  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    user.firebaseId = data.firebaseId;
    user.email = data.email;
    user.username = data.username;
    user.bio = data.bio;

    await this.em.persistAndFlush(user);
    return user;
  }
}
