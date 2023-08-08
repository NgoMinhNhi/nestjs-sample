import * as bcrypt from 'bcrypt';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository, Connection } from 'typeorm';
import { Cache } from 'cache-manager';

import { User, UserRole, UserStatus } from './user.entity';
import { Session } from '../session/session.entity';
import {
  CreateUserDto,
  UserLoginDto,
  UpdateUserDto,
  ChangePasswordDto,
  GetUsersDto,
} from './user.dto';
import { UserErrorMessage } from './user.error';
import {
  Response,
  ISuccessResponse,
  IReqUser,
  Pagination,
} from '../utils/interface/common.interface';
import { SessionService } from '../session/session.service';
import { DefaultService } from 'src/default/default.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private sessionService: SessionService,
    @Inject(forwardRef(() => DefaultService))
    private defaultService: DefaultService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private connection: Connection,
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<[User, Session]> {
    const user = await this.userRepository.findOne({
      email: userLoginDto.email,
      role: userLoginDto.role,
      status: Not(UserStatus.Removed),
    });

    if (!user) {
      throw Response.error(UserErrorMessage.accountNotExist());
    }

    if (user.status !== UserStatus.Active) {
      throw Response.error(UserErrorMessage.accountNotActive());
    }

    const isMatch = await bcrypt.compare(userLoginDto.password, user.password);

    if (!isMatch) {
      throw Response.error(UserErrorMessage.incorrectPassword());
    }

    if (user.role !== UserRole.Admin) {
      const activeSession = await this.sessionService.findByUser(user);

      if (activeSession) {
        if (userLoginDto.isForceLogout == false) {
          throw Response.error(UserErrorMessage.activeSessionExist());
        }
        await this.sessionService.deactivateAllActiveUserSession(user);
      }
    }

    const session = await this.sessionService.createSession(
      user,
      userLoginDto.language,
    );

    return [user, session];
  }

  async getAllUsers(getUsersDto: GetUsersDto): Promise<ISuccessResponse> {
    const page = getUsersDto.page;
    const limit = getUsersDto.limit;
    const order = getUsersDto.order;
    const skip = (page - 1) * limit;

    let orConditions = [];

    if (getUsersDto.keyword) {
      const keyword = getUsersDto.keyword;
      orConditions.push(
        {
          email: Like('%' + keyword + '%'),
          role: UserRole.User,
          status: Not(UserStatus.Removed),
        },
        {
          companyName: Like('%' + keyword + '%'),
          role: UserRole.User,
          status: Not(UserStatus.Removed),
        },
        {
          displayName: Like('%' + keyword + '%'),
          role: UserRole.User,
          status: Not(UserStatus.Removed),
        },
      );
    } else {
      orConditions.push({
        role: UserRole.User,
        status: Not(UserStatus.Removed),
      });
    }

    const [users, total] = await this.userRepository.findAndCount({
      where: orConditions,
      take: limit,
      skip: skip,
      order: { createdAt: order },
    });

    const result = Pagination.create(users, total, page, limit);
    return Response.success(result);
  }

  async createUser(createUserDto: CreateUserDto): Promise<ISuccessResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [checkDuplicateEmail, checkDuplicatePhoneNumber] =
        await Promise.all([
          this.userRepository.findOne({
            email: createUserDto.email,
            status: Not(UserStatus.Removed),
          }),
          this.userRepository.findOne({
            phoneNumber: createUserDto.phoneNumber,
            status: Not(UserStatus.Removed),
          }),
        ]);

      if (checkDuplicateEmail) {
        throw Response.error(UserErrorMessage.emailAlreadyExist());
      }

      if (checkDuplicatePhoneNumber) {
        throw Response.error(UserErrorMessage.phoneNumberAlreadyExist());
      }

      if (!createUserDto.address && !createUserDto.addressDetail) {
        throw Response.error(
          UserErrorMessage.oneOfAddressOrAddressDetailRequired(),
        );
      }

      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      let user = this.userRepository.create(createUserDto);

      user = await queryRunner.manager.save(user);

      await this.defaultService.create(user, queryRunner);

      await queryRunner.commitTransaction();
      return Response.success(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ISuccessResponse> {
    const [user, checkDuplicateEmail, checkDuplicatePhoneNumber] =
      await Promise.all([
        this.userRepository.findOne({
          id: userId,
          status: UserStatus.Active,
        }), //Check user exist
        this.userRepository.findOne({
          id: Not(userId),
          email: updateUserDto.email,
          status: Not(UserStatus.Removed),
        }),
        this.userRepository.findOne({
          id: Not(userId),
          phoneNumber: updateUserDto.phoneNumber,
          status: Not(UserStatus.Removed),
        }),
      ]);

    if (!user) {
      throw Response.error(UserErrorMessage.userNotFound());
    }

    if (checkDuplicateEmail) {
      throw Response.error(UserErrorMessage.emailAlreadyExist());
    }

    if (checkDuplicatePhoneNumber) {
      throw Response.error(UserErrorMessage.phoneNumberAlreadyExist());
    }

    if (!updateUserDto.address && !updateUserDto.addressDetail) {
      throw Response.error(
        UserErrorMessage.oneOfAddressOrAddressDetailRequired(),
      );
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const result = await this.userRepository.update(
      { id: userId },
      updateUserDto,
    );

    return Response.success(result);
  }

  async deleteUser(userId: number): Promise<ISuccessResponse> {
    const user = await this.userRepository.findOne({
      id: userId,
      status: Not(UserStatus.Removed),
    });

    if (!user) {
      throw Response.error(UserErrorMessage.userNotFound());
    }

    await this.userRepository.update(
      { id: userId },
      { status: UserStatus.Removed },
    );

    const session = await this.sessionService.findByUser(user);

    if (session) {
      await Promise.all([
        this.cacheManager.del(String(session.id)),
        this.sessionService.deactivateSession(session.id),
      ]);
    }
    return Response.success();
  }

  async myProfile(reqUser: IReqUser): Promise<ISuccessResponse> {
    const user = await this.userRepository.findOne({ id: reqUser.userId });
    return Response.success(user);
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const user = await this.userRepository.findOne({
      id: reqUser.userId,
      role: reqUser.role,
      status: UserStatus.Active,
    });

    const isMatch = await bcrypt.compare(
      changePasswordDto.newPassword,
      user.password,
    );

    if (isMatch) {
      throw Response.error(UserErrorMessage.passwordCannotSame());
    }

    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(changePasswordDto.newPassword, salt);

    await this.userRepository.update(
      { id: user.id },
      { password: newPassword },
    );

    return Response.success();
  }

  async findActiveUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      id: userId,
      role: UserRole.User,
      status: UserStatus.Active,
    });
    if (!user) {
      throw Response.error(UserErrorMessage.userNotFound());
    }
    return user;
  }
}
