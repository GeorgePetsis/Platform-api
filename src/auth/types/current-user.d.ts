import { UserRole } from '@prisma/client';

export type CurrentUser = {
  id: number;
  role: UserRole;
};
