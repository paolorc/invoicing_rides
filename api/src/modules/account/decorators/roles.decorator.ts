import { SetMetadata } from '@nestjs/common';
import { AccountRoles } from '../types/enum/roles';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccountRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
