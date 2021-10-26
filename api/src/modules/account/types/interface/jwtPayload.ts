import { AccountRoles } from '../enum/roles';

export interface IJWTPayload {
  email: string;
  role: AccountRoles;
}
