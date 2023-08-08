import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/user.entity';

export const AuthRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
